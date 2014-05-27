'use strict';
var xhr = require('../utils/xhr');

var AuthStore = {
    login: function (username, password) {
        var self = this;
        return xhr('/login', 'POST', {
            username: username,
            password : password
        }).then(function (user) {
            self.currentUser = user;
        });
    }
};

module.exports = AuthStore;