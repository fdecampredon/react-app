var coax    = require('coax');
var request = require('request');

var address = process.env.SYNC_GATEWAY_URL || 'http://localhost';
var adminPort = process.env.SYNC_GATEWAY_ADMIN_PORT || '4985';
var clientPort = process.env.SYNC_GATEWAY_CLIENT_PORT || '4984';
var databaseName = process.env.SYNC_GATEWAY_DATABASE || 'sync_gateway';

var adminServer = coax(address + ':' + adminPort);
var clientServer = coax(address + ':' + clientPort);
var adminDatabase = adminServer(databaseName);
var clientDatabase = clientServer(databaseName);

function auth(name, cb) {
    adminDatabase.post(['_session', { name: name }], cb);
}

function createUser(user, cb) {
    adminDatabase.post(['_users', user], cb);
}

function updateUser(user, cb) {
    adminDatabase.put(['_users' , user.name, user], cb);
}


function findUser(name, cb) {
    adminDatabase.get(['_users', name], cb);
}

function proxy(req, res, path) {
    var url = clientDatabase(path).url.toString();
    req.pipe(request(url)).pipe(res);
}

module.expors =  {
    auth: auth,
    createUser: createUser,
    updateUser: updateUser,
    findUser: findUser,
    proxy: proxy
};