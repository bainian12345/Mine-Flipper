app.controller('playController', function($scope, gameService) {
	$scope.buttons = [
		{
			text: "Restart",
			action: function() {
				$scope.game = gameService.getMultiGame(true);
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
	}
	$scope.game = gameService.getMultiGame(false);
	$scope.winner = function() {
		switch($scope.game.winner) {
			case 1: return "Player 1";
			case 2: return "Player 2";
			case 3: return "Tied";
			default: return;
		}
	};
});