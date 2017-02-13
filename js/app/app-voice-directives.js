'use strict';

angular.module('voiceDirectives', ['wealthServices'])
.directive('sayText', SayTextDirective)


SayTextDirective.$inject = ['wpUtilService'];
function SayTextDirective(wpUtilService) {

  return {
      scope: {
        sayText: '@'
      },
      link: function(scope, element, attrs, $state) {
        attrs.$observe('sayText', function(value){
          console.log("attr", value);
          wpUtilService.playAudio(value);
        });
      }
  }
};
