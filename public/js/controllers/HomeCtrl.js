Constructable.controller('HomeCtrl', function($scope, $http, $timeout){
    $scope.user = {
        email: ''
    };
    $scope.signUp = function(email){
        console.log(email);
    }
});