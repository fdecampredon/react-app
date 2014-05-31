/** @jsx React.DOM */

var RRouter = require('rrouter');
var Routes  = RRouter.Routes;
var Route   = RRouter.Route;



var MainView            = require('./mainView.jsx');
var LoginView           = require('./loginView.jsx');
var RegisterView        = require('./registerView.jsx');
var NotFoundView        = require('./notFoundView.jsx');

var routes = (
    <Routes>
        <Route path="/" view={MainView} />
        <Route path="/login" view={LoginView} />
        <Route path="/register" view={RegisterView} />
    </Routes>
);
    
    
module.exports = routes;