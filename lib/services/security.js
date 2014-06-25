'use strict';

var cookie          = require('cookie');

exports.install = function (app, db) {
    
    
    app.post('/api/signup', function(req, res) {
        if (!req.body || !req.body.name || !req.body.password || !req.body.email) {
            return res.json(400, { 
                ok: false, 
                message: 'A name, password, and email address are required.'
            });
        }
        
        db.insert({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        }, 'org.couchdb.user:' + req.body.name, function (err, result) {
            if (err) { 
                return res.send(err.status_code, err); 
            }
            
            db.get(result._id, function(err) {
                if (err) { 
                    return res.send(err.status_code, err); 
                }
                res.json({ ok: true });
            });
        });
    });

    
    app.post('/api/signin', function(req, res) {
        if (!req.body || !req.body.name || !req.body.password) {
            return res.send(400, JSON.stringify({ok: false, message: 'A name, and password are required.'}));
        }

        db.auth(req.body.name, req.body.password, function (err, body, headers) {
            if (err) {
                return res.send(err.status_code ? err.status_code : 500, err); 
            }
            db.get('org.couchdb.user:' + body.name, function(err) {
                if (err) { 
                    return res.send(err.status_code ? err.status_code : 500, err); 
                }
                
                var cookies = cookie.parse(headers['set-cookie'][0]);
                res.cookie('AuthSession', cookies.AuthSession);
                
                res.end(JSON.stringify({ ok: true }));
            });
        });
    });
};