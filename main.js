const var backgroundColor = color(0,92,230);

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(backgroundColor);
    text("put your p5.js code here",10, frameCount % height);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
