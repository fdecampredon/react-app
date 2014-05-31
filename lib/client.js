'use strict';

var React       = require('react');
var RRouter     = require('rrouter');
var routes      = require('./views/routes.jsx');


RRouter.start(routes, function(view) {
    React.renderComponent(view, document);
});