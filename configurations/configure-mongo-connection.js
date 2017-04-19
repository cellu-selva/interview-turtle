"use strict";
var mongoose = require('mongoose');
var config = require('./../properties/database-properties.js');
module.exports = {
    connectToMongo: function (callback) {
        mongoose.connect(config.mongoUrl + '/' + config.databaseName, function (err) {
            return callback(err);
        });
    }
};
