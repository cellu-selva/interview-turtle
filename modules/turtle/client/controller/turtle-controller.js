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
        var directionCode = {
                'R': 1,
                'L': -1
            },
            position = $("#turtle").position(), //Holds the current position of the turtle.
            params = {
                currentPosition: position,
                currentCell: vm.currentCell,
                gridSize: vm.gridSize,
                cellwidth: vm.cellSize
            };
        vm.inputDirections = vm.inputDirections.toUpperCase();
        async.eachSeries(vm.inputDirections.split(""), function (nextMove, callback) {
            vm.currentDirection = nextMove !== 'F' ? (vm.currentDirection + directionCode[nextMove]) % 4 : vm.currentDirection;
            if(nextMove === 'F') {
                position = TurtleChallengeService.calculateNextPosition(params, vm.currentDirection);
                if(position.isObstrucle) {
                    position.left = $("#turtle").position().left;
                    position.top = $("#turtle").position().top;
                    position.x = position.previous.x;
                    position.y = position.previous.y;
                }
                params.currentPosition = position;
                vm.currentCell.x = position.x;
                vm.currentCell.y = position.y;
                $("#turtle").css({
                    'left': position.left,
                    'top': position.top
                });
            }
            rotateTurtle(vm.currentDirection);
            $timeout(function () {
                callback();
            }, 1000);
        }, function (err) {
            console.log('done');
        });
        vm.gridPosition = position;
    }

    /**
     * [rotateTurtle description - Rotates the turtle to certain degree with respect to the direction the turtle moves]
     * @method rotateTurtle
     * @param  {[type]}     currentDirection [description]
     * @return {[type]}                      [description]
     */
    function rotateTurtle(currentDirection) {
        var rotateDeg = {
            'N': 0,
            'E': 90,
            'S': 180,
            'W': 360
        };
        $("#turtle").css({
            "-webkit-transform": "rotate(" + rotateDeg[vm.availableDirections[currentDirection]] + "deg)",
            "transition-delay": "1s",
            "transition-duration": "1s"
        });
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
