var sinon = require('sinon');

var mock = {


    NOT_FOUND: 404,

    person: {
        'lastName': 'Andersson',
        'firstName': 'Andreas'
    },

    persons: [
        {
            'lastName': 'Andersson',
            'firstName': 'Andreas'
        }, {
            'lastName': 'Gullstrand',
            'firstName': 'Nicolas'
        }, {
            'lastName': 'Andersson',
            'firstName': 'Bengt'
        }
    ],

    getMetaData: function() {
        return { 'properties':
            {
                'person': this.person
            }
        };
    },

    getErrorMessage: function() {
        return  'Error';
    },

    servers: [],

    restoreAllServers: function() {

        for (var server in this.servers) {
            this.servers[server].restore();
        }
        this.servers = [];

    },

    serverMock: function(url, method, data, responseCode) {

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
