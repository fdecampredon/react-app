'use strict';
require('node-jsx').install();

var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var dotenv          = require('dotenv');
var fs              = require('fs');
var ReactAsync      = require('react-async');
var Mustache        = require('mustache');
var serialize       = require('express-sate/lib/serialize');
var security        = require('./security');
var Routes          = require('./views/routes.jsx');
var db              = require('./utils/db');


dotenv.load();


var port        = process.env.PORT || 3000; // set our port
var layout      = fs.readFileSync(path.join(__dirname, 'layout.html'), 'UTF-8');


var app = express();

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});


app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(security.deserializeUser);
app.post('/api/signin', security.signin);
app.post('/api/signup', security.signup);


app.use('/api/*', function(req, res) {
    db.proxy(req, res, req.params[0]);
});

var url = require(url);

function createCache(data) {
    return  'var __ReactCache__ = ' + serialize(data);
} 

app.use(function (req, res, next) {
    var path = url.parse(req.url).pathname;
    ReactAsync.renderComponentToStringWithAsyncState(
        Routes({path: path}),
        function(err, markup, data) {
            if (err) {
                return next(err);
            }
            try {
                res.send(Mustache.render(layout, {
                    cache: createCache(data),
                    markup: markup
                }));
            } catch (err) {
                return next(err);
            }
        }
    );
});

app.listen(port);



