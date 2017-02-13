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

    		var sayIt = function (text) {
          var speechMessage = new SpeechSynthesisUtterance(text);

          speechMessage.onstart = function(e) {
            console.log('start speaking');
            annyang.abort();
            console.log('annyang abort');
          };

          speechMessage.onend = function(e) {
            console.log('Finished speaking');
            annyang.resume();
            console.log('annyang resumed');
          };
          speechSynthesis.speak(speechMessage);
    		};
		
		
		var playAudio = function (path) {
			var loaded = false;
			var aud = new Audio();
			 
			aud.addEventListener('loadeddata', function() 
			{
				loaded = true;
				aud.play();				
				annyang.abort();
			}, false);
			 
			aud.addEventListener('error' , function() 
			{
				alert('error loading audio');
			}, false);
			 
			aud.addEventListener("ended", function(){
				 aud.currentTime = 0;
				 console.log("audio ended");
				 annyang.resume();
			});
			aud.src = path;
		};
		
        var matcher = function(val, keys) {
          var target = "";
          for (var i = 0; i < keys.length; i++) {
            var regex= new RegExp(keys[i].trim(), 'i');
            var result = val.match(regex);
            if (result !== null && result.length > 0) {
              target = result[0];
              break;
            }
          }
          return target;
        };

        return {
            slideTop : slideTop,
            slideToFields : slideToFields,
            openModal : openModal,
            closeModal : closeModal,
            matcher : matcher,
			sayIt : sayIt,
			playAudio : playAudio
        };
    }
] );
