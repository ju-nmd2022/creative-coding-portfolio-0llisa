let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 217, 112);

  const circleRadius = 10;
  const circleColors = [
    "#FF0072",
    "#FF177F",
    "#FF2E8C",
    "#FF4598",
    "#FF5CA5",
    "#FF74B2",
    "#FF8BBF",
    "#FFA2CB",
    "#FFB9D8",
    "#FFD0E5",
  ];
  const maxSpeed = 5;

  for (let i = 0; i < 200; i++) {
    circles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: circleRadius,
      color: circleColors[Math.floor(Math.random() * circleColors.length)],
      dx: (Math.random() * 2 - 1) * maxSpeed,
      dy: (Math.random() * 2 - 1) * maxSpeed,
      exploding: false,
      explosionRadius: 0,
    });
  }
}

function draw() {
  background(255, 217, 112);

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    for (let j = i + 1; j < circles.length; j++) {
      const otherCircle = circles[j];
      const distance = Math.sqrt(
        Math.pow(circle.x - otherCircle.x, 2) +
          Math.pow(circle.y - otherCircle.y, 2)
      );
      if (distance <= circle.radius + otherCircle.radius) {
        circle.exploding = true;
        otherCircle.exploding = true;
      }
    }

    noStroke();

    if (circle.exploding) {
      fill(circle.color);
      ellipse(
        circle.x,
        circle.y,
        circle.explosionRadius,
        circle.explosionRadius
      );
      circle.explosionRadius += 2;

      if (circle.explosionRadius >= 100) {
        circle.exploding = false;
        circle.explosionRadius = 0;
        circle.radius = 0;
        circle.x = Math.random() * width;
        circle.y = Math.random() * height;
        circle.dx = (Math.random() * 2 - 1) * 5;
        circle.dy = (Math.random() * 2 - 1) * 5;
        circle.radius = 20;
      }
    } else {
      fill(circle.color);
      ellipse(circle.x, circle.y, circle.radius, circle.radius);
    }

    circle.x += circle.dx;
    circle.y += circle.dy;

    if (circle.x + circle.radius > width || circle.x - circle.radius < 0) {
      circle.dx *= -1;
    }
    if (circle.y + circle.radius > height || circle.y - circle.radius < 0) {
      circle.dy *= -1;
    }
  }
}
