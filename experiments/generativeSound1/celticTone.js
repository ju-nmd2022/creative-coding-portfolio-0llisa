let knots = [];
const numKnots = 8;
let audioContext;
let playing = false;
let lastSoundTime = 0;
const soundInterval = 5000;
let growing = true;
let currentNote = 0;
const notes = [261.63, 293.66, 329.63, 392.00, 440.00]; // C4, D4, E4, G4, A4
let buttonKnotIndex; 
let buttonActive = true; 

function setup() {
  createCanvas(windowWidth, windowHeight);

  // defining color for knots 
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];
  for (let i = 0; i < numKnots; i++) {
    knots.push({
      x: random(width),
      y: random(height),
      size: random(30, 80),
      rotation: random(TWO_PI),
      color: color(random(colors)),
      growthFactor: 1,
      prevGrowthFactor: 1,
    });
  }

  // The trgigger-button to start sound
  const buttonKnot = {
    x: width / 2,
    y: height / 2,
    size: 80,
    rotation: 0,
    color: color("#FF6B6B"), 
    growthFactor: 1,
    prevGrowthFactor: 1,
    isButton: true,
  };
  buttonKnotIndex = knots.length; 
  knots.push(buttonKnot);
}

function initAudio() {
  if (!audioContext) {
    try {
      
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log("AudioContext initialized successfully.");
      playing = true;
      buttonActive = false; // to disable button when starting the sound
    } catch (err) {
      console.error("Failed to initialize sound:", err);
    }
  } else {
    console.log("sound already initialized.");
  }
}

function playSound() {
  if (!audioContext || !playing) {
    console.warn("sound not initialized");
    return;
  }

  // Creating oscillator
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(notes[currentNote], audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

  oscillator.connect(gainNode).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.2); 

  console.log("Playing note:", notes[currentNote]);
  currentNote = (currentNote + 1) % notes.length;
}

function drawCelticKnot(x, y, size, rotation, knotColor, isFilled = false) {
  push();
  translate(x, y);
  rotate(rotation);
  if (isFilled) fill(knotColor);
  else noFill();
  strokeWeight(3);
  stroke(knotColor);
  beginShape();
  bezier(
    -size / 2, -size / 2,
    -size / 4, -size,
    size / 4, -size,
    size / 2, -size / 2
  );
  bezier(
    size / 2, -size / 2,
    size, -size / 4,
    size, size / 4,
    size / 2, size / 2
  );
  bezier(
    size / 2, size / 2,
    size / 4, size,
    -size / 4, size,
    -size / 2, size / 2
  );
  bezier(
    -size / 2, size / 2,
    -size, size / 4,
    -size, -size / 4,
    -size / 2, -size / 2
  );
  endShape();
  pop();
}

function draw() {
  background(240);

  // to play sound when knots are growing
  if (millis() - lastSoundTime >= soundInterval) {
    growing = !growing;
    if (growing) playSound(); // 
    lastSoundTime = millis();
  }

 //update knots
  for (let i = 0; i < knots.length; i++) {
    const knot = knots[i];
    const prevSize = knot.size * knot.prevGrowthFactor;
    knot.growthFactor = growing
      ? lerp(knot.growthFactor, 1.5, 0.05)
      : lerp(knot.growthFactor, 0.7, 0.05);

    const currentSize = knot.size * knot.growthFactor;
    knot.prevGrowthFactor = knot.growthFactor;
    knot.rotation += 0.01;
    knot.x += sin(frameCount * 0.02) * 0.5;
    knot.y += cos(frameCount * 0.02) * 0.5;

   
    const isButton = i === buttonKnotIndex && buttonActive;
    drawCelticKnot(
      knot.x,
      knot.y,
      currentSize,
      knot.rotation,
      knot.color,
      isButton // Fill the button knot
    );

    
    if (isButton) {
      push();
      fill(100, 149, 237);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(16);
      text("Start Audio", knot.x, knot.y);
      pop();
    }
  }
}

function mousePressed() {
  // Check if the button knot is clicked
  if (buttonActive) {
    const button = knots[buttonKnotIndex];
    const d = dist(mouseX, mouseY, button.x, button.y);
    if (d < button.size / 2) {
      initAudio();
      return;
    }
  }

  // to add a new knot by clicking on the screen
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];
  knots.push({
    x: mouseX,
    y: mouseY,
    size: random(30, 80),
    rotation: random(TWO_PI),
    color: color(random(colors)),
    growthFactor: 1,
    prevGrowthFactor: 1,
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
