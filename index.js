var state = { board: [], currentGame: [], savedGames: [], winnerGame: [] };

function start() {
	createBoard();
	newGame();
	renderSavedGames();
	handlePrize();
}

function createBoard() {
	state.board = [];

	for (var i = 1; i <= 68; i++) {
		state.board.push(i);
	}
}

function newGame() {
	resetGame();
	render();

	console.log(state.currentGame);
}

function render() {
	renderBoard();
	renderButtons();
	renderSavedGames();
}

function renderBoard() {
	var divBoard = document.querySelector("#megasena-board");
	divBoard.innerHTML = "";

	var ulNumbers = document.createElement("ul");
	ulNumbers.classList.add("numbers");

	ulNumbers.classList.add("number");

	for (var i = 0; i < state.board.length; i++) {
		var currentNumber = state.board[i];

		var liNumber = document.createElement("li");
		liNumber.textContent = currentNumber;
		liNumber.classList.add("number");

		liNumber.addEventListener("click", handleNumberClick);

		if (isNumberInGame(Number(currentNumber))) {
			liNumber.classList.add("selected-number");
		}

		ulNumbers.appendChild(liNumber);
	}

	divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
	var value = Number(event.currentTarget.textContent);

	if (isNumberInGame(value)) {
		removeNumberFromGame(value);
	} else {
		addNumber(value);
	}

	console.log(state.currentGame);
	render();
}

function renderButtons() {
	var divButtons = document.querySelector("#megasena-buttons");
	divButtons.innerHTML = "";

	var buttonNewGame = createNewGameButton();
	var buttonRandomGame = createRandomGameButton();
	var buttonSaveGame = createSaveGameButton();

	divButtons.appendChild(buttonNewGame);
	divButtons.appendChild(buttonRandomGame);
	divButtons.appendChild(buttonSaveGame);
}

function createRandomGameButton() {
	var button = document.createElement("button");
	button.textContent = "Random Game";

	button.addEventListener("click", randomGame);

	return button;
}

function createNewGameButton() {
	var button = document.createElement("button");
	button.textContent = "Novo jogo";

	button.addEventListener("click", newGame);

	return button;
}

function createSaveGameButton() {
	var button = document.createElement("button");
	button.textContent = "Salvar jogo";

	button.addEventListener("click", saveGame);

	return button;
}

function renderSavedGames() {}

function addNumber(numberToAdd) {
	if (numberToAdd < 1 || numberToAdd > 60) {
		console.error("Número inválido: ", numberToAdd);
		return;
	}
	if (state.currentGame.length >= 6) {
		console.error("O jogo já está completo");
		return;
	}

	if (isNumberInGame(numberToAdd)) {
		console.error("Este número já está no jogo: ", numberToAdd);
		return;
	}
	state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
	if (numberToRemove < 1 || numberToRemove > 60) {
		console.error("Número inválido: ", numberToRemove);
		return;
	}
	var newGame = [];

	for (var i = 0; i < state.currentGame.length; i++) {
		var currentNumber = state.currentGame[i];

		if (currentNumber === numberToRemove) {
			continue;
		}

		newGame.push(currentNumber);
	}
	state.currentGame = newGame;
}

function isNumberInGame(NumberToCheck) {
	return state.currentGame.includes(NumberToCheck);
}

function saveGame() {
	if (!isGameComplete()) {
		console.error("O jogo não está Completo!");
		return;
	}

	state.savedGames.push(state.currentGame);
	newGame();
	console.log(state.savedGames);
}

function isGameComplete() {
	return state.currentGame.length === 6;
}

function resetGame() {
	state.currentGame = [];
}

function randomGame() {
	resetGame();

	while (!isGameComplete()) {
		var randomNumber = Math.ceil(Math.random() * 60);
		addNumber(randomNumber);
		console.log(randomNumber);
	}
	console.log(state.currentGame);
}

function handlePrize() {
	randomGame();
	render();

	console.log(state.currentGame);
	var winner = state.currentGame.push(state.winnerGame);
	console.log(state.winnerGame);
	console.log(winner);

	if (state.currentGame === winner) {
		console.log("We have a Winner");
	}

	return;
}

start();
