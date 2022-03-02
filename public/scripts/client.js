/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

const createTweetElement = function (tweetData) {
  // initialize element by adding article with class new-tweet-container (much like the original new container)
  // let $tweet = $("<article>").addClass("new-tweet-container");

  // define the tweet element
  const $tweet = `      
  <article class="new-tweet-container">
  <header class="user-info"> 
    <div class="info">
    <img src="${tweetData.user.avatars}" class="info-pic"/>
      <h3>${tweetData.user.name}</h3>
    </div>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <div class="tweet">${tweetData.content.text}</div>
  <footer class="tweet-icons">
    <span>${timeago.format(tweetData.created_at)}</span>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
  </article>
`;
  // create tweet element by appending the rest of container to article initialized element
  // const tweetEl = $tweet.append(tweet);
  return $tweet;
  // return tweetEl;
};

// renders tweet by looping through database
const renderTweets = function (tweets) {
  // empties the html of any appended tweets so that the new tweets can load
  $(".all-tweets-container").empty();

  tweets.forEach((tweet) => {
    $(".all-tweets-container").prepend(createTweetElement(tweet)); // change class to what it is rather than what it does - prepend tweet ********
    // console.log(tweet);
  });
  // console.log(tweetsContainer.innerHTML);
};

// loads tweets onto page
const loadtweets = function () {
  $.ajax("/tweets", {
    method: "GET",
    dataType: "json",
  }).then((result) => {
    renderTweets(result);
  });
};

// have this so that the page loads once this is fully completed
$(document).ready(function () {
  loadtweets();
  // run to render the tweet
  // renderTweets(tweetData);

  // Form Submission Event Handler - prevent default of reloading page
  const $form = $("#tweet-form");
  $form.submit(function (event) {
    event.preventDefault();

    const $textarea = $("textarea").val();
    if ($textarea.length > 140)
      return alert("Your tweet is longer than 140 characters!");

    if ($textarea === "" || $textarea === null)
      return alert("You can't submit an empty tweet you twit!");

    // making request for posting to database - this refers to form data
    const data = $(this).serialize();
    $.ajax({ method: "POST", url: "/tweets", data })
      .then(() => {
        // clears the form after post request
        $("#tweet-text").val("");
        // triggers on input change event to reload composer-char-counter logic
        $("#tweet-text").trigger("input"); // used to reset the addRed class
        // serialized data
        // console.log(data);

        loadtweets();
      })
      .catch((error) => console.log(error)); // catches any error

    // resets counter to 140 after request is sent
    // $(this).find(".counter").text(140);
    // resets counter color after request is sent
    // $(this).find(".counter").removeClass("addRed");
  });
});
