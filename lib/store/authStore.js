'use strict';

//var Rx  = require('rx');
var xhr = require('../utils/xhr');
var ReactX = require('../utils/ReactX');

function AuthStore() {
    this.currentUser = ReactX.currentUser;
}

AuthStore.prototype.login = function (username, password) {
    var self = this;
    return xhr('/login', 'POST', {
        username: username,
        password : password
    }).then(function (user) {
        self.currentUser = user;
    });
};

module.exports = AuthStore;