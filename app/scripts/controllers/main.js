'use strict';

angular.module('ngLazyDemoApp',['ngLazy'])
  .service('dataService', ['$q', '$timeout', function($q, $timeout){
      var getList = function(){    
        var deferred = $q.defer();
        $timeout(function(){
          var string =  '<h4>List Item' + n + '</h4>' +
                        '<p>' +
                          'This is list item #' + n +
                        '</p>';
          var n = 0;
          var list = [];
          while (n < 9001) {
            var string =  'This is a list item and it\'s ID is ' + n;
            list.push(string);
            n++;
          }
          var string =  'It\'s over 9000';
          list.push(string);
          var returnList = {};
          returnList.data = {};
          returnList.data.list = list;
          deferred.resolve(returnList);
        }, 3000);

        return deferred.promise;
      };
      return { getList : getList };
    }])
  .controller('MainCtrl', ['$scope','dataService','$timeout', function ($scope, dataService, $timeout) {
        
        $scope.data = {};
        $scope.data.list = []; 
        $scope.range = '18';
        $scope.startDelay = '150';
        $scope.appendDelay = '2500';
        $scope.spinnerColor = '#4FA7D9';

        $scope.$watch('spinnerColor', function(newVal, oldVal){
          $scope.spinnerColor = newVal;
          console.log('watch', $scope.spinnerColor);
        })
        $scope.update = function(newVal){
          $scope.spinnerColor = newVal;
          $timeout(function(){
            $scope.$apply(); 
          },100)
        }
    }]);