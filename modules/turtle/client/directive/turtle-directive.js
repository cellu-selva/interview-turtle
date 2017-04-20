"use strict";
/**
 * Controller - turtleChallengeDirective is created
 * @author  selvanathan
 */

/**
 * Directive for the grid is created
 */
angular.module("turtleChallenge")
    .directive('grid', grid);

/**
 * [$injector description - Dependency injection for the grid directive]
 * @type {Array}
 */
grid.$injector = ['TurtleChallengeService'];

/**
 * [grid description - Actual service for the grid which acts as a component]
 * @method grid
 * @param  {[type]} TurtleChallengeService [description]
 * @return {[type]}                        [description]
 */
function grid(TurtleChallengeService) {
    return {
        restrict: 'E',
        scope: '@',
        templateUrl: 'modules/turtle/client/views/partials/grid.html',
        link: function (scope, elem, attr) {
            var parentWidth = 550;
            scope.calculateCellSize = function () {
                scope.turtleChallengeCtrl.cellSize = parentWidth / scope.turtleChallengeCtrl.gridSize;
            };
            scope.calculateCellSize();
        }
    }
}
