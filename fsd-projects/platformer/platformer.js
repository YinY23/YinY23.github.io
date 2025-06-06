$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  var jump = 600;
  var easy_jump = 601;
  var bottom_screen = 740;
  var jump_height = 140;
  var jump_height_easy = 139
  //85 height of halle
  // 740 - 600 = 140 = halle's jump height
  
  // makes a wall that allows halle to "wall-jump"
  function walljumps(x, y, width) {
    createPlatform(x - 1, y, 0, 0); // left bottom "wall-jump"
    createPlatform(x - 1, y - 2, 0, 0); // left top "wall-jump"
    createPlatform(x, y - 85, width, 85, "yellow") // indicator
    createPlatform(x + 1 + width, y, 0, 0); // right bottom "wall-jump"
    createPlatform(x + 1 + width, y - 2, 0, 0); // right top "wall-jump"
  }

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // TODO 2 - Create Platforms

    //beginning

      // walls for the start
    createPlatform(0, 0, 8, bottom_screen);
    createPlatform(150, 200, 8, bottom_screen - 200);

    // wall jumps
    walljumps(150, easy_jump, 8);
    walljumps(0, easy_jump - jump_height_easy, 8);
    walljumps(150, easy_jump - (2 * jump_height_easy), 8);

    // TODO 3 - Create Collectables

    createCollectable("steve", 1350, 50);

    // TODO 4 - Create Cannons

    // initial cannons
    createCannon("top", 200, 3000);
    createCannon("top", 100, 4500);

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
