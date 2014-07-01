/** @jsx React.DOM */
/*jshint unused:false*/

var React               = require('react');
var Route               = require('react-nested-router').Route;
var MainView            = require('./mainView.jsx');
var DashBoard           = require('./dashboard.jsx');
var LoginView           = require('./loginView.jsx');
var RegisterView        = require('./registerView.jsx');
var NotFoundView        = require('./notFoundView.jsx');

var Routes = React.createComponent({
   render: function () {
        return (
            <Route handler={MainView} path={this.props.path} >
                <Route path="/" handler={DashBoard} />
                <Route path="/login" handler={LoginView} />
                <Route path="/register" handler={RegisterView} />
            </Route>
        );
   } 
});
    
module.exports = Routes;