'use strict';

var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var dotenv          = require('dotenv');
var fs              = require('fs');
var security        = require('./security');


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

require('node-jsx').install({ harmony: true});

var ReactX  = require('./utils/reactX');
var routes  = require('./views/routes.jsx');

app.use(ReactX.route(routes, layout));
app.listen(port);



