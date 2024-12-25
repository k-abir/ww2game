let europeMap;
let countries = [
  { name: "Germany", x: 500, y: 300, color: "red" },
  { name: "France", x: 450, y: 320, color: "blue" },
  { name: "UK", x: 400, y: 250, color: "green" },
  { name: "Italy", x: 550, y: 400, color: "orange" },
  { name: "Soviet Union", x: 650, y: 200, color: "purple" },
];

let startMenu = true;
let mapOffsetX = 0;
let mapOffsetY = 0;
let dragging = false;
let dragStartX, dragStartY;

function preload() {
  // Preload the map of Europe (replace with a valid hosted image URL)
  europeMap = loadImage("EuropeMap.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Initial render
}

function draw() {
  if (startMenu) {
    drawStartMenu();
  } else {
    drawMap();
  }
}

function drawStartMenu() {
  background(50);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Welcome to the WWII Game!", width / 2, height / 3);

  fill(100, 200, 100);
  rectMode(CENTER);
  rect(width / 2, (2 * height) / 3, 200, 60);

  fill(255);
  textSize(24);
  text("Start", width / 2, (2 * height) / 3);
}

function drawMap() {
  background(0, 92, 230); // Set the background to blue

  push();
  translate(mapOffsetX, mapOffsetY);
  image(europeMap, 0, 0, europeMap.width, europeMap.height);

  // Highlight participating countries
  for (let country of countries) {
    fill(country.color);
    noStroke();
    ellipse(country.x, country.y, 50, 50); // Highlight country with a circle
    fill(255);
    textSize(14);
    textAlign(CENTER);
    text(country.name, country.x, country.y + 30); // Add country label
  }
  pop();
}

function mousePressed() {
  if (startMenu) {
    // Check if Start button is clicked
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > (2 * height) / 3 - 30 &&
      mouseY < (2 * height) / 3 + 30
    ) {
      startMenu = false;
      loop();
    }
  } else {
    dragging = true;
    dragStartX = mouseX - mapOffsetX;
    dragStartY = mouseY - mapOffsetY;

    // Check if any country is clicked
    for (let country of countries) {
      let d = dist(mouseX - mapOffsetX, mouseY - mapOffsetY, country.x, country.y);
      if (d < 25) {
        alert(`You selected ${country.name}`);
      }
    }
  }
}

function mouseReleased() {
  dragging = false;
}

function mouseDragged() {
  if (!startMenu && dragging) {
    mapOffsetX = mouseX - dragStartX;
    mapOffsetY = mouseY - dragStartY;
    loop(); // Re-render the map while dragging
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (!startMenu) {
    loop();
  }
}
