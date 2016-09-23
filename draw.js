
document.addEventListener('DOMContentLoaded', function() {
	load();
}, false);

//creates objects for gui
function defaultValObj(){
	this.randomFill = 75;
	this.pause = function(){};
	this.regenerate = function(){pauseGame();};
	this.stepAnimation = function(){stepGame();};
	this.gameMode = 'Original';
	this.gameSize = 75;
	randomFillChange(this.randomFill);
	gameModeChange(this.gameMode);
	gameSizeChange(this.gameSize);
}

function generatePatterns(){
	this.acorn = function(){};
}
var gui;
//creates gui items
window.onload = function() {
	//create objects for gui
	var menu = new defaultValObj();
	var patterns = new generatePatterns();
	gui = new dat.GUI();
	//start adding to gui
	//Folder for simulation settings
	var f1 = gui.addFolder('Simulation Settings');
		f1.add(menu, 'gameMode', ['Original', 'Maze']).onChange(gameModeChange);
		f1.add(menu, 'randomFill', 0, 100).onChange(randomFillChange);
		f1.add(menu, 'gameSize', 0, 100).onChange(gameSizeChange);
		//subfolder for patterns
		var f1s1 = f1.addFolder('Example Patterns');
			f1s1.add(patterns, 'acorn');
	//folder for controls
	var f2 = gui.addFolder('Controls');
		f2.add(menu, 'pause');
		f2.add(menu, 'regenerate');
		f2.add(menu, 'stepAnimation');
	//end adding to gui


	//opens menus
	f1.open();
	f2.open();

	//call first tick of program after window is loaded
	update();
}

//functions when a value is changed
function gameModeChange(value){
	gameMode = value;
}

function randomFillChange(value){
	fillAmount = value;
}

function gameSizeChange(value){
	width = value;
	height = value;
	regenerateGame();
}

//functions when a button is pressed
function pauseGame(){
	gamePaused != gamePaused;
}

function regenerateGame(){
	stepCount = 0;
	canvasData = ctx.createImageData(canvas.width, canvas.height);
	data = canvasData.data;
}

function stepGame(){
	
}

function draw(){
	for (var i = 0; i < genA.length; i++) {
		for (var j = 0; j < genA[i].length; j++) {
			var index = ((a_canvas.width*j+i)*4);
			var alpha = 0;
			if(curGen[i][j]==1){
				alpha = 255;
			}
			data[indx+3] = alpha;	
		}
	}
	ctx.putImageData(canvasData,0,0);
}



//game step function
function update() {
  //Iterate over all controllers
	for (var i in gui.__controllers) {
		gui.__controllers[i].updateDisplay();
	}	

	if(!gamePaused){
		//other stuff
		requestAnimationFrame(update);
	}else {
		//try again
		requestAnimationFrame(update);
	}

}