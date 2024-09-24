let numLines=100;
let lines=[];
let angle=0;
let radius=300;
let centerX, centerY;

function setup(){
  createCanvas(windowWidth,windowHeight); 
  background(0, 95, 115);
  stroke(0);
  noFill();
  centerX=width/2;
  centerY=height/2;
}

function draw() {
  background(0, 95, 115);
  translate(centerX, centerY);
  for (let i = 0; i < numLines; i++) {
    let x = radius * cos(angle + i * 0.1);
    let y = radius * sin(angle + i * 0.1);
    lines.push(new Line(x, y, angle + i * 0.1));
  }
  angle += 0.01;
  for (let i = 0; i < lines.length; i++) {
    lines[i].display();
  }
  if (lines.length > numLines) {
    lines.splice(0, 1);
  }
}

class Line {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  display() {
    strokeWeight(0.5);
    line(0, 0, this.x, this.y);
    // Add a color gradient to the lines based on their angle.
    let hue = map(this.angle, 0, TWO_PI, 0, 360);
    let saturation = map(this.x, -radius, radius, 50, 100);
    let brightness = map(this.y, -radius, radius, 50, 100);
    stroke(color(hue, saturation, brightness));
  }
}