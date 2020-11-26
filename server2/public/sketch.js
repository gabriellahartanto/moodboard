var big = [];
var note = '';
var hm = 2;
var stop = false;
var a = 0.0;
var s = 0.0;

function setup() {
  // creates new canvas for the big moodboard 2000x800
  let canvas = createCanvas(2000, 800);
  // save canvas in a <div> in index.html
  canvas.parent('canvas');

  // connects to Firebase to show the drawings
  var ref = database.ref('drawings');
  ref.on('value', (data) => {
    const drawings = data.val();
    // get each key (sketch/note) from drawings
    const keys = Object.keys(drawings);
    // for each sketch/note, show the drawing on the moodboard
    for (let i = 0; i < keys.length; i++) {
      showDrawing(keys[i]);
    }
  }, (err) => {
    console.log(err);
  });

  // if (!stop) {
    setInterval(() => {
      hm -= 0.6;
    }, 2000);
  // }
}

function draw() {
  // set background color to white
  background(255);

  // make the drawings smaller to fit in everything
  scale(0.3);
  
  // go through each user
  for (let k = 0; k < big.length; k++) {
    if (k === big.length - 1) {
      // DO SMTHG

      // a = a + 0.04;
      // s = cos(a) * 2;
    
      // //Translate our rectangle from the origin to the middle of
      // //the canvas, then scale it with 's'
      // translate(width / 2, height / 2);
      // scale(s);

      let num = 1 * hm;
      console.log(num);
      if (num > 0.3) {
        // console.log('HA!');
        scale(num);
        stop = true;
      }
      
    }

    noStroke();
    // changes the color of the post-it accordingly
    if (big[k].color === 'orange') {
      fill('#FF931E');
    } else if (big[k].color === 'green') {
      fill('#7AC943');
    } else if (big[k].color === 'blue') {
      fill('#3FA9F5');
    } else if (big[k].color === 'red') {
      fill('#FF1D25');
    } else if (big[k].color === 'pink') {
      fill('#FF7BAC');
    }
    // makes a square as a post-it
    square(big[k].location.x + 500, big[k].location.y + 500, 450);
    // loop through each of the strokes in the drawing
    for (let i = 0; i < big[k].drawing.length; i++) {
      // start connecting the points
      beginShape();
      stroke(0);
      strokeWeight(4);
      noFill();
      for (let j = 0; j < big[k].drawing[i].length; j++) {
        // sets the drawing in a random position
        vertex(big[k].drawing[i][j].x + big[k].location.x + 500, big[k].drawing[i][j].y + big[k].location.y + 500);
      }
      // end connection
      endShape();
    }
  }
}

// takes data from the realtime databse
function showDrawing(key) {
  let ref = database.ref(`drawings/${key}`);
  // takes all the data for each key
  ref.on('value', (data) => {
    let image = data.val();
    // saves it to the 'big' board
    big.push(image);
  }, (err) => {
    console.log(err);
  });
}