let europeMap;
let countries = [
  { name: "Germany", x: 500, y: 300, color: "red" },
  { name: "France", x: 450, y: 320, color: "blue" },
  { name: "UK", x: 400, y: 250, color: "green" },
  { name: "Italy", x: 550, y: 400, color: "orange" },
  { name: "Soviet Union", x: 650, y: 200, color: "purple" },
];

function preload() {
  // Preload the map of Europe (replace with a valid hosted image URL)
  europeMap = loadImage(
    "EuropeMap.jpg"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Draw only once unless interaction occurs
}

function draw() {
  background(0, 92, 230); // Set the background to blue

  // Draw the map
  image(europeMap, 0, 0, windowWidth, windowHeight);

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
}

function mousePressed() {
  // Check if the mouse is clicked near any country
  for (let country of countries) {
    let d = dist(mouseX, mouseY, country.x, country.y);
    if (d < 25) {
      alert(`You selected ${country.name}`);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
