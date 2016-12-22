app.controller('playController', function($scope, gameService) {

	$scope.startGame = function() {
		$scope.board = gameService.startGame(gameService.aiBoard);
	}

	$scope.reveal = function() {
		gameService.board = ["1", "2"];
	};
});