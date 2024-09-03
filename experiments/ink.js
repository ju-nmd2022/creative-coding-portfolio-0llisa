let numCircles = 100;
let circles = [];

function setup() {
  createCanvas(1450, 1050);
  background(255, 71, 126);
  noStroke();
  fill(49, 46, 64);

  for (let i = 0; i < numCircles; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(10, 20);
    let variation = random(-10, 10);
    circles.push(new Circle(x, y, radius, variation));
  }
}

function draw() {
  background(255, 71, 126);
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].display();
  }
}

class Circle {
  constructor(x, y, radius, variation) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.variation = variation;
    this.angle = 0;
  }

  update() {
    this.angle += 0.01;
    this.radius += this.variation * sin(this.angle);
    this.radius = constrain(this.radius, 10, 70);
  }

  display() {
    ellipse(this.x, this.y, this.radius * 2);
  }
}