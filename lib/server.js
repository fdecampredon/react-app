'use strict';

var path            = require('path');
var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var passport        = require('passport');
var dotenv          = require('dotenv');
var LocalStrategy   = require('passport-local').Strategy;


dotenv.load();

var User            = require('./models/user');
var reactRouter     = require('./utils/router-component-middleware');
var views           = require('./views');




var port = process.env.PORT || 3000; // set our port
var secretKey = process.env.SECRET_KEY || 'secret-key';


var app = express();


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(User.find);

passport.use(new LocalStrategy(User.authenticate));

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({ error: true, info : info });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.json({ error: false, user: user});
        });
    })(req, res, next);
});


app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

app
    .use(bodyParser())
    .use(methodOverride())
    .use(cookieParser(secretKey))
    .use(passport.initialize())
    .use(passport.session())
    .use(express.static(path.join(__dirname, '..', 'public')))
    .use(reactRouter(views))
    .listen(port);



