let circles = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255,217,112);

  const circleRadius = 20; // Increased circle radius
  const circleColors = ['#FF0072', '#FF177F', '#FF2E8C', '#FF4598', '#FF5CA5', '#FF74B2', '#FF8BBF','#FFA2CB','#FFB9D8','#FFD0E5'];
  const maxSpeed = 2;

  for (let i = 0; i < 500; i++) { // Increased number of circles
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
  background(255,217,112); // Clear the canvas with a gray background

  // Define a small area around the mouse cursor
  const hoverAreaSize = 100; // Increased hover area size
  const hoverAreaX = mouseX - hoverAreaSize / 2;
  const hoverAreaY = mouseY - hoverAreaSize / 2;

  for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];

    // Check if the circle is within the hover area
    if (circle.x >= hoverAreaX && circle.x <= hoverAreaX + hoverAreaSize &&
        circle.y >= hoverAreaY && circle.y <= hoverAreaY + hoverAreaSize) {
      // Draw the circle
      noStroke(); // Remove stroke
      fill(circle.color);
      ellipse(circle.x, circle.y, circle.radius, circle.radius);

      // Check if mouse is hovering over the circle
      const distanceToMouse = Math.sqrt(
        Math.pow(circle.x - mouseX, 2) + Math.pow(circle.y - mouseY, 2)
      );
      if (distanceToMouse <= circle.radius) {
        circle.exploding = true;
      }

      // Update the circle's position
      circle.x += circle.dx;
      circle.y += circle.dy;

      // Bounce off the edges
      if (circle.x + circle.radius > width || circle.x - circle.radius < 0) {
        circle.dx *= -1;
      }
      if (circle.y + circle.radius > height || circle.y - circle.radius < 0) {
        circle.dy *= -1;
      }
    }
  }
}