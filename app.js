angular.module('repoApp', [])
  .controller("Ctrl", function ($scope,$http){
    $scope.search = function(){
      console.log($scope.searchString)
      $http.get('https://api.github.com/search/repositories?q='+$scope.searchString)
        .success(function(data) {
          console.log(data.total_count)
          $scope.results = data.items;
        })
        .error(function(data) {
          console.log("No data found..");
        })
    }
  })
