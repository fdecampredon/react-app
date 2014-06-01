'use strict';

var React       = require('react');
var RRouter     = require('rrouter');
var routes      = require('./views/routes.jsx');
var ReactX      = require('./utils/reactX');

ReactX.init();


RRouter.start(routes, function(view) {
    React.renderComponent(view, document.getElementById('react-view'));
});
