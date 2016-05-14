Constructable.controller('MainCtrl', function($scope, $http, $httpParamSerializerJQLike, $timeout, $sce, HexService, BuildService){
    $scope.sideNavToggle = false;
    $scope.navSwitch = true;

    if(window.localStorage.masterFont === undefined) {
        $scope.masterFont = {
            set: "Oswald"
        };
    } else {
        $scope.masterFont = {
            set: window.localStorage.masterFont
        };
    }

    window.onbeforeunload = function() {
        if($scope.document.length >= 1) {
            window.localStorage.masterFont = $scope.masterFont
        }
    };

    window.onunload = function() {
        window.scrollTo(0,0);
    };
})