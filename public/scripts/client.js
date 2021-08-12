/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  let $tweet;

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      }
    });
  };

  loadTweets();

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('#tweet-container').empty();

    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet)
      // createTweetElement(tweet);
      // $('#tweet-container').prepend($tweet);
    }
  }

  const createTweetElement = function (data) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const safeText = escape(data.content.text);
    $tweet =
      `<div class="tweet-container">
        <header class="post-header">
          <div class="user-name">
            <img src="${data.user.avatars}" alt="">
            <span> ${data.user.name}</span>
          </div>

          <div class="userID">${data.user.handle}</div>
        </header>

        <article class="post-article">
          <p>${safeText}</p>
        </article>

        <footer class="post-footer">
          <div class="posted-date">${timeago.format(data.created_at)}</div>
          <div>
            <i class="icon fas fa-flag"></i>
            <i class="icon fas fa-retweet"></i>
            <i class="icon fas fa-heart"></i>
          </div>
        </footer>
      </div>`;

    return $tweet;
  }

  const $form = $('form');
  $form.on('submit', function (event) {
    event.preventDefault();
    $('.error-message').hide()
    $('.empty-error-message').hide()
    const serializedData = $(this).serialize();
    //If a user tries to post an empty tweet => error
    if ($('#tweet-text').val().length === 0) {
      $('.empty-error-message').slideDown('slow')
      return;
    }
    //If the tweet is longer than allowed length => error
    if ($('#tweet-text').val().length > 140) {
      $('.error-message').slideDown('slow')
      return;
    }
    //If all requirements are met, then the tweet is published
    $.post('/tweets', serializedData).then(loadTweets);
    $('#tweet-text').val('');
    $('output.counter').replaceWith('<output name="counter" class="counter" for="tweet-text">140</output>');
  });
  //If you press the "new" word (button), which is in navbar, a field for entering a new tweet will appear or disappear
  $('.nav-btn').click(function () {
    $('.new-tweet').toggle('slow', function () {})
    $('#tweet-text').focus()
  })
})