var sinon = require('sinon');
var mock = require('./server.mock');

describe('Oopsie should ', function() {
    'use strict';
    var server, url, oopsie, resourceName, appId;

    beforeEach(function(done) {

        resourceName = 'person';
        server = mock.setupMetaMock('http://localhost', 'GET', mock.fakeData);

        appId = '123456-abcdef';
        oopsie = new Oopsie(appId, function(err) {
            if (err) {
                console.log(err.message);
            }
            done();
        });
    });

    afterEach(function () {
        // Like before we must clean up when tampering with globals.
        mock.restoreAllServers();

    });

    it('be defined', function () {
        expect(Oopsie).toBeDefined();
    });

    it('not be added to window when not using new.', function() {

        var oopsie = Oopsie(appId);
        oopsie.notAddedToWindow = false;
        expect(window.notAddedToWindow).toBeUndefined();

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
        expect(function() { new Oopsie(); }).toThrow(
            new Error('Oopsie needs an App Id to work.')
        );
    });

    describe('be able to call the backend to ', function() {

        var oopsieResource;

        beforeEach(function() {

            oopsieResource = oopsie.getResource(resourceName);

        });

        describe('getAll() ', function() {

            it('domainObjects of specific type', function(done) {

                server = mock.setupMetaMock('http://localhost/' + resourceName, 'GET', mock.fakeData);

                oopsie.getAll(resourceName).then(function(data) {
                    expect(data).toEqual(mock.fakeData);
                    done();
                }, function(error) {
                    fail();
                    done();
                });

            });

            it('and throw an Exception if it is not an 200', function(done) {

                server = mock.setupMetaMock('http://localhost/' + resourceName, 'GET', mock.fakeData, 500);

                oopsie.getAll(resourceName).then(function(data) {
                    fail('We should not have been resolved.');
                }, function(error) {
                    expect(error).toEqual(Error('Failed to retrieve data'));
                    done();
                });
            });

        });

    });

});
