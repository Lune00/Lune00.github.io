var circles = [];
var ncircles = 400;
var R = 50;
var D = 2 * R;

var randomColor = [255 , 255 ,255 ] ;
var complementaryColor =  [100 , 100 ,100 ] ;

class Circle {
  constructor(x = 0, y = 0, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.col = [255, 255 , 255 ];
  }
  show() {
    strokeWeight(3);
    stroke(0);
    fill(this.col[0],this.col[1],this.col[2]);
    circle(this.x, this.y, this.d);
    noFill();
    circle(this.x, this.y, 0.6 * this.d);
  }
}

function createCircles() {
  for (let i = 0; i < ncircles; i++) {
    circles[i] = new Circle(0, 0, D);
  }
  assignPositions();
}

function giveColor(i) {
  if (i % 2 == 0) {
    return randomColor; 
  }
  else {
    return complementaryColor;
  }
}

function assignPositions() {

  let row = 0;
  let colIndex = 0;
  let x = 0;
  let y = 0;
  let dx = R * cos(PI / 3);
  let dy = R * sin(PI / 3);

  for (let i = 0; i < circles.length; i++) {
    //Even row 
    if (row % 2 == 0) {

      //New row ?
      if (x > width + R) {
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


function applyRotation() {
  
  if(keyIsDown(LEFT_ARROW)) {
    rotatePattern(0);
  }
  
  if(keyIsDown(RIGHT_ARROW)) {
  rotatePattern(1);
  }
}

function rotatePattern(orientation) {
  
  let angle = PI/180 ;
    if(orientation == 0 ) {
      angle *= -1;
    }
  //Rotation center
  let xc = width / 2;
  let yc = height / 2;

  for (let i = 0; i != circles.length; i++) {
    let x = (circles[i].x - xc);
    let y = (circles[i].y - yc);
    circles[i].x = x * cos(angle) - y * sin(angle) + xc;
    circles[i].y = x * sin(angle) + y * cos(angle) + yc;
  }
}

function setup() {
  createCanvas(600, 400);
  createCircles();
}

function draw() {
  background(220);
  drawCircles();
  applyRotation();
}

function mousePressed(){
  changeColors();
  //Redraw with new colors
  assignPositions();
}

function changeColors(){
  randomColor = [ random(0,255), random(0,255), random(0,255) ] ;
  complementaryColor = getComplementaryColor(randomColor);
}
