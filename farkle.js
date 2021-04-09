var diceArr = [];
let score = 0;

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
}

/*Rolling dice values*/
function rollDice(){
	for(var i=0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	updateDiceImg();
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" +diceArr[i].value+".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img){
	var i = img.getAttribute("data-number");
	img.classList.toggle("transparent");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
	}
	else if (diceArr[i].clicked === 1){
		diceArr[i].clicked = 0;
	}
}

function bankScore(){
	const diceToProcess = {};
	for(let i=0;i<6;i++){
		let {clicked, value} = diceArr[i];
		if(clicked !== 1) continue;
		if(!(value in diceToProcess)) diceToProcess[value] = 0;
		diceToProcess[value] += 1;
		diceArr[i].clicked = 2;
	}
	for(let val in diceToProcess){
		
	}
}