'use strict'
var wealthControllers = angular.module( 'wealthControllers', [
    'wealthDataServices', 'wealthServices', 'wealthConstants','wealthDirectieves', 'pubnub.angular.service'
] );
wealthControllers.controller( 'wpAppController', wpAppController );
wealthControllers.controller( 'overviewController', overviewController );
wealthControllers.controller( 'modalController', modalController );
wealthControllers.controller( 'superController', superController );
wealthControllers.controller( 'wliveController', wliveController );

wpAppController.$inject = [
    '$scope', '$rootScope', '$state', '$location', '$window', '$timeout', 'wpDataService', 'wpUtilService', 'appconfig'
];
function wpAppController ( $scope, $rootScope, $state, $location, $window, $timeout, wpDataService, wpUtilService, appconfig) {
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
  
  wpDataService.getDataService( appconfig.service.message ).then( function ( data ) {
        $rootScope.messages = data.messages;
  } );


}

wliveController.$inject = [
    '$scope', '$rootScope', '$state', '$stateParams'
];
function wliveController ( $scope, $rootScope, $state, $stateParams ) {
    var self = this;
    var journey = $stateParams.target;

   self.goToAdvisor = function () {
     if (journey === 'j1') {
    		$state.go('advisor');
      } else if (journey === 'demo') {
         $state.go('demo', {target: 'demo'});
     } else {
       	$state.go('super');
     }
   };
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
    self.items = $rootScope.questions.Landing.q1.pAnswers;
    self.theText = $rootScope.questions.Landing.q1.voice;

    annyang.addCallback('result', function(phrases) {
      console.log("it could be any of the following: ", phrases);
      self.execute(phrases, self.items);
    });

    self.execute = function(vals, keys) {
      var target = "";
      for (var i = 0; i < vals.length; i++) {
        target = wpUtilService.matcher(vals[i], keys);
        if (target !== null) {
          break;
        }
      }
      self.navigate(target);
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

}

superController.$inject = [
    '$scope', '$rootScope', 'wpDataService', 'wpUtilService', '$window', '$location', '$timeout', '$state', 'appconfig', '$stateParams'
];

function superController ( $scope, $rootScope, wpDataService, wpUtilService, $window, $location, $timeout, $state, appconfig, $stateParams ) {
	console.log($rootScope.questions);
	var self = this;
  self.isDemo = $stateParams.target === 'demo'
  self.q2Enabled = false;
  self.q1Ans = "";
  self.q2Ans = "";
  self.q1PosAns = $rootScope.questions.Page1.q1.pAnswers;
  self.q1NegAns = $rootScope.questions.Page1.q1.nAnswers;
  self.q2PosAns = $rootScope.questions.Page1.q2.pAnswers;
  self.q2NegAns = $rootScope.questions.Page1.q2.nAnswers;
	self.questions = $rootScope.questions;
  $scope.messages = [];
  $scope.speeches = $rootScope.messages;

  // Pre-populate a no cookie list
  var i = 0, l = $scope.speeches.length;
  (function iterator() {
      console.log($scope.speeches[i].name + "delay");
      $scope.messages.push($scope.speeches[i]);

      if(++i<l) {
          $timeout(iterator, 1000);
		  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
      }
  })();

  self.executeQ1 = function(vals, keys) {
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

  self.executeQ2 = function(vals, keys) {
    var target = "";
    for (var i = 0; i < vals.length; i++) {
      target = wpUtilService.matcher(vals[i], keys);
      if (target !== null || target !== "") {
        break;
      }
    }
    if (target === null || target === "") {
      target = vals[0];
    }
    self.q2Ans = target;
    $scope.$apply();
  }

  annyang.addCallback('result', function(phrases) {
    console.log("it could be any of the following: ", phrases);
    if (self.q2Enabled) {
      self.executeQ2(phrases, self.q2PosAns);
    } else {
      self.executeQ1(phrases, self.q1PosAns);
    }
  });


}
