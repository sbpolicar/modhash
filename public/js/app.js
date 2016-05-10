var modhashApp = angular.module('modhashApp', ['ngRoute', 'ngSanitize', 'ngAnimate']);

modhashApp.run([function(){

}])
.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider) {

    $locationProvider.
    // html5Mode({
        // enabled: true,
        // rewriteLinks: false
    // }).
    hashPrefix('!');

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html'
    })
    .when('/build', {
        templateUrl: 'views/post.html'
    })
    .otherwise({
        templateUrl: 'views/404.html'
    })

}])
.controller('MainCtrl', ['$scope', '$http', '$timeout', '$sce', function($scope, $http, $timeout, $sce){

    var runRandom = function() {
        var length = 16;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    var left = "'left'",
        right = "'right'",
        center = "'center'",
        alignment = "'alignment'"


    var displayMessage = function(message, color) {
        $scope.message = message;
        $scope.flash = color;
        $timeout(function(){
            $scope.message = '';
        }, 4000);
    }

    var updateDocument = function(){
        window.localStorage.myDocument = JSON.stringify($scope.document);
    }


    if(window.localStorage.myDocument !== undefined) {
        loadDocument = JSON.parse(window.localStorage.myDocument);
    } else {
        loadDocument = [];
    }

    $scope.document = loadDocument || [];
    $scope.sideNavToggle = false;
    $scope.navSwitch = true;
    $scope.name = {
        documentTitle: ''
    }

    $scope.selectInputType = function(boolean) {
        $scope.toggleSelectInput = boolean;
    }

    $scope.$watchCollection('name.documentTitle', function(updated){
        console.log($scope.name.documentTitle)
    })

    $scope.saveDocument = function(){
        console.log('clicked');
        if($scope.name.documentTitle === ''){
            displayMessage('You need to name your document.', 'red');
        } else {
            if($scope.document[0]){
                console.log('content exsists');
                    var asHtml = '';
                    $scope.document.forEach(function(item){
                        asHtml += item.markup.display;
                    });
                    if(asHtml != '') {
                        console.log('sending form data to server');
                        // will become DocumentSetvice.save();
                        $http({
                            method: 'POST',
                            url: '/save',
                            headers: {
                               'Content-Type': 'application/x-www-form-urlencoded'
                             },
                            data: {
                                name: $scope.name.documentTitle,
                                asJson: JSON.stringify($scope.document),
                                asHtml: asHtml
                            }
                        }).then(function(success){
                            displayMessage("Saved!", 'green');
                            console.log('success');
                        }, function(error){
                            displayMessage("Error, not saved.");
                            console.log('error');
                        })
                    }
                } else {
                    console.log('no content');
                    displayMessage('You need some actual content before you can save.', 'red');
                }
        }
    }

    $scope.clearDocument = function(){
        $scope.document.forEach(function(item){
            if(item.type != 'Link') {
                item.markup.input = '';
            } else {
                item.markup.input.link_as = '';
                item.markup.input.link_url = '';
            }
        })
        displayMessage('Cleared.', 'blue');
    }

    $scope.deleteDocument = function(){
        if($scope.name.documentTitle != '') {
            title = $scope.name.documentTitle;
        } else {
            title = 'Nothing'
        }
        displayMessage(title+" was deleted.", 'green')
        $scope.name.documentTitle = ''
        $scope.document = [];
        window.localStorage.removeItem('myDocument');
    }


    $scope.setAlignment = function(alignTo, index) {
        console.log('align item = ',$scope.document[index])
        $scope.document[index].alignment = alignTo;
        updateDocument();
    }

    $scope.$watchCollection('document', function(updated){
        console.log('updated', updated);
        updateDocument();
    })


    $scope.addInput = function(inputType){
        // lets user set multiple inputs at once in stead of one at a time
        // $scope.toggleSelectInput = !$scope.toggleSelectInput;
        switch (inputType) {
            case 'title':
                $scope.document.push({
                    id: runRandom(),
                    type: "Title",
                    markup: {
                        input:"",
                        display: '<h1 class="preview-item" ng-bind-html="document[$index].markup.input" ng-style="{{document[$index].style}}"></h1>',
                        wrap: '<input ng-model="document[$index].markup.input"></input><br>Alignment:&nbsp;<button ng-class="{'+alignment+': document[$index].alignment === '+left+'}" ng-click="setAlignment('+left+', $index)">Left</button><button ng-class="{'+alignment+': document[$index].alignment === '+center+'}" ng-click="setAlignment('+center+', $index)">Center</button><button ng-class="{'+alignment+': document[$index].alignment === '+right+'}" ng-click="setAlignment('+right+', $index)">Right</button>'
                    },
                    alignment: "left",
                    style:
                        "{'font-size':'24pt',"+
                        "'text-align':document[$index].alignment}"
                })
                break;
            case 'subtitle':
                $scope.document.push({
                    id: runRandom(),
                    type: "Subtitle",
                    markup: {
                        input:"",
                        display: '<h2 class="preview-item" ng-bind-html="document[$index].markup.input" ng-style="{{document[$index].style}}"></h2>',
                        wrap: '<input ng-model="document[$index].markup.input"></input><br>Alignment:&nbsp;<button ng-class="{'+alignment+': document[$index].alignment === '+left+'}" ng-click="setAlignment('+left+', $index)">Left</button><button ng-class="{'+alignment+': document[$index].alignment === '+center+'}" ng-click="setAlignment('+center+', $index)">Center</button><button ng-class="{'+alignment+': document[$index].alignment === '+right+'}" ng-click="setAlignment('+right+', $index)">Right</button>'
                    },
                    alignment: "left",
                    style:
                        "{'font-size':'18pt',"+
                        "'text-align':document[$index].alignment}"
                })
                break;
            case 'paragraph':
                $scope.document.push({
                    id: runRandom(),
                    type: "Paragraph",
                    markup: {
                        input:"",
                        display: '<pre class="preview-item paragraph" ng-style="{{document[$index].style}}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{document[$index].markup.input}}</pre>',
                        wrap: '<textarea ng-model="document[$index].markup.input"></textarea><br>Alignment:&nbsp;<button ng-class="{'+alignment+': document[$index].alignment === '+left+'}" ng-click="setAlignment('+left+', $index)">Left</button><button ng-class="{'+alignment+': document[$index].alignment === '+center+'}" ng-click="setAlignment('+center+', $index)">Center</button><button ng-class="{'+alignment+': document[$index].alignment === '+right+'}" ng-click="setAlignment('+right+', $index)">Right</button>'
                    },
                    alignment: "left",
                    style:
                        "{'font-size':'12pt',"+
                        "'text-align':document[$index].alignment}"
                })
                break;
            case 'image':
                $scope.document.push({
                    id: runRandom(),
                    type: "Image",
                    markup: {
                        input:"",
                        display: '<img class="preview-item" src="{{document[$index].markup.input}}" ng-style="{{document[$index].style}}"></img>',
                        wrap: '&nbsp;&nbsp;&nbsp;&nbsp;<label>image url:</label><input ng-model="document[$index].markup.input"></input><br>Alignment:&nbsp;<button ng-class="{'+alignment+': document[$index].alignment === '+left+'}" ng-click="setAlignment('+left+', $index)">Left</button><button ng-class="{'+alignment+': document[$index].alignment === '+center+'}" ng-click="setAlignment('+center+', $index)">Center</button><button ng-class="{'+alignment+': document[$index].alignment === '+right+'}" ng-click="setAlignment('+right+', $index)">Right</button>'
                    },
                    alignment: "left",
                    style:
                        "{'font-size':'12pt',"+
                        "'text-align':document[$index].alignment}"
                })
                break;
            case 'link':
                $scope.document.push({
                    id: runRandom(),
                    type: "Link",
                    markup: {
                        input: {
                            link_url: "",
                            link_as: ""
                        },
                        display: '<div ng-style="{{document[$index].style}}"><a class="preview-item" ng-href="{{document[$index].markup.input.link_url}}">{{document[$index].markup.input.link_as ? document[$index].markup.input.link_as : document[$index].markup.input.link_url}}</a></div>',
                        wrap: '&nbsp;&nbsp;&nbsp;&nbsp;<label>link url:</label><br>&nbsp;&nbsp;&nbsp;&nbsp;<input ng-model="document[$index].markup.input.link_url"></input><br>&nbsp;&nbsp;&nbsp;&nbsp;<label>link label:</label><br>&nbsp;&nbsp;&nbsp;&nbsp;<input ng-model="document[$index].markup.input.link_as" placeholder="optional"></input><br>Alignment:&nbsp;<button ng-class="{'+alignment+': document[$index].alignment === '+left+'}" ng-click="setAlignment('+left+', $index)">Left</button><button ng-class="{'+alignment+': document[$index].alignment === '+center+'}" ng-click="setAlignment('+center+', $index)">Center</button><button ng-class="{'+alignment+': document[$index].alignment === '+right+'}" ng-click="setAlignment('+right+', $index)">Right</button>'
                    },
                    alignment: "left",
                    style:
                        "{'font-size':'12pt',"+
                        "'text-align':document[$index].alignment}"
                })
                break;
            case 'code':
                $scope.document.push({
                    id: runRandom(),
                    type: "Code",
                    markup: {
                        input:"",
                        display: '<pre class="preview-item code" ng-bind-html="document[$index].markup.input" ng-style="{{document[$index].style}}"></pre>',
                        wrap: '<textarea ng-model="document[$index].markup.input"></textarea><br>Alignment:&nbsp;<button ng-class="{'+alignment+': document[$index].alignment === '+left+'}" ng-click="setAlignment('+left+', $index)">Left</button><button ng-class="{'+alignment+': document[$index].alignment === '+center+'}" ng-click="setAlignment('+center+', $index)">Center</button><button ng-class="{'+alignment+': document[$index].alignment === '+right+'}" ng-click="setAlignment('+right+', $index)">Right</button>'
                    },
                    alignment: "left",
                    style:
                        "{'font-size':'12pt',"+
                        "'text-align':document[$index].alignment,"+
                        "'display': 'block',"+
                        "'padding': '9.5px',"+
                        "'margin': '0 auto',"+
                        "'font-size': '13px',"+
                        "'line-height': '1.42857143',"+
                        "'color': '#333',"+
                        "'word-break': 'break-all',"+
                        "'word-wrap': 'break-word',"+
                        "'background-color': '#f5f5f5',"+
                        "'border-radius': '4px',"+
                        "'width': '65%'}"
                })
                break;
        }
    }

    $scope.deleteItem = function(index) {
        console.log(index)
        $scope.document.splice(index, 1);
    }

    window.onbeforeunload = function() {
        if($scope.document.length >= 1) {
            updateDocument();
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
})