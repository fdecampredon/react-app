var React       = require('react');
var RRouter     = require('rrouter');
var App         = require('./views/app.jsx');
var routes      = require('./views/routes.jsx');


RRouter.start(routes, function(view) {
    React.renderComponent(App(null, view), document);
})