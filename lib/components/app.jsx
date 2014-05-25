/** @jsx React.DOM */

'use strict';

var React       = require('react');
var Router      = require('react-router-component');
var Locations   = Router.Locations;
var Location    = Router.Location ;

var Login = require('./login.jsx');
var Main = require('./main.jsx')

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
                    <section id="react-content">
                        <Locations path={this.props.path}>
                            <Location path="/" handler={Main} />
                            <Location path="/login" handler={Login} />
                        </Locations>
                    </section>
                </body>
            </html>
        );
    }
});

module.exports = App;