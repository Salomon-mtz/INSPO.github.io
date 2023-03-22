var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

var currentQuote = '';
var currentAuthor = '';

function getCategoryQuote() {

  var category = 'happiness';
  console.log(category);
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': 'iXn9JuqkdRk1iBd0AGgkWg==HiDDaxY6rI0shdun' },
    contentType: 'application/json',
    success: function (result) {
      console.log(result[0].quote);
      let quote = result[0].quote;
      $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#text').text(quote);
        
      });
      let author = result[0].author;
      $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#author').html(author);
      });
      $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + quote + '" ' + author)
      );
      
      var color = Math.floor(Math.random() * colors.length);
      $('html body').animate(
        {
          backgroundColor: colors[color],
          color: colors[color]
        },
        1000
      );
      $('.button').animate(
        {
          backgroundColor: colors[color]
        },
        1000
      );
      return result;
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

function getQuote() {
  getCategoryQuote();
  
}

function search() {
  $('#search').click(function() {
    var value = $('#quote').val();
    return value;
  });
  
}

$(document).ready(function () {
  getQuote().then(() => {
    getCategoryQuote();
});

  $('#new-quote').on('click', getQuote().then(() => {
    getQuote();
  }));
});