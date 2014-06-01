'use strict';

var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var dotenv          = require('dotenv');


dotenv.load();


var port = process.env.PORT || 3000; // set our port
var secretKey = process.env.SECRET_KEY || 'secret-key';


var app = express();
app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser(secretKey));
app.use(session());

app.use(express.static(path.join(__dirname, '..', 'public')));


var auth = require('./services/auth');

auth.install(app);


require('node-jsx').install({ harmony: true});

var reactRouter     = require('./utils/rrouter-middleware');
var routes          = require('./views/routes.jsx');

app.use(reactRouter(routes));
app.listen(port);



