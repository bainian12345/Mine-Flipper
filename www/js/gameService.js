app.service('gameService', function() {
	var MINES = 6,
		ROWS = 5,
		COLS = 5,
		GOOD_GRIDS = ROWS * COLS - MINES;
	this.aiBoard = [];

	function initSums(length) {
		var sums = new Array(length);
		for (var i = 0; i < length; i++) {
			sums[i] = {values: 0, mines: 0};
		}
		return sums;
	}

	this.startGame = function(board) {
		var mine_positions = {};
		for (var i = 0, num; i < MINES; i++) {
			while (!num || mine_positions[num - 1]) {
				num = Math.ceil(Math.random() * ROWS * COLS);
			}
			mine_positions[num - 1] = true;
		}
		board = {
			grids: new Array(ROWS),
			hSums: initSums(ROWS),
			vSums: initSums(COLS),
			playerTurn: 1,
			playerPoints: [0, 0],
			winner: null
		};
		for (var row = 0, count = 0; row < ROWS; row++) {
			board.grids[row] = new Array(COLS);
			for (var col = 0, cell; col < COLS; col++) {
				cell = {flippedBy: 0}
				if (mine_positions[count]) {
					cell.value = 0; // 0 represents a mine
					board.hSums[row].mines++;
					board.vSums[col].mines++;
				}
				else if (Math.random() < (15 / GOOD_GRIDS)) cell.value = 1;
				else if (Math.random() < (17 / GOOD_GRIDS)) cell.value = 2;
				else cell.value = 3;
				cell.row = row;
				cell.col = col;
				count++;
				board.grids[row][col] = cell;
				board.hSums[row].values += cell.value;
				board.vSums[col].values += cell.value;
			}
		}
		return board;
	};

	this.flip = function(board, cell) {
		var turn = board.playerTurn;
		if (!cell || cell.flippedBy || board.winner || !turn) return;
		if (cell.value === 0) board.winner = (turn === 1) ? 2 : 1;
		board.grids[cell.row][cell.col].flippedBy = turn;
		board.playerPoints[turn - 1] += cell.value;
		board.playerTurn = (turn === 1) ? 2 : 1;
	}
});