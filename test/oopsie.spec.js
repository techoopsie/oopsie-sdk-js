var sinon = require('sinon');
var mock = require('./server.mock');

//import Oopsie from './../dist/Oopsie.js';
import Oopsie from './../src/index.js';
import Config from './../src/config.js';

describe('Oopsie should ', function() {
    'use strict';
    var url, oopsie, resourceName, webResourceId, resourceId;

    beforeEach(function(done) {

        resourceName = 'persons';
        resourceId = mock.getMetaData().resourceMetas[0].resourceId;
        webResourceId = '123456-abcdef';

        mock.serverMock(Config.url.api + webResourceId + '/meta', 'GET', mock.getMetaData());

        oopsie = new Oopsie(webResourceId, function(err) {
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



    it('throw an exception if new not used', function() {
        expect(function() { Oopsie(webResourceId); }).toThrow(
            new Error('Cannot call a class as a function')
        );
    });

    it('not be added to window when not using new.', function(done) {

        var oopsie = new Oopsie(webResourceId, function(err) {

            if (err) {
                fail('Got an error: ' + err.message);
            }

            oopsie.notAddedToWindow = false;
            expect(window.notAddedToWindow).toBeUndefined();
            done();
        });

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
            new Error('Oopsie needs an webResourceId to work.')
        );
    });

    it('return an error if not able to retrieve meta data', function() {

        var notWorkingAppId = 'fakeId';
        var message = 'Resource doesn\'t exist';
        mock.serverMock(Config.url.api + notWorkingAppId + '/meta', 'GET', message, mock.NOT_FOUND);

        new Oopsie(notWorkingAppId, function(err) {
            expect(err.status).toEqual(mock.NOT_FOUND);
            expect(err.message).toEqual(message);
        });


    });

    describe('be able to call the backend to ', function() {

        describe('getAll() ', function() {

            it('domainObjects of specific type', function(done) {

                mock.serverMock(Config.url.api + webResourceId + '/resources/' + resourceId, 'GET', mock.persons);

                oopsie.getAll(resourceName, function(err, oopsieResources) {

                    if (err) {
                        fail('We should not have gotten an Error: ' + err.message);
                    }

                    if (oopsieResources.length < 1) {
                        fail('We should have gotten ' + mock.persons.length + ' OopsieResources');
                    }

                    for (var index in oopsieResources) {
                        var oopsieResource =  oopsieResources[index];
                        expect(oopsieResource.getFirstName()).toEqual(mock.persons[0].attributes.firstName.value);
                        expect(oopsieResource.getLastName()).toEqual(mock.persons[0].attributes.lastName.value);
                    }

                    done();

                });

            });


            it('and throw an Exception if it is not an 200', function(done) {

                var responseCode = 500;
                mock.serverMock(Config.url.api + webResourceId + '/resources/' + resourceId, 'GET', mock.getErrorMessage(), 500);

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

            var id;

            beforeEach(function() {

                id = 'abcd-1234';

            });

            it('return specific OopsieResource', function(done) {

                mock.serverMock(Config.url.api + webResourceId + '/resources/' + resourceId + '/' + id, 'GET', mock.persons[0]);
                oopsie.get(resourceName, id, function(err, oopsieResource) {

                    if (err) {
                        fail('We should have retrieved the OopsieResource without Error: ' + err.message);
                    }

                    expect(oopsieResource.getFirstName()).toEqual(mock.meta[1].value);
                    expect(oopsieResource.getLastName()).toEqual(mock.meta[0].value);
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

                mock.serverMock(Config.url.api + webResourceId + '/resources/' + resourceId + '/' + id, 'GET', mock.getErrorMessage(), mock.NOT_FOUND);
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

            var oopsieResource;

            it('store the object and return a new OopsieResource', function(done) {

                oopsieResource = oopsie.createResource(resourceName);

                var changedLastName = 'testLastName';
                oopsieResource.setLastName(changedLastName);
                oopsieResource.id = 'fake-id';
                mock.serverMock(Config.url.api + webResourceId + '/resources/' + resourceId, 'POST', mock.persons[0]);

                oopsie.save(oopsieResource, function(err, or) {

                    if (err) {
                        console.log(err);
                        fail('We should have saved the oopsieResource and retrieved it.');
                    }

                    expect(or.getFirstName()).toEqual(mock.persons[0].attributes.firstName.value);
                    expect(or.getLastName()).toEqual(mock.persons[0].attributes.lastName.value);

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

        describe('delete() should ', function() {

            var id;

            beforeEach(function() {
                id = '123';
            });

            it('remove the Resource', function(done) {

                mock.serverMock(Config.url.api + webResourceId + '/resources/' + resourceId + '/' + id, 'DELETE', null);

                oopsie.delete(resourceName, id, function(err) {
                    if (err) {
                        fail('We should not have gotten an error ' + err.message);
                    }
                    done();
                });
            });

        });

    });

});
