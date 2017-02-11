'use strict'
var wealthServices = angular.module( 'wealthServices', [ 'wealthConstants'] );

wealthServices.factory( 'wpUtilService', [
    '$rootScope', '$window', '$timeout', '$state', 'appconfig', function ( $rootScope, $window, $timeout, $state, appconfig ) {


        var openModal = function ( modalId ) {
            GUI.modals.toggelModal( false, $( modalId ), modalId );            
        };
		
		var closeModal = function ( modalId) {
            GUI.modals.toggelModal( true, $( modalId ), modalId );            
        };


        var validateEmail = function ( email ) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test( email );
        };

        
        var slideToFields = function ( id ) {
            $( window ).scrollTop( 0 );
            var timeout = $timeout( function () {
                slideTop( id );
            }, appconfig.timeouts.slideTop );
        };

        /** * for scroll top functionality ** */
        var slideTop = function ( itemId ) {
            $( 'html, body' ).animate( {
                'scrollTop' : $( '#' + itemId ).offset().top
            } );
        };

        
        return {
            slideTop : slideTop,
            slideToFields : slideToFields,
            openModal : openModal,
            closeModal : closeModal
        };
    }
] );
