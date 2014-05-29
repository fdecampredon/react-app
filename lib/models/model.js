'use strict';

var db      = require('./db');
var uuid    = require('node-uuid');
var assign  = require('../utils/assign');


function Model(data) {
    assign(this, data);
}

Model.prototype.validate = function () {
    return [];
};

Model.create = function (data, cb) {
    var model = new Model(data);
    model.id = this.generateId(model);
    var errors = model.validate(model);
    if (errors.length) {
        cb(errors);
    } else {
        db.add(model.id, model.toDocument(), function (err) {
            if (err) {
                cb(err);
            } else {
                cb(null, model);
            }
        });
    }
};

Model.generateId = function () {
    return uuid.v4();
};

Model.update = function (id, data, cb) {
    Model.get(id, function (err, model) {
        if (err) {
            cb(err);
        } else {
            assign(model, data);
            var errors = model.validate(model);
            if (errors.length) {
                cb(errors);
            } else {
                db.set(model.id, model.toDocument(), function (err) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, model);
                    }
                });
            }
        }
    });
};

Model.find = function (id, cb) {
    db.get(id, function (err, result) {
        if (err) {
            console.log(JSON.stringify(err));
            if (err.code === 13) {
                cb(null, null);
            } else {
                cb(err);
            }
        } else {
            var model = new Model(result.value);
            model.id = id;
            cb(null, model);
        }
    });
};

Model.remove = function (id, cb) {
    db.remove(id, function (err) {
        if (err && err.code !== 13) {
            // don't catch the No such Key error
            cb(err);
        } else {
            cb();
        }
    });
};



module.exports = Model;