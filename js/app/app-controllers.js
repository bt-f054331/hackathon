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
  $rootScope.currentMsgPointer = 0;

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
}

superController.$inject = [
    '$scope', '$rootScope', 'wpDataService', 'wpUtilService', '$window', '$location', '$timeout', '$state', 'appconfig', '$stateParams'
];

function superController ( $scope, $rootScope, wpDataService, wpUtilService, $window, $location, $timeout, $state, appconfig, $stateParams ) {
	console.log($rootScope.questions);
	var self = this;
  self.isDemo = $stateParams.target === 'demo';
  $scope.messages = [];
  $scope.speeches = $rootScope.messages;

  $scope.$on('onEndVideo',function(){
    $rootScope.currentMsgPointer++;
    if($rootScope.currentMsgPointer<$scope.speeches.length) {
      $scope.messages.push($scope.speeches[$rootScope.currentMsgPointer]);
      wpUtilService.playAudio($scope.speeches[$rootScope.currentMsgPointer].audio);
      $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }
  });

  $scope.initialLoad = function() {
    $scope.messages.push($scope.speeches[0]);
    wpUtilService.playAudio($scope.speeches[0].audio);
  }
  $timeout($scope.initialLoad, 1000);
}
