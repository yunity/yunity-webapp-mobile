import itemDetailPageTemplate from './item-detail-page.html';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: itemDetailPageTemplate,
    controller: ($scope, yAPI, $routeParams, $location, $rootScope) => {

      $scope.requestItem = () => {

        //to do open chat with owner of item and isert default text
        alert('you got a Bannana');
        $location.path('/list/items');

      };

      // TODO(ns) this is needed because directive has an isolate scope
      // not sure what is the best practise here....
      $scope.session = $rootScope.session;

      yAPI.apiCall('/items/' + $routeParams.id).then((ret) => {

        $scope.item = ret.data;
      });
    }
  };
}