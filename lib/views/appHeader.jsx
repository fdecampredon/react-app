/** @jsx React.DOM */

'use strict';

var React       = require('react');
var RRouter     = require('rrouter');
var Link        = RRouter.Link;

var AppHeader = React.createClass({
    render: function () {
        var nav = this.props.currentUser ? (
                <ul>
                    <li><Link href="/projects">Tasks</Link></li>
                    <li><Link href="/tasks">Projects</Link></li>
                </ul>
            ) : (
                <ul>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/register">Register</Link></li>    
                </ul>
            );
        
        return (
            <header className="site-header">
                <div className="page-content pure-menu pure-menu-open pure-menu-horizontal pure-menu-pull-right">
                    <Link href="/" className="pure-menu-heading"><h1>React Task Manager</h1></Link>
                    {nav}
                </div>
            </header>
        );
    }
});

module.exports = AppHeader;