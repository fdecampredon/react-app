'use strict';

var db = require('./db');
var uuid = require('node-uuid');
var assign = require('../assign');


function User(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName= data.lastName;
}

User.prototype.toDocument = function () {
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        _type: 'User'
    };
};

User.prototype.validate = function () {
    var errors = [];
    if (!this.username) {
        errors.push('missing username');
    } else if (!this.password) {
        errors.push('missing password');
    }
    return errors;
};

User.create = function (data, cb) {
    var user = new User(data);
    user.id = uuid.v4();
    var errors = user.validate(user);
    if (errors.length) {
        cb(errors);
    } else {
        db.add(user.id, user.toDocument(), function (err) {
            if (err) {
                cb(err);
            } else {
                cb(null, user);
            }
        });
    }
};

User.update = function (id, data, cb) {
    User.get(id, function (err, user) {
        if (err) {
            cb(err);
        } else {
            assign(user, data);
            var errors = user.validate(user);
            if (errors.length) {
                cb(errors);
            } else {
                db.set(user.id, user.toDocument(), function (err) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, user);
                    }
                });
            }
        }
    });
};

User.get = function (id, cb) {
    db.get(id, function (err, data) {
        if (err) {
            cb(err);
        } else {
            var user = new User(data);
            user.id = id;
            cb(null, user);
        }
    });
};

User.remove = function (id, cb) {
    db.remove(id, function (err) {
        if (err && err.code !== 13) {
            // don't catch the No such Key error
            cb(err);
        } else {
            cb();
        }
    });
};



module.exports = User;