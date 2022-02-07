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
          <img class="avatar"src=${escape(tweet.user.avatars)}>
          <p class="name">${escape(tweet.user.name)}</p>
        </div>
        <p class="handle">${escape(tweet.user.handle)}</p>
      </header>
    `);
    const $tweetBody = $(`
      <div class="tweet-content">
        <p class="text">${escape(tweet.content.text)}</p>
      </div>
    `);
    const $tweetFooter = $(`
      <footer>
        <div class="create-at">
          <p>created at: ${escape(timeago.format(tweet.created_at))}</p>
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
      // prepend load the tweets upside down!! (don"t use reverse())
      $(".tweets-containter").prepend(createTweetElement(tweet));
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
      renderTweets([data[data.length - 1]]);
      // if load data into renderTweets(), every tweets in db will be loaded again with new tweet
      // console.log("tweet from renderTweets:", data);
    })
    .catch(err => {
      console.log("error in loadTweets:", err);
    });
  };

  let $errorBox = $("<p>").addClass("error-box");
  $errorBox.prependTo($(".error-noti")).hide();

  // AJAX handle submit tweet-box using jQuery
  $(".new-tweet form").submit(e => {
    // alert($("#tweet-text").val());
    e.preventDefault();
    
    // handle tweet box valid input
    const $tweetInput = $("#tweet-text").val();
    if ($tweetInput.length === 0) {
      $errorBox.text("🙈 Empty tweet! Add some thoughts 💭").slideDown();
      return;
    } else if ($tweetInput.length > 140) {
      $errorBox.text("🙉 Too long thoughts 💭! Remove some words!").slideDown();
      // clear the tweet-box
      // $("#tweet-text").val("");
      // $(".counter").text("140").removeClass("warning");
      return;
    }
    $errorBox.slideUp();
    // jQuery data.serialize() handle POST request for submit tweet button
    const serializedData = $(".new-tweet form").serialize();
    $.ajax({
      url: "/tweets",
      data: serializedData,
      method: "POST",
      success: () => {
        // console.log(serializedData);
        // console.log($("#tweet-text").serialize());
        // clear the tweet-box after submit
        $("#tweet-text").val("");
        $(".counter").text("140");
        loadTweets();
    }});
  });

  // initially loads old tweets in db when first open
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
    .then((data) => {
      renderTweets(data);
    })

  // handle cross-site scripting
  const escape = str => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

});