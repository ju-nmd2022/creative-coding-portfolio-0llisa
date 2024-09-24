let n = 190;
let dMin = 110;
let p = [];
let noiseScale = 0.02;
let colors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(94, 86, 90);
  angleMode(DEGREES);
  colors = [
    color(230, 200, 170), 
    color(255, 255, 220), 
    color(180, 220, 255), 
    color(200, 180, 255), 
    color(255, 150, 150), 
  ];
  for (let i = 0; i < n; i++) {
    p.push(new Particle(random(0, width), random(0, height))); 
  }
}

function draw() {
  noStroke();
  fill(69, 56, 100);

  for (let i = 0; i < n; i++) {
    p[i].update();
    p[i].draw();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.friction = 0.99;
    this.color = random(colors);
  }

  update() {
    let n = noise(noiseScale * this.x, noiseScale * this.y);
    this.vx = cos(radians(n * 360));
    this.vy = sin(radians(n * 360));
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(0, width);
      this.y = random(0, height);
      this.vx = random(-1, 1);
      this.vy = random(-1, 1);
    }
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, 8);
  }
}