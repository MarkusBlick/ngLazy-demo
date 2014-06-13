'use strict';

angular.module('ngLazyDemoApp',['ngLazy'])
  .service('dataService', ['$q', '$timeout', function($q, $timeout){
      var getList = function(){
        var deferred = $q.defer();
        var n = 0;
        var string = '';
        $timeout(function(){
          var list = [];
          while (n < 9001) {
            string =  'This is a list item and its ID is ' + n;
            list.push(string);
            n++;
          }
          string =  'It\'s over 9000';
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

        $scope.$watch('spinnerColor', function(newVal){
          $scope.spinnerColor = newVal;
          console.log('watch', $scope.spinnerColor);
        });

        $scope.update = function(newVal){
          $scope.spinnerColor = newVal;
          $timeout(function(){
            $scope.$apply();
          },100);
        };
      }]);
