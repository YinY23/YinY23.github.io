$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  var jump = 600, easy_jump = 601;
  var bottom_screen = 740;
  var jump_height = 140, jump_height_easy = 139;
  var halle_height = 100;

  // makes a wall that allows halle to "wall-jump"
  function walljumps(x, y, width) {
    createPlatform(x - 1, y, 0, 0); // left bottom "wall-jump"
    createPlatform(x - 1, y - 2, 0, 0); // left top "wall-jump"
    createPlatform(x, y - 85, width, 85, "yellow"); // indicator
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
    // toggleGrid();

    // TODO 2 - Create Platforms

    //beginning

    // walls for the start
    createPlatform(0, bottom_screen - 8 - 20, 150, 8);
    createPlatform(0, 0, 8, bottom_screen);
    createPlatform(150, 200, 8, bottom_screen - 200);

    // wall jumps at the start
    for (i = 0; i < 3; i++) {
      if (i % 2 === 0) {
        walljumps(150, easy_jump - (i * jump_height_easy), 8);
      }
      else {
        walljumps(0, easy_jump - (i * jump_height_easy), 8);
      }
    }
    
    // for loop replaced three lines of code :)
    // walljumps(150, easy_jump, 8);
    // walljumps(0, easy_jump - jump_height_easy, 8);
    // walljumps(150, easy_jump - 2 * jump_height_easy, 8);

    // after the beginning
    createPlatform(150, 200, 1150, 8); // top platform
    createPlatform(canvas.width - 8, 0, 8, bottom_screen); // right wall
    createPlatform(canvas.width - 150 - 8, 200 + halle_height, 8, bottom_screen - 200 - halle_height); // border wall

    // right border wall-jumps
    for (i = 0; i < 3; i++) {
      walljumps(canvas.width - 8, 200 + (i + 1) * jump_height_easy, 8);
    }
    
    createPlatform(canvas.width - 150, 200 + 1 * jump_height_easy, 10, 8); // ledge

    // end
    createPlatform(150, 700, 1250 - 150, 8); // base floor

    // individual floors
    for (i = 0; i < 4; i++) {
      createPlatform(300 + (i * 200), 750 - jump_height_easy, 100, 8);
    }

    // wall jumps
    for (i = 0; i < 5; i++) {
      walljumps(250 + (i * 200), 750 - (2 * jump_height_easy), 8);
    }
    
    // second floor
    for (i = 0; i < 5; i++) {
      createPlatform(250 + (i * 200), 750 - (3 * jump_height_easy), 100, 8);
    }

    // a little difficulty
    for (i = 0; i < 4; i++) {
      createPlatform(550 + (i * 200), 250, 8, 50);
    }

    // TODO 3 - Create Collectables

    createCollectable("steve", 1350, 50);
    createCollectable("diamond", 1350, 600);

    for (i = 0; i < 5; i++) {
      createCollectable("database", 250 + (i * 200), 650);
    }
    
    for (i = 0; i < 5; i++) {
      createCollectable("database", 300 + (i * 200), 250);
    }

    // TODO 4 - Create Cannons

    // bottom cannon
    createCannon("left", 666, 100);

    // initial cannons
    createCannon("top", 200, 3000);
    createCannon("top", 100, 4500);

    // top cannons
    for (i = 0; i < 6; i++) {
      createCannon("top", 300 + (i * 200), 5000);
    }

    // wall jump cannon
    createCannon("right", 650, 3000);

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
