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

    it('return an error if not able to retrieve meta data', function() {

        var notWorkingAppId = 'fakeId';
        var message = 'Resource doesn\'t exist';
        mock.serverMock('http://localhost', 'GET', message, mock.NOT_FOUND);

        new Oopsie(notWorkingAppId, function(err) {
            expect(err.status).toEqual(mock.NOT_FOUND);
            expect(err.message).toEqual(message);
        });


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

                    for (var index in oopsieResources) {

                        var oopsieResource =  oopsieResources[index];
                        expect(oopsieResource.resource).toEqual(mock.persons[index]);
                        expect(oopsieResource.getFirstName()).toEqual(mock.persons[index].firstName);
                        expect(oopsieResource.getLastName()).toEqual(mock.persons[index].lastName);

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

        describe('get() should ', function() {

            var id, resourceName;

            beforeEach(function() {

                id = 'abcd-1234';
                resourceName = 'person';

            });

            it('return specific OopsieResource', function(done) {

                mock.serverMock('http://localhost/' + resourceName + '/' + id, 'GET', mock.person);
                oopsie.get(resourceName, id, function(err, oopsieResource) {

                    if (err) {
                        fail('We should have retrieved the OopsieResource without Error: ' + err.message);
                    }

                    expect(oopsieResource.resource).toEqual(mock.person);
                    expect(oopsieResource.getFirstName()).toEqual(mock.person.firstName);
                    expect(oopsieResource.getLastName()).toEqual(mock.person.lastName);
                    done();

                });

            });

            it('throw an exception if resourceName doesn\'t exist', function() {

                resourceName = 'NonExisting';
                expect(function() { oopsie.get(resourceName, id, null); }).toThrow(
                    new Error('Resource: ' + resourceName + ' doesn\'t exist.')
                );

            });

            it('throw an exception if resourceName is null', function() {

                expect(function() { oopsie.get(null, id, null); }).toThrow(
                    new Error('ResourceName can\'t be null or undefined')
                );

            });

            it('throw an exception if resourceName is undefined', function() {

                expect(function() { oopsie.get(undefined, id, null); }).toThrow(
                    new Error('ResourceName can\'t be null or undefined')
                );

            });

            it('throw an exception if id is null', function() {

                expect(function() { oopsie.get(resourceName, null, null); }).toThrow(
                    new Error('Id can\'t be null or undefined')
                );

            });

            it('throw an exception if id is undefined', function() {

                expect(function() { oopsie.get(resourceName, undefined, null); }).toThrow(
                    new Error('Id can\'t be null or undefined')
                );

            });

            it('return error if OopsieResource not found', function(done) {

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

        describe('save() should ', function() {

            var id, resourceName;

            beforeEach(function() {

                id = 'abcd-1234';
                resourceName = 'person';

            });

            it('store the object and return a new OopsieResource', function(done) {


                var oopsieResource = oopsie.getResource(resourceName);
                var changedLastName = 'testLastName';
                oopsieResource.setLastName(changedLastName);

                mock.serverMock('http://localhost/' + resourceName, 'POST', oopsieResource.getItem());

                oopsie.save(oopsieResource, function(err, or) {

                    if (err) {
                        console.log(err);
                        fail('We should have saved the oopsieResource and retrieved it.');
                    }

                    expect(or.getFirstName()).toEqual(oopsieResource.getFirstName());
                    expect(or.getLastName()).toEqual(changedLastName);

                    done();

                });

            });

            it('throw an exception if not an OopsieResource object is passed it', function() {

                oopsieResource = {};
                expect(function() { oopsie.save(oopsieResource, null); }).toThrow(
                    new Error('Save neeeds an OopsieResource as first argument.')
                );

            });

            it('throw an exception if passing undefined as OopsieResource', function() {

                oopsieResource = undefined;
                expect(function() { oopsie.save(oopsieResource, null); }).toThrow(
                    new Error('Save neeeds an OopsieResource as first argument.')
                );

            });

            it('throw an exception if passing null as OopsieResource', function() {

                oopsieResource = null;
                expect(function() { oopsie.save(oopsieResource, null); }).toThrow(
                    new Error('Save neeeds an OopsieResource as first argument.')
                );

            });

        });

    });

});
