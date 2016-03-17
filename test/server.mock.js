var sinon = require('sinon');

var mock = {


    NOT_FOUND: 404,

    person: {
        'lastName': 'Andersson',
        'firstName': 'Andreas'
    },

    persons: [
        {
            'name': 'lastName',
            'type': 'TEXT'
        }, {
            'name': 'firstName',
            'type': 'TEXT'
        }
    ],

    getMetaData: function() {
        return {
            'customerId': '1',
            'webServiceId': '1',
            'resourceMetas': [
                {
                    'resourceId': '1-persons-id',
                    'name': 'person',
                    'attributeMetas': this.persons,
                    'filterMetas': []
                }
            ]
        }
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
