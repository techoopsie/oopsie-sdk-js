var sinon = require('sinon');

var mock = {
    fakeData: {
        'properties':
            {
                'person': {
                    'lastName': 'string',
                    'firstName': 'string'
                }
            }
    },

    servers: [],

    restoreAllServers: function() {

        for (var server in this.servers) {
            this.servers[server].restore();
        }
        this.servers = [];

    },

    setupMetaMock: function(url, method, data, responseCode) {

        if (responseCode === undefined) {
            responseCode = 200;
        }

        var server = sinon.fakeServer.create();
        server.respondWith(
            method,
            url,
            [
                responseCode,
                { 'Content-Type': 'application/json'},
                JSON.stringify(data)
            ]
        );
        server.respondImmediately = true;
        this.servers.push(server);
        return server;

    }

};

module.exports = mock;
