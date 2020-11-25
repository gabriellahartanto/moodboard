const socket = io();

function setup() {
  createCanvas(200, 200);
  background(51);
}

function draw() {
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 36, 36);
}