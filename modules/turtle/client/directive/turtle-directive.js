"use strict";


angular.module("turtleChallenge")
    .directive('grid', grid)
    .directive('gridSize', gridSize);


grid.$injector = ['TurtleChallengeService'];
gridSize.$injector = [];


function grid(TurtleChallengeService) {
    return {
        restrict: 'E',
        scope: '@',
        templateUrl: 'modules/turtle/client/views/partials/grid.html',
        link: function (scope, elem, attr) {
            var parentWidth = elem.parent().width();
            scope.turtleChallengeCtrl.cellSize = parentWidth / attr.gridSize;

        }
    }
}

function gridSize() {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            console.log("Rendered");
        }
    }
}
