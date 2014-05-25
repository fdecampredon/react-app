/** @jsx React.DOM */

'use strict';

var React = require('react');

var Login = React.createClass({
    render: function() {
        return (
            <form className="pure-form pure-form-aligned">
                <fieldset>
                    <div className="pure-control-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Password" />
                    </div>
                    <div className="pure-controls">
                        <button type="submit" className="pure-button pure-button-primary">Sign in</button>
                    </div>
                </fieldset>
            </form>
        );
    }
});

module.exports = Login;