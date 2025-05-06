let noiseScale = 0.005;
let noiseOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
}

function draw() {
  fill(0, 10);
  rect(0, 0, width, height);

  let spacing = 60;
  let moonSize = 25;

  const colors = [
    [240, 230, 140],
    [200, 220, 240],
    [220, 200, 230],
    [230, 240, 220],
    [240, 220, 200],
  ];

  for (let y = spacing; y < height - spacing; y += spacing) {
    for (let x = spacing; x < width - spacing; x += spacing) {
      let randomColor = colors[floor(random(colors.length))];
      fill(randomColor[0], randomColor[1], randomColor[2], 150);

      let noiseVal = noise(
        x * noiseScale + noiseOffset,
        y * noiseScale + noiseOffset
      );
      let angle = map(noiseVal, 0, 1, -PI / 8, PI / 8);

      push();
      translate(x, y);
      rotate(angle);
      arc(0, 0, moonSize, moonSize, 0, PI, OPEN);
      pop();

      if (random() < 0.1) {
        fill(255, 255, 255, random(50, 150));
        ellipse(
          x + random(-spacing / 3, spacing / 3),
          y + random(-spacing / 3, spacing / 3),
          3,
          3
        );
      }
    }
  }

  noiseOffset += 0.0005;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
