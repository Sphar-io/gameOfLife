//initializes vars
var canvas, ctx, gamePaused, width, height, gameMode, genCount, mouseOverCanvas, mouseDown, fillAmount;

//initializes variables
function load(){
		canvas = document.getElementById("canvasA");
		ctx = canvas.getContext("2d");
		canvas.width = Math.floor(.90*window.innerHeight);
		canvas.height = Math.floor(.90*window.innerHeight);
		gamePaused=true;
}

//every time this is called it re-initializes grid, creating empty arrays. outer array(gen[i]) is columns, inner(gen[i][j]) is rows;
function initializeGrid() {
	genA = [[]];
	genB = [[]];
	for (var i = 0; i < width; i++) {
		genA[i] = [];
		genB[i] = [];
	}
}

//fills grid based on fill amount. Higher amount = more fill.
function fillRandom(){
	//converts to a decimal
	var amount = (100-fillAmmount)/100;
	for(var i = 0 ; i < genA.length; i++){
		for(var j = 0 ; j < height; j++){
			(Math.random() > amount) ? genA[i][j] = 1 : genA[i][j] = 0;
		}
	}
}