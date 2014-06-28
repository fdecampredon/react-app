/** @jsx React.DOM */

'use strict';

var React = require('react');

var MainView = React.createClass({
    
    render: function() {
        return (
            /*jshint ignore:start*/
            <div>
                <AppHeader currentUser={ AuthStore.getCurrentUser()} />
                <div className='page-content'>
                    {this.props.activeRoute}
                </div>
            </div>
            /*jshint ignore:end*/
        );
    }
});

module.exports = MainView;