/** @jsx React.DOM */
/*jshint unused:false*/

var Router = require('./react-nested-router');
var Route = Router.Route;



var MainView            = require('./mainView.jsx');
var DashBoard           = require('./dashboard.jsx');
var LoginView           = require('./loginView.jsx');
var RegisterView        = require('./registerView.jsx');
var NotFoundView        = require('./notFoundView.jsx');

var routes = (
    /*jshint ignore:start*/
    <Route handler={MainView}>
        <Route path="/" handler={DashBoard} />
        <Route path="/login" handler={LoginView} />
        <Route path="/register" handler={RegisterView} />
    </Route>
    /*jshint ignore:end*/
);
    
    
module.exports = routes;