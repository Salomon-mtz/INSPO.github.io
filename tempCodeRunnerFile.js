  var category = 'happiness'
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
    headers: { 'X-Api-Key': 'iXn9JuqkdRk1iBd0AGgkWg==HiDDaxY6rI0shdun' },
    contentType: 'application/json',
    success: function (result) {
      console.log(result);
      return result;
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });