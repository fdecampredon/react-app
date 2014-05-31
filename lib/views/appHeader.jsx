/** @jsx React.DOM */

'use strict';

var React       = require('react');

var AppHeader = React.createClass({
    render: function () {
        var nav = this.props.currentUser ? (
                <ul>
                    <li><a href="/projects">Login</a></li>
                    <li><a href="/tasks">Register</a></li>    
                </ul>
            ) : (
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>    
                </ul>
            );
        
        return (
            <header className="site-header">
                <div className="page-content pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right">
                    <a href="/" className="pure-menu-heading"><h1>React Task Manager</h1></a>
                    {nav}
                </div>
            </header>
        );
    }
});

module.exports = AppHeader;