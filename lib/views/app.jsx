/** @jsx React.DOM */

'use strict';

var React       = require('react');
var Router      = require('react-router-component');
var Locations   = Router.Locations;
var Location    = Router.Location ;
var NotFound    = Router.NotFound ;

var Login           = require('./login.jsx');
var Main            = require('./main.jsx');
var NotFoundView    = require('./notFound.jsx');

var App = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>Task Manager</title>
                    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0-rc-1/pure-min.css" />
                    <link rel='stylesheet' href='/style.css' />
                </head>
                <body>
                    <header className="site-header">
                        <div className="page-content pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right">
                            <a href="/" className="pure-menu-heading"><h1>React Task Manager</h1></a>
                            <ul>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/register">Register</a></li>
                            </ul>
                        </div>
                        
                    </header>
                    
                    <Locations className='page-content' path={this.props.path}>
                        <Location path="/" handler={Main} />
                        <Location path="/login" handler={Login} />
                        <NotFound handler={NotFoundView} />
                    </Locations>
                    <script src='/bundle.js' />
                </body>
            </html>
        );
    }
});

module.exports = App;