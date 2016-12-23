app.controller('playController', function($scope, gameService) {

	$scope.startGame = function() {
		$scope.board = gameService.startGame(gameService.aiBoard);
	}

	$scope.flip = function(cell) {
		gameService.flip($scope.board, cell);
	}

	$scope.reveal = function() {
		gameService.board = ["1", "2"];
	};

	$scope.startGame(gameService.aiBoard);
});