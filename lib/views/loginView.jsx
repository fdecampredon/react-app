/** @jsx React.DOM */

'use strict';

var React               = require('react');
var LinkedStateMixin    = require('react/lib/LinkedStateMixin');
var AuthActions         = require('../actions/authActions');
var Router              = require('react-nested-router');

var LoginView = React.createClass({
    mixins: [LinkedStateMixin ],
    getInitialState: function () {
        return {
            username: null,
            password: null
        };
    },
    
    componentWillMount: function ()  {
        AuthActions.login.subscribe(function () {
            Router.transitionTo('/');
        });
    },
    
    onSubmit: function(e) {
        e.preventDefault();
        AuthActions.login(this.state);
    },
    render: function() {
        return (
            <div className="login-page">
                <header className="login-form-header">
                    <h1>Sign In</h1>
                </header>
                <form className="login-form pure-form pure-form-stacked" onSubmit={this.onSubmit} >
                    <fieldset>
                        <label htmlFor="username">Username:</label>
                        <input id="username" type="text" placeholder="Username"
                            valueLink={this.linkState('username')} />

                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" placeholder="Password" 
                            valueLink={this.linkState('password')} />
                              
                        <button type="submit" 
                            className="pure-button pure-button-primary">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
});

module.exports = LoginView;