'use strict';
var mongoose = require('mongoose');

/**
 * [ description - Database configurations]
 * @type {Object}
 */
module.exports = {
    databaseName: 'turtle',
    applicationName: 'turtle-code-challenge',
    userName: 'selvanarthan',
    passsword: 'test1234',
    mongoUrl: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost')
};
