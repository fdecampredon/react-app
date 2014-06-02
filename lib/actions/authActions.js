'use strict';

var AuthStore       = require('../store/authStore');
var createCommand   = require('../utils/rxCommand');

var AuthActions = {
    login: createCommand(AuthStore.login)
};


module.exports = AuthActions;