//Draw "fish scales" pattern where space between elements, and thus pattern output, can be changed by the user.

//Challenges remaining : 
// 0) Print values and name of variable on sliders:
// 1) Slider for odd row starting position
// 2) Two buttons to select color for each row
// 3) Find a way to implement "tilted fisch scales" pattern
// 4) When click on canvas auto produce 2 random complementary colors for each row

var circles = []

var R = 80 ;

var resetButton;

//Sliders :
var sliderR;
var sliderLx;
var sliderLy;

var Lx={
  Lxmin:1,
  Lxmax:3,
  Lxstart: 2 
}

var Ly={
  Lymin:0.3,
  Lymax:1,
  Lystart: 1
}

var parameters = {
  colorOne: 'white',
  colorTwo: 'white',
  ncircles:145,
};

//tmp to manage event handling manually
var tmpLx;
var tmpLy;
var tic = 0;

class Circle {

  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.colFill = color(0);
    this.colStroke = color(255);
  }

  drawInsidePatterns(){
    //Motifs internes essais
    stroke(255);
    let n = 12 ;
    
    for(let i = 0 ; i < n ; i ++ ) {
      let angle  = PI/4 + (i/n) * 2 * PI ;
      let ax = cos(angle)  ;
      let ay = sin(-angle)  ;
      //line(this.x,this.y,this.x+ax,this.y+ay) ;
      
      for(let j = 0 ; j !=5 ; j++){
        strokeWeight(2+4*j/5);
        let rx = ax * (j/5) * (this.d/2) * 0.4 ;
        let ry = ay * (j/5) * (this.d/2) * 0.4 ;
        point(this.x + rx,this.y + ry);
      }
    }
    
  }
  show() {
    //Outer circle
    strokeWeight(2);
    stroke(this.colStroke);
    fill(this.colFill);
    circle(this.x, this.y, this.d);
    fill('white');
    circle(this.x, this.y , 0.09 * this.d ) ;
    
    //this.drawInsidePatterns();
  }
}

function isRowEven(row) {
  return (row % 2 == 0);
}

//Where a row of circle begins at x depending of row number
function giveXtoStart(row,lx) {
  if (isRowEven(row))
    x = 0;
  else {
    //Mettre un slider sur le décalage des rangées
    x = lx / 2;
  }
  return x;
}

//Attribute a color depending on i number (even or odd )
function giveColor(i) {
  if (isRowEven(i))
    return parameters.colorOne;
  else
    return parameters.colorTwo;
}

function giveColorRandom() {
  let i = int(random(0, 2));
  if (i == 0) return color(255, 0, 32);
  else return color(255, 0, 255);
}

function makeCircles(D){
    for(let i = 0 ; i != parameters.ncircles; i++){
     circles[i] = new Circle(0,0,D); 
    }
}

function updateCircles(D, lx , ly) {
 
  var row = 0;
  var x = 0;
  var y = 0;
  
  for (let i = 0; i != parameters.ncircles; i++) {

    circles[i].x = x ;
    circles[i].y = y ;
    circles[i].colInside = giveColor(row);

    if (x > width + 1.5 * D) {
      row = row + 1;
      x = giveXtoStart(row,lx);
      y = y + ly;
    } else {
      x = x + lx;
    }
  }
}

function showCircles() {
  //for ... of loop
  for (let Circle of circles) {
    Circle.show();
  }
}

function setup() {

  createCanvas(400, 400);
  
  resetButton = createButton("Reset");
  resetButton.mousePressed(resetParameters);
  
  sliderLx = createSlider(Lx.Lxmin, Lx.Lxmax, Lx.Lxstart,0.01);
  sliderLy = createSlider(Ly.Lymin, Ly.Lymax, Ly.Lystart,0.01);

  //Handling updateCircles with sliders
  tmpLx = Lx.Lxstart ;
  tmpLy = Ly.Lystart ;
  
  //Allocate memory for circles
  makeCircles(2 * R);
}

function printParametersToCanvas(lx,ly){
  //UI
  stroke(0);
  fill(241,196,15);
  textSize(16);
  strokeWeight(4);
  let stringLx = "x : " + lx ;
  let stringLy = "y : " + ly ;
  text(stringLx,10,395);
  text(stringLy,70,395);
}

function resetParameters(){
 // ???
}

function draw() {
  
  background(0);

  //diameter of circles
  var D = 2 * R;
  //space between circle centers in x direction
  var lx = sliderLx.value() * R ;
  //space between circle centers in y direction
  var ly = sliderLy.value() * R;

  //If sliders has moved, redraw/ Manual handling event system (deprecated but it works...) 
  if( lx != tmpLx || tic == 0 )  {
    updateCircles(D, lx , ly );
    tic = tic + 1 ;
    tmpLx = lx ;
  }
  if( ly != tmpLy || tic == 0 )  {
    updateCircles(D, lx , ly );
    tic = tic + 1 ;
    tmpLy = ly ;
  }
  
  //Always
  showCircles();
  printParametersToCanvas(sliderLx.value(),sliderLy.value());
  //print("number of init",tmpLx,lx, tic);
}