'use strict'
var wealthRouter = angular.module( 'wealthRouter', [
    'ui.router', 'wealthServices'
] );

wealthRouter.config( [
    '$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider ) {
        var header = {
            templateUrl : 'view/common/header.html'
        };
        var footer = {
            templateUrl : 'view/common/footer.html'
        };
		$urlRouterProvider.otherwise('/');
        $stateProvider.state( 'home', {
            url : '/',
            views : {
                header : header,
                body : {
                    templateUrl : 'view/home.html'
                },
                footer : footer
            }
          } ).state( 'super', {
              url : '/super',
              views : {
                  header : header,
                  body : {
                      templateUrl : 'view/super.html'
                  },
                  footer : footer
              }
        } ).state( 'advise', {
            url : '/advise',
            views : {
                header : header,
                body : {
                    templateUrl : 'view/financeAdvise.html'
                },
                footer : footer
            }
        } ).state( 'advise1', {
            url : '/advise1',
            views : {
                header : header,
                body : {
                    templateUrl : 'view/financeAdvise1.html'
                },
                footer : footer
            }
        } );
    }
] );
