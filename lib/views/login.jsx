/** @jsx React.DOM */

'use strict';

var React               = require('react');
var LinkedStateMixin    = require('react/lib/LinkedStateMixin');
var xhr                 = require('../utils/xhr');

var Login = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function () {
        return {
            username: null,
            password: null
        };
    },
    onSubmit: function(e) {
        e.preventDefault();
        xhr('/login', 'POST', this.state);
        
    },
    render: function() {
        return (
            <div className="login-page">
                <header>
                    <h1>
                        <img src="/images/react-logo.png" />
                        ReactX Task Manager
                        <img src="/images/rxjs-logo.png" />
                    </h1>
                </header>
                <form className="pure-form pure-form-aligned" onSubmit={this.onSubmit} >
                    <fieldset>
                        <div className="pure-control-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" placeholder="Username"
                                valueLink={this.linkState('username')} />
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="Password" 
                                valueLink={this.linkState('password')} />
                        </div>
                        <div className="pure-controls">
                            <button type="submit" 
                                className="pure-button pure-button-primary">
                                Sign in
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
});

module.exports = Login;