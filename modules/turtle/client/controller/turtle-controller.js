"use strict";

/**
 * Controller - turtleChallengeController is created
 */
angular.module("turtleChallenge")
    .controller('turtleChallengeController', turtleChallengeController);

/**
 * [$injector description - Dependency injection for the 'turtleChallengeController' controller is done. ]
 * @type {Array}
 */
turtleChallengeController.$injector = ['TurtleChallengeService'];

/**
 * [turtleChallengeController description - Actual 'turtleChallengeController' controller.]
 * @method turtleChallengeController
 * @return {[type]}                  [description]
 */
function turtleChallengeController(TurtleChallengeService) {
    var vm = this;
    vm.grid = TurtleChallengeService.grid;
    vm.obstrucle = TurtleChallengeService.obstrucle;
    vm.gridSize = 8
    vm.cells = TurtleChallengeService.cells;
    vm.currentCell = {
        x: 1,
        y: 1
    };
    vm.directionCode = {
        'R': 1,
        'L': -1
    };
    vm.availableDirections = ['W', 'N', 'E', 'S'];
    vm.currentDirection = '2';

    TurtleChallengeService.generateGrid(vm.gridSize, vm.cells, vm.grid);
    TurtleChallengeService.generateObstrucles(vm.cells, vm.obstrucle, vm.gridSize, vm.grid);

    vm.findObstrucle = function (cell) {
        var index = _.findIndex(vm.obstrucle, {
            x: cell.x,
            y: cell.y
        });
        return index > -1 ? 'obstrucle' : 'normal';
    }

    vm.move = function () {

        _.each(inputDirections, function (nextMove) {
            TurtleChallengeService.calculateNextPosition(vm.currentCell, vm.currentDirection, nextMove);
        });

        TurtleChallengeService.checkForObstrucle()
        var temp = {
            x: vm.currentCell.x,
            y: vm.currentCell.y + 1
        };
        var position = $("#turtle").position();
        position.left = position.left + vm.cellSize;
        position.top = position.top;
        $("#turtle").css({
            "-webkit-transform": "translate(" + position.left + "px, " + position.top + "px)"
        }).delay(2000);
    }
}
