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
            "app": {
                "resources": [
                    {
                        "id": "45f23078-1241-4161-8c6b-f242d2974363",
                        "name": "rels",
                        "attributes": [
                            {
                                "name": "name",
                                "type": "TEXT_4",
                                "relation": null,
                                "id": "e452e120-dad0-47fe-a6a6-6c8648d6b225"
                            }   
                        ],
                        "partitionKeys": [],
                        "clusterKeys": [
                        {
                            "name": "eid",
                            "type": "UUID",
                            "relation": null,
                            "id": null
                        }
                        ],
                        "views": [],
                        "auths": [
                        {
                            "i": "b309b59f-b3a7-488e-ab40-ff1c088e1da0",
                            "n": "Admin",
                            "p": "READ_ALL_WRITE_ALL"
                        },
                        {
                            "i": "f45e7bb8-8a66-4746-b0c7-31ad7fd1fcb8",
                            "n": "User",
                            "p": "NONE"
                        }
                        ]
                    }
                ]
            }
        }
    },

    getEntities: function() {
        return {
            entities: [
                { name: 'Name1' },
                { name: 'Name2' }
            ],
            metadata: {}
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
