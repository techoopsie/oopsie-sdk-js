var sinon = require('sinon');
var mock = require('./server.mock');

describe('OopsieResource should ', function() {
    'use strict';

    var firstName, lastName, oopsie, server, resourceName;

    beforeEach(function(done) {

        firstName = 'TestUser';
        lastName = 'Lastname';
        resourceName = 'person';

        server = mock.setupMetaMock('http://localhost', 'GET', mock.fakeData);

        var appId = '123456-abcdef';

        oopsie = new Oopsie(appId, function(data) {
            done();
        });
    });

    afterEach(function() {

        mock.restoreAllServers();

    });

    it('be defined', function () {

        expect(OopsieResource).toBeDefined();

    });

    it('throw an exception if no Resource is passed to constructor.', function() {

        expect(function() { oopsie.getResource(); }).toThrow(
            new Error('OopsieResource needs an resource in the constructor.')
        );

    });

    it('not be added to window when not using new.', function() {

        var oopsieResource = oopsie.getResource(resourceName);
        oopsieResource.notAddedToWindow = false;
        expect(window.notAddedToWindow).toBeUndefined();

    });

    it ('throw an exception if resource doesn\'t exist', function() {

        var resource = 'NotFound';
        expect(function() { oopsie.getResource(resource); }).toThrow(
            new Error('Resource ' + resource + ' doesnt exist in your application. '
                 + '\n Available resources are: ' + resourceName)
        );

    });

    it('be able to create multiple without interfering with each other', function() {

        var oopsieObject = oopsie.getResource(resourceName);
        var secondOopsieObject = oopsie.getResource(resourceName);

        oopsieObject.setFirstName(firstName);
        expect(oopsieObject.getFirstName()).toBe(firstName);
        expect(secondOopsieObject.getFirstName()).toBeUndefined();

        secondOopsieObject.test = 'test';
        expect(secondOopsieObject.test).toBe('test');
        expect(oopsieObject.test).toBeUndefined();

    });

    it('work for user as this.', function() {

        var person = oopsie.getResource('person');
        person.setFirstName(firstName);
        person.setLastName(lastName);

        var myMother = oopsie.getResource('person');
        myMother.setFirstName('Anna');
        myMother.setLastName('Andersson');

    });

    describe('be able to create getters and setters that should ', function() {

        var oopsieObject;

        beforeEach(function() {

            oopsieObject = oopsie.getResource('person');

        });

        it('be defined', function() {

            expect(oopsieObject.getLastName).toBeDefined();
            expect(oopsieObject.getFirstName).toBeDefined();
            expect(oopsieObject.setLastName).toBeDefined();
            expect(oopsieObject.setFirstName).toBeDefined();

        });

        it('set firstname to TestUser and lastName to LASTNAME', function() {

            oopsieObject.setFirstName(firstName);
            oopsieObject.setLastName(lastName);
            expect(oopsieObject.getItem().firstName).toBe(firstName);
            expect(oopsieObject.getItem().lastName).toBe(lastName);

        });

        it('be able to get a set item', function() {

            oopsieObject.setFirstName(firstName);
            oopsieObject.setLastName(lastName);
            expect(oopsieObject.getFirstName()).toBe(firstName);
            expect(oopsieObject.getLastName()).toBe(lastName);

        });

    });

});
