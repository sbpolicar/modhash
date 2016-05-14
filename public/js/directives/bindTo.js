Constructable.directive('bindTo', function($compile) {
  return {
    link: function($scope, $element, $attrs) {
      var html = $scope.$eval($attrs.bindTo);
      $element.html(html);
      $compile($element.contents())($scope);
    }
  };
});