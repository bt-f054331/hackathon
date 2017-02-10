(function () {
'use strict';

angular.module('Data')
.service('AdvisorDataService', AdvisorDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


AdvisorDataService.$inject = ['$q', '$http', 'ApiBasePath']
function AdvisorDataService($q, $http, ApiBasePath) {
  var service = this;

  var persons = [];


  persons.push({
    name: "Mike",
    gender: "male",
    role: "senior advisor"
  });
  persons.push({
    name: "Donna",
    gender: "female",
    role: "planner"
  });

  service.getAdivsors = function () {
    return persons;
  }


}

})();
