// This module allows the form to dynamically update the character counter for tweet inputs.

$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const $form = $(this);
    const length = $form.val().length;
    const max = 140;
    const remainder = max - length;
    const counter = $form.parents(".new-tweet").find(".counter");

    counter.text(remainder);

    remainder < 0 ? counter.addClass("error") : counter.removeClass("error");
  });
});
