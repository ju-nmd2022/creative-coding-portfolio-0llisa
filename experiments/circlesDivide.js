let numCircles = 80;
let circles = [];
let moons = [];
let numMoons = 10;
const size = 10;
const divider = 110;
const numRows = 10;
const numCols = 10;
let lifespan = 100;
let timer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let xPos = x * divider;
      let yPos = y * divider;
      let col = color(random(255), random(255), random(255));
      let circle = new Circle(xPos, yPos, size, col);
      circles.push(circle);

      //moon element
      let moonX = xPos + random(-10, 10);
      let moonY = yPos + random(-10, 10);
      let moonCol = color(random(255), random(255), random(255));
      let moon = new Moon(moonX, moonY, size, moonCol);
      moons.push(moon);
    }
  }
}

function draw() {
  background(0);
  timer++;
  if (timer > lifespan) {
    timer = 0;
    circles = [];
    moons = [];
    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        let xPos = x * divider;
        let yPos = y * divider;
        let col = color(random(255), random(255), random(255));
        let circle = new Circle(xPos, yPos, size, col);
        circles.push(circle);

        let moonX = xPos + random(-10, 10);
        let moonY = yPos + random(-10, 10);
        let moonCol = color(random(255), random(255), random(255));
        let moon = new Moon(moonX, moonY, size, moonCol);
        moons.push(moon);
      }
    }
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
  }
  for (let i = 0; i < moons.length; i++) {
    moons[i].display();
  }

  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let col = color(random(255), random(255), random(255));
    fill(col);
    noStroke();
    ellipse(x, y, 2, 2);
  }
}
class Circle {
  constructor(x, y, radius, colour) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = colour;
  }

  display() {
    fill(this.colour);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

class Moon {
  constructor(x, y, radius, colour) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = colour;
  }

  display() {
    fill(this.colour);
    noStroke();
    push();
    translate(this.x, this.y);
    scale(this.radius / 10);
    beginShape();
    vertex(35, 25);
    bezierVertex(100, 5, 100, 85, 45, 70);
    bezierVertex(65, 65, 80, 25, 40, 25);
    endShape();
    pop();
  }
}
