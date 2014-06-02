'use strict';

var Rx  = require('rx');

function getEnumerablePropertyNames(target) {
    var result = [];
    for (var key in target) {
        result.push(key);
    }
    return result;
}


module.exports = function createCommand(cb, thisObject) {
    
    var command = function (arg) {
        return cb.call(thisObject, arg)
            .then(function (res) {
                command.onNext.apply(command, res);
            }, function (err) {
                command.onError.apply(command, err);
            });
    };
    
    getEnumerablePropertyNames(Rx.Subject.prototype).forEach(function (property) {
        command[property] = Rx.Subject.prototype[property];
    });
    Rx.Subject.call(command);
    
    return command;
};






