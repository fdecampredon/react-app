'use strict';
var xhr = require('../utils/xhr');


var AuthStore = {
    login: function (username, password) {
        xhr('/login', 'POST', {
            username: username,
            password : password
        }).then(function (user) {
            this.currentUser = user;
        }.bind(this));
    }
};

module.exports = AuthStore;