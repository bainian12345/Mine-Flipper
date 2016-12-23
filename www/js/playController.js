app.controller('playController', function($scope, gameService) {

	$scope.startGame = function() {
		$scope.game = gameService.startGame(gameService.multiGame);
	}

	$scope.flip = function(cell) {
		gameService.flip($scope.game, cell);
	}

	$scope.stopFlipping = function() {
		gameService.stopFlipping($scope.game);
	};
	$scope.startGame(gameService.multiGame);
});