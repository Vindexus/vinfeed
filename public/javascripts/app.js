angular.module('app', ['ngResource', 'ngAnimate'])
.factory('Followers', ['$http', function($http){
      return {
        get: function (params) {
          return $http({method: 'GET', url: '/followers', params: params});
        },
        delete: function(id) {
          return $http({method: 'DELETE', url: '/followers/' + id});
        }
      }
    }])
.factory('Feeds', ['$http', function($http){
      return {
        get: function (params) {
          return $http({method: 'GET', url: '/feeds', params: params});
        },
        delete: function(id) {
          return $http({method: 'DELETE', url: '/feeds/' + id});
        }
      }
    }])
.controller('FollowsController', ['$scope', 'Followers', '$timeout', function ($scope, Followers, $timeout) {
  $scope.removeFollow = function(id) {
    if(!confirm("Remove follow?")) {
      return;
    }
    Followers.delete(id);
  };
}])
.controller('FeedsController', ['$scope', 'Feeds', '$timeout', function ($scope, Feeds, $timeout) {
  $scope.removeFeed = function(id) {
    if(!confirm("Remove feed?")) {
      return;
    }
    Feeds.delete(id);
  };
}])
.controller('FollowsCaptureController', ['$scope', 'Followers', '$timeout', function ($scope, Followers, $timeout) {
  $scope.followers = [];

  function fetchNext() {
    Followers.get({limit: 1, after: $scope.followers[0]._id, orderBy: '_id', desc: 0}).success(function (data) {
      if(data.length > 0) {
        $scope.followers.unshift(data[0]);

        if($scope.followers.length > $scope.followsNumDisplay) {
          $timeout(function () {
            $scope.followers.splice($scope.followers.length-1, $scope.followers.length - $scope.followsNumDisplay);
            console.log("$scope.followers.length", $scope.followers.length);
          }, 100);
        }
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
}])
.controller('EditFollowController', ['$scope', 'Followers', function($scope, Followers) {
  $scope.follow = Followers.get($scope.followId)
}]);
