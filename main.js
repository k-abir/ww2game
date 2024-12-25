let europeMap;
let regionMask; // Mask for determining country regions
let recoloredImage;

let mapOffsetX = 0;
let mapOffsetY = 0;
let dragging = false;
let dragStartX, dragStartY;

let countries = [
  { name: "Germany", color: [255, 0, 0] }, // Red
  { name: "France", color: [0, 0, 255] },  // Blue
  { name: "UK", color: [0, 255, 0] },      // Green
  { name: "Italy", color: [255, 165, 0] }, // Orange
  { name: "Soviet Union", color: [128, 0, 128] }, // Purple
];

function preload() {
  // Load the Europe map and region mask (grayscale image with unique colors for each country)
  europeMap = loadImage("EuropeMap.jpg");
  regionMask = loadImage("RegionMask.png"); // Create a grayscale mask
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  recolorMap(); // Process the map
}

function draw() {
  background(0, 92, 230); // Set background

  // Draw the map
  push();
  translate(mapOffsetX, mapOffsetY);
  image(recoloredImage, 0, 0, recoloredImage.width, recoloredImage.height);
  pop();
}

function recolorMap() {
  // Create a graphics buffer for the recolored map
  recoloredImage = createGraphics(regionMask.width, regionMask.height);

  // Load pixel data from the mask
  regionMask.loadPixels();
  recoloredImage.loadPixels();

  for (let y = 0; y < regionMask.height; y++) {
    for (let x = 0; x < regionMask.width; x++) {
      // Get pixel index
      let index = (x + y * regionMask.width) * 4;

      // Get the color from the region mask
      let r = regionMask.pixels[index];
      let g = regionMask.pixels[index + 1];
      let b = regionMask.pixels[index + 2];

      // Determine the country based on the mask color
      let country = countries.find(
        (c) => c.color[0] === r && c.color[1] === g && c.color[2] === b
      );

      if (country) {
        // Assign the country's color to the recolored image
        recoloredImage.pixels[index] = country.color[0];
        recoloredImage.pixels[index + 1] = country.color[1];
        recoloredImage.pixels[index + 2] = country.color[2];
        recoloredImage.pixels[index + 3] = 255; // Full opacity
      } else {
        // Default to transparent if no country matches
        recoloredImage.pixels[index + 3] = 0;
      }
    }
  }

  // Update pixels in the recolored image
  recoloredImage.updatePixels();
}

function mousePressed() {
  // Start dragging
  dragging = true;
  dragStartX = mouseX - mapOffsetX;
  dragStartY = mouseY - mapOffsetY;
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}

function mouseDragged() {
  if (dragging) {
    mapOffsetX = mouseX - dragStartX;
    mapOffsetY = mouseY - dragStartY;
    redraw(); // Update the canvas while dragging
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
