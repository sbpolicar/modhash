var Constructable = angular.module('Constructable', ['ngRoute', 'ngSanitize', 'ngAnimate']);

Constructable.run([function(){

}]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $locationProvider.
    // html5Mode({ enabled: true, rewriteLinks: false }).
    hashPrefix('!');

    $routeProvider
    .when('/', {
        templateUrl: 'views/homepage.html',
        controller: 'HomeCtrl'
    })
    .when('/build', {
        templateUrl: 'views/buildpage.html',
        controller: 'BuildCtrl'
    })
    .otherwise({
        templateUrl: 'views/404.html'
    })
}])