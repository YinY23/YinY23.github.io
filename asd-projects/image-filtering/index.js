// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  applyFilter(decreaseBlue);
  applyFilter(increaseGreenByBlue);

  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (let r = 0; r < image.length; r++) {
    for (let c = 0; c < image[r].length; c++) {
      let pixel = image[r][c];
      let pixelArr = rgbStringToArray(pixel);

      filterFunction(pixelArr);

      let updatedPixel = rgbArrayToString(pixelArr);
      image[r][c] = updatedPixel;
    }
  }
}

// TODO 9 Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  let backgroundColor = image[0][0];
  for (let r = 0; r < image.length; r++) {
    for (let c = 0; c < image[r].length; c++) {
      let pixel = image[r][c];
      if (pixel !== backgroundColor) {
        let pixelarr = rgbStringToArray(pixel);
        filterFunction(pixelarr);
        let updatedpixel = rgbArrayToString(pixelarr);
        image[r][c] = updatedpixel;
      }
    }
  }
}

// TODO 6: Create the keepInBounds function
function keepInBounds(value) {
  value < 0 ? 0 : value > 255 ? 255 : value;
}

// TODO 4: Create reddify filter function
function reddify(pixelArray) {
  pixelArray[RED] = 200;
}

// TODO 7 & 8: Create more filter functions
function decreaseBlue(pixelArray) {
  pixelArray[BLUE] -= 50;
  keepInBounds(pixelArray[BLUE]);
}

function increaseGreenByBlue(pixelArray) {
  pixelArray[GREEN] += pixelArray[BLUE];
  keepInBounds(pixelArray[GREEN]);
}

// CHALLENGE code goes below here
