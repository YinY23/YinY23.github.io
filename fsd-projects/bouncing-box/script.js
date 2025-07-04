(function () {
  
  // arrays for levels
  var sizearr = childrens("sizeBars", sizearr);
  var speedarr = childrens("speedBars", speedarr);
  var boxesarr =  childrens("boxBars", boxesarr);

  // length of the levels start
  const starter = sizearr.length;

  // buttons pregame
  divClicker("sizeDecrease", "click", handleSizeDecrease);
  divClicker("sizeIncrease", "click", handleSizeIncrease);
  divClicker("speedDecrease", "click", handleSpeedDecrease);
  divClicker("speedIncrease", "click", handleSpeedIncrease);
  divClicker("boxDecrease", "click", handleBoxDecrease);
  divClicker("boxIncrease", "click", handleBoxIncrease);
  divClicker("startButton", "click", handleStartButtonClick);

  // helper function to add event listeners
  function divClicker(idlabel, eventType, functioncall) {
    document.getElementById(idlabel).addEventListener(eventType, functioncall);
  }

  // makes an array containing all child elements of the parent element
  function childrens(parentElement, arr) {
    var arr = [];
    for (i = 0; i < document.getElementById(parentElement).children.length; i++) {
      arr.push(document.getElementById(parentElement).children[i]);
    }
    return arr;
  }

  // decreases the visual level indicator for the size difficulty
  function handleSizeDecrease() {
    if (sizearr.length > 1) {
      document.getElementById("sizeBars").removeChild(sizearr.pop());
    }
  }

  // increases the visual level indicator for the size difficulty
  function handleSizeIncrease() {
    if (sizearr.length < 5) {
      var temp = document.createElement("div");
      temp.classList.add("levels");
      document.getElementById("sizeBars").appendChild(temp);
      sizearr.push(temp);
    }
  }

  // decreases the visual level indicator for the speed difficulty
  function handleSpeedDecrease() {
    if (speedarr.length > 1) {
      document.getElementById("speedBars").removeChild(speedarr.pop());
    }
  }

  // increases the visual level indicator for the speed difficulty
  function handleSpeedIncrease() {
    if (speedarr.length < 5) {
      var temp = document.createElement("div");
      temp.classList.add("levels");
      document.getElementById("speedBars").appendChild(temp);
      speedarr.push(temp);
    }
  }

  // decreases the visual level indicator for the box difficulty
  function handleBoxDecrease() {
    if (boxesarr.length > 1) {
      document.getElementById("boxBars").removeChild(boxesarr.pop());
    }
  }

  // increases the visual level indicator for the box difficulty
  function handleBoxIncrease() {
    if (boxesarr.length < 5) {
      var temp = document.createElement("div");
      temp.classList.add("levels");
      document.getElementById("boxBars").appendChild(temp);
      boxesarr.push(temp);
    }
  }
  
  // start game button
  function handleStartButtonClick() {
    initialization(10, 3, 1/5);
  }
  
  // changes everything that can affect the game play (for the different modes)
  function initialization(tempThreshold, howManyClicksBeforeSpeedChange, speedChangePerthreshold) {
    $(".startScreen").css("display", "none");
    action = true;

    for (i = 0; i < boxesarr.length; i++) {
      addBoxes();
      document.getElementById(boxessarr[i].id).addEventListener("click", handleBoxClick);
      boxSize(boxessarr[i]);
      randomizeColor(boxessarr[i]);
      boxSpeed(boxessarr[i]);
    }

    threshold = tempThreshold;
    clicked = howManyClicksBeforeSpeedChange;
    speedFrame = speedChangePerthreshold;

    $(".auto").css("display", "flex");
    $(".main").css("display", "block");

    // every time the board is clicked, call the handleBoardClick function
    document.getElementById("board").addEventListener("click", handleBoardClick);

    // every time the navi bar is clicked, call the handleNaviClick function
    document.getElementById("navigation").addEventListener("click", handleNaviClick)
    
    updateInterval = setInterval(update, 1);
  }

  // width and height of the board (accessor only)
  var boardWidth = parseFloat(window.getComputedStyle(document.getElementById("board")).width);
  var boardHeight = parseFloat(window.getComputedStyle(document.getElementById("board")).height);
  var boardColor = window.getComputedStyle(document.getElementById("board")).backgroundColor;

  // be able to switch the handle clicks
  var action = false;

  var idk = 30;
  var points = 0; // points used for score and speed calculation
  var misClicks = 0; // amount of misclicks
  var threshold; // amount of misclicks for the game to end
  var clicked; // how many box clicks does it take before the speed changes
  var speedFrame; // speed change every clicked clicks
  
  var boxessarr = []; // array containing all of the boxes as objects

  var updateInterval; // updateInterval variable that is called

  // adds a box html element into the game and its associated object
  function addBoxes() {
    // actual html element of the box
    var tempBox = document.createElement("div");
    tempBox.classList.add("box", "box" + boxessarr.length);
    tempBox.id = "box" + boxessarr.length;
    document.getElementById("allbox").appendChild(tempBox);

    // object associated with the html element
    var uniqueBoxClass = {
      id: "box" + boxessarr.length,
      idSelector: "#box" + boxessarr.length,
      class: ".box" + boxessarr.length,
      side: parseInt(window.getComputedStyle(document.getElementById("box" + boxessarr.length)).width),
      positionX: validX(),
      positionY: validY(),
      color: "",
      speed: 0,
      velocityX: 0,
      velocityY: 0,
    };
    boxessarr.push(uniqueBoxClass)
  }

  // sets the box's side sizes
  function boxSize(id) { 
    var side = 30 * sizearr.length;
    $(id.idSelector).css("width", String(side) + "px");
    $(id.idSelector).css("height", String(side) + "px");
    id.side = parseFloat(window.getComputedStyle(document.getElementById(id.id)).width);
  }

  // creates and returns a valid 'left' for boxes
  function validX() {
    rngX = Math.random();
    
    for (i = 0; i < boxessarr.length; i++) {
      if (rngX * parseInt(boardWidth) + boxessarr[i].side >= boxessarr[i].positionX && rngX * parseInt(boardWidth) <= boxessarr[i].positionX + boxessarr[i].side) {
        i = -1;
        rngX = Math.random();
      }
      else {
        while (rngX >= 1 - ((sizearr.length * idk) / boardWidth)) {
          rngX = Math.random();
        }
      }
    }
    return rngX * parseInt(boardWidth);
  }

  // creates and returns a valid 'top' for boxes
  function validY() {
    rngY = Math.random();
    while (rngY >= 1 - ((sizearr.length * idk) / boardHeight) || rngY <= (parseFloat(window.getComputedStyle(document.getElementById("navigation")).height) + parseFloat(window.getComputedStyle(document.getElementById("navigation")).marginTop)) / boardHeight) {
      rngY = Math.random();
    }
    return rngY * parseInt(boardHeight)
  }

  // moves the Box to a new position on the screen
  function moveBoxTo(object, newPositionX, newPositionY) {
    $(object.idSelector).css("left", newPositionX);
    $(object.idSelector).css("top", newPositionY);
  }

  // gives the box a speed of speedInput
  function boxSpeed(id) {
    id.speed = speedarr.length * .5;
    id.velocityX = randomVelocity(id.speed);
    id.velocityY = randomVelocity(id.speed);
    
  }

  // gives the box a random velocity for the x and y direction
  function randomVelocity(number) {
    return (Math.round(Math.random()) === 0 ? -1 * number : 1 * number);
  }

  // randomizes the color of the selected html element
  function randomizeColor(id) {
    // color of the box
    var tempcol1 = parseInt(Math.random() * 256);
    var tempcol2 = parseInt(Math.random() * 256);
    var tempcol3 = parseInt(Math.random() * 256);

    while (tempcol1 === 255 && tempcol2 === 228 && tempcol3 === 196) {
      tempcol1 = parseInt(Math.random() * 256);
      tempcol2 = parseInt(Math.random() * 256);
      tempcol3 = parseInt(Math.random() * 256);
    }
    id.color = "rgb(" + tempcol1 + ", " + tempcol2 + ", " + tempcol3 + ")";
    $(id.idSelector).css("background-color", id.color);
  }

  // updates the boxes' location every millisecond
  function update() { // update box's side and then do stuff
    for (var i = 0; i < boxessarr.length; i++) {
      if (boxessarr[i].positionX + boxessarr[i].side > boardWidth || boxessarr[i].positionX < 0) {
        boxessarr[i].velocityX *= -1;
      }
      boxessarr[i].positionX += boxessarr[i].velocityX;

      // updates the object in the Y direction
      if (boxessarr[i].positionY + boxessarr[i].side > boardHeight || boxessarr[i].positionY < parseFloat(window.getComputedStyle(document.getElementById("navigation")).height) + parseFloat(window.getComputedStyle(document.getElementById("navigation")).marginTop)) {
        boxessarr[i].velocityY *= -1;
      }
      boxessarr[i].positionY += boxessarr[i].velocityY;

      moveBoxTo(boxessarr[i], boxessarr[i].positionX, boxessarr[i].positionY);
      if (document.getElementById("collideOn").checked) {
        collisions();
      }
    }
  }

  function collisions () {
    var cox = [];
    for (i = 0; i < boxessarr.length - 1; i++) {
      for (j = i + 1; j < boxessarr.length; j++) {
        if (((boxessarr[i].positionX + boxessarr[i].side) >= boxessarr[j].positionX) && ((boxessarr[i].positionY + boxessarr[i].side) >= boxessarr[j].positionY) && (boxessarr[i].positionX <= (boxessarr[j].positionX + boxessarr[j].side)) && (boxessarr[i].positionY <= (boxessarr[j].positionY + boxessarr[j].side))) {
          cox.push(i , j);
        }
      }
    }
    while (cox.length > 0) {
      if (Math.abs(boxessarr[cox[cox.length - 2]].positionX - boxessarr[cox[cox.length - 1]].positionX) > Math.abs(boxessarr[cox[cox.length - 2]].positionY - boxessarr[cox[cox.length - 1]].positionY)) {
        boxessarr[cox[cox.length - 2]].velocityX *= -1;
        boxessarr[cox[cox.length - 1]].velocityX *= -1;
      }
      else if (Math.abs(boxessarr[cox[cox.length - 2]].positionX - boxessarr[cox[cox.length - 1]].positionX) < Math.abs(boxessarr[cox[cox.length - 2]].positionY - boxessarr[cox[cox.length - 1]].positionY)) {
        boxessarr[cox[cox.length - 2]].velocityY *= -1;
        boxessarr[cox[cox.length - 1]].velocityY *= -1;
      }
      else {
        boxessarr[cox[cox.length - 2]].velocityX *= -1;
        boxessarr[cox[cox.length - 2]].velocityY *= -1;
        boxessarr[cox[cox.length - 1]].velocityX *= -1;
        boxessarr[cox[cox.length - 1]].velocityY *= -1;
      }
      cox.pop();
      cox.pop();
    }
  }

  // this function will be called each time the board is clicked
  function handleBoardClick() {
    if (action) {
      action = false;
      return;
    }
    $(".misses").text("Misses: " + (++ misClicks));
    accuracyUpdate();          
  }

  // if navi bar is clicked don't do anything else
  function handleNaviClick() {
    action = true;
  }

  // this function will be called each time the box is clicked
  function handleBoxClick() {
    // box clicked
    action = true;

    // the html element of the current object
    var object = boxessarr[this.id.substring(3)];

    // sets the position of the object to a random x and y position every click done on the box
    object.positionX = validX();
    object.positionY = validY();

    // adds a point and calculates speed
    if (++points % clicked === 0) {
      object.speed = Math.abs(object.speed) + speedFrame;
      object.velocityX = randomVelocity(object.speed); // changes the velocity of the box after changing the speed and position
      object.velocityY = randomVelocity(object.speed); // changes the velocity of the box after changing the speed and position
      for (i = 0; i < boxessarr.length; i++) { // changes the speed of the other boxes
        boxessarr[i].speed = object.speed;
        console.log(boxessarr[i].speed);
        boxessarr[i].velocityX = (Math.abs(boxessarr[i].velocityX) / boxessarr[i].velocityX) * boxessarr[i].speed;
        boxessarr[i].velocityY = (Math.abs(boxessarr[i].velocityY) / boxessarr[i].velocityY) * boxessarr[i].speed;
      }
    }
    console.log(object.speed);

    // randomizes the color of the box
    randomizeColor(object);

    // score element
    $(".score").text("Score: " + points);
    accuracyUpdate();
  }
  
  // updates the accuracy element
  function accuracyUpdate() {
    $(".accuracy").text("Accuracy: " + (Math.round(10000 * (points / (points + misClicks)))) / 100 + "%");
    if (misClicks >= threshold) {
      endGame();
    }
  }

  // ends the game after a certain amount of misclicks
  function endGame() {
    clearInterval(updateInterval);
    document.getElementById("board").removeEventListener("click", handleBoardClick);
    $(".endScreen").css("display", "block");
    $(".endScreen").css("top", ((boardHeight - parseFloat(window.getComputedStyle(document.getElementById("endScreen")).height)) / 2));
    $(".endScreen").css("left", ((boardWidth - parseFloat(window.getComputedStyle(document.getElementById("endScreen")).width)) / 2));
    document.getElementById("endButton").addEventListener("click", handleEndButton);
  }

  // function call when endButton button is clicked
  function handleEndButton() {
    $(".main").css("display", "none");
    $(".auto").css("display", "none");
    $(".endScreen").css("display", "none");
    
    // resets the data of the game
    points = 0;
    misClicks = 0;
    $(".score").text("Score: 0");
    $(".misses").text("Misses: 0");
    $(".accuracy").text("Accuracy: n/a");

    // changes everything back to the default settings
    levelsReset(starter);

    $(".startScreen").css("display", "flex");
  }

  // sets the difficulty to the default mode
  function levelsReset(start) {
    while (sizearr.length !== start) {
      if (sizearr.length > start) {
        handleSizeDecrease();
      }
      else if (sizearr.length < start) {
        handleSizeIncrease();
      }
    }
    while (speedarr.length !== start) {
      if (speedarr.length > start) {
        handleSpeedDecrease();
      }
      else if (speedarr.length < start) {
        handleSpeedIncrease();
      }
    }
    while (boxesarr.length !== 1) {
      handleBoxDecrease();
    }
    while (boxessarr.length !== 0) {
      var ele = boxessarr.pop();
      document.getElementById("allbox").removeChild(document.getElementById(ele.id));
    }
    $("#collideOff").prop("checked", "checked");
  }

})();