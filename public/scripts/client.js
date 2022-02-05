/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery"s document ready function
 */

/**
 * Implement createTweetElement() that takes in a tweet objects
 * and returns a tweet <article> element containing its entire HTML structure
 */

$(document).ready( () => {

  const createTweetElement = (tweet) => {
    // append like this will have problem with security of the web -- fix later
    const $tweet = $(`<article class="tweet"></article`);
    const $tweetHeader = $(`
      <header>
        <div class="tweet-ava-name">
          <img class="avatar"src=${tweet.user.avatars}>
          <p class="name">${tweet.user.name}</p>
        </div>
        <p class="handle">${tweet.user.handle}</p>
      </header>
    `);
    const $tweetBody = $(`
      <div class="tweet-content">
        <p class="text">${tweet.content.text}</p>
      </div>
    `);
    const $tweetFooter = $(`
      <footer>
        <div class="create-at">
          <p>created at: ${timeago.format(tweet.created_at)}</p>
        </div>
        <div class="icons">
          <div class="icon"><i class="fas fa-thumbs-up"></i></div>
          <div class="icon"><i class="fas fa-retweet"></i></div>
          <div class="icon"><i class="fas fa-flag"></i></i></div>
        </div>
      </footer>
    `);
    $tweet.append($tweetHeader, $tweetBody, $tweetFooter);
    return $tweet;
  };

  // get tweets in db to load to tweets-container
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      $(".tweets-containter").append(createTweetElement(tweet));
    }
  };
    // hardcode tweet data
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];
  // renderTweets(data);

  // Make GET request to /tweets and receive [] of tweets as JSON
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
    .then((data) => {
      renderTweets(data);
      // console.log("tweet from renderTweets:", data);
    })
    .catch(err => {
      console.log("error in loadTweets:", err);
    });
  };

  // AJAX handle submit tweet-box using jQuery
  $(".new-tweet form").submit(e => {
    // alert($("#tweet-text").val());
    e.preventDefault();

    // jQuery data.serialize() handle POST request for submit tweet button
    const serializedData = $(".new-tweet form").serialize();
    $.ajax({
      url: "/tweets",
      data: serializedData,
      method: "POST",
      success: () => {
        console.log(serializedData);
        // console.log($("#tweet-text").serialize());
        loadTweets();
    }});
  });

});