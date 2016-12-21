app.controller('mainController', function($scope, $location) {
	$scope.clickme = function($event, page) {
		for (var i = 0; i < $scope.pages.length; i++) {
			$scope.pages[i].active = false;
		}
		page.active = true;
	};
	$scope.pages = [
		{"name": "Play", "href": "/", "active": true},
		{"name": "Solve", "href": "/#/solve", "active": false},
		{"name": "Rules", "href": "/#/rules", "active": false}
	];
});