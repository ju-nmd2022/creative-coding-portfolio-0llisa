function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    noStroke();
  
    // Set up the noise function
    noiseDetail(4, 0.5);
  }
  
  function draw() {
    // Change background color here
    background(20, 40, 50, 10); // Dark gray with transparency
  
    // Define a color palette (you can customize this)
    let colors = [
      color('#0077B6'), // Blue
      color('#00B4D8'), // Light blue
      color('#90E0EF'), // Cyan
      color('#CAF0F8'), // Pale cyan
      color('#FFC107'), // Yellow
      color('#FF9800'), // Orange
      color('#FF6F00'), // Dark orange
      color('#FF5722'), // Deep orange
    ];
  
    // Draw the shapes
    for (let i = 0; i < 150; i++) { // Adjust the count for desired density
      let x = map(noise(i * 0.02, frameCount * 0.005), 0, 1, 0, width); 
      let y = map(noise(i * 0.02 + 100, frameCount * 0.01), 0, 1, -height / 4, height * 1.2);
      let size = map(noise(i * 0.02 + 200, frameCount * 0.01), 0, 1, 2, 12); 
  
      let shapeType = floor(map(noise(i * 0.02 + 300, frameCount * 0.01), 0, 1, 0, 3)); // 0: Circle, 1: Triangle, 2: Square
      let colorIndex = floor(map(noise(i * 0.02 + 400, frameCount * 0.01), 0, 1, 0, colors.length));
      fill(colors[colorIndex]);
  
      if (shapeType === 0) {
        ellipse(x, y, size, size);
      } else if (shapeType === 1) {
        let trianglePoints = [
          createVector(x, y - size / 2),
          createVector(x + size, y + size / 2),
          createVector(x - size, y + size / 2)
        ];
        triangle(trianglePoints[0].x, trianglePoints[0].y, trianglePoints[1].x, trianglePoints[1].y, trianglePoints[2].x, trianglePoints[2].y);
      } else if (shapeType === 2) {
        rect(x - size / 2, y - size / 2, size, size);
      }
    }
  }