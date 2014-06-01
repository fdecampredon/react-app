/** @jsx React.DOM */

'use strict';

var React           = require('react');
var AppHeader       = require('./appHeader.jsx');
var AuthStore       = require('../store/authStore');

var MainView = React.createClass({
    componentWillMount: function () {
        this.authStore = new AuthStore()
    },
    
    render: function() {
        return (
            <div>
                <AppHeader currentUser={ this.authStore.currentUser} />
                <div className='page-content'>
                    {this.props.contentView}
                </div>
            </div>
        );
    }
});

module.exports = MainView;