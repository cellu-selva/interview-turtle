"use strict";
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    turtleSchema, position;

/**
 * [positionSchema]
 * @type {Schema}
 */
positionSchema = new Schema({
    startIndex: {
        type: Number
    },
    endIndex: {
        type: Number
    }
});

/**
 * [gridSchema ]
 * @type {Schema}
 */
gridSchema = new Schema({
    size: {
        type: Number
    },
    obstrucles: [positionSchema],
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date
    }
});

mongoose.model('Grid', gridSchema);

/**
 * [movementSchema ]
 * @type {Schema}
 */
movementSchema = new Schema({
    input: {
        type: String
    },
    success: [positionSchema],
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date
    }
});

mongoose.model('Movement', movementSchema);


/**
 * [turtleSchema ]
 * @type {Schema}
 */
turtleSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    currentPosition: [positionSchema],
    color: {
        type: String
    },
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date
    },
    grid: {
        type: Schema.ObjectId,
        ref: 'Grid'
    },
    moves: {
        type: Schema.ObjectId,
        ref: 'Movement'
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
