// Array to store country data
let countries = [];

function setup() {
  createCanvas(800, 600);
  noStroke();

  // Initialize countries with approximate vertices
  countries = [
    { name: "Norway", vertices: [[200, 50], [220, 60], [210, 100], [190, 90]], selected: false },
    { name: "Sweden", vertices: [[230, 70], [250, 80], [240, 120], [220, 110]], selected: false },
    { name: "Finland", vertices: [[260, 70], [280, 80], [270, 120], [250, 110]], selected: false },
    { name: "Iceland", vertices: [[100, 50], [130, 60], [120, 90], [90, 80]], selected: false },
    { name: "USSR", vertices: [[300, 50], [400, 60], [390, 150], [270, 140]], selected: false },
    { name: "Estonia", vertices: [[280, 140], [300, 150], [290, 170], [270, 160]], selected: false },
    { name: "Latvia", vertices: [[280, 170], [300, 180], [290, 210], [270, 200]], selected: false },
    { name: "Lithuania", vertices: [[280, 210], [300, 220], [290, 250], [270, 240]], selected: false },
    { name: "Poland", vertices: [[270, 240], [310, 250], [300, 300], [260, 290]], selected: false },
    { name: "Germany", vertices: [[240, 250], [260, 260], [250, 300], [230, 290]], selected: false },
    { name: "Czechoslovakia", vertices: [[230, 300], [250, 310], [240, 340], [220, 330]], selected: false },
    { name: "Hungary", vertices: [[240, 340], [260, 350], [250, 370], [230, 360]], selected: false },
    { name: "Denmark", vertices: [[220, 200], [230, 210], [220, 220], [210, 210]], selected: false },
    { name: "Netherlands", vertices: [[200, 250], [210, 260], [200, 270], [190, 260]], selected: false },
    { name: "Belgium", vertices: [[190, 270], [200, 280], [190, 290], [180, 280]], selected: false },
    { name: "Luxembourg", vertices: [[200, 280], [210, 290], [200, 300], [190, 290]], selected: false },
    { name: "Saarland", vertices: [[210, 290], [220, 300], [210, 310], [200, 300]], selected: false },
    { name: "Ireland", vertices: [[150, 220], [170, 230], [160, 260], [140, 250]], selected: false },
    { name: "UK", vertices: [[170, 200], [190, 210], [180, 240], [160, 230]], selected: false },
    { name: "France", vertices: [[180, 300], [220, 310], [210, 350], [170, 340]], selected: false },
    { name: "Switzerland", vertices: [[220, 310], [230, 320], [220, 340], [210, 330]], selected: false },
    { name: "Italy", vertices: [[230, 340], [250, 350], [240, 390], [220, 380]], selected: false },
    { name: "Andorra", vertices: [[160, 350], [170, 360], [160, 370], [150, 360]], selected: false },
    { name: "Spain", vertices: [[140, 370], [180, 380], [170, 420], [130, 410]], selected: false },
    { name: "Portugal", vertices: [[120, 380], [140, 390], [130, 420], [110, 410]], selected: false },
    { name: "Yugoslavia", vertices: [[260, 340], [280, 350], [270, 390], [250, 380]], selected: false },
    { name: "Albania", vertices: [[280, 350], [290, 360], [280, 380], [270, 370]], selected: false },
    { name: "Greece", vertices: [[290, 360], [310, 370], [300, 400], [280, 390]], selected: false },
    { name: "Turkey", vertices: [[310, 370], [350, 380], [340, 400], [300, 390]], selected: false },
    { name: "Bulgaria", vertices: [[300, 340], [320, 350], [310, 370], [290, 360]], selected: false },
    { name: "Romania", vertices: [[280, 310], [300, 320], [290, 350], [270, 340]], selected: false },
    { name: "Cyprus", vertices: [[350, 400], [360, 410], [350, 420], [340, 410]], selected: false }
  ];
}

function draw() {
  background(240);

  // Draw countries
  for (let country of countries) {
    if (country.selected) {
      fill(150, 200, 250); // Highlight selected
    } else {
      fill(200, 220, 240);
    }

    beginShape();
    for (let v of country.vertices) {
      vertex(v[0], v[1]);
    }
    endShape(CLOSE);

    // Display country names
    fill(0);
    textSize(10);
    let centroid = getCentroid(country.vertices);
    text(country.name, centroid[0], centroid[1]);
  }
}

function mousePressed() {
  // Check if the mouse is inside any country
  for (let country of countries) {
    if (isInsideCountry(mouseX, mouseY, country.vertices)) {
      country.selected = !country.selected; // Toggle selection
      if (country.selected) {
        distortShape(country.vertices); // Distort shape when selected
      } else {
        resetShape(country.vertices); // Reset shape when unselected
      }
    }
  }
}

// Check if the mouse is inside a polygon
function isInsideCountry(x, y, vertices) {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    let xi = vertices[i][0], yi = vertices[i][1];
    let xj = vertices[j][0], yj = vertices[j][1];

    let intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Distort the shape of a polygon
function distortShape(vertices) {
  for (let v of vertices) {
    v[0] += random(-10, 10); // Random distortion in x
    v[1] += random(-10, 10); // Random distortion in y
  }
}

// Reset the shape of a polygon to original (simple example)
function resetShape(vertices) {
  // This example doesn't store original shapes; distortions are permanent
}

// Get the centroid of a polygon
function getCentroid(vertices) {
  let x = 0, y = 0;
  for (let v of vertices) {
    x += v[0];
    y += v[1];
  }
  return [x / vertices.length, y / vertices.length];
}
