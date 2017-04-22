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
turtleChallengeController.$injector = ['TurtleModel', 'GridModel'];

/**
 * [turtleChallengeController description - Actual 'turtleChallengeController' controller.]
 * @method turtleChallengeController
 * @return {[type]}                  [description]
 */
function turtleChallengeController(TurtleModel, GridModel) {
    var vm = this;
    vm.gridSize = 6;
    vm.availableDirections = ['West', 'North', 'East', 'South'];

    /**
     * [init description - initialed the application's grid creation and turtle creation]
     * @method init
     * @return {[type]} [description]
     */
    vm.init = function () {
        vm.turtle = new TurtleModel(1, 1, vm.position, 1);
        vm.gridModel = new GridModel(vm.gridSize, vm.cellSize);
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

    /**
     * [move description]
     * @method move
     * @return {[type]} [description]
     */
    vm.move = function (cellSize, direction, gridSize) {
        var directionCode = {
            'R': 1,
            'L': -1
        };
        vm.inputDirections = vm.inputDirections.toUpperCase();
        //Comment this line while running test case
        vm.turtle.currentState.position = angular.element('#turtle').position();
        //uncomment the following line while running test case
        //vm.turtle.currentState.position = {
        //    left: 0,
        //    top: 0
        //};
        vm.turtle.traversedCells.push(_.clone(vm.gridModel.grid[parseInt(gridSize) - 1][0]));
        _.each(vm.inputDirections.split(""), function (nextMove) {
            vm.turtle.nextState = new vm.turtle.State(vm.turtle.currentState.coordinate.x, vm.turtle.currentState.coordinate.y, vm.turtle.currentState.direction, vm.turtle.currentState.position);
            vm.turtle.currentState.coordinate = _.clone(vm.gridModel.grid[parseInt(gridSize) - vm.turtle.currentState.coordinate.x][vm.turtle.currentState.coordinate.y - 1])
            vm.turtle.nextState.direction = nextMove !== 'F' ? (vm.turtle.nextState.direction + getMoves(nextMove)) % 4 : vm.turtle.nextState.direction;
            if(nextMove === 'F') {
                vm.turtle.getNextState(vm.cellSize, vm.availableDirections, vm.gridSize, vm.gridModel.grid);
            }
            vm.turtle.checkForObstrucle();
            vm.turtle.currentState.direction = vm.turtle.nextState.direction;
        });
        return true;
    }

    function getMoves(nextMove) {
        return nextMove === 'L' ? 3 : 1;
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
