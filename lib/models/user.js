'use strict';

var inherits    = require('../utils/inherits');
var assign      = require('../utils/assign');
var Model       = require('./Model');

function User(data) {
    Model.call(this, data);
}

inherits(User, Model);

User.generateId = function (user) {
    return 'user::' + user.username;
};

User.authenticate = function (username, password, cb) {
    User.find('user::' + username, function (err, user) {
        if (err) {
            return cb(err);
        } else if(!user) {
            return cb(null, null, { message: 'Unknow user ' + username });
        }
        if (password !== user.password) {
            return cb(null, null, { message: 'invalid password' });
        }
        cb(user);
    });
};



assign(User.prototype, {
    toJSON: function () {
        return {
            username: this.username,
            email: this.email,
            password: this.password,
            _type: 'User'
        };
    },
    
    validate: function () {
        var errors = [];
        if (!this.username) {
            errors.push('missing username');
        }
        if (!this.email) {
            errors.push('missing email');
        }
        if (!this.password) {
            errors.push('missing password');
        }
        return errors;
    }
});


module.exports = User;