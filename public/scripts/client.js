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

  // escape function that prevents cross script injections
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // define the tweet element
  const $tweet = `      
  <article class="new-tweet-container">
  <header class="user-info"> 
    <div class="info">
    <img src="${escape(tweetData.user.avatars)}" class="info-pic"/>
      <h3 class="info-user">${escape(tweetData.user.name)}</h3>
    </div>
    <div class="handle">${escape(tweetData.user.handle)}</div>
  </header>
  <div class="tweet">${escape(tweetData.content.text)}</div>
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
    $(".all-tweets-container").prepend(createTweetElement(tweet));
    // console.log(tweet);
  });
  // console.log(tweetsContainer.innerHTML);
};

// loads tweets onto page
const loadtweets = function () {
  $.ajax("/tweets", {
    method: "GET",
    dataType: "json",
  })
    .then((result) => {
      renderTweets(result);
    })
    .catch((error) => alert(error));
};

// have this so that the page loads once this is fully completed
$(document).ready(function () {
  // scroll function
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#toTop").fadeIn();
    } else {
      $("#toTop").fadeOut();
    }
  });

  $("#toTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  // event listener for hovering over nav bar button
  const $toggle = $(".option");
  const $input = $("#tweet-form");
  const $textarea = $("textarea");
  $toggle.click(function () {
    $input.toggle();
    $textarea.focus();
    $textarea.val("");
  });

  loadtweets();

  // Form Submission Event Handler - prevent default of reloading page
  const $form = $("#tweet-form");
  $form.submit(function (event) {
    event.preventDefault();

    const $textarea = $("textarea").val();
    const $errorBox = $(".error-box").text("").slideUp();

    if ($textarea.length > 140) {
      return $errorBox
        .slideDown()
        .text(
          "⚠💥⚠ Tweet is longer than 140 characters (140 characters is the limit)! ⚠💥⚠"
        );
    }

    if ($textarea === "" || $textarea === null) {
      return $errorBox
        .slideDown()
        .text("⚠💥⚠ You can't submit an empty tweet you twit! ⚠💥⚠");
    }

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
      .catch((error) => alert(error)); // catches any error

    // resets counter to 140 after request is sent
    // $(this).find(".counter").text(140);
    // resets counter color after request is sent
    // $(this).find(".counter").removeClass("addRed");
  });
});
