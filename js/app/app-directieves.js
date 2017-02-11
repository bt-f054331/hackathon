angular.module('myApp', [])
  .directive('hcPie', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      items: '='
    },
    controller: function ($scope, $element, $attrs, $state) {
      console.log(2);
		$scope.test = function (target) {
      if ("My super" === target) {
        $state.go('super');
      } else if ("Loan" === target) {
		    $state.go('advise');
      } else {
        $state.go('advise1');
      }
		};
    },
    template: '<div id="container" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs, $state) {
      console.log(3);
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: 'container',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Account Status, 2020'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage}%</b>',
          percentageDecimals: 1
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
		    events:{
				click: function (event) {
					scope.test(event.point.name);
              // add your redirect code and u can get data using event.point
				}
			}

          }
        },
        series: [{
          type: 'pie',
          name: 'Browser share',
          data: scope.items
        }]
      });
      scope.$watch("items", function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);

    }
  }
});
