"use strict";
/**
 * Turtle code challege application's client side routing done using angular's ui-routing
 * @author Selvanathann
 */
angular
    .module('turtleChallenge')
    //Angular route that routes the application to the dashboard page.
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
    //Removes the # from the url
    .config(['$locationProvider',
      function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
      }
    ]);
