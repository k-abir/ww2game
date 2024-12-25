let europeMap;
let recoloredImage;

let mapOffsetX = 0;
let mapOffsetY = 0;
let dragging = false;
let dragStartX, dragStartY;

let countries = [
  { name: "Germany", color: [255, 0, 0], x: 500, y: 300, radius: 30 },
  { name: "France", color: [0, 0, 255], x: 450, y: 320, radius: 30 },
  { name: "UK", color: [0, 255, 0], x: 400, y: 250, radius: 30 },
  { name: "Italy", color: [255, 165, 0], x: 550, y: 400, radius: 30 },
  { name: "Soviet Union", color: [128, 0, 128], x: 650, y: 200, radius: 30 },
];

function preload() {
  // Load the Europe map for visual purposes
  europeMap = loadImage("EuropeMap.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(0, 92, 230); // Set background to blue

  // Draw the Europe map
  push();
  translate(mapOffsetX, mapOffsetY);
  image(europeMap, 0, 0, windowWidth*2, windowHeight*2);
  pop();

  // Draw and color countries
  for (let country of countries) {
    fill(country.color);
    noStroke();
    ellipse(country.x + mapOffsetX, country.y + mapOffsetY, country.radius * 2, country.radius * 2);
    fill(255); // White color for the country name
    textAlign(CENTER, CENTER);
    textSize(12);
    text(country.name, country.x + mapOffsetX, country.y + mapOffsetY);
  }
}

function mousePressed() {
  // Start dragging the map
  dragging = true;
  dragStartX = mouseX - mapOffsetX;
  dragStartY = mouseY - mapOffsetY;
}

function mouseReleased() {
  // Stop dragging
  dragging = false;

  // Check if any country was clicked
  for (let country of countries) {
    let d = dist(mouseX - mapOffsetX, mouseY - mapOffsetY, country.x, country.y);
    if (d < country.radius) {
      alert(`You selected ${country.name}`);
    }
  }
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
