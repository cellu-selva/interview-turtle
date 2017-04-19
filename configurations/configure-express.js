"use strict";

var express = require('express'),
    path = require('path'),
    consolidate = require('consolidate'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    assetmanager = require('assetmanager');
var configureDatabase = require(path.join(__dirname, '/configure-mongo-connection.js')),
    enviroProperties = require(path.join(__dirname, '/../properties/environment-properties.js')),
    expressProperties = require(path.join(__dirname, '/../properties/express-properties.js'));
var turtleRoute = require('./../modules/turtle/server/routes/turtle-routes');
var app = express();

app.use(logger('dev'));
app.set('showStackError', expressProperties.showStackError);
app.locals.pretty = expressProperties.localPretty;
app.locals.cache = expressProperties.localCache;
app.engine('html', consolidate[expressProperties.templateEngine]);
app.set('views', path.join(__dirname, '../' + expressProperties.views));
app.set('view engine', expressProperties.viewEngine);

//app.set('superSecret', expressProperties.secret);
app.use(logger('dev'));
app.use(bodyParser.json(expressProperties.bodyParser.json));
app.use(bodyParser.urlencoded(expressProperties.bodyParser.urlencoded));
app.use('/bower_components', express.static(expressProperties.root + '/' + expressProperties.bowerComponents));
app.use(express.static(expressProperties.root));
app.use('/', turtleRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * [error handler]
 * @type {[type]}
 */

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * [Mongo description - Establishing mongo connection. ]
 * @type {[type]}
 */
configureDatabase.connectToMongo(function (err) {
    if(err) {
        console.log("Error Connecting Mongo :: ", err);
    } else {
        console.log("Successfully connected to mongo");
    }
});
module.exports = app;
