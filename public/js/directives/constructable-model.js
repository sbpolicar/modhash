Constructable.directive('constructableModel', function(BuildService) {
    return {
        restrict:'E',
        templateUrl:'views/partials/constructable-model.html',
        transclude: true,
        link: function(scope) {
            scope.clearItem = function(index){
                scope.document[index].markup.input = '';
            };

            scope.deleteItem = function(index){
                scope.document.splice(index, 1);
            };

            scope.cloneItem = function(type){
                var clone = new BuildService.title();
                console.log(clone);
                scope.document.push(clone)
            };
        }
    }
})