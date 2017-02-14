$(document).ready(function(){

var youTubeDBURL = 'https://www.googleapis.com/youtube/v3/search';

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var userInput = $(this).find('.js-query').val();
    console.log(userInput);

    getDataFromApi(userInput, displayResults);
  });
};

watchSubmit();

function getDataFromApi(userInput, displayResults) {
  var query = {
        q: userInput,
        key: 'AIzaSyAO4fB6LsE2-eTqfhohc6BqX0NbCX-gIIg',
        part: 'snippet'
  }

  $.getJSON(youTubeDBURL, query, displayResults);
}


function displayResults(data) {
  var resultElement = '';

  console.log(data.items);

  if (data.items) {
        data.items.forEach(function(searchResult){
        var title = (searchResult.snippet.channelTitle); 
        var description = (searchResult.snippet.description);
        var videoURL =(searchResult.id.videoId);
        console.log(title);
        console.log(videoURL);
       
      resultElement += `<li><a href="https://www.youtube.com/watch?v=${videoURL}" target="_blank"> <img class="thumb" src="${searchResult.snippet.thumbnails.default.url}">
                          <h3>${title}</h3>
                          <p>${description}</p> 
                          </a></li>`;

      });

      
}
  
  else {
        resultElement += '<p>No results</p>';
  }

  console.log(resultElement);

  $('.js-search-results').html(resultElement);
}



});

