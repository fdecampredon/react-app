'use strict';
function assign(target, items)  {
    items = [].slice.call(arguments, 1);
    return items.reduce(function (target, source) {
        return Object.keys(source).reduce(function (target, key) {
            target[key] = source[key];
            return target;
        }, target);
    }, target);
}

module.exports = assign;