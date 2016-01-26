var sinon = require('sinon');

var fakeData = {
    'properties':
        {
            'person': {
                'lastname': 'string',
                'firstname': 'string'
            }
        }
};

var servers = [];

function restoreAllServers() {
    for (var server in servers) {
        server.restore();
    }
}

var setupMetaMock = function(url, method, data) {

    var server = sinon.fakeServer.create();
    server.respondWith(
        method,
        url,
        [
            200,
            { 'Content-Type': 'application/json'},
            JSON.stringify(fakeData)
        ]
    );
    server.respondImmediately = true;
    servers.push(server);
    return server;

};
