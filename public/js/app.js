var modhashApp = angular.module('modhashApp', ['ngRoute', 'ngSanitize']);

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

modhashApp.controller('MainCtrl', ['$scope', '$http', '$timeout', '$sce', function($scope, $http, $timeout, $sce){

    $scope.sideNavToggle = false;
    $scope.navSwitch = true;

    if(window.sessionStorage.myDocument !== undefined) {
        loadDocument = JSON.parse(window.sessionStorage.myDocument);
    } else {
        loadDocument = [];
    }
    $scope.document = loadDocument || [];

    $scope.$watchCollection('document', function(updated, newer){
        window.sessionStorage.myDocument = JSON.stringify(updated);
    })

    $scope.font = 'verdana';
    $scope.selectInputType = function() {
        $scope.toggleSelectInput = !$scope.toggleSelectInput;
    }

    $scope.addInput = function(inputType){

        $scope.toggleSelectInput = false;

        switch (inputType) {
            case 'title':

                $scope.document.push({
                    type: "Title",
                    markup: {
                        input:"",
                        display: '<span ng-bind-html="document[$index].markup.input" style="{{document[$index].style}}"></span>',
                        wrap: '<input ng-model="document[$index].markup.input"></input>'
                    },
                    style:
                        "font-size:24pt;"
                })
                break;
            case 'subtitle':
                $scope.document.push({
                    type: "Subtitle",
                    markup: {
                        input:"",
                        display: '<span ng-bind-html="document[$index].markup.input" style="{{document[$index].style}}"></span>',
                        wrap: '<input ng-model="document[$index].markup.input"></input>'
                    },
                    style:
                        "font-size:18pt;"
                })
                break;
            case 'paragraph':
                $scope.document.push({
                    type: "Paragraph",
                    markup: {
                        input:"",
                        display: '<span ng-bind-html="document[$index].markup.input" style="{{document[$index].style}}"></span>',
                        wrap: '<textarea ng-model="document[$index].markup.input"></textarea><br></input><button>Left</button><button>Center</button><button>Right</button>'
                    },
                    style:
                        "font-size:12pt;"+
                        "text-align:{{document[$index].markup.alignment}};"

                })
                break;
            case 'image':
                $scope.document.push({
                    type: "Image",
                    markup: {
                        input:"",
                        display: '<img src="{{document[$index].markup.input}}" style="{{document[$index].style}}"></img>',
                        wrap: '&nbsp;&nbsp;&nbsp;&nbsp;<label>image url:</label><input type="url" ng-model="document[$index].markup.input"></input>'
                    },
                    style:
                        "font-size:12pt;"
                })
                break;
            case 'link':
                $scope.document.push({
                    type: "Link",
                    markup: {
                        input: {
                            link_url: "",
                            link_as: ""
                        },
                        display: '<a href="{{document[$index].markup.input.url}}" style="{{document[$index].style}}">{{document[$index].markup.input.link_as ? document[$index].markup.input.link_as : document[$index].markup.input.url}}</a>',
                        wrap: '&nbsp;&nbsp;&nbsp;&nbsp;<label>link url:</label><input type="url" ng-model="document[$index].markup.input.link_url"></input><br>&nbsp;&nbsp;&nbsp;&nbsp;<label>link label:</label><input ng-model="document[$index].markup.input.link_as" placeholder="optional"></input>'
                    },
                    style:
                        "font-size:12pt;"
                })
                break;
        }
    }

    $scope.deleteItem = function(index) {
        console.log(index)
        $scope.document.splice(index, 1);
        // window.location.reload();
    }

    window.onbeforeunload = function() {
        if($scope.document.length >= 1) {
            window.sessionStorage.myDocument = JSON.stringify($scope.document);
        }
    };

    window.onunload = function() {
        window.scrollTo(0,0);
    };
}])
.directive('bindTo', function($compile) {
  return {
    link: function($scope, $element, $attrs) {
      var html = $scope.$eval($attrs.bindTo);
      $element.html(html);
      $compile($element.contents())($scope);
    }
  };
});