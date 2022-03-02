$(document).ready(function () {
  // console.log("Composer script loaded!");

  $("#tweet-text").on("input", function () {
    // console.log("this.value: ", $(this).val().length); //The this keyword is a reference to the text area

    // $(this) holds the element that you originally requested and gives access to jquery methods for the element
    const length = $(this).val().length; // length refers to text area character length
    const max = 140;
    const remainder = max - length;
    const counter = $(this).parents(".new-tweet").find(".counter"); // we access the parent and come back down the DOM so that we can find the counter div - this is useful to use jquery functions like text in the next line

    counter.text(remainder); // changes the counter as you type - .text(ANYTHING) allows you to set a ANYTHING to the specific element (counter)

    // ternary expression for when the remaining characters left are less than 0 to add the color class
    remainder < 0 ? counter.addClass("addRed") : counter.removeClass("addRed");
  });
  // $("#tweet-text").on("input", () => {
  //   console.log(this); //The this keyword here refers to something else! - refers to whole document due to arrow function usage
  // });
});

// Event Types
// blur event - fires when element has lost focus - not useful

// these do not account for when text is dragged into area or user copy+pastes text (keypress not firing for non character values are not as important)
// keydown event - fires when key is pressed down, fired for all keys
// keyup event - fires when key is released
// keypress event - fires when key is pressed down, fired for character values only (not ALT/SHIFT/CTRL/etc)

// change event - fires when alteration to element's value is committed - not fired for each alteration to element's value

// input event - fires when any change to element occurs **
