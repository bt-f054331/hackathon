(function () {
'use strict';

angular.module('AdvisorApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  $stateProvider

  .state('home', {
    url: '/',
    templateUrl: 'src/advisor/templates/home.html'
  })

  .state('advisors', {
    url: '/advisors',
    templateUrl: 'src/advisor/templates/advisorList.html',
    controller: 'AdvisorController as advisorController',
    resolve: {
      items: ['AdvisorDataService', function (AdvisorDataService) {
        return AdvisorDataService.getAdivsors();
      }]
    }
  })

}

})();
