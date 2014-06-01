/** @jsx React.DOM */

'use strict';

var React           = require('react');
var AppHeader       = require('./appHeader.jsx');
var SessionStore    = require('../store/sessionStore');
var MainView = React.createClass({
    contextTypes: {
      isServer: React.PropTypes.bool,
      currentRequest : React.PropTypes.object
    },
    
    render: function() {
        var currentUser;
        if (this.context.isServer) {
            var currentUser = this.context.currentRequest.user;
            console.log(currentUser);
        } else {
            var currentUser = null;
        }
        return (
            <html>
                <head>
                    <title>Task Manager</title>
                    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0-rc-1/pure-min.css" />
                    <link rel='stylesheet' href='/style.css' />
                </head>
                <body>
                    <AppHeader currentUser={currentUser} />
                    <div className='page-content'>
                        {this.props.contentView}
                    </div>
                    <script src='/bundle.js' />
                </body>
            </html>
        );
    }
});

module.exports = MainView;