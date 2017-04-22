/**
 * Turtle challenge - Test suit.
 * @author  selvanathan
 */
var assert = require('chai').assert;
require('./test-helper');
var app = angular.module('turtleChallenge', []);
require('../modules/turtle/client/controller/turtle-controller');
require('../modules/turtle/client/service/model-service');
var data = require('./sample-data');


/**
 * [obstrucles description - unit test case for checking basic functionality for the grid.]
 * @type {Array}
 */
describe('Initialize app and  generate grid, obstrucles, checkForObstrucle ', function () {
    /**
     * Loading the angular appplication
     */
    beforeEach(ngModule('turtleChallenge'));

    /**
     * Unit test case for creating the turtle object from the model.
     */
    it('Should creating turtle model', inject(function (TurtleModel) {
        var turtle = new TurtleModel(1, 1, {
            left: 0,
            top: 0
        }, 1);
        assert.equal(turtle.hasOwnProperty('currentState'), true);
    }));

    /**
     * Unit test case for creating the Grid object from the model.
     */
    it('Should create grid model', inject(function (GridModel) {
        var gridSize = 6,
            cellSize = 100;
        var grid = new GridModel(gridSize, cellSize);
        assert.equal(grid.hasOwnProperty('grid'), true);
    }));


    /**
     * Positive test case for determining the last position of the turtle for the given input.
     */
    it('Expected end position 2,6 of turtle should match with the exact output', inject(function ($controller) {
        var myController = $controller('turtleChallengeController');
        myController.cellSize = 50;
        myController.init();
        myController.inputDirections = "RFFFLFFRFRFLFFFFFF";
        myController.gridModel.grid = data;
        myController.move(myController.cellSize, 1, myController.gridSize);
        assert.equal(myController.turtle.traversedCells[myController.turtle.traversedCells.length - 1].x, 2);
        assert.equal(myController.turtle.traversedCells[myController.turtle.traversedCells.length - 1].y, 6);
    }));

    /**
     * Negative test case for determining the last position of the turtle for the given input.
     */
    it('Expected end position 2,7 of turtle should not match with the exact output', inject(function ($controller) {
        var myController = $controller('turtleChallengeController');
        myController.cellSize = 50;
        myController.init();
        myController.inputDirections = "RFFFLFFRFRFLFFFFFF";
        myController.gridModel.grid = data;
        myController.move(myController.cellSize, 1, myController.gridSize);
        assert.equal(myController.turtle.traversedCells[myController.turtle.traversedCells.length - 1].x, 2);
        assert.notEqual(myController.turtle.traversedCells[myController.turtle.traversedCells.length - 1].y, 9);
    }));

});
