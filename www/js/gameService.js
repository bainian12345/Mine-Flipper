app.service('gameService', function() {
	var MINES = 6,
		ROWS = 5,
		COLS = 5,
		GOOD_GRIDS = ROWS * COLS - MINES, 
		mine_positions = {};
	this.aiBoard = [];

	this.startGame = function(board) {
		for (var i = 0, num; i < MINES; i++) {
			while (!num || mine_positions[num - 1]) {
				num = Math.ceil(Math.random() * ROWS * COLS);
			}
			mine_positions[num - 1] = true;
		}
		if (!board.length) board = new Array(ROWS);
		for (var row = 0, count = 0, twoCount = 0, threeCount = 0; row < ROWS; row++) {
			if (!board[row] || !board[row].length) board[row] = new Array(COLS);
			for (var col = 0, cell; col < COLS; col++) {
				if (!(cell = board[row][col])) cell = {flipped: false};
				if (mine_positions[count]) cell.value = 0; // 0 represents a mine
				else if (Math.random() < (15 / GOOD_GRIDS)) cell.value = 1;
				else if (Math.random() < (17 / GOOD_GRIDS)) cell.value = 2;
				else cell.value = 3;
				cell.index = count;
				count++;
				board[row][col] = cell;
			}
		}
		console.log(board);
		return board;
	};
});