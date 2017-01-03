app.controller('aiController', function($scope, gameService) {
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
		var bestCell;
		gameService.flip($scope.game, cell);
		bestCell = findBestCell($scope.game);
		gameService.flip($scope.game, bestCell);
	}

	function findBestCell(game) {
		var board = game.board,
				hSums = game.hSums,
				vSums = game.vSums,
				bestCell;
		for (var row = 0, boardRow; row < board.length; row++) {
			boardRow = board[row];
			for (var col = 0,
							 hSum = hSums[row].values,
							 vSum = vSums[col].values,
							 hMines = hSums[row].mines,
							 vMines = vSums[col].mines;
					col < boardRow.length; col++) {
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
});