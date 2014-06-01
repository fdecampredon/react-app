'use strict';

var React       = require('react');
var url         = require('url');
var RRouter     = require('rrouter');
var fetchDataDependencies = require('rrouter/lib/fetchDataDependencies');
var PathnameRouting = require('rrouter/lib/routing/PathnameRouting');

    
function reactRouter(routes) {
    return function (req, res, next) {
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
                    res.send(React.renderComponentToString(view));
                });
            });
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = reactRouter;