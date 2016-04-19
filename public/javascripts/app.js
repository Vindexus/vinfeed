angular.module('app', ['ngResource', 'ngAnimate'])
.factory('Followers', ['$http', function($http){
      return {
        get: function (params) {
          return $http({method: 'GET', url: '/followers', params: params});
        }
      }
    }])
.controller('FollowsController', ['$scope', 'Followers', '$timeout', function ($scope, Followers, $timeout) {
  $scope.followers = [];

  function fetchNext() {
    console.log("most recent _id for " + $scope.followers[0].follower, $scope.followers[0]._id);
    console.log("one after that for " + $scope.followers[1].follower, $scope.followers[1]._id);
    console.log($scope.followers[0]._id + " > " + $scope.followers[1]._id  +" is ", $scope.followers[0]._id > $scope.followers[1]._id)
    Followers.get({limit: 1, after: $scope.followers[0]._id}).success(function (data) {
      if(data.length > 0) {
        $scope.followers.unshift(data[0]);
      }
    });

    $timeout(fetchNext, $scope.followsDisplayTime);
  }

  $scope.$watch('followsNumDisplay', function () {
    Followers.get({limit: $scope.followsNumDisplay, skip: $scope.followsInitialBuffer}).success(function (data) {
      $scope.followers = data;
      $timeout(fetchNext, $scope.followsDisplayTime);
    });
  });
}]);
