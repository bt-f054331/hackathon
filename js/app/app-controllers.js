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

    self.execute = function(vals, keys) {
      var target = "";
      for (var i = 0; i < vals.length; i++) {
        target = wpUtilService.matcher(vals[i], keys);
        if (target !== null) {
          break;
        }
      }
      self.navigate(target);
      annyang.removeCallback();
    }

    self.navigate = function(target) {
        annyang.pause();
        if ('super' === target) {
          $state.go('super');
        } else if ('loan' === target) {
  		    $state.go('advise');
        } else {
          $state.go('advise1');
        }
    }

    annyang.debug();
    annyang.start();

    annyang.addCallback('result', function(phrases) {
      console.log("it could be any of the following: ", phrases);
      self.execute(phrases, self.items);
    });

    self.sayIt(self.theText);
}

superController.$inject = [
    '$scope', '$rootScope', 'wpDataService', 'wpUtilService', '$window', '$location', '$timeout', '$state', 'appconfig'
];

function superController ( $scope, $rootScope, wpDataService, wpUtilService, $window, $location, $timeout, $state, appconfig ) {
	console.log($rootScope.questions);
	var self = this;
  self.q2Enabled = false;
  self.q1Ans = "";
  self.q2Ans = "";
  self.q1PosAns = $rootScope.questions.Page1.q1.pAnswers;
  self.q1NegAns = $rootScope.questions.Page1.q1.nAnswers;
	self.sayIt = wpUtilService.sayIt;
	self.questions = $rootScope.questions;
	self.sayIt($rootScope.questions.Page1.q1.voice);


  self.execute = function(vals, keys) {
    var target = "";
    for (var i = 0; i < vals.length; i++) {
      target = wpUtilService.matcher(vals[i], keys);
      if (target !== null || target !== "") {
        break;
      }
    }
    if (target === null || target === "") {
      target = vals[0];
      self.q2Enabled=true;
    }
    self.q1Ans = target;
    $scope.$apply();
  }


  annyang.addCallback('result', function(phrases) {
    console.log("it could be any of the following: ", phrases);
    if (self.p2Enabled) {
      self.execute(phrases, self.q2PosAns);
    } else {
      self.execute(phrases, self.q1PosAns);
    }
  });


}
