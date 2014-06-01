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
    <Routes >
        <Routes view={MainView}>
            <Route path="/" contentView={DashBoard} />
            <Route path="/login" contentView={LoginView} />
            <Route path="/register" contentView={RegisterView} />
        </Routes>
    </Routes>
);
    
    
module.exports = routes;