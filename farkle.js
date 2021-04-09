var diceArr = [];
let score = 0;
let scoreBanked = false;
let rolled = false;
const players = [];
let turn = 0;

function initializeDice(){
	for(i = 0; i < 6; i++){
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
	document.querySelectorAll("img").forEach(img => img.classList.remove("transparent"));
	score = 0;
	rolled = false;
	updateDiceImg();
}

function pass(){
	if(players.length === 0){
		alert("Please create at least one player first.");
		return;
	}
	if(!rolled){
		alert("Please roll the die first");
		return;
	}
	if(!isFarkle()){
		for(let i=0; i<6;i++){
			if(diceArr[i].clicked === 0) diceArr[i].clicked=1;
		}
		bankScore();
	}
	alert(`Your score for this round (including the current dice) was ${score}`);
	players[turn].score += score;
	if(players[turn].score >= 10000){
		alert(`${players[turn].name} won the game!!! Refresh the screen to start a new game.`);
	}
	turn += 1;
	if(turn >= players.length) turn=0;
	console.log(turn, players)
	document.querySelector(".playerName").innerHTML = `Player: ${players[turn].name}`;
	document.querySelector(".playerScore").innerHTML = `Score: ${players[turn].score}`
	initializeDice();
}

/*Rolling dice values*/
function rollDice(){
	if(players.length === 0){
		alert("Please create at least one player first.");
		return;
	}
	for(let i=0;i<6;i++){
		if(diceArr[i].clicked === 1){
			alert("You have dice that have been selected but not banked. Please unselect them or bank them.");
			return;
		}
	}
	for(var i=0; i < 6; i++){
		if(diceArr[i].clicked === 0){
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
		}
	}
	scoreBanked = false;
	rolled = true;
	updateDiceImg();
	if(isFarkle()){
		alert("You got a Farkle :( You score 0, it's the next player's turn.");
		pass();
	}
}

function isFarkle(){
	let counts = {}
	for(let i = 0;i<6;i++){
		let {clicked, value} = diceArr[i];
		if(clicked !== 0) continue;
		if(value === 1 || value === 5) return false;
		if(!(value in counts)) counts[value] = 0;
		counts[value] += 1;
		if(counts[value] === 3) return false;
	}
	return true;
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg(){
	var diceImage;
	for(var i = 0; i < 6; i++){
		diceImage = "images/" +diceArr[i].value+".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
	document.querySelector(".score").innerHTML = String(score);
}

function diceClick(img){
	if(!rolled){
		alert("Please roll the die first");
		return;
	}
	var i = img.getAttribute("data-number");
	if(diceArr[i].clicked === 0){
		diceArr[i].clicked = 1;
		img.classList.add("transparent");
	}
	else if (diceArr[i].clicked === 1){
		diceArr[i].clicked = 0;
		img.classList.remove("transparent");
	}
}

function bankScore(){
	if(!rolled){
		alert("Please roll the die first");
		return;
	}
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
	scoreBanked = true;
}

function addPlayer(){
	const playerName = document.querySelector(".playerInput").value;
	if(!playerName || !playerName.length || playerName.length > 20){
		alert("Please enter a valid name for the player");
		return;
	}
	if(playerName.includes(">") || playerName.includes("(")){
		alert("No code injection!!!");
		return;
	}
	players.push({
		name: playerName,
		score: 0
	})
	if(players.length === 1){
		document.querySelector(".playerName").innerHTML = `Player: ${playerName}`;
		document.querySelector(".playerScore").innerHTML = "Score: 0";
		document.querySelector(".playerInfo").classList.remove("hidden");
	}
	document.querySelector(".playerInput").value = "";
}