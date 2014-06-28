'use strict';

var db              = require('db');



function auth(name, req, res) {
    db.auth(name, function (err, sessionInfo) {
        if (err) {
            return res.send(err.status_code ? err.status_code : 500, err); 
        }
        res.cookie(sessionInfo.cookie_name, sessionInfo.session_id, { expires: sessionInfo.expires });
        req.session._userdId = req.body.name;
        res.json({ ok: true });
    });
}

exports.deserializeUser = function (req, res, next) {
    if (req.session && req.session._userId) {
        req.session.user = db.findUser(req.session._userId);
    }
    next();
};

exports.signin = function(req, res, next) {
    if (!req.body || !req.body.name || !req.body.password) {
        return res.json(400, {
            ok: false, 
            message: 'A name, and password are required.'
        });
    }
    
    db.findUser(req.body.name, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user || user.password !== req.password) {
            return res.json(400, {
                ok: false, 
                message: 'Invalid username or password'
            });
        }
        auth(req.body.name, req, res);
    });
};

exports.signup = function(req, res, next) {
    if (!req.body || !req.body.name || !req.body.password ) {
        return res.json(400, { 
            ok: false, 
            message: 'name and password are required'
        });
    }

    db.createUser({
        name: req.body.name,
        password: req.body.password
    }, function (err) {
        if (err) { 
            return next(err); 
        }
        auth(req.body.name, req, res);
    });
};

    
