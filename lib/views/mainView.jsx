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
            currentUser = this.context.currentRequest.user;
            console.log(currentUser);
        }
        return (
            <div>
                <AppHeader currentUser={currentUser} />
                <div className='page-content'>
                    {this.props.contentView}
                </div>
            </div>
        );
    }
});

module.exports = MainView;