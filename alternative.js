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

  const w = europeMap.width;
  const h = europeMap.height;
  const pixels = europeMap.pixels;
  const recoloredPixels = recoloredImage.pixels;

  let visited = new Uint8Array(w * h); // Efficient memory usage
  const queue = []; // Queue-based flood fill

  // Precompute the thresholded border pixels
  const borderPixels = new Set();
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = x + y * w;
      if (isBorderPixel(index, pixels)) {
        for (let i = -10; i <= 10; i++) {
          let nx = x + i;
          if (nx >= 0 && nx < w) {
            borderPixels.add((nx + y * w)); // Add 5 pixels into the border
          }
        }
      }
    }
  }

  // Perform flood fill
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = x + y * w;
      if (!visited[index] && !borderPixels.has(index)) {
        // Flood-fill this region with a random color
        let randomColor = [random(255), random(255), random(255)];
        floodFill(x, y, randomColor, visited, queue, w, h, pixels, recoloredPixels);
      }
    }
  }

  recoloredImage.updatePixels();
}

function isBorderPixel(index, pixels) {
  let r = pixels[index * 4];
  let g = pixels[index * 4 + 1];
  let b = pixels[index * 4 + 2];
  return r < 50 && g < 50 && b < 50; // Threshold for dark pixels
}

function floodFill(x, y, fillColor, visited, queue, w, h, pixels, recoloredPixels) {
  let targetColor = getColor(x, y, pixels);

  queue.push([x, y]);

  while (queue.length > 0) {
    let [cx, cy] = queue.pop();
    let index = cx + cy * w;

    if (cx < 0 || cy < 0 || cx >= w || cy >= h || visited[index]) continue;

    if (!colorsMatch(targetColor, getColor(cx, cy, pixels))) continue;

    setColor(cx, cy, fillColor, recoloredPixels);
    visited[index] = 1;

    // Queue neighbors (manual unrolling for better performance)
    if (cx + 1 < w) queue.push([cx + 1, cy]);
    if (cx - 1 >= 0) queue.push([cx - 1, cy]);
    if (cy + 1 < h) queue.push([cx, cy + 1]);
    if (cy - 1 >= 0) queue.push([cx, cy - 1]);
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
  return Math.abs(c1[0] - c2[0]) < 10 && Math.abs(c1[1] - c2[1]) < 10 && Math.abs(c1[2] - c2[2]) < 10;
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
