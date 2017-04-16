"use strict";
/**
 * Turtle code challege application's client side routing done using angular's ui-routing
 */
angular
    .module('turtleChallenge')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('turtle', {
                url: '/',
                templateUrl: 'modules/turtle/client/views/dashboard.html',
                controller: 'turtleChallengeController',
                controllerAs: 'turtleChallengeCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }])
    .config(['$locationProvider',
      function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
      }
    ]);
