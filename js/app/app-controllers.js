'use strict'
var wealthControllers = angular.module( 'wealthControllers', [
    'wealthDataServices', 'wealthServices', 'wealthConstants','wealthDirectieves', 'pubnub.angular.service'
] );
wealthControllers.controller( 'wpAppController', wpAppController );
wealthControllers.controller( 'overviewController', overviewController );
wealthControllers.controller( 'modalController', modalController );
wealthControllers.controller( 'superController', superController );

wpAppController.$inject = [
    '$scope', '$rootScope', '$state', '$location', '$window', '$timeout', 'wpDataService', 'wpUtilService', 'appconfig'
];
function wpAppController ( $scope, $rootScope, $state, $location, $window, $timeout, wpDataService, wpUtilService, appconfig ) {
    var self = this;
	$rootScope.stateIsLoading = false;
	self.ideas = [
    ['My Bank Balance', 70000],
    ['My super', 20000],
    ['Insurance', 5000],
	['Term deposit', 2000],
	['Loan', 50000]
  ];

  wpDataService.getDataService( appconfig.service.questions ).then( function ( data ) {
        $rootScope.questions = data;
  } );
}

modalController.$inject = [
    '$scope', '$rootScope', 'wpDataService', 'wpUtilService', '$window', '$location', '$timeout', '$state', 'appconfig'
];

function modalController ( $scope, $rootScope, wpDataService, wpUtilService, $window, $location, $timeout, $state, appconfig ) {

}

overviewController.$inject = [
    '$scope', '$rootScope', 'wpDataService', 'wpUtilService', '$window', '$location', '$timeout', '$state', 'appconfig', 'Pubnub'
];
function overviewController ( $scope, $rootScope, wpDataService, wpUtilService, $window, $location, $timeout, $state, appconfig, Pubnub) {
    var self = this;
    self.items = ['super'],['loan'];
    self.theText = "Hi Melinda how can I help you?";
	
	self.sayIt = wpUtilService.sayIt;
    
    self.execute = function(val, keys) {
      var target = wpUtilService.matcher(val, keys);
      self.navigate(target);
    }

    self.navigate = function(target) {
        annyang.removeCommands();
        if ('super' === target) {
          $state.go('super');
        } else if ('loan' === target) {
  		    $state.go('advise');
        } else {
          $state.go('advise1');
        }
    }

    var commands = {
      '*val' : function(val) {
        self.execute(val, self.items);
      }
    }
	self.sayIt(self.theText);
    annyang.addCommands(commands);
    annyang.debug();
    annyang.start();

}

superController.$inject = [
    '$scope', '$rootScope', 'wpDataService', 'wpUtilService', '$window', '$location', '$timeout', '$state', 'appconfig'
];

function superController ( $scope, $rootScope, wpDataService, wpUtilService, $window, $location, $timeout, $state, appconfig ) {
	console.log($rootScope.questions);
	var self = this;
	self.sayIt = wpUtilService.sayIt;
	self.questions = $rootScope.questions;
	self.sayIt($rootScope.questions.Page1.q1.text);
}
