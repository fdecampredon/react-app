var React   = require('react');
var App     = require('./views/app.jsx');


React.renderComponent(App({path: window.location.path}), document);