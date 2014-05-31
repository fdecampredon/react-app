'use strict';

//var Rx  = require('rx');
var xhr = require('../utils/xhr');

function SessionStore(currentUser) {
    this.currentUser = currentUser;
}

SessionStore.prototype.login = function (username, password) {
    var self = this;
    return xhr('/login', 'POST', {
        username: username,
        password : password
    }).then(function (user) {
        self.currentUser = user;
    });
};

module.exports = SessionStore;