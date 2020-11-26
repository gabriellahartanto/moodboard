var big = [];
// var drawing = [];
var note = '';

// function setup() {
//   let canvas = createCanvas(1000, 1000);

//   canvas.parent('canvas');

//   var ref = database.ref('drawings');
//   ref.on('value', (data) => {
//     const drawings = data.val();
//     const keys = Object.keys(drawings);
//     for (let i = 0; i < keys.length; i++) {
//       var li = createElement('li', '');
//       var ahref = createA('#', keys[i]);
//       ahref.mousePressed(showDrawing);
//       ahref.parent(li);
//       li.parent('list');
//     }
//   }, (err) => {
//     console.log(err);
//   });
// }

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
      setInterval(() => {
        scale(0.5 - 0.01);
      }, 5000);
    }
    noStroke();
    if (big[k].color === 'orange') {
      fill('orange');
    } else if (big[k].color === 'green') {
      fill('green');
    } else if (big[k].color === 'blue') {
      fill('blue');
    } else if (big[k].color === 'red') {
      fill('red');
    } else if (big[k].color === 'pink') {
      fill('pink');
    }
    square(big[k].location.x, big[k].location.y, 450);
    // console.log("THIS DRAWING", big[k].drawing)
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

// function showDrawing(key) {
//   let ref = database.ref(`drawings/${key}`);
//   ref.on('value', (data) => {
//     let image = data.val();
//     var drawing = [];
//     drawing = image.drawing;
//     big.push(drawing);
//     note = image.color;
//     console.log(drawing, note);
//   }, (err) => {
//     console.log(err);
//   });
// }

// function showDrawing() {
//   let key = this.html();
//   let ref = database.ref(`drawings/${key}`);
//   ref.on('value', (data) => {
//     let image = data.val();
//     drawing = image.drawing;
//     note = image.color;
//     console.log(drawing, note);
//   }, (err) => {
//     console.log(err);
//   });
// }

// drawing = {
//   location: image.rand,
//   sketch: []
// }

// big [ drawing []]