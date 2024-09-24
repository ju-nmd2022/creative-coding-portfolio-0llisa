function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    noStroke();
  
    // Set up the noise function
    noiseDetail(4, 0.5);
  }
  
  function draw() {
    background(0, 10); 
  
    // Define a color palette (you can customize this)
    let colors = [
      color('#0077B6'), // Blue
      color('#00B4D8'), // Light blue
      color('#90E0EF'), // Cyan
      color('#CAF0F8'), // Pale cyan
    ];
  
    // Draw the circles
    for (let i = 0; i < 200; i++) { // Increased circle count for density
      let x = map(noise(i * 0.02, frameCount * 0.005), 0, 1, 0, width); // Slower X movement
      let y = map(noise(i * 0.02 + 100, frameCount * 0.01), 0, 1, -height / 4, height * 1.2); // Start offscreen, flow downwards
      let size = map(noise(i * 0.02 + 200, frameCount * 0.01), 0, 1, 2, 8); // Smaller size variation
  
      // Pick a color from the palette
      let colorIndex = floor(map(noise(i * 0.02 + 300, frameCount * 0.01), 0, 1, 0, colors.length));
      fill(colors[colorIndex]);
  
      ellipse(x, y, size, size);
    }
  }