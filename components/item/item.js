angular.module('yunity.mobile').directive('createItemPage', function() {
        return {
                scope: {},
                restrict: 'E',
                templateUrl: 'components/item/create-item.html',
                controller: function($scope, yAPI, $location) {
                                $scope.createItem = function() {

                                        yAPI.apiCall({
                                                uri: '/items',
                                                method: 'POST',
                                                data: {
                                                        description: $scope.description,
                                                }
                                        }).then(function(res) {

                                                        $location.path('/list/items');

                                                },
                                                function(ret) {
                                                        alert('cannot create item ' + ret.data.reason);
                                                });

                                };
                }
        };
});


angular.module('yunity.mobile').directive('listItemsPage', function() {
        return {
                scope: {},
                restrict: 'E',
                templateUrl: 'components/item/list-items.html',
                controller: function($scope, yAPI, $location) {
                                yAPI.apiCall('/items').then(function(ret) {

                                        $scope.items = ret.data.items.reverse();
                                });
                }
        };
});

angular.module('yunity.mobile').directive('itemDetailPage', function() {
        return {
                scope: {},
                restrict: 'E',
                templateUrl: 'components/item/item.html',
                controller: function($scope, yAPI, $routeParams, $location) {

                        $scope.requestItem = function() {

                                //to do open chat with owner of item and isert default text
                                alert('you got a Bannana');
                                $location.path('/list/items');

                        };

                        yAPI.apiCall('/items/' + $routeParams.id).then(function(ret) {

                                $scope.item = ret.data;
                        });
                }
        }
});



export default 'YunityItem';
