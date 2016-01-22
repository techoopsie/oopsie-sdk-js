var sinon = require('sinon');

describe('Oopsie should ', function() {
    'use strict';
    var server, url;

    beforeEach(function() {
        server = sinon.fakeServer.create();

        console.log(sinon.fakeServer);
        url = 'http://localhost:8080';
        oopsie.init(url);
    });

    afterEach(function () {
        // Like before we must clean up when tampering with globals.
        server.restore();
    });

    it('be defined', function () {
        expect(oopsie).toBeDefined();
    });

    it('not add objects to window.', function() {
        oopsie.notAddedToWindow= {
            'test': {}
        };
        oopsie.notAddedToWindow = false;
        expect(window.notAddedToWindow).toBeUndefined();
    });

    it('have getAll() defined', function() {
        expect(oopsie.getAll).toBeDefined();
    });

    it('have save() defined', function() {
        expect(oopsie.save).toBeDefined();
    });

    it('have get() defined', function() {
        expect(oopsie.get).toBeDefined();
    });

    it('not be able to create a new object', function() {
        expect(function() { new oopsie(); }).toThrow();
    });

    describe('be able to call the backend to ', function() {

        var oopsieObject, domainObject;

        beforeEach(function() {

            domainObject = 'person';
            oopsie.__meta.item[domainObject] = {
                'lastName': 'string',
                'firstName': 'string'
            };

            oopsieObject = new OopsieObject('person');

        });

        describe('getAll() ', function() {

            it('domainObjects of specific type', function() {
                var fakeData = {'test': 'test'};
                console.log(server);
                server.respondWidth(
                    'GET',
                    oopsie.config.url + domainObject,
                    [200, { 'Content-Type': 'application/json'}, JSON.stringify(fakeData)]
                );
                oopsie.getAll(domainObject);

            });

        });





    });



});
