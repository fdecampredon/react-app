'use strict';

var Promise = require('bluebird');

function xhr(url, method, args) {
    if (typeof method === 'undefined') {
        method = 'GET';
    }
    // Renvoie une nouvelle promesse.
    return new Promise(function(resolve, reject) {
        // Fais le boulot XHR habituel
        var req = new XMLHttpRequest();
        req.open(method, url);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function(e) {
            reject(Error(e));
        };

        req.send(args? JSON.stringify(args) : undefined);
        
    }).then(JSON.parse);
}

module.exports = xhr;
