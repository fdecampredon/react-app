/** @jsx React.DOM */

'use strict';

var React = require('react');

var NotFound = React.createClass({
    render: function() {
        return (
            <h1>404 Not found</h1>
        );
    }
});

module.exports = NotFound;