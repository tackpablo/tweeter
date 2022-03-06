// Creates element to inject into index.html
const createTweetElement = function (tweetData) {
  // Escape function that prevents cross script injections. Only used on data that is user submitted (omit created at time)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $tweet = `      
  <article class="new-tweet-container">
  <header class="user-info"> 
    <div class="info">
    <img src="${escape(
      tweetData.user.avatars
    )}" alt="user avatar" class="info-pic"/>
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
  return $tweet;
};

// Renders tweets by looping through database to produce dynamic tweets
const renderTweets = function (tweets) {
  // empties the html of any appended tweets so that the new tweets can load
  $(".all-tweets-container").empty();

  tweets.forEach((tweet) => {
    $(".all-tweets-container").prepend(createTweetElement(tweet)); // prepended to post newest first
  });
};

// Loads tweets onto browser via AJAX request
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

// Signals the DOM is ready for manipulation
$(document).ready(function () {
  // Scroll function
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

  // Event listener for toggling tweet input field
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

    // Error handling - if tweets are over 140 character limit or if field is empty/null
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

    // Making request for posting information to database via AJAX request
    const data = $(this).serialize();
    $.ajax({ method: "POST", url: "/tweets", data })
      .then(() => {
        // clears the form after post request
        $("#tweet-text").val("");
        // Triggers on input change event to reset character count logic
        $("#tweet-text").trigger("input");

        loadtweets();
      })
      .catch((error) => alert(error));
  });
});
