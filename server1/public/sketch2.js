var drawing = [];
var currentPath = [];
var isDrawing = false;
var showNote = false;
var color = 'orange';

function setup() {
  // create new canvas with size of 450x450
  let canvas = createCanvas(450, 450);
  // save canvas in a <div> in index.html
  canvas.parent('canvas');

  // put conditions on the canvas to start or stop drawing
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);

  // set buttons to select the post-it color
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

  // set an undo button to remove the last wrong stroke
  let undo = select('#btn-undo');
  undo.mousePressed(() => {
    drawing.pop();
  })

  // set a done button to save the sketch when done
  let done = select('#btn-done');
  done.mousePressed(saveDrawing);
}

// to start a stroke
function startPath() {
  isDrawing = true;
  // always make an empty array when starting a new stroke
  currentPath = [];
  // save the stroke with the rest of the drawing
  drawing.push(currentPath);
}

// to end a stroke
function endPath() {
  isDrawing = false;
}

function draw() {
  // set background to white
  background(255);

  // check if currently drawing a stroke
  if (isDrawing) {
    const point = {
      x: mouseX,
      y: mouseY
    }
    // saves current point to the path
    currentPath.push(point);
  }

  // if the user chooses the post-it color, change fill color accordingly
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
    // creates a square as the post it
    square(0, 0, 450);
  }

  // to draw everything
  stroke(0);
  strokeWeight(4);
  noFill();
  // loop through the entire drawing
  for (let i = 0; i < drawing.length; i++) {
    // start connecting the points saved
    beginShape();
    for (let j = 0; j < drawing[i].length; j++) {
      vertex(drawing[i][j].x, drawing[i][j].y);
    }
    // end the connection
    endShape();
  }
}

// save the drawing to Firebase Realtime Database
function saveDrawing() {
  // check if the user have drawn/written anything on the post it
  if (drawing.length > 0) {
    const ref = database.ref('drawings');
    // saves the color of the post it, all the points in the drawing, 
    // and the random location on the big moodboard later on
    const data = {
      color,
      drawing,
      location: {
        x: Math.round(Math.random() * 2000),
        y: Math.round(Math.random() * 2000)
      }
    }
    // saves the new data to Firebase
    ref.push(data, (err, res) => {
      if (err) {
        console.log('ERROR!');
      } else {
        console.log('SUCCESS');
        window.location.href="thanks.html";
      }
    });
  }
}