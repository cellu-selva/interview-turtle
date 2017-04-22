"use strict";

/**
 * Creating the 'Turtle modelling' factory
 * @author  Selvanathan
 */
angular.module("turtleChallenge")
    .factory('TurtleModel', TurtleModel);

/**
 * [$injector description - dependency injection for th 'TurtleModel' factory]
 * @type {Array}
 */
TurtleModel.$injector = [];

/**
 * [TurtleModel description - Angular factory for turtle]
 * @method TurtleModel
 * @return {[type]}               [description]
 */
function TurtleModel() {

    /**
     * [Position description - Position model]
     * @method Position
     * @param  {[type]} position [description]
     */
    var Position = function (position) {
        this.left = position && position.left || 0;
        this.top = position && position.top || 0;
    }

    /**
     * [Coordinate description - Coordinate model]
     * @method Coordinate
     * @param  {[type]}   x        [description - current cells x Coordinate]
     * @param  {[type]}   y        [description - current cells y Coordinate]
     * @param  {[type]}   gridSize [description - Grids size (matrix size)]
     */
    var Coordinate = function (x, y, gridSize) {
        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * [turtle description - Turte model]
     * @method turtle
     * @param  {[type]} x         [description - turtles current cell's x-coordinate]
     * @param  {[type]} y         [description - turtles current cell's y-coordinate]
     * @param  {[type]} position  [description - turtles current cell's top and left pixel coordinates]
     * @param  {[type]} direction [description - turtles facing direction with respect to the grid]
     * @param  {[type]} gridSize  [description - Grids size (matrix size)]
     * @return {[type]}           [description]
     */
    var turtle = function (x, y, position, direction, gridSize) {
        var self = this;
        var State = function (x, y, direction, position) {
            this.coordinate = new Coordinate(x, y, gridSize);
            this.direction = direction;
            this.position = new Position(position);
        }
        self.currentState = new State(x, y, direction, position);
        self.nextState = new State(x, y, direction, position);
        self.obstruclesHit = [];
        self.traversedCells = [];
        this.State = State;
        self.getNextState = function (cellwidth, directions, gridSize, grid) {
            if(directions[this.currentState.direction] === 'East' && this.nextState.coordinate.y + 1 <= parseInt(gridSize)) {
                this.nextState.position.left += cellwidth;
                this.nextState.coordinate.y += 1;
            } else if(directions[this.currentState.direction] === 'North' && this.nextState.coordinate.x + 1 <= parseInt(gridSize)) {
                this.nextState.position.top -= cellwidth;
                this.nextState.coordinate.x += 1;
            } else if(directions[this.currentState.direction] === 'West' && this.nextState.coordinate.y - 1 >= 1) {
                this.nextState.position.left -= cellwidth;
                this.nextState.coordinate.y -= 1;
            } else if(directions[this.currentState.direction] === 'South' && this.nextState.coordinate.x - 1 >= 1) {
                this.nextState.position.top += cellwidth;
                this.nextState.coordinate.x -= 1;
            }
            this.nextState.coordinate = _.clone(grid[parseInt(gridSize) - this.nextState.coordinate.x][this.nextState.coordinate.y - 1]);
        }

        /**
         * [checkForObstrucle description - checks if the current move is obstrucle.
         * if so reverts the calculation done else adds the cuurent movement to the
         * traversed cell array for rendering use.]
         * @method checkForObstrucle
         * @return {[type]}          [description]
         */
        self.checkForObstrucle = function () {
            var index;
            if(this.nextState.coordinate.isObstrucle !== "obstrucle") {
                this.currentState.coordinate.x = this.nextState.coordinate.x;
                this.currentState.coordinate.y = this.nextState.coordinate.y;
                this.currentState.coordinate.left = this.nextState.position.left;
                this.currentState.coordinate.top = this.nextState.position.top;
                this.currentState.position = _.clone(this.nextState.position);
                this.currentState.coordinate.direction = this.currentState.direction;
                this.currentState.coordinate.traversedCount++;
                this.traversedCells.push(this.currentState.coordinate);
            } else {
                this.obstruclesHit.push(this.currentState.coordinate);
            }
        }
    }
    return turtle;
}


angular.module("turtleChallenge")
    .factory('GridModel', GridModel);

/**
 * [$injector description - dependency injection for th 'GridModel' factory]
 * @type {Array}
 */
GridModel.$injector = [];

/**
 * [GridModel description - Angular factory for turtle]
 * @method GridModel
 * @return {[type]}               [description]
 */
function GridModel() {
    /**
     * [grid description - Grid Model]
     * @method grid
     * @param  {[type]} gridSize [description - Grid size ]
     * @param  {[type]} cellSize [description - individual cell width in pixel]
     * @return {[type]}          [description]
     */
    var grid = function (gridSize, cellSize) {
        this.cells = [];
        this.grid = [];
        this.cellSize = cellSize;

        /**
         * [Cell description - Hold individual cell description]
         * @method Cell
         * @param  {[type]} x         [description - cell's x-coordinate]
         * @param  {[type]} y         [description - cell's y-coordinate]
         * @param  {[type]} gridSize  [description - grid size]
         * @param  {[type]} obstrucle [description - holds the obstrucle cell's index]
         */
        var Cell = function (x, y, gridSize, obstrucle) {
            this.x = parseInt(x) || 0;
            this.y = parseInt(y) || 0;
            this.traversedCount = 0;
            this.isObstrucle = obstrucle === y ? 'obstrucle' : 'normal';
            this.isOnEdge = x === 1 || y === 1 || x === gridSize || y === gridSize ? true : false
        };

        for(var rowIndex = gridSize; rowIndex >= 1; rowIndex--) {
            this.cells = [];
            var obstrucle = _.random(rowIndex === 1 ? 3 : 2, gridSize) - 1;
            for(var columnIndex = 1; columnIndex <= gridSize; columnIndex++) {
                this.cells.push(new Cell(rowIndex, columnIndex, gridSize, obstrucle));
            }
            this.grid.push(this.cells);
        }
    }
    return grid;
}
