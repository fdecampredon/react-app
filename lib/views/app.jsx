/** @jsx React.DOM */

'use strict';

var React       = require('react');
var Router      = require('react-router-component');
var Locations   = Router.Locations;
var Location    = Router.Location ;
var NotFound    = Router.NotFound ;


var AppHeader   = require('./appHeader.jsx');

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
                    <AppHeader />
                    <div className='page-content'>
                        {this.props.children}
                    </div>
                    <script src='/bundle.js' />
                </body>
            </html>
        );
    }
});

module.exports = App;