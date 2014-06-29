/** @jsx React.DOM */

'use strict';

var React               = require('react');
var LinkedStateMixin    = require('react/lib/LinkedStateMixin');
var AuthActions         = require('../actions/authActions');
var Router              = require('react-nested-router').RoutingContextMixin;

var RegisterView = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function () {
        return { };
    },
      
    componentWillMount: function ()  {
        AuthActions.register.subscribe(function () {
            Router.transitionTo('/');
        });
    },
    
    onSubmit: function(e) {
        e.preventDefault();
        AuthActions.register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        });
    },
    
    render: function() {
        return (
            /*jshint ignore:start*/
            <div className="login-page">
                <header className="login-form-header">
                    <h1>Sign Up</h1>
                </header>
                <form className="login-form pure-form pure-form-stacked" onSubmit={this.onSubmit} >
                    <fieldset>
                        <label htmlFor="username">Username:</label>
                        <input id="username" type="text" placeholder="Username"
                            valueLink={this.linkState('username')} />
    
                        <label htmlFor="username">Email:</label>
                        <input id="username" type="text" placeholder="Username"
                            valueLink={this.linkState('email')} />

                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" placeholder="Password" 
                            valueLink={this.linkState('password')} />
                                 
                        <label htmlFor="password">Confirm Password:</label>
                        <input id="password" type="password" placeholder="Password" 
                            valueLink={this.linkState('passwordConfirm')} />
                              
                        <button type="submit" 
                            className="pure-button pure-button-primary">
                            Sign Up
                        </button>
                    </fieldset>
                </form>
            </div>
            /*jshint ignore:end*/                
        );
    }
});

module.exports = RegisterView;