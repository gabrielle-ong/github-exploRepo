angular.module('repoApp', [])
  .controller('Ctrl', function ($scope, $http) {
    $scope.search = function () {
      $http.get('https://api.github.com/search/repositories?q=' + $scope.searchString)
        // Going to assume its watchers instead of followers because owners have followers while repos have watchers
        .success(function (data) {
          $scope.results = data.items
        })
        .error(function (data) {
          $scope.searchErrorMessage = 'No repos found...'
        })
    }

    $scope.expand = function (repoFullName) {
      console.log(repoFullName + 'was clicked!')
      $http.get('https://api.github.com/repos/' + repoFullName + '/languages')
        .success(function (data) {
          console.log(data)
          $scope.language = data
        })
        .error(function (data) {
          console.log('Could not get repo languages')
        })
    }
  })
