"use strict";

/**
 * Controller - turtleChallengeController is created
 * @author  selvanathan
 */
angular.module("turtleChallenge")
    .controller('turtleChallengeController', turtleChallengeController);

/**
 * [$injector description - Dependency injection for the 'turtleChallengeController' controller is done. ]
 * @type {Array}
 */
turtleChallengeController.$injector = ['TurtleChallengeService', '$timeout'];

/**
 * [turtleChallengeController description - Actual 'turtleChallengeController' controller.]
 * @method turtleChallengeController
 * @return {[type]}                  [description]
 */
function turtleChallengeController(TurtleChallengeService, $timeout) {
    var vm = this;
    vm.grid = TurtleChallengeService.grid;
    vm.obstrucles = TurtleChallengeService.obstrucles;
    vm.gridSize = 10;
    vm.cells = TurtleChallengeService.cells;
    vm.currentCell = {
        x: 1,
        y: 1
    };
    vm.availableDirections = ['W', 'N', 'E', 'S'];
    vm.currentDirection = 1;

    TurtleChallengeService.generateGrid(vm.gridSize, vm.cells, vm.grid);
    TurtleChallengeService.generateObstrucles(vm.cells, vm.obstrucles, vm.gridSize, vm.grid);

    vm.findObstrucle = function (cell) {
        var index = _.findIndex(vm.obstrucles, {
            x: cell.x,
            y: cell.y
        });
        return index > -1 ? 'obstrucle' : 'normal';
    }

    /**
     * [move description]
     * @method move
     * @return {[type]} [description]
     */
    vm.move = function () {
        var position = $("#turtle").position(); //Holds the current position of the turtle.
        var params = {
                currentPosition: position,
                currentCell: vm.currentCell,
                currentDirection: vm.currentDirection,
                gridSize: vm.gridSize,
                cellwidth: vm.cellSize
            },
            rotate = 0;
        vm.inputDirections = vm.inputDirections.toUpperCase();
        _.each(vm.inputDirections, function (nextMove) {
            params.nextMove = nextMove;
            position = TurtleChallengeService.calculateNextPosition(params);
            vm.currentDirection = position.currentDirection;
            vm.currentCell.x = position.x;
            vm.currentCell.y = position.y;
            rotate = (nextMove === "R") ? 90 : -90;
            $("#turtle").css({
                "-webkit-transform": "rotate(" + rotate + "deg)",
                "transition-delay": "1s",
                "transition-duration": "1s"
            });
            $("#turtle").css({
                "-webkit-transform": "translate(" + position.left + "px, " + position.top + "px)",
                "transition-delay": "1s",
                "transition-duration": "1s"
            });
        });
        vm.gridPosition = position;
    }

    /**
     * [reset description - Resets the turtle to its initial position]
     * @method reset
     */
    vm.reset = function () {
        $("#turtle").css({
            "-webkit-transform": "translate(21px,391px)",
            "transition-delay": "1s",
            "transition-duration": "1s"
        });
        //vm.currentDirection = 1;
    }

    /**
     * [restrictInput description - Allow only F-forward, L- left, R- right]
     * @method restrictInput
     * @param  {[type]}      $event [description]
     * @return {[type]}             [description]
     */
    vm.restrictInput = function ($event) {
        var keycode = [76, 70, 82, 13, 20, 16, 8, 17];
        if(_.indexOf(keycode, $event.keyCode) == -1) {
            $event.preventDefault();
        }
    }
}
