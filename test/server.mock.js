var sinon = require('sinon');

var mock = {


    NOT_FOUND: 404,

    person1: {
        'name': 'lastName',
        'TYPE': 'TEXT',
        'value': 'Andersson'
    },

    person2: {
        'name': 'firstName',
        'TYPE': 'TEXT',
        'value': 'Bengt'
    },

    persons: [
        {
            'id': 'fake-id-123',
            'attributes': {
                'lastName':
                {
                    'name': 'lastName',
                    'type': 'TEXT',
                    'value': 'Tornstrom'
                },
                'firstName': {
                    'name': 'firstName',
                    'type': 'TEXT',
                    'value': 'Andreas'
                }
            }
        }
    ],

    meta: [
        {
                'name': 'lastName',
                'type': 'TEXT',
                'value': 'Tornstrom'
            }, {
                'name': 'firstName',
                'type': 'TEXT',
                'value': 'Andreas'
            }
    ],

    getMetaData: function() {
        return {
            'customerId': '1',
            'webServiceId': '1',
            'resourceMetas': [
                {
                    'resourceId': '1-persons-id',
                    'name': 'persons',
                    'attributeMetas': this.meta,
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
                data === undefined ? '' : JSON.stringify(data)
            ]
        );
        server.respondImmediately = true;
        this.servers.push(server);
        return server;

    }



};

module.exports = mock;
