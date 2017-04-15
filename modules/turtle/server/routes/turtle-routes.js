"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var assetmanager = require('assetmanager');

var assets = assetmanager.process({
    assets: require(path.join(__dirname, '../../../../properties/assets.json')),
    debug: (process.env.NODE_ENV !== 'production'),
    webroot: '/'
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Turtle coding challenge ....',
        assets: assets
    });
});

module.exports = router;
