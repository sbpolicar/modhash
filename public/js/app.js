var modhashApp = angular.module('modhashApp', ['ngRoute']);

modhashApp.run([function(){
}]);

modhashApp.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        rewriteLinks: false
    }).hashPrefix('!');

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html'
    })
    .when('/post', {
        templateUrl: 'views/post.html'
    })
    .otherwise({
        templateUrl: 'views/404.html'
    })

}]);

modhashApp.controller('MainCtrl', ['$scope', function($scope){
    $scope.sideNavToggle = false;
    if(Math.random() > .5){
        $scope.navSwitch = false;
    }  else {
        $scope.navSwitch = true;
    }


}])