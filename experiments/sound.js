let circles = [];
const numCircles = 5;
let synth;
let started = false;
let startCircle;
let pulsing = false;
let pulseSize = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      baseSize: random(20, 50),
      noiseOffset: random(1000),
      prevSize: 0,
    });
  }

  startCircle = {
    x: width / 2,
    y: height / 2,
    baseSize: 100,
    color: color(178, 255, 158),
  };
}

function startAudio() {
  if (started) return;

  Tone.start().then(() => {
    synth = new Tone.Synth().toDestination();
    started = true;
  });
}

function draw() {
  background(255, 214, 255);

  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    let noiseVal = noise(circle.noiseOffset);
    let size = circle.baseSize + noiseVal * 30;

    fill(100, 150, 200, 150);
    ellipse(circle.x, circle.y, size, size);

    if (started && size > circle.prevSize) {
      let note = map(size, circle.baseSize, circle.baseSize + 30, "C4", "G4");
      synth.triggerAttackRelease(note, "8n");
    }

    circle.prevSize = size;
    circle.noiseOffset += 0.02;
  }

  // Searhced in Google
  if (pulsing) {
    pulseSize = sin(frameCount * 0.1) * 10;
  } else {
    pulseSize = 0;
  }

  fill(startCircle.color);
  ellipse(
    startCircle.x,
    startCircle.y,
    startCircle.baseSize + pulseSize,
    startCircle.baseSize + pulseSize
  );
}

function mouseMoved() {
  let d = dist(mouseX, mouseY, startCircle.x, startCircle.y);
  pulsing = d < startCircle.baseSize / 2;
}

function mousePressed() {
  let d = dist(mouseX, mouseY, startCircle.x, startCircle.y);
  if (d < startCircle.baseSize / 2) {
    startAudio();
  }
}
