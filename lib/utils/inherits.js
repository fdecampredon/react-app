'use strict';

var assign = require('./assign');

function inherits(constructor, superConstructor) {
    constructor.prototype = Object.create(superConstructor.prototype, {
        constructor: {
            value: constructor,
            writable: true,
            configurable : true,
            enumerable : false
        }
    });
    assign(constructor, superConstructor);
}

module.exports = inherits;