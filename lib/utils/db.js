var request = require('request');
var assign  = require('./assign'); 
var qs      = require('querystring');

var defaultOptions = {
    address: '127.0.0.1',
    adminPort: 4985,
    clientPort: 4984,
    database: 'default'
};

var options = defaultOptions;

function setOptions(val) {
    if (typeof val === 'undefined') {
        options = {};
    }
    
    options = assign({}, defaultOptions, val);
}


function getUrl(path, client) {
    return 'http://' + options.url + ':' + client? options.clientPort : options.adminPort + options.database + '/' + path;
}
    
function jsonRequest(path, method, params, cb) {
    var reqOptions = {
        method: method,
        url: getUrl(path),
        port: options.port,
        json : true,
        body : params
    };
    if (typeof params === 'function') {
        cb = params;
    } else {
        if (method === 'GET') {
            reqOptions.qs = qs(params);
        } else {
            reqOptions.body = JSON.stringify(params);
        }
    }
    request(reqOptions, cb);
}

function auth(name, cb) {
    jsonRequest('_session', 'POST', { name: name }, cb);
}

function createUser(user, cb) {
    jsonRequest('_users', 'POST', user, cb);
}

function updateUser(user, cb) {
    jsonRequest('_users' + '/' + user.name, 'PUT', user, cb);
}


function findUser(name, cb) {
    jsonRequest('_users' + '/' + name, 'GET', cb);
}

function proxy(req, res, path) {
    var url = getUrl(path, true);
    req.pipe(request(url)).pipe(res);
}

module.expors =  {
    auth: auth,
    createUser: createUser,
    updateUser: updateUser,
    setOptions: setOptions,
    findUser: findUser,
    proxy: proxy
};