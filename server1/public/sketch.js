const socket = io();

function setup() {
  createCanvas(200, 200);
  background(51);
  
  socket.on('mouse', (data) => {
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 10, 10);
  });

  saveImageBtn = createButton("Save Canvas"); 
  saveImageBtn.position(150, 60); 
  saveImageBtn.mousePressed(() => save("output_canvas.png"));
}

function mouseDragged() {
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 10, 10);

  const data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);
}