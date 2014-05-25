'use strict';

var express         = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;


var User            = require('./models/user');
var components      = require('./components');


var port = process.env.PORT || 3000; // set our port
var secretKey = process.env.SECRET_KEY || 'secret-key';


var app = express();

// configure app



passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(User.findOne);

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


app
    .use(bodyParser())
    .use(methodOverride())
    .use(cookieParser(secretKey))
    .use(passport.initialize())
    .use(passport.session())
    .use(components)
    .listen(port);



