
const circles = [];
const ncircles = 500;
const R = 70;
const D = 2 * R;
const p5_ = new p5();

let randomColor = [255, 255, 255];
let complementaryColor = [100, 100, 100];

class Circle {
  constructor(x = 0, y = 0, d, sketch) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.col = [255, 255, 255];
    this.sketch = sketch;
  }
  show() {
    this.sketch.strokeWeight(3);
    this.sketch.stroke(0);
    this.sketch.fill(this.col[0], this.col[1], this.col[2]);
    this.sketch.circle(this.x, this.y, this.d);
    this.sketch.noFill();
    this.sketch.strokeWeight(2)
    this.sketch.circle(this.x, this.y, 0.8 * this.d);
  }
}

function createCircles(sketch) {
  for (let i = 0; i < ncircles; i++) {
    circles[i] = new Circle(0, 0, D, sketch);
  }
}

function giveColor(i) {
  if (i % 2 == 0) {
    return randomColor;
  } else {
    return complementaryColor;
  }
}

function buildPattern(sketch) {

  let row = 0;
  let colIndex = 0;
  let x = 0;
  let y = -200;
  const dx = R * Math.cos(sketch.PI / 3);
  const dy = R * Math.sin(sketch.PI / 3);

  for (let i = 0; i < circles.length; i++) {
    //Even row
    if (row % 2 == 0) {

      //New row ?
      if (x > sketch.width + R) {
        row = row + 1;
        x = x + dx;
        y = y + dy;
      }
    }
    //odd row
    else {

      //New row?
      if (x < -R) {
        row = row + 1;
        x = x + dx;
        y = y + dy;
        colIndex++;
      }
    }

    circles[i].x = x;
    circles[i].y = y;
    circles[i].col = giveColor(colIndex);

    //Even row or odd row ?
    if (row % 2 == 0)
      x = x + R;
    else
      x = x - R;

    colIndex++;
  }

}

function drawCircles() {
  //Assign position
  for (let i = 0; i != circles.length; i++) {
    circles[i].show();
  }
}


function applyRotation(sketch) {

  if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
    rotatePattern(-1, sketch);
  }

  if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
    rotatePattern(1, sketch);
  }
}

function rotatePattern(orientation, sketch) {

  const angle = orientation * sketch.PI / 180;
  //Rotation center
  let xc = sketch.width / 2;
  let yc = sketch.height / 2;

  for (let i = 0; i != circles.length; i++) {
    let x = (circles[i].x - xc);
    let y = (circles[i].y - yc);
    circles[i].x = x * sketch.cos(angle) - y * sketch.sin(angle) + xc;
    circles[i].y = x * sketch.sin(angle) + y * sketch.cos(angle) + yc;
  }
}



export default function demoVariation(sketch) {


  sketch.setup = function() {
    sketch.createCanvas(900, 600);
    createCircles(sketch);
    buildPattern(sketch);
  }

  sketch.draw = function() {
    sketch.background(220);
    drawCircles();
    applyRotation(sketch);
  }

}
