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
	const scoreTable = {
		1: 100,
		2: 0,
		3: 0,
		4: 0,
		5: 50,
		6: 0,
		"threeOfAKind":{
			1: 1000,
			2: 200,
			3: 300,
			4: 400,
			5: 500,
			6: 600
		}
	}
	const diceToProcess = {};
	for(let i=0;i<6;i++){
		let {clicked, value} = diceArr[i];
		if(clicked !== 1) continue;
		if(!(value in diceToProcess)) diceToProcess[value] = 0;
		diceToProcess[value] += 1;
		diceArr[i].clicked = 2;
	}
	for(let val in diceToProcess){
		let count = diceToProcess[val]
		while(count >= 3){
			score += scoreTable.threeOfAKind[val]
			count -= 3
		}
		score += count*scoreTable[val]
	}
	document.querySelector(".score").innerHTML = score;
}