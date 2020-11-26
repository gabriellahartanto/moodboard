var drawing = [];
var currentPath = [];
var isDrawing = false;
var showNote = false;
var color = 'orange';

function setup() {
  let canvas = createCanvas(450, 450);
  canvas.parent('canvas');
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);

  let orange = select('#btn-orange');
  orange.mousePressed(() => {
    showNote = true;
    color = 'orange';
  });

  let green = select('#btn-green');
  green.mousePressed(() => {
    showNote = true;
    color = 'green';
  });

  let blue = select('#btn-blue');
  blue.mousePressed(() => {
    showNote = true;
    color = 'blue';
  });

  let red = select('#btn-red');
  red.mousePressed(() => {
    showNote = true;
    color = 'red';
  });

  let pink = select('#btn-pink');
  pink.mousePressed(() => {
    showNote = true;
    color = 'pink';
  });

  let done = select('#btn-done');
  done.mousePressed(saveDrawing);
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  background(255);

  if (isDrawing) {
    const point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }

  if (showNote) {
    noStroke();
    if (color === 'orange') {
      fill('#FF931E');
    } else if (color === 'green') {
      fill('#7AC943');
    } else if (color === 'blue') {
      fill('#3FA9F5');
    } else if (color === 'red') {
      fill('#FF1D25');
    } else if (color === 'pink') {
      fill('#FF7BAC');
    }
    square(0, 0, 450);
  }

  stroke(0);
  strokeWeight(4);
  noFill();
  for (let i = 0; i < drawing.length; i++) {
    beginShape();
    for (let j = 0; j < drawing[i].length; j++) {
      vertex(drawing[i][j].x, drawing[i][j].y);
    }
    endShape();
  }
}

function saveDrawing() {
  if (drawing.length > 0) {
    const ref = database.ref('drawings');
    // const rand = Math.round(Math.random() * 2000);
    const data = {
      color,
      drawing,
      location: {
        x: Math.round(Math.random() * 2000),
        y: Math.round(Math.random() * 2000)
      }
    }
    ref.push(data, (err, res) => {
      if (err) {
        console.log('ERROR!');
      } else {
        console.log('SUCCESS');
      }
    });
  }
}