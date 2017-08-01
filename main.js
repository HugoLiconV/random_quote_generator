$(document).ready(function() {
  getQuote();
});

let buttonNext = document.getElementById("next");
buttonNext.addEventListener("click", getQuote);

// Show the quote
function showQuote(data) {
  const author = data.quoteAuthor || unknow;
  $(".author").text("— " + author);
  $(".content").html('"' + data.quoteText + '"');
  const letters = document.querySelector("#content").innerText.split("");
  document.querySelector("#content").innerHTML = letters.randomColor();
}

//Create tweet
function createTweet(data) {
  if (data.quoteText > 140) {
    $("#tweet").html('Sorry! Your Tweet contains more than 140 characters');
  } else {
    const author = data.quoteAuthor || unknow;
    const twitterLink =
      "https://twitter.com/intent/tweet?hashtags=quotes&text=";
    const bodyTweet = encodeURIComponent(`"${data.quoteText}" — ${author}`);
    $("#tweet").attr("href", `${twitterLink}${bodyTweet}`);
  }
}
// Get the quote
function getQuote() {
  let endpoint =
    "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";
  $.ajax({
    url: endpoint,
    dataType: "jsonp",
    success: function(data) {
      showQuote(data);
      createTweet(data);
    }
  });
}

const colToHex = c => {
  // Hack so colors are bright enough
  let color = c < 75 ? c + 75 : c;
  let hex = color.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = (r, g, b) => {
  return "#" + colToHex(r) + colToHex(g) + colToHex(b);
};

const getRandomColor = () => {
  return rgbToHex(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  );
};

Array.prototype.randomColor = function() {
  let html = "";
  this.map(letter => {
    let color = getRandomColor();
    html += '<span style="color:' + color + '">' + letter + "</span>";
  });
  return html;
};
