'use strict';

var React       = require('react');
var url         = require('url');
var RRouter     = require('rrouter');
var fetchDataDependencies = require('rrouter/lib/fetchDataDependencies');
var PathnameRouting = require('rrouter/lib/routing/PathnameRouting');

    
function reactRouter(App, routes) {
    return function (req, res, next) {
        try {
            var path = url.parse(req.url).pathname;
            var match = RRouter.matchRoutes(routes, path);
            fetchDataDependencies(match).then(function (match) {
                var context = {
                    match: match,
                    routing: new PathnameRouting(routes),
                    routes: routes
                };
                React.withContext(context, function () {
                    var app = App(null, RRouter.createView(match));
                    res.send(React.renderComponentToString(app));
                });
            });
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = reactRouter;