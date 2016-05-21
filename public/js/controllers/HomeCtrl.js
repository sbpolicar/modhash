Constructable.controller('HomeCtrl', ["$scope", "$http", "$timeout", function($scope, $http, $timeout){
    $scope.user = {
        email: ''
    };
    $scope.signUp = function(email){
        console.log(email);
    }
}]);