/**
 * Turtle challenge - Test suit.
 * @author  selvanathan
 */
var assert = require('chai').assert;
require('./test-helper');
var app = angular.module('turtleChallenge', []);
require('../modules/turtle/client/service/turtle-service');

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
     * Unit test case for checking the default grid size is 6 equals the expected.
     */
    it('grid size should be equal to 6', inject(function (TurtleChallengeService) {
        assert.equal(TurtleChallengeService.gridSize, 6);
    }));

    /**
     * Test suit for checking whether the no of cells generated for default grid size equals the expected.
     */
    it('Generating cells for 6 x 6 grid', inject(function (TurtleChallengeService) {
        TurtleChallengeService.generateGrid(TurtleChallengeService.gridSize, TurtleChallengeService.cells, TurtleChallengeService.grid);
        assert.equal(TurtleChallengeService.gridSize * TurtleChallengeService.gridSize, TurtleChallengeService.cells && TurtleChallengeService.cells.length);
    }));

    /**
     * Test suit for checking whether the no of obstrucles generated for default grid size equals the expected.
     */
    it('Generating obstrucles for 6 x 6 grid', inject(function (TurtleChallengeService) {
        var obstrucles = [];
        TurtleChallengeService.generateGrid(TurtleChallengeService.gridSize, TurtleChallengeService.cells, TurtleChallengeService.grid);
        TurtleChallengeService.generateObstrucles(TurtleChallengeService.obstrucles, TurtleChallengeService.gridSize, TurtleChallengeService.grid);
        assert.equal(TurtleChallengeService.gridSize, TurtleChallengeService.obstrucles && TurtleChallengeService.obstrucles.length);
    }));

    /**
     * Test suit for checking whether the [1, 1] cell is not an obstrucles.
     */
    it('Check whether [1,1] cell is and obstrucle. (Not an obstrucle)', inject(function (TurtleChallengeService) {
        var obstrucles = [];
        TurtleChallengeService.generateGrid(TurtleChallengeService.gridSize, TurtleChallengeService.cells, TurtleChallengeService.grid);
        TurtleChallengeService.generateObstrucles(TurtleChallengeService.obstrucles, TurtleChallengeService.gridSize, TurtleChallengeService.grid);
        assert.equal(TurtleChallengeService.checkForObstrucle({
            x: 1,
            y: 1
        }, TurtleChallengeService.obstrucles), false);
    }));

    /**
     * Test suit for checking whether the [4, 1] cell is an obstrucles.
     */
    it('Check whether [4,1] cell is and obstrucle. (should be an obstrucle)', inject(function (TurtleChallengeService) {
        var obstrucles = [];
        // TurtleChallengeService.generateGrid(TurtleChallengeService.gridSize, TurtleChallengeService.cells, TurtleChallengeService.grid);
        // TurtleChallengeService.generateObstrucles(TurtleChallengeService.obstrucles, TurtleChallengeService.gridSize, TurtleChallengeService.grid);
        TurtleChallengeService.obstrucles.push({
            x: 4,
            y: 1
        });
        assert.equal(TurtleChallengeService.checkForObstrucle({
            x: 4,
            y: 1
        }, TurtleChallengeService.obstrucles), true);
    }));

});
