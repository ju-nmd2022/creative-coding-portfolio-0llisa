let knots = [];
const numKnots = 8;
let oscillators = [];
let playing = false;
let lastSoundTime = 0;
const soundInterval = 5000;
let growing = true;
let currentNote = 0;

// C4, D4, E4, G4, A4
const notes = [262, 294, 330, 392, 440]; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // create oscillator for melody
  for (let i = 0; i < notes.length; i++) {
    let osc = new p5.Oscillator('sine');
    osc.amp(0.2);
    oscillators.push(osc);
  }
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  for (let i = 0; i < numKnots; i++) {
    knots.push({
      x: random(width),
      y: random(height),
      size: random(30, 80),
      rotation: random(TWO_PI),
      color: color(random(colors)),
      growthFactor: 1,
      prevGrowthFactor: 1
    });
  }
}

function drawCelticKnot(x, y, size, rotation, knotColor) {
  push();
  translate(x, y);
  rotate(rotation);
  
  noFill();
  strokeWeight(3);
  stroke(knotColor);
  
  beginShape();
  bezier(-size/2, -size/2, -size/4, -size, size/4, -size, size/2, -size/2);
  bezier(size/2, -size/2, size, -size/4, size, size/4, size/2, size/2);
  bezier(size/2, size/2, size/4, size, -size/4, size, -size/2, size/2);
  bezier(-size/2, size/2, -size, size/4, -size, -size/4, -size/2, -size/2);
  endShape();
  
  pop();
}

function playMelody(isGrowing) {
  if (isGrowing && !playing) {
    oscillators[currentNote].freq(notes[currentNote]);
    oscillators[currentNote].start();
    playing = true;
    currentNote = (currentNote + 1) % notes.length;
  } else if (!isGrowing && playing) {
    oscillators.forEach(osc => osc.stop());
    playing = false;
  }
}

function draw() {
  background(240);
  
  if (millis() - lastSoundTime >= soundInterval) {
    growing = !growing;
    playMelody(growing);
    lastSoundTime = millis();
  }
  
  for (let knot of knots) {
    let prevSize = knot.size * knot.prevGrowthFactor;
    
    if (growing) {
      knot.growthFactor = lerp(knot.growthFactor, 1.5, 0.05);
    } else {
      knot.growthFactor = lerp(knot.growthFactor, 0.7, 0.05);
    }
    
    let currentSize = knot.size * knot.growthFactor;
    
    if (currentSize > prevSize && growing) {
      playMelody(true);
    } else if (currentSize < prevSize && !growing) {
      playMelody(false);
    }
    
    knot.prevGrowthFactor = knot.growthFactor;
    knot.rotation += 0.01;
    knot.x += sin(frameCount * 0.02) * 0.5;
    knot.y += cos(frameCount * 0.02) * 0.5;
    
    drawCelticKnot(
      knot.x,
      knot.y,
      currentSize,
      knot.rotation,
      knot.color
    );
  }
}

function mousePressed() {
  // You start audio on click
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
  knots.push({
    x: mouseX,
    y: mouseY,
    size: random(30, 80),
    rotation: random(TWO_PI),
    color: color(random(colors)),
    growthFactor: 1,
    prevGrowthFactor: 1
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
