/**
 * For words count in tweet input box
 * using jQuery and and selector to register an event handler
 * to the <textarea> in .new-tweet
 */

/**
 * function to console.log in DOM"s console to
 * check if script is loaded
 * -> run a callback when the DOM is ready to be manipulated with jQuery
 * -> ensure access HTML elements that the browser has loaded
 */
$(document).ready(function() {
  console.log("Script composer-char-counter.js is successfully loaded");
  
  const MAX_CHARS = 140;
  
  // using jQuery
  $("#tweet-text").on("input", characterCounter);
  
  function characterCounter() {
    // this = <textarea> input
    let currentChars = $(this).val().length;
    let charsLeft = MAX_CHARS - currentChars;
    $(".counter").text(charsLeft).removeClass("warning");
    if (charsLeft < 0) {
      $(".counter").addClass("warning");
      // $("#tweet-text").addClass("warning")
    }
  };
});


// using addEventListener
// const tweet_text = document.getElementById("tweet-text");
// tweet_text.addEventListener("input", characterCounter);  // if use characterCounter(), cb will be run before input

// function characterCounter() {
//   // console.log("Form has input!");
//   let currentChars = tweet_text.value.length;
//   let charsLeft = MAX_CHARS - currentChars;
//   // display the character counter link to index.html
//   document.getElementById("counter").textContent = charsLeft;
// };

// $("#tweet-text").on("click", function() {
//   console.log(this);
// })
// $("#tweet-text").on("click", () => {
//   console.log(this);
// }) // doesn"t specific since it refers to a whole windown due to () =>