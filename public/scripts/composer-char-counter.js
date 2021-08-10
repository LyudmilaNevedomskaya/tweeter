$(document).ready(() => {

  let counter = Number($('output.counter').val());
  let symbolsLeft;

  $('#tweet-text').on('input', function() {
    let lengthOfTweet = $('#tweet-text').val().length;
    symbolsLeft = counter-lengthOfTweet;
    let newContent = '<output name="counter" class="counter" for="tweet-text">' + symbolsLeft + '</output>';
    if (symbolsLeft <= 0) {
      newContent = '<output name="counter" class="counter counterRed" for="tweet-text">' + symbolsLeft + '</output>';
    }
    $('output.counter').replaceWith(newContent);
  })
  

  


});