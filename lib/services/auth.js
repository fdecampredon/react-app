'use strict';

var passport        = require('passport');
var User            = require('../models/User');

var LocalStrategy   = require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(User.find);

passport.use(new LocalStrategy(User.authenticate));


exports.install = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    
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


    app.post('/register', function(req, res, next) {
        User.create(new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }), function (err, user) {
            if (err) {
                return next(err);
            }
            return res.send({ user: user });
        });
    });
};