app.controller('mainController', function($scope, $location) {
	var path = $location.path().replace("/", "");

	function disablePages() {
		for (var i = 0; i < $scope.pages.length; i++) {
			$scope.pages[i].active = false;
		}		
	}

	$scope.switchPage = function($event, page) {
		disablePages();
		page.active = true;
	};

	$scope.pages = [
		{"name": "Play", "href": "/", "active": true},
		{"name": "Vs. AI", "href": "/#/ai", "active": false},
		{"name": "Rules", "href": "/#/rules", "active": false}
	];

	if (path === "ai") {
		disablePages();
		$scope.pages[1].active = true;
	}
	if (path === "rules") {
		disablePages();
		$scope.pages[2].active = true;
	}
});