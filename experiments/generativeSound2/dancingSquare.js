let circle = { x: 0, y: 0, size: 40 };
let romb = { x: 0, y: 0, size: 60, rotation: 0, shake: 0 };
let oscillators = [];
let playing = false;
let currentNote = 0;

// C4, D4, E4, G4, A4
const notes = [262, 294, 330, 392, 440]; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Center the romb
  romb.x = width / 2;
  romb.y = height / 2;
  
  // oscillator in p5
  for (let i = 0; i < notes.length; i++) {
    let osc = new p5.Oscillator('sine');
    osc.amp(0.2);
    oscillators.push(osc);
  }
}

function drawRomb(x, y, size, rotation, shake) {
  push();
  translate(x + random(-shake, shake), y + random(-shake, shake));
  rotate(rotation);
  
  noFill();
  strokeWeight(5);
  stroke('#FF6B6B');
  
  beginShape();
  vertex(0, -size/2);
  vertex(size/2, 0);
  vertex(0, size/2);
  vertex(-size/2, 0);
  endShape(CLOSE);
  
  pop();
}

function playMelody(proximity) {
  if (proximity < 200 && !playing) {
    oscillators[currentNote].freq(notes[currentNote]);
    oscillators[currentNote].start();
    playing = true;
    currentNote = (currentNote + 1) % notes.length;
  } else if (proximity >= 200 && playing) {
    oscillators.forEach(osc => osc.stop());
    playing = false;
  }
}

function draw() {
  background(240);
  
  // to follow mouse
  circle.x = mouseX;
  circle.y = mouseY;
  
  // you calculate the distance between romb and circle
  let d = dist(circle.x, circle.y, romb.x, romb.y);
  
  // romb's shaking based on proximity
  romb.shake = map(constrain(200 - d, 0, 200), 0, 200, 0, 10);
  
  //Size and rotation of romb changes accord. to proximity
  let sizeFactor = map(constrain(200 - d, 0, 200), 0, 200, 1, 1.3);
  let rotationSpeed = map(constrain(200 - d, 0, 200), 0, 200, 0.01, 0.05);
  romb.rotation += rotationSpeed;
  

  drawRomb(romb.x, romb.y, romb.size * sizeFactor, romb.rotation, romb.shake);
  
  fill('#DE3163');
  noStroke();
  ellipse(circle.x, circle.y, circle.size);
  

  playMelody(d);
}

function mousePressed() {

  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  romb.x = width / 2;
  romb.y = height / 2;
}
