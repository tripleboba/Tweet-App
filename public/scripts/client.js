/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Implement createTweetElement() that takes in a tweet objects
 * and returns a tweet <article> element containing its entire HTML structure
 */

$(document).ready( () => {

  const createTweetElement = (tweet) => {
    // append like this will have problem with security of the web -- fix later
    const $tweet = $(`<article class="tweet"></article`);
    const $header = $(`
      <header>
        <div class="tweet-ava-name">
          <img class="avatar"src=${tweet.user.avatars}>
          <p class="name">${tweet.user.name}</p>
        </div>
        <p class="handle">${tweet.user.handle}</p>
      </header>
    `);
    const $div = $(`
      <div class="tweet-content">
        <p class="text">${tweet.content.text}</p>
      </div>
    `);
    const $footer = $(`
      <footer>
        <div class="create-at">
          <p>create at: ${timeago.format(tweet.created_at)}</p>
        </div>
        <div class="icons">
          <div class="icon"><i class="fas fa-thumbs-up"></i></div>
          <div class="icon"><i class="fas fa-retweet"></i></div>
          <div class="icon"><i class="fas fa-flag"></i></i></div>
        </div>
      </footer>
    `);
    $tweet.append($header, $div, $footer);
    return $tweet;
  };

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      $('.tweets-containter').append(createTweetElement(tweet));
    }
  };

  // hardcode tweet data
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  renderTweets(data);
  
});