/**
 * Turtle command challenge  - Test suit
 * @author  selvanathan
 */
var jsdom = require('jsdom').jsdom;

global.document = jsdom("<html ng-app='turtleChallenge'><head><script></script></head><body></body></html>");
global.window = global.document.parentWindow;
global.navigator = window.navigator = {};
global.Node = window.Node;

global.window.mocha = {};
global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;

require('../bower_components/angular/angular');
require('../bower_components/angular-mocks/angular-mocks');
var _ = require('../bower_components/underscore/underscore-min.js');

global.angular = window.angular;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;
global._ = _;
