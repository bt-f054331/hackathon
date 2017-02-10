(function () {
'use strict';

angular.module('AdvisorApp')
.controller('AdvisorController', AdvisorController);


AdvisorController.$inject = ['items'];
function AdvisorController(items) {
  var mainList = this;
  mainList.items = items;
}

})();
