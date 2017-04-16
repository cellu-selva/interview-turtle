"use strict";


angular.module("turtleChallenge")
    .service('TurtleChallengeService', turtleChallengeService);

turtleChallengeService.$injector = [];


function turtleChallengeService() {
    var self = this;
    var availableDirections = ['W', 'N', 'E', 'S'];
    self.obstrucle = [];
    self.grid = [];
    self.cells = [];

    self.generateGrid = function (size, cells, grid) {
        var min = 2,
            max = size;
        cells.splice();
        for(var rowIndex = 1; rowIndex <= size; rowIndex++) {
            for(var columnIndex = 1; columnIndex <= size; columnIndex++) {
                cells.push({
                    x: rowIndex,
                    y: columnIndex
                });
            }
        }
        for(var index = 1; index <= size; index++) {
            grid.push(_.where(cells, {
                x: index
            }));
        }
        grid.reverse();
    }


    self.generateObstrucles = function (cells, obstrucle, size, grid) {
        var min = 1,
            max = size * size;
        for(var index = 1; index <= size; index++) {
            min = index === size ? 3 : 1;
            obstrucle.push(grid[index - 1][_.random(min, size) - 1])
        }
    }

    self.checkForObstrucle = function (direction, currentPosition) {

    }

    self.calculateNextPosition = function (currentCell, currentDirection, nextMove) {
        var directionCode = {
            'R': 1,
            'L': -1
        };
        nextMove !== 'F' ? availableDirections[(currentDirection % 4) + (directionCode[nextMove])] : currentDirection;
        console.log(nextMove);
    }
}
