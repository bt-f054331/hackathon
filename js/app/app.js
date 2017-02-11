'use strict'
var wealth = angular.module( 'wealthApp', [
    'wealthRouter', 'wealthDataServices', 'wealthServices', 'wealthControllers', 'wealthConstants'
] );
wealth.run( [
    '$rootScope', '$state', '$timeout', 'appconfig', function ( $rootScope, $state, $timeout, appconfig ) {
        $rootScope.stateIsLoading = true;
        $rootScope.$on( '$stateChangeStart', function () {
            $rootScope.stateIsLoading = false;
            $( 'html, body' ).animate( {
                scrollTop : 0
            }, 1 );
        } );        
    }
] );
wealth.filter( 'smCurrency', [
    '$filter', function ( $filter ) {
        return function ( input ) {
            if ( input === '' || input === null || input === undefined ) {
                return 'Not supplied';
            } else if ( input < 0 ) {
                return $filter( 'currency' )( input ).replace( '(', '\u2212' ).replace( ')', '' );
            } else {
                return $filter( 'currency' )( input );
            }
        }
    }
] );
