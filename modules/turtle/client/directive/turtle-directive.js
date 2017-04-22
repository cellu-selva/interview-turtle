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
grid.$injector = ['$timeout'];

/**
 * [grid description - Actual service for the grid which acts as a component]
 * @method grid
 * @return {[type]}  [description]
 */
function grid($timeout) {
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

            /**
             * [renderMovement description - Renders the turtle movement. ]
             * @method renderMovement
             * @return {[type]}       [description]
             */
            scope.renderMovement = function () {
                var rotateDeg = {
                    'North': 0,
                    'East': 90,
                    'South': 180,
                    'West': 270
                };
                async.eachSeries(scope.turtleChallengeCtrl.turtle.traversedCells, function (nextMove, callback) {
                    $timeout(function () {
                        $timeout(function () {
                            angular.element('#turtle').css({
                                'left': nextMove.left,
                                'top': nextMove.top
                            });
                            $timeout(function () {
                                angular.element(".x-" + nextMove.x + ".y-" + nextMove.y).css({
                                    'background-color': '#31B0D5'
                                });
                                callback();
                            }, 400);
                        }, 200);
                        $("#turtle").css({
                            "-webkit-transform": "rotate(" + rotateDeg[scope.turtleChallengeCtrl.availableDirections[nextMove.direction]] + "deg)",
                            "transition-delay": "1s",
                            "transition-duration": "1s"
                        });
                    }, 250);
                }, function (err) {
                    scope.turtleChallengeCtrl.isDone = true;
                    scope.turtleChallengeCtrl.outputDirections = scope.turtleChallengeCtrl.inputDirections;
                    scope.turtleChallengeCtrl.gridPosition = scope.turtleChallengeCtrl.turtle.traversedCells[scope.turtleChallengeCtrl.turtle.traversedCells.length - 1];
                });
            }
        }
    }
}
