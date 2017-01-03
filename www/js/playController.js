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
		gameService.flip($scope.game, cell);
	}
	$scope.game = gameService.getMultiGame(false);
});