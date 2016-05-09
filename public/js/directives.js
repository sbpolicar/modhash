modhashApp.directive('myCustomer', function() {
  return {
    restrict: 'E',
    scope: {
      customerInfo: '=inputType'
    },
    templateUrl: 'my-customer-iso.html'
  };