app.controller('aiController', function($scope, gameService) {
	$scope.ai = true;
	$scope.buttons = [
		{
			text: "Restart",
			action: function() {
				$scope.game = gameService.getAiGame(true);
			}
		},
		{
			text: "Stop Flipping",
			action: function() {
				gameService.stopFlipping($scope.game);
			}
		}
	];

	$scope.flip = function(cell) {
		if ($scope.game.winner) return;
		gameService.flip($scope.game, cell);
		gameService.flip($scope.game, findBestCell($scope.game));
	}


	function findBestCell(game) {
		var board = game.board,
				hSums = game.hSums,
				vSums = game.vSums,
				bestCell;
		for (var row = 0, boardRow; row < board.length; row++) {
			boardRow = board[row];
			for (var col = 0,
							 hSum, vSum, hMines, vMines;
					col < boardRow.length; col++) {
				hSum = hSums[row].values;
				vSum = vSums[col].values;
				hMines = hSums[row].mines;
				vMines = vSums[col].mines;
				if (!boardRow[col].flippedBy) {
					if (!bestCell) bestCell = board[row][col];
					else {
						if ((hMines < hSums[bestCell.row].mines) || (vMines < vSums[bestCell.col].mines))
							bestCell = board[row][col];
						else if ((hMines === hSums[bestCell.row].mines && vMines === vSums[bestCell.col].mines) &&
										 (hSum > hSums[bestCell.row].values || vSum > vSums[bestCell.col].values))
							bestCell = board[row][col];
					}
				}
			}
		}
		return bestCell;
	}

	$scope.game = gameService.getAiGame(false);
	$scope.winner = function() {
		switch($scope.game.winner) {
			case 1: return "Player";
			case 2: return "AI";
			case 3: return "Tied";
			default: return;
		}
	};
});