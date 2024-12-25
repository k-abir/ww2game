let europeMap;
let recoloredImage;
let mapOffsetX = 0;
let mapOffsetY = 0;
let dragging = false;
let dragStartX, dragStartY;

function preload() {
  // Load the Europe map
  europeMap = loadImage("EuropeMap.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  recoloredImage = createImage(europeMap.width, europeMap.height);
  recolorMap();
  noLoop();
}

function draw() {
  background(21, 88, 67); // Set background to dark green

  // Draw the recolored map
  push();
  translate(mapOffsetX, mapOffsetY);
  image(recoloredImage, 0, 0, europeMap.width, europeMap.height);
  pop();
}

function recolorMap() {
  europeMap.loadPixels();
  recoloredImage.loadPixels();

  let w = europeMap.width;
  let h = europeMap.height;
  let visited = new Array(w * h).fill(false);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = (x + y * w) * 4;
      if (!visited[index] && isBorderPixel(index, europeMap.pixels)) {
        // Flood-fill this region with a random color
        let randomColor = [random(255), random(255), random(255)];
        floodFill(x, y, randomColor, visited);
      }
    }
  }

  recoloredImage.updatePixels();
}

function isBorderPixel(index, pixels) {
  // Check if the pixel is part of a dark border
  let r = pixels[index];
  let g = pixels[index + 1];
  let b = pixels[index + 2];
  return r < 50 && g < 50 && b < 50; // Example threshold for a dark pixel
}

function floodFill(x, y, fillColor, visited) {
  let stack = [[x, y]];
  let w = europeMap.width;
  let h = europeMap.height;
  let targetColor = getColor(x, y, europeMap.pixels);

  while (stack.length > 0) {
    let [cx, cy] = stack.pop();
    let index = (cx + cy * w) * 4;

    if (cx < 0 || cy < 0 || cx >= w || cy >= h || visited[index]) continue;

    if (!colorsMatch(targetColor, getColor(cx, cy, europeMap.pixels))) continue;

    setColor(cx, cy, fillColor, recoloredImage.pixels);
    visited[index] = true;

    stack.push([cx + 1, cy]);
    stack.push([cx - 1, cy]);
    stack.push([cx, cy + 1]);
    stack.push([cx, cy - 1]);
  }
}

function getColor(x, y, pixels) {
  let index = (x + y * europeMap.width) * 4;
  return [pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]];
}

function setColor(x, y, color, pixels) {
  let index = (x + y * europeMap.width) * 4;
  pixels[index] = color[0];
  pixels[index + 1] = color[1];
  pixels[index + 2] = color[2];
  pixels[index + 3] = 255; // Fully opaque
}

function colorsMatch(c1, c2) {
  return abs(c1[0] - c2[0]) < 10 && abs(c1[1] - c2[1]) < 10 && abs(c1[2] - c2[2]) < 10;
}

function mousePressed() {
  dragging = true;
  dragStartX = mouseX - mapOffsetX;
  dragStartY = mouseY - mapOffsetY;
}

function mouseReleased() {
  dragging = false;
}

function mouseDragged() {
  if (dragging) {
    mapOffsetX = mouseX - dragStartX;
    mapOffsetY = mouseY - dragStartY;
    redraw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
