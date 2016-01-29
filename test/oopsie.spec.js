var sinon = require('sinon');
var mock = require('./server.mock');

describe('Oopsie should ', function() {
    'use strict';
    var url, oopsie, resourceName, appId;

    beforeEach(function(done) {

        resourceName = 'person';
        mock.serverMock('http://localhost', 'GET', mock.getMetaData());

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

                mock.serverMock('http://localhost/' + resourceName, 'GET', mock.persons);

                oopsie.getAll(resourceName, function(err, oopsieResources) {

                    if (err) {
                        fail('We should not have gotten an Error: ' + err.message);
                    }

                    if (oopsieResources.length < 1) {
                        fail('We should have gotten ' + mock.persons.length + ' OopsieResources');
                    }

                    for (var oopsieResource in oopsieResources) {

                        expect(oopsieResources[oopsieResource].getFirstName()).toEqual(mock.persons[oopsieResource].firstName);
                        expect(oopsieResources[oopsieResource].getLastName()).toEqual(mock.persons[oopsieResource].lastName);

                    }


                    done();

                });

            });

            it('and throw an Exception if it is not an 200', function(done) {

                var responseCode = 500;
                mock.serverMock('http://localhost/' + resourceName, 'GET', mock.getErrorMessage(), 500);

                oopsie.getAll(resourceName, function(err, oopsieResources) {

                    if (!err) {
                        fail('We should not have been resolved.');
                    }

                    expect(oopsieResources).toBeNull();
                    expect(err.status).toEqual(responseCode);
                    expect(err.message).toEqual(mock.getErrorMessage());
                    done();

                });
            });

        });

        describe('get() ', function() {

            it('should return specific OopsieResource', function(done) {

                var id = 'abcd-1234';
                var resourceName = 'person';
                mock.serverMock('http://localhost/' + resourceName + '/' + id, 'GET', mock.person);
                oopsie.get(resourceName, id, function(err, oopsieResource) {

                    if (err) {
                        fail('We should have retrieved the OopsieResource without Error: ' + err.message);
                    }

                    expect(oopsieResource.resource).toEqual(mock.person);
                    done();
                });

            });

            it('should return error if OopsieResource not found', function(done) {

                var id = 'abcd-1234';
                var resourceName = 'person';
                mock.serverMock('http://localhost/' + resourceName + '/' + id, 'GET', mock.getErrorMessage(), mock.NOT_FOUND);
                oopsie.get(resourceName, id, function(err, oopsieResource) {

                    if (!err) {
                        fail('We should have retrieved an 404 that the resource was not found');
                    }

                    expect(oopsieResource).toBeNull();
                    expect(err.status).toBe(mock.NOT_FOUND);
                    expect(err.message).toBe(mock.getErrorMessage());
                    done();
                });

            });

        });

    });

});
