'use strict';

var xhr = require('../utils/xhr');
var ReactX = require('../utils/ReactX');

var currentUser = ReactX.currentUser;

var AuthStore = {
    getCurrentUser: function () {
        return currentUser;
    },
    
    login: function (credentials) {
        return xhr('/login', 'POST', credentials).then(function (result) {
            if (result.error) {
                throw new Error(result.message);
            } else {
                currentUser = result.user;
            }
        });
    }
};

module.exports = AuthStore;