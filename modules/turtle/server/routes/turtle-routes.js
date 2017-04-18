"use strict";
/**
 * Router - turtleChallenge router
 * @author  selvanathan
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var assetmanager = require('assetmanager');

//Bundles up the assets that are given in the asset json file
var assets = assetmanager.process({
    assets: require(path.join(__dirname, '../../../../properties/assets.json')),
    debug: (process.env.NODE_ENV !== 'production'),
    webroot: '/'
});

/* Returns home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Turtle coding challenge ....',
        assets: assets
    });
});

module.exports = router;
