var big = [];
var note = '';

function setup() {
  let canvas = createCanvas(2000, 800);

  canvas.parent('canvas');

  var ref = database.ref('drawings');
  ref.on('value', (data) => {
    const drawings = data.val();
    const keys = Object.keys(drawings);
    for (let i = 0; i < keys.length; i++) {
      showDrawing(keys[i]);
    }
  }, (err) => {
    console.log(err);
  });
}

function draw() {
  background(255);

  scale(0.3);
  
  for (let k = 0; k < big.length; k++) {
    if (k === big.length - 1) {
      // DO SMTHG
    }
    noStroke();
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
    square(big[k].location.x, big[k].location.y, 450);
    for (let i = 0; i < big[k].drawing.length; i++) {
      beginShape();
      stroke(0);
      strokeWeight(4);
      noFill();
      for (let j = 0; j < big[k].drawing[i].length; j++) {
        vertex(big[k].drawing[i][j].x + big[k].location.x, big[k].drawing[i][j].y + big[k].location.y);
      }
      endShape();
    }
  }
}

function showDrawing(key) {
  let ref = database.ref(`drawings/${key}`);
  ref.on('value', (data) => {
    let image = data.val();
    big.push(image);
  }, (err) => {
    console.log(err);
  });
}