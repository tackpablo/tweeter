/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = function (tweetData) {
  // initialize element by adding article with class new-tweet-container (much like the original new container)
  // let $tweet = $("<article>").addClass("new-tweet-container");

  // define the tweet element
  const $tweet = `      
  <article class="new-tweet-container">
  <header class="user-info">
    <div class="info">
    <img src="${tweetData.user.avatars}" />
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

// const $tweet = createTweetElement(tweetData);

// // // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like

// $(".append-tweet").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

const renderTweets = function (tweets) {
  // gets the html contents of the prepend-tweet div created in the html
  // let tweetsContainer = $(".prepend-tweet").html("");
  // loop through each user and prepend their information the template tweet element
  tweets.forEach((tweet) => {
    $(".prepend-tweet").prepend(createTweetElement(tweet));
    // console.log(tweet);
  });
  // console.log(tweetsContainer.innerHTML);
};

// $("body").append("<p>IS THIS WORKING</p>");

// have this so that the page loads once this is fully completed
$(document).ready(function () {
  // run to render the tweet
  renderTweets(tweetData);
});
