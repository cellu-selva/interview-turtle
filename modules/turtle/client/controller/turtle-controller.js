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
    vm.obstruclesOnWay = 0;
    vm.gridSize = TurtleChallengeService.gridSize;
    vm.cells = TurtleChallengeService.cells;
    vm.currentCell = {
        x: 1,
        y: 1
    };
    vm.availableDirections = ['W', 'N', 'E', 'S'];
    vm.currentDirection = 1; //1 represents the index of the array. Refer to the availableDirections value. ex 1 = availableDirections[1] = 'W'.

    /**
     * [init description - init method that initiates the grid, obstrucles and the others.]
     * @method init
     * @return {[type]} [description]
     */
    vm.init = function () {
        vm.obstrucles.splice(0);
        vm.cells.splice(0);
        vm.grid.splice(0);
        TurtleChallengeService.generateGrid(vm.gridSize, vm.cells, vm.grid);
        TurtleChallengeService.generateObstrucles(vm.obstrucles, vm.gridSize, vm.grid);
    }

    /**
    cellwidth: vm.cellSize
     * [findObstrucle description - GEts called on grid rendering. ]
     * @method findObstrucle
     * @param  {[type]}      cell [description - current cell that is been rendered]
     * @return {[type - boolean]} [description - returns true if the current cell requesting is an obstrucle or not.]
     */
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
        var index = 1;
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
        trackTurtlePath(1, 1);
        async.eachSeries(vm.inputDirections.split(""), function (nextMove, callback) {
            vm.currentDirection = nextMove !== 'F' ? (vm.currentDirection + directionCode[nextMove]) % 4 : vm.currentDirection;
            if(nextMove === 'F') {
                position = TurtleChallengeService.calculateNextPosition(params, vm.currentDirection);
                if(position.isObstrucle) {
                    vm.obstruclesOnWay++;
                    position.left = params.currentPosition.left;
                    position.top = params.currentPosition.top;
                    position.x = position.previous.x;
                    position.y = position.previous.y;
                }
                params.currentPosition = position;
                vm.currentCell.x = position.x;
                vm.currentCell.y = position.y;
                $("#turtle").css({
                    'left': position.left,
                    'top': position.top,
                });
                trackTurtlePath(position.x, position.y);
            }
            rotateTurtle(vm.currentDirection, callback, index++);
        }, function (err) {
            vm.isDone = true;
            vm.gridPosition = position;
            vm.outputDirections = _.clone(vm.inputDirections);
            vm.inputDirections = "";
            vm.reset();
        });
    }

    function trackTurtlePath(x, y) {
        $timeout(function () {
            $(".x-" + x + ".y-" + y).css({
                'background-color': '#31B0D5'
            });
        }, 3000);
    }

    /**
     * [rotateTurtle description - Rotates the turtle to certain degree with respect to the direction the turtle moves]
     * @method rotateTurtle
     * @param  {[type]}     currentDirection [description]
     * @return {[type]}                      [description]
     */
    function rotateTurtle(currentDirection, callback, index) {
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
        $timeout(function () {
            callback();
        }, 300 * index);

    }

    /**
     * [reset description - Resets the turtle to its initial position]
     * @method reset
     */
    vm.reset = function () {
        $("#turtle").css({
            "-webkit-transform": "translate(0px,0px)",
            "transition-delay": "1s",
            "transition-duration": "1s"
        });
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

/**
 * Filter for generating values form 6 to the max no that is passed to it.
 */
angular.module("turtleChallenge")
    .filter('range', function () {
        return function (input, max) {
            max = parseInt(max);
            for(var i = 6; i < max; i++) {
                input.push(i);
            }
            return input;
        };
    });
