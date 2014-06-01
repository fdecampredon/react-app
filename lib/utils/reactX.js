'use strict';


var React                   = require('react');
var url                     = require('url');
var RRouter                 = require('rrouter');
var fetchDataDependencies   = require('rrouter/lib/fetchDataDependencies');
var PathnameRouting         = require('rrouter/lib/routing/PathnameRouting');
var Mustache                = require('mustache');
var serialize               = require('express-state/lib/serialize');

var ReactX = {
    route: function (routes, layout) {
        return function (req, res, next) {
            ReactX.isServer = true;
            ReactX.currentUser = req.user;
            try {
                var path = url.parse(req.url).pathname;
                var match = RRouter.matchRoutes(routes, path);
                fetchDataDependencies(match).then(function (match) {
                    var context = {
                        match: match,
                        routing: new PathnameRouting(routes),
                        routes: routes,
                        isServer: true,
                        currentRequest: req
                    };
                    React.withContext(context, function () {
                        var view = RRouter.createView(match);
                        var markup =  React.renderComponentToString(view);
                        res.send(Mustache.render(layout, {
                            reactView: markup,
                            cache: ReactX.createCache
                        }));
                    });
                });
            } catch (err) {
                return next(err);
            }
        };
    },
    
    init: function () {
        ReactX.isServer = false;
        var cache = window.__ReactXCache__;
        ReactX.currentUser = cache.currentUser;
    },
    
    createCache: function () {
        var cache = {
            currentUser: ReactX.currentUser
        };
        return 'var __ReactXCache__ = ' + serialize(cache);
    }
};

module.exports = ReactX;
