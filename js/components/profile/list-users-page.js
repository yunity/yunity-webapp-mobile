import listUsersTemplate from './list-users.html';

const debug = require('debug')('yunity:list-users-page');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: listUsersTemplate,
    controller: ($scope, yAPI) => {
      yAPI.apiCall('/users/').then((ret) => {
        debug(ret.data.users);
        $scope.users = ret.data.users;
      });

    }
  };
}