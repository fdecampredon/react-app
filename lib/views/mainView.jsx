/** @jsx React.DOM */

'use strict';

var React           = require('react');
var AppHeader       = require('./appHeader.jsx');
var AuthStore       = require('../store/authStore');

var MainView = React.createClass({
    
    render: function() {
        return (
            <div>
                <AppHeader currentUser={ AuthStore.getCurrentUser()} />
                <div className='page-content'>
                    {this.props.contentView}
                </div>
            </div>
        );
    }
});

module.exports = MainView;