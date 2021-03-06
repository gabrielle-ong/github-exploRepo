// Going to assume its watchers instead of followers because owners have followers while repos have watchers

angular.module('repoApp', ['n3-pie-chart'])
  .controller('Ctrl', function ($scope, $http) {
    $scope.searchKeywords = function () {
      // Error: if no search term entered
      if (!$scope.searchString) {
        $scope.searchErrorMessage = 'Please enter a Search Term'
        $scope.results = []
      } else {
        // else: query Github API
        $http.get('https://api.github.com/search/repositories?q=' + $scope.searchString)
          .success(function (data) {
            $scope.noOfResults = 'Top ' + data.items.length + ' Results:'
            // Error: if no repos found
            if (data.items.length === 0) {
              $scope.searchErrorMessage = 'No Repos Found. Please enter another term'
              $scope.results = []
            } else {
              $scope.results = data.items
            }
          })
          .error(function (data) {
            $scope.searchErrorMessage = 'Oops... Error connecting to Github API'
            $scope.results = []
          })
      }
    }
    $scope.searchAuthor = function () {
      // Error: if no search term entered
      if (!$scope.searchString) {
        $scope.searchErrorMessage = 'Please enter a Search Term'
        $scope.results = []
      } else {
        // else: query Github API
        $http.get('https://api.github.com/users/' + $scope.searchString + '/repos')
          .success(function (data) {
            $scope.noOfResults = 'Top ' + data.length + ' Results:'
            // Error: if no repos found
            if (data.length === 0) {
              // will run if I search 'Gabrielle', ie no exact match to a user
              $scope.searchErrorMessage = 'No such User Found. Please enter another term'
              $scope.results = []
            } else {
              $scope.results = data
            }
          })
          .error(function (data) {
            // will run this if I search 'qwercwscwe' etc because cannot Get a non existant user
            $scope.searchErrorMessage = 'No such User Found. Please enter another term'
            $scope.results = []
          })
      }
    }

    $scope.expand = function (result, index) {
      $scope.results[index].expandDetails = !$scope.results[index].expandDetails
      $http.get('https://api.github.com/repos/' + result.full_name + '/languages')
        .success(function (data) {
          // no languages, show error message
          if (JSON.stringify(data) === '{}') {
            $scope.results[index].languagesAbsent = true
          }
          // if not empty: show chart
          else {
            $scope.results[index].languagesPresent = true
            var arr = []
            for (var key in data) {
              // to avoid for loop in for loop to assign colors
              if (arr.length % 4 === 0) {
                arr.push({label: key, value: data[key], color: 'rgb(251, 78, 78)'})
              } else if (arr.length % 4 === 1) {
                arr.push({label: key, value: data[key], color: 'rgb(111, 82, 250)'})
              } else if (arr.length % 4 === 2) {
                arr.push({label: key, value: data[key], color: 'rgb(255, 157, 78)'})
              } else {
                arr.push({label: key, value: data[key], color: 'rgb(18, 191, 255)'})
              }
            }
            $scope.results[index].data = arr.slice(0, 4)
            $scope.results[index].options = {thickness: 10}
          }
        })
        .error(function (data) {
          $scope.results[index].languageError = 'Could not get repo languages'
        })
    }
  })
