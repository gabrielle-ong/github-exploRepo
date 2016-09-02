angular.module('repoApp', [])
  .controller('Ctrl', function ($scope, $http) {
    $scope.search = function () {
      $http.get('https://api.github.com/search/repositories?q=' + $scope.searchString)
        .success(function (data) {
          console.log(data.total_count)
          $scope.results = data.items
        })
        .error(function (data) {
          console.log('No repos found..')
        })
    }

    $scope.expand = function (repoFullName) {
      console.log(repoFullName + 'was clicked!')
      $http.get('https://api.github.com/repos/' + repoFullName)
        .success(function (data) {
          console.log(data.description)
          //Going to assume its watchers instead of followers because owners have followers while repos have watchers
          console.log(data.watchers)
          console.log(data.html_url)
        })
        .error(function (data) {watchers
          console.log('Could not get detailed repo data')
        })
        $http.get('https://api.github.com/repos/' + repoFullName + '/languages')
          .success(function (data) {
            console.log(data)
          })
          .error(function (data) {
            console.log('Could not get languages')
          })
    }
  })
