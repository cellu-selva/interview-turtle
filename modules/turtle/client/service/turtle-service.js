"use strict";

/**
 * Creating the 'turtleChallengeService' service
 * @author  Selvanathan
 */
angular.module("turtleChallenge")
    .service('TurtleChallengeService', turtleChallengeService);

/**
 * [$injector description - dependency injection for th 'turtleChallengeService' service]
 * @type {Array}
 */
turtleChallengeService.$injector = [];

/**
 * [turtleChallengeService description - Angular service for turtle service]
 * @method turtleChallengeService
 * @return {[type]}               [description]
 */
function turtleChallengeService() {
    var self = this;
    var availableDirections = ['W', 'N', 'E', 'S'];
    self.obstrucles = [];
    self.grid = [];
    self.cells = [];

    /**
     * [generateGrid description - Created a n * n grid.]
     * @method generateGrid
     * @param  {[type]}     size  [description]
     * @param  {[type]}     cells [description]
     * @param  {[type]}     grid  [description]
     * @return {[type]}           [description]
     */
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


    /**
     * [generateObstrucles description - Generates the obstrucles.]
     * @method generateObstrucles
     * @param  {[type]}           cells      [description]
     * @param  {[type]}           obstrucles [description]
     * @param  {[type]}           size       [description]
     * @param  {[type]}           grid       [description]
     * @return {[type]}                      [description]
     */
    self.generateObstrucles = function (obstrucles, size, grid) {
        var min = 2,
            max = size * size;
        for(var index = 1; index <= size; index++) {
            min = index === 1 ? 3 : 2;
            obstrucles.push(grid[index - 1][_.random(min, size) - 1])
        }
    }

    /**
     * [checkForObstrucle description - used to check for the obstrucles]
     * @method checkForObstrucle
     * @param  {[type]}          position   [description]
     * @param  {[type]}          obstrucles [description]
     * @return {[type]}                     [description]
     */
    self.checkForObstrucle = function (position, obstrucles) {
        return _.findIndex(obstrucles, {
            x: position.x,
            y: position.y
        }) > -1 ? true : false;
    }

    /**
     * [calculateNextPosition description - Calculates the next position form the current given position]
     * @method calculateNextPosition
     * @param  {[type]}              params [description]
     * @return {[type]}                     [description]
     */
    self.calculateNextPosition = function (params, currentDirection) {
        var newPosition = {
            isObstrucle: false,
            previous: {
                x: params.currentCell.x,
                y: params.currentCell.y
            },
            left: params.currentPosition.left,
            top: params.currentPosition.top
        };
        if(availableDirections[currentDirection] === 'E' && params.currentCell.y + 1 <= params.gridSize) {
            newPosition.left = params.currentPosition.left + params.cellwidth;
            newPosition.x = params.currentCell.x;
            newPosition.y = params.currentCell.y + 1;
        } else if(availableDirections[currentDirection] === 'N' && params.currentCell.x + 1 <= params.gridSize) {
            newPosition.top = params.currentPosition.top - params.cellwidth;
            newPosition.x = params.currentCell.x + 1;
            newPosition.y = params.currentCell.y;
        } else if(availableDirections[currentDirection] === 'W' && params.currentCell.y - 1 >= 1) {
            newPosition.left = params.currentPosition.left - params.cellwidth;
            newPosition.x = params.currentCell.x;
            newPosition.y = params.currentCell.y - 1;
        } else if(availableDirections[currentDirection] === 'S' && params.currentCell.x - 1 >= 1) {
            newPosition.top = params.currentPosition.top + params.cellwidth;
            newPosition.x = params.currentCell.x - 1;
            newPosition.y = params.currentCell.y;
        }
        newPosition.isObstrucle = self.checkForObstrucle(newPosition, self.obstrucles) ? true : false;
        return newPosition;
    }
}
