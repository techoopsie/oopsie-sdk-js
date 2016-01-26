var sinon = require('sinon');

describe('Oopsie should ', function() {
    'use strict';
    var server, url, oopsie, fakeData, resourceName;

    beforeEach(function(done) {

        resourceName = 'person';
        server = setupMetaMock('http://localhost', 'GET', fakeData);

        var appId = '123456-abcdef';
        oopsie = new Oopsie(appId, function(err) {
            if (err) {
                console.log(err.message);
            }
            console.log("Ok oopsie");
            done();
        });
    });

    afterEach(function () {
        // Like before we must clean up when tampering with globals.
        server.restore();

    });

    it('be defined', function () {
        expect(Oopsie).toBeDefined();
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
        expect(function() { new Oopsie(); }).toThrow();
    });

    describe('be able to call the backend to ', function() {

        var oopsieResource;

        beforeEach(function() {

            oopsieResource = oopsie.getResource(resourceName);

        });

        describe('getAll() ', function() {

            it('domainObjects of specific type', function(done) {

                /*server.respondWith(
                    'GET',
                    'http://localhost/' + resourceName,
                    [
                        200,
                        { 'Content-Type': 'application/json'},
                        JSON.stringify(fakeData)
                    ]
                );
                console.log(resourceName);
                server.respondImmediately = true;*/
                oopsie.getAll(resourceName).then(function(data) {
                    expect(data).toEqual(fakeData);
                    done();
                }, function(error) {
                    fail();
                    done();
                });

            });

            it('and throw an Exception if it is not an 200', function(done) {

                /*server.respondWith(
                    'GET',
                    'http://localhost/' + resourceName,
                    [
                        500,
                        { 'Content-Type': 'application/json'},
                        JSON.stringify(fakeData)
                    ]
                );*/

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
