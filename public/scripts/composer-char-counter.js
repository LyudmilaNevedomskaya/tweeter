$(document).ready(() => {

  //The function counts the entered characters 
  //and displays the number of remaining
  let counter = Number($('output.counter').val());
  let symbolsLeft;

  $('#tweet-text').on('input', function () {
    let lengthOfTweet = $('#tweet-text').val().length;
    symbolsLeft = counter - lengthOfTweet;
    let newContent = '<output name="counter" class="counter" for="tweet-text">' + symbolsLeft + '</output>';
    if (symbolsLeft <= 0) {
      newContent = '<output name="counter" class="counter counterRed" for="tweet-text">' + symbolsLeft + '</output>';
    }
    $('output.counter').replaceWith(newContent);
  })


// Make the page scroll to the top
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      if ($('#upbutton').is(':hidden')) {
        $('#upbutton').css({
          opacity: 1
        }).fadeIn('slow');
      }
    } else {
      $('#upbutton').stop(true, false).fadeOut('fast');
    }
  });

  $('#upbutton').on('click', function () {
    $('html, body').stop().animate({
      scrollTop: 0
    }, 300);
    $('.new-tweet').toggle('slow', function () {

    })
    $('#tweet-text').focus();
  });

});