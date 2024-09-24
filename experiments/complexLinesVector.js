let numLines = 50; // Reduced the number of lines
let lines = [];
let angle = 0;
let radius = 300;
let centerX, centerY;
let noiseScale = 0.01;
let spiralRadius = 50;
let spiralAngle = 0;
let scrollOffset = 0;
let hoverY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 95, 115);
  stroke(0);
  noFill();
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  background(0, 95, 115);
  translate(centerX, centerY);
  
  // Update spiral angle based on mouse position
  spiralAngle += (mouseY - centerY) * 0.01;
  
  // Update scroll offset based on mouse position
  scrollOffset = map(mouseY, 0, height, -1000, 1000);
  
  // Update hover Y position
  hoverY = map(mouseY, 0, height, -radius, radius);
  
  // Clear the lines array to prevent accumulation
  lines = [];
  
  for (let i = 0; i < numLines; i++) {
    let x = radius * cos(angle + i * 0.1);
    let y = radius * sin(angle + i * 0.1);
    
    // Add Perlin noise to the line positions
    let noiseX = x + noise(i * noiseScale, angle * noiseScale) * 20;
    let noiseY = y + noise(i * noiseScale + 1000, angle * noiseScale) * 20;
    
    // Add vertical scrolling effect
    noiseY += sin(i * 0.1 + scrollOffset) * 50;
    
    // Scale lines based on hover Y position
    let lineWidth = map(hoverY, -radius, radius, 0.5, 5);
    let lineHeight = map(hoverY, -radius, radius, 50, 200);
    
    lines.push(new Line(noiseX, noiseY, angle + i * 0.1, lineWidth, lineHeight));
  }
  
  angle += 0.01;
  
  for (let i = 0; i < lines.length; i++) {
    lines[i].display();
  }
}

class Line {
  constructor(x, y, angle, width, height) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.width = width;
    this.height = height;
  }
  
  display() {
    strokeWeight(this.width);
    line(0, 0, this.x, this.y);
    
    // Add a color gradient to the lines based on their angle
    let hue = map(this.angle, 0, TWO_PI, 0, 360);
    let saturation = map(this.x, -radius, radius, 50, 100);
    let brightness = map(this.y, -radius, radius, 50, 100);
    stroke(color(hue, saturation, brightness));
  }
}