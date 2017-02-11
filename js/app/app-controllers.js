'use strict'
var wealthControllers = angular.module( 'wealthControllers', [
    'wealthDataServices', 'wealthServices', 'wealthConstants','myApp'
] );

// controller for wpAppController Page
wealthControllers.controller( 'wpAppController', wpAppController );
wpAppController.$inject = [
    '$scope', '$rootScope', '$state', '$location', '$window', '$timeout', 'wpDataService', 'wpUtilService', 'appconfig'
];

// controller for Modal screens
wealthControllers.controller( 'modalController', modalController );
modalController.$inject = [
    '$scope', '$rootScope', 'wpDataService', 'wpUtilService', '$window', '$location', '$timeout', '$state', 'appconfig'
];


// Functions for all controllers
function wpAppController ( $scope, $rootScope, $state, $location, $window, $timeout, wpDataService, wpUtilService, appconfig ) {
    var self = this;
	$rootScope.stateIsLoading = false;
	  $scope.ideas = [
    ['My Bank Balance', 70000],
    ['My super', 20000],
    ['Insurance', 5000],
	['Term deposit', 2000],
	['Loan', 50000]
  ];
}

function modalController ( $scope, $rootScope, wpDataService, wpUtilService, $window, $location, $timeout, $state, appconfig ) {
    
}


