/** @jsx React.DOM */

'use strict';

var React           = require('react');
var AppHeader       = require('./appHeader.jsx');
var SessionStore    = require('../store/sessionStore');
var MainView = React.createClass({
    componentWillMount: function () {
        if (this.context.isServer) {
            
        }
    },
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
                        {this.props.content}
                    </div>
                    <script src='/bundle.js' />
                </body>
            </html>
        );
    }
});

module.exports = MainView;