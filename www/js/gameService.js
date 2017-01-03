app.service('gameService', function() {
	var MINES = 6,
		ROWS = 5,
		COLS = 5,
		GOOD_GRIDS = ROWS * COLS - MINES,
		multiGame, aiGame;

	function initSums(length) {
		var sums = new Array(length);
		for (var i = 0; i < length; i++) {
			sums[i] = {values: 0, mines: 0};
		}
		return sums;
	}

	function setWinner(game, winner) {
		game.board.forEach(function(row) {
			row.forEach(function(cell) {
				if (!cell.flippedBy) cell.flippedBy = true;
			});
		});
		game.winner = winner;
	}

	function decideWinner(game) {
		if (game.playerPoints[0] > game.playerPoints[1]) return 1;
		if (game.playerPoints[0] < game.playerPoints[1]) return 2;
		return 3;
	}

	function startGame() {
		var mine_positions = {}
				game = {
					board: new Array(ROWS),
					newestFlip: null,
					totalFlips: 0,
					hSums: initSums(ROWS),
					vSums: initSums(COLS),
					playerTurn: 1,
					playerPoints: [0, 0],
					stopped: null,
					winner: null
				};
		for (var i = 0, num; i < MINES; i++) {
			while (!num || mine_positions[num - 1]) {
				num = Math.ceil(Math.random() * ROWS * COLS);
			}
			mine_positions[num - 1] = true;
		}
		for (var row = 0, count = 0; row < ROWS; row++) {
			game.board[row] = new Array(COLS);
			for (var col = 0, cell; col < COLS; col++) {
				cell = {flippedBy: 0}
				if (mine_positions[count]) {
					cell.value = 0; // 0 represents a mine
					game.hSums[row].mines++;
					game.vSums[col].mines++;
				}
				else if (Math.random() < (15 / GOOD_GRIDS)) cell.value = 1;
				else if (Math.random() < (17 / GOOD_GRIDS)) cell.value = 2;
				else cell.value = 3;
				cell.row = row;
				cell.col = col;
				count++;
				game.board[row][col] = cell;
				game.hSums[row].values += cell.value;
				game.vSums[col].values += cell.value;
			}
		}
		return game;
	};

	this.getMultiGame = function(isNew) {
		if (!multiGame || isNew) multiGame = startGame(multiGame);
		return multiGame;
	};

	this.getAiGame = function(isNew) {
		if (!aiGame || isNew) aiGame = startGame(aiGame);
		return aiGame;
	};

	this.flip = function(game, cell) {
		var turn = game.playerTurn,
			stopped = game.stopped;
		if (!cell || cell.flippedBy || game.winner || !turn) return;
		game.board[cell.row][cell.col].flippedBy = turn;
		game.newestFlip = {row: cell.row, col: cell.col};
		if (cell.value === 0) {
			setWinner(game, (turn === 1) ? 2 : 1);
			return;
		}
		game.playerPoints[turn - 1] += cell.value;
		game.totalFlips++;
		if (ROWS * COLS - game.totalFlips <= MINES) setWinner(game, decideWinner(game));
		game.playerTurn = ((turn === 1 && stopped !== 2) || stopped === 1) ? 2 : 1;
		if (stopped && game.playerPoints[turn - 1] > game.playerPoints[stopped - 1]) setWinner(game, turn);
	};

	this.stopFlipping = function(game) {
		if (game.stopped) {
			setWinner(game, decideWinner(game));
			return;
		}
		if (game.playerTurn === 1 && game.playerPoints[0] < game.playerPoints[1]) {
			setWinner(game, 2);
			return;
		}
		if (game.playerTurn === 2 && game.playerPoints[0] > game.playerPoints[1]) {
			setWinner(game, 1);
			return;
		}
		game.stopped = game.playerTurn;
		game.playerTurn = (game.playerTurn === 1) ? 2 : 1;
	};
});