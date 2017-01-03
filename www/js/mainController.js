app.controller('mainController', function($scope, $location) {
	$scope.switchPage = function($event, page) {
		for (var i = 0; i < $scope.pages.length; i++) {
			$scope.pages[i].active = false;
		}
		page.active = true;
	};
	$scope.pages = [
		{"name": "Play", "href": "/", "active": true},
		{"name": "Vs. AI", "href": "/#/ai", "active": false},
		{"name": "Rules", "href": "/#/rules", "active": false}
	];
});