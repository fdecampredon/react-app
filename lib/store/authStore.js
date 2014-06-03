'use strict';

var xhr = require('../utils/xhr');
var ReactX = require('../utils/ReactX');

var AuthStore = {
    getCurrentUser: function () {
        return ReactX.currentUser;
    },
    
    login: function (credentials) {
        return xhr('/login', 'POST', credentials).then(function (result) {
            if (result.error) {
                throw new Error(result.message);
            } else {
                ReactX.currentUser = result.user;
            }
        });
    },
    
    register: function (user) {
        return xhr('/register', 'POST', user).then(function (result) {
            if (result.error) {
                throw new Error(result.message);
            } else {
                ReactX.currentUser = result.user;
            }
        });
    }
};

module.exports = AuthStore;