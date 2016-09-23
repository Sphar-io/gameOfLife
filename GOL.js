
//Canvas variables and operations
a_canvas = document.getElementById("a");
ctx = a_canvas.getContext("2d");
a_canvas.width = Math.floor(.80*window.innerHeight);
a_canvas.height = Math.floor(.80*window.innerHeight);

//Set constants
var paused = false;
var width = 100;
var height = 100;
var stepCount = 0;
var mouseIsDown = false;
var mouseOverCanvas = false;
//add variables for different "patterns"

//this decides gameMode
var gameMode = "conway";

//Left to right top to bottom storage of cells
function initialize() { //initializes 2d arrays to avoid pointer errors\
	curGen = [[]];
	nextGen = [[]];
	for (var i = 0; i < width; i++) {
		curGen[i] = [];
		nextGen[i] = [];
	}
}

function randomGrid(cutoff){ //Fills the grid with random 1s and 0s given a cutoff value for switching from 1 to 0 (higher is less dense)
	for (var i = 0; i < curGen.length; i++) {
		for (var j = 0; j < width; j++) {
			(Math.random()>cutoff) ? curGen[i][j] = 1 : curGen[i][j] = 0;
		}
	}
}

function draw(){
	for (var i = 0; i < curGen.length; i++) {
		for (var j = 0; j < curGen[i].length; j++) {
			var indx = ((a_canvas.width*j+i)*4);
			var alpha = 0;
			if(curGen[i][j]==1){
				alpha = 255;
			}
			data[indx+3] = alpha;	
		}
	}
	ctx.putImageData(canvasData,0,0);
}
//checks whether a cell lives or dies
function golStep(){ 
	for(var i=1; i <curGen.length-1; i++){ //This loops doesn't calculate outside edges, wrapping is done seperately
		for (var j = 1; j < curGen[i].length-1; j++) { 	
			var numNeighbors = 0;
			var curCell = curGen[i][j];

			numNeighbors += curGen[i-1][j-1]; //upper row
			numNeighbors += curGen[i-1][j]; 
			numNeighbors += curGen[i-1][j+1];
			numNeighbors += curGen[i][j-1]; // center row
			numNeighbors += curGen[i][j+1];
			numNeighbors += curGen[i+1][j-1]; //lower row
			numNeighbors += curGen[i+1][j];
			numNeighbors += curGen[i+1][j+1];

			nextGen[i][j] = checksLive(numNeighbors, curCell);			
		}
	}

	for (var i = 0; i < curGen.length-3; i++) { //Copies outside edges for wrapping
		nextGen[i][0] = curGen[i][height-3];
		nextGen[0][i] = curGen[height-3][i];
	}

		//swaps current to next gen. Add code to flip flop instead of copying
		var temp = curGen.slice(0);
		curGen = nextGen.slice(0);
		nextGen = temp.slice(0);
}

function checksLive(numNeighbors, curCell){
	if(gameMode=="conway"){
		if(curCell &&(numNeighbors==2 || numNeighbors ==3)){
			return 1;
		}
		if(!curCell && numNeighbors ==3){
			return 1;
		}
	}
	if(gameMode == "maze"){
		if(curCell &&(numNeighbors >= 1 && numNeighbors <= 5)){
			return 1;
		}
		if(!curCell && numNeighbors ==3){
			return 1;
		} 
	}
	return 0;
}

//button functions

function pausePage () {
	alert("I am paused");
	 paused = !paused;
	 if(paused){
	 	document.getElementById("pauseButton").value = "Unpause"
	 }else{
	 	document.getElementById("pauseButton").value = "Pause"
	 }
	 console.log(paused);
}

function generateRandom(){
	var val = document.getElementById("randomRange").value;
	randomGrid(val);
	draw();
	document.getElementById("sliderId").innerHTML = (Math.floor(val*100) + "% fill");
}


function stepButton(){
	golStep();
	draw();
	stepCount++;
	console.log(stepCount);
}

function changeGameMode(){

	if(document.getElementById("conwayMode").checked){
		gameMode="conway"
	}
	if(document.getElementById("mazeMode").checked){
		gameMode="maze"
	}
	generateRandom();
	console.log(gameMode);
}

function changeSize(){
	canvasData = ctx.createImageData(a_canvas.width, a_canvas.height);
	data = canvasData.data;
	var val = document.getElementById("sizeRange").value;
	document.getElementById("rangeText").innerHTML = (val + "% size");
	val = 100;
	val = val/100; //convert to decimal
	width = val*a_canvas.width;
	height = val*a_canvas.height;
	initialize();
	generateRandom();

}

//running sim

function tick() {
	if(!paused){
    golStep();
    draw();
    stepCount++;
    requestAnimationFrame(tick);
	}
	else{
		requestAnimationFrame(tick);
	}
}
changeSize();
tick();


a_canvas.addEventListener("mousemove", getPosition, false);
a_canvas.addEventListener("mousedown", dragChange, false);
a_canvas.addEventListener("mouseup", dragChange, false);
document.addEventListener("keydown", keypressCheck, false);

function getPosition(event)
{
  var x = event.pageX;
  var y = event.pageY;

  x -= a_canvas.offsetLeft;
  y -= a_canvas.offsetTop;

  if(x > width || y > height){
  	mouseOverCanvas = false;
  }else{
  	mouseOverCanvas = true;
  }
  if(mouseIsDown && mouseOverCanvas){
  	curGen[x][y] = 1;

  	draw();
  }
}

function dragChange(event){
	mouseIsDown = !mouseIsDown;
	paused = true;
}

function onCanvas (event) {
	mouseOverCanvas = !mouseOverCanvas;
}

function keypressCheck (event) {

	if(event.which == 80) { //space bar
		pausePage();
			console.log("hi");
	}
}

//add dat.gui