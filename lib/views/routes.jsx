/** @jsx React.DOM */

var RRouter = require('rrouter');
var Routes  = RRouter.Routes;
var Route   = RRouter.Route;



var MainView            = require('./mainView.jsx');
var DashBoard           = require('./dashboard.jsx');
var LoginView           = require('./loginView.jsx');
var RegisterView        = require('./registerView.jsx');
var NotFoundView        = require('./notFoundView.jsx');

var routes = (
    <Routes view={MainView}>
        <Route path="/" content={DashBoard} />
        <Route path="/login" content={LoginView} />
        <Route path="/register" content={RegisterView} />
    </Routes>
);
    
    
module.exports = routes;