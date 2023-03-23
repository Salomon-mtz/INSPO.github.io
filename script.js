//Cookie funcionalidad =>
const cookieBanner = document.getElementById("cookie-banner");
const acceptCookiesBtn = document.getElementById("accept-cookies-btn");

// Bloque de codigo para hacer que el usuario de click en aceptar cookies
acceptCookiesBtn.addEventListener("click", () => {
  // Set a cookie to indicate that the user has accepted cookies
  document.cookie = "cookies_accepted=true; max-age=86400; path=/";

  // Hide the cookie banner
  cookieBanner.style.display = "none";
});

// Bloque de codigo para hacer que al cargar la página revise si ya aceptaron o no las cookies
window.addEventListener("load", () => {
  // Check if the "cookies_accepted" cookie has been set
  const cookiesAccepted = document.cookie.includes("cookies_accepted=true");
  cookieBanner.style.display = 'block';

  // If the cookie has been set, hide the cookie banner
  if (cookiesAccepted) {
    cookieBanner.style.display = "none";
  }
  else {
    acceptCookiesBtn.addEventListener('click', function () {
      cookieBanner.style.display = 'none';
    });
  }

});


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
  let inputValue = search(); 

  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + inputValue,
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
      $('#search').animate(
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
  let inputValue = document.getElementById("quote").value; 
  return inputValue;
}

$(document).ready(function () {
  var api_key = "adOoY176SoiR0hmoVtIPS3kRT25pHPc3gA4zjoOYiPzIirsvo9Qq1UMX"
  var image = ''
  $("#form").submit(function(event){
    event.preventDefault()
    var searchf = $("#quote").val()
    imagesearch()
  })

  function imagesearch(){
    let inputValue = search(); 
    $.ajax({
      
      method: 'GET',
      beforeSend: function (xhr){
        xhr.setRequestHeader("Authorization", api_key);
      },
      url:"https://api.pexels.com/v1/search?query="+inputValue+"&per_page=1",
      
      success:function(data){
        console.log(data)
        console.log(searchf)
        data.photos.forEach(photo => {
          image = `
          <img src="${photo.src.original}" width="400" height="300"/>
          `
          $("#images").append(image)
        });
      },
      error:function(error){
        console.log(error)
      }
    })
  }

  getQuote().then(() => {
    getCategoryQuote();
});

  $('#new-quote').on('click', getQuote().then(() => {
    getQuote();
  }));
  
});