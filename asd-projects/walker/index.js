/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    w: 87,
    a: 65,
    s: 83,
    d: 68,
    W: 119,
    A: 97,
    S: 115,
    D: 100,
  };

  // Game Item Objects

  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on("keydown", handleKeyDown);
  $(document).on("keyup", handleKeyUp);
  $(document).on("click", handleClick);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {
    if (
      event.which === KEY.LEFT ||
      event.which === KEY.a ||
      event.which === KEY.A
    ) {
      walker.speedX -= 5;
    } else if (
      event.which === KEY.DOWN ||
      event.which === KEY.s ||
      event.which === KEY.S
    ) {
      walker.speedY += 5;
    } else if (
      event.which === KEY.RIGHT ||
      event.which === KEY.d ||
      event.which === KEY.D
    ) {
      walker.speedX += 5;
    } else if (
      event.which === KEY.UP ||
      event.which === KEY.w ||
      event.which === KEY.W
    ) {
      walker.speedY -= 5;
    }
  }

  function handleKeyUp(event) {
    if (
      event.which === KEY.LEFT ||
      event.which === KEY.a ||
      event.which === KEY.A
    ) {
      walker.speedX = 0;
    } else if (
      event.which === KEY.DOWN ||
      event.which === KEY.s ||
      event.which === KEY.S
    ) {
      walker.speedY = 0;
    } else if (
      event.which === KEY.RIGHT ||
      event.which === KEY.d ||
      event.which === KEY.D
    ) {
      walker.speedX = 0;
    } else if (
      event.which === KEY.UP ||
      event.which === KEY.w ||
      event.which === KEY.W
    ) {
      walker.speedY = 0;
    }
  }

  function handleClick() {
    let rng1 = Math.floor(Math.random() * 255);
    let rng2 = Math.floor(Math.random() * 255);
    let rng3 = Math.floor(Math.random() * 255);

    console.log(rng1, rng2, rng3);

    $("#walker").css(
      "background-color",
      "rgb(" + rng1 + ", " + rng2 + ", " + rng3 + ")"
    );
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem() {
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }

  function redrawGameItem() {
    let unit = $("#walker");
    unit.css("left", walker.x);
    unit.css("top", walker.y);
  }

  function wallCollision() {
    let board = $("#board");
    let unit = $("#walker");

    if (walker.x < 0) {
      walker.speedX = 0;
      walker.x = 0;
    }
    if (walker.y < 0) {
      walker.speedY = 0;
      walker.y = 0;
    }
    if (walker.x > board.width() - unit.width()) {
      walker.speedX = 0;
      walker.x = board.width() - unit.width();
    }
    if (walker.y > board.height() - unit.height()) {
      walker.speedY = 0;
      walker.y = board.height() - unit.height();
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
