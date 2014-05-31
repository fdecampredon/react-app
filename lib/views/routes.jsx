/** @jsx React.DOM */

var RRouter = require('rrouter');
var Routes  = RRouter.Routes;
var Route   = RRouter.Route;



var DashBoard            = require('./dashboard.jsx');
var LoginView           = require('./loginView.jsx');
var RegisterView        = require('./registerView.jsx');
var NotFoundView        = require('./notFoundView.jsx');

var routes = (
    <Routes>
        <Route path="/" view={DashBoard} />
        <Route path="/login" view={LoginView} />
        <Route path="/register" view={RegisterView} />
    </Routes>
);
    
    
module.exports = routes;