//import './js/message.js';
import angular from 'angular';
import ngRoute from 'angular-route';

import yAPI from './yunity.yAPI';
import yChat from './yunity.yChat';
import yMap from './yunity.yMap';

import routes from './routes';

import groups from './components/groups';
import chat from './components/chat';
import item from './components/item';
import login from './components/login';
import map from './components/map';
import profile from './components/profile';
import signup from './components/signup';

const debug = require('debug')('yunity:app');

/*
* INIT APP
*/
var app = angular.module('yunity', [
  ngRoute,
  'mobile-angular-ui',
  // drag features here
  'mobile-angular-ui.gestures',
  yAPI, yChat, yMap,
  groups, chat, item, login, map, profile, signup
]);


/*
* INIT
*/
app.run(($transform, $rootScope, yAPI, $location, $route) => {
  'ngInject';

  debug('running app!');

  /*
  * API Configuration
  */
  yAPI.config({
    url: '/api',
    urlSuffix: '',
    requestStart: () => {
      $rootScope.loading = true;
      debug('start');
    },
    requestComplete: () => {
      debug('complete');
      $rootScope.loading = false;
    }
  });
  $rootScope.$on('$routeChangeStart', (event, next) => {
    debug('routeChangeStart next is:', next);
    yAPI.checkLogin().then(() =>  {}, () =>  {

      if (next.access !== undefined) {
        if (next.access.requiresLogin) {
          if (!yAPI.session.loggedin) {
            debug('access not allowed');
            event.preventDefault();
            $location.path('/login');
            $route.reload();
          }
        }
      }
    });
  });

  window.$transform = $transform;

});

app.config(routes);

/*
* MAIN CONTROLLER
*/
app.controller('MainController', ($rootScope, $scope, yAPI, yMapService) => {
  'ngInject';

  /*
  * handle categores
  */
  $scope.activeCategory = null;
  $scope.categories = [{
    name: 'Booksharing',
    icon: 'book'
  }, {
    name: 'Carsharing',
    icon: 'car'
  }, {
    name: 'Couchsurfing',
    icon: 'bed'
  }, {
    name: 'Foodsharing',
    icon: 'apple'
  }];

  $scope.showSubCategories = (cat) => {
    $scope.activeCategory = cat;
  };

  $scope.sidebarLeft = 'menu';

  /*
  * LOADING SPINNER
  */
  $rootScope.$on('$routeChangeStart', () => {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', () => {
    $rootScope.loading = false;
  });



  $scope.filter = () => {

    yAPI.listMappable({
      filter: {},
      success: (ret) => {
        debug('show items on status > ' + ret.data.items.length);

        if (ret.data.items != undefined && ret.data.items.length > 0) {
          yMapService.renderMarkerCluster(ret.data.items);
        } else {
          debug('no items found');
        }

      },
      error: (ret) => {
        debug(ret);
      }
    });
  };




});