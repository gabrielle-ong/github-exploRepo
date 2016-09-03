// Going to assume its watchers instead of followers because owners have followers while repos have watchers

angular.module('repoApp', ['n3-pie-chart'])
  .controller('Ctrl', function ($scope, $http) {
    $scope.search = function () {
      // Error: if no search term entered
      if (!$scope.searchString) {
        $scope.searchErrorMessage = 'Please enter a Search Term'
      }else {
        // else: query Github API
        $http.get('https://api.github.com/search/repositories?q=' + $scope.searchString)
          .success(function (data) {
            console.log(data.items.length)
            // Error: if no repos found
            if (data.items.length == 0) {
              $scope.searchErrorMessage = 'No Repos Found. Please enter another term'
            }else {
              $scope.results = data.items
            }
          })
          .error(function (data) {
            $scope.searchErrorMessage = 'Oops... Error connecting to Github API'
          })
      }
    }

    $scope.expand = function (repoFullName) {
      $scope.clicked = !$scope.clicked
      $http.get('https://api.github.com/repos/' + repoFullName + '/languages')
        .success(function (data) {
          console.log(data)
          // error: if no languages
          if (JSON.stringify(data) == '{}') {
            $scope.languageErrorMessage = 'Repo has no languages'
          }
          // else: show chart
          else {
            var arr = []
            for (var key in data) {
              // to avoid for loop in for loop to assign colors
              if (arr.length % 4 === 0) {
                arr.push({label: key, value: data[key], color: 'rgb(251, 78, 78)'})
              }
              else if (arr.length % 4 === 1) {
                arr.push({label: key, value: data[key], color: 'rgb(78, 32, 255)'})
              }
              else if (arr.length % 4 === 2) {
                arr.push({label: key, value: data[key], color: 'rgb(17, 154, 19)'})
              }else {
                arr.push({label: key, value: data[key], color: 'rgb(18, 205, 255)'})
              }
            }
            $scope.data = arr
            $scope.options = {thickness: 10}
          }
        })
        .error(function (data) {
          console.log('Could not get repo languages')
        })
    }
  })
