var buttonNext = document.getElementById("next");
buttonNext.addEventListener("click", showQuote);

function showQuote() {
  $.ajax({
    url:
      "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json",
    success: function(data) {
      //       AUTHOR
      $(".title").text("—" + data.quoteAuthor);
      //       QUOTE
      $(".content").html('"' + data.quoteText + '"');
      let letters = document.querySelector("#content").innerText.split("");
      // let quote = document.querySelector('#title').innerHTML.split('');
      document.querySelector("#content").innerHTML = letters.randomColor();

      // document.querySelector('#title').innerHTML = quote.randomColor();
    },
    cache: false
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
