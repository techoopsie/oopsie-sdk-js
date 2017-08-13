var sinon = require('sinon');
var mock = require('./server.mock');

import OopsieSite from './../src/index.js';

describe('OopsieResource should ', function() {
    'use strict';

    var firstName, prodEndpoint, lastName, oopsie, server, resourceName, resourceId, appName, app, resource;

    beforeEach(function(done) {

        firstName = 'TestUser';
        lastName = 'Lastname';
        resourceName = 'rels';
        appName = 'app';
        resourceId = '45f23078-1241-4161-8c6b-f242d2974363';

        var siteId = '1';
        var customerId = '2'
        prodEndpoint = 'http://localhost:8080/api/v1';
        server = mock.serverMock(prodEndpoint + '/init', 'GET', mock.getMetaData());

        oopsie = new OopsieSite(prodEndpoint, siteId, customerId);
        oopsie.init(function(err) {
            if (err) {
                console.err('Got an error: ' + err.message);
            }
            app = oopsie.getApp(appName);
            resource = app.getResource(resourceName);
            done();
        });
    });

    afterEach(function() {

        mock.restoreAllServers();

    });

    it('be defined', function () {
        expect(app).toBeDefined();
    });

    it('get all resource entities', function() {
        var url = resource.get()._getUrl();
        expect(url).toEqual('/resources/' + resourceId);
    });

    it('get all resource entities with limit', function() {
        var url = resource.get().limit(1)._getUrl();
        expect(url).toEqual('/resources/' + resourceId + '?_limit=1');
    });

    it('get all resource entities from a view', function() {
        var url = resource.get().byView('myView')._getUrl();
        expect(url).toEqual('/resources/' + resourceId + '/views/myView');
    });

    it('get all resource entities from a view with limit', function() {
        var url = resource.get().byView('myView').limit(10)._getUrl();
        expect(url).toEqual('/resources/' + resourceId + '/views/myView?_limit=10');
    });

    it('get resource by specific params', function() {
        var url = resource.get().withParams({eid: 'some-eid'})._getUrl();
        expect(url).toEqual('/resources/' + resourceId + '?eid=some-eid');
    });

    it('get resource by specific params and limit', function() {
        var url = resource.get().withParams({eid: 'some-eid'}).limit(100)._getUrl();
        expect(url).toEqual('/resources/' + resourceId + '?eid=some-eid&_limit=100');
    });

    it('get resource view by specific params', function() {
        var url = resource.get().byView('myView').withParams({eid: 'some-eid'})._getUrl();
        expect(url).toEqual('/resources/' + resourceId + '/views/myView?eid=some-eid');
    });

    it('get resource view by specific params and limit', function() {
        var url = resource.get().byView('myView').withParams({eid: 'some-eid'}).limit(100)._getUrl();
        expect(url).toEqual('/resources/' + resourceId + '/views/myView?eid=some-eid&_limit=100');
    });

    it('get resource with expandedRelations', function() {
        var url = resource.get().expandRelations()._getUrl();
        expect(url).toEqual('/resources/' + resourceId + '?_expandRelations=true');
    })

    it('should throw exception if trying to set a limit higher then 1000', function() {
        expect(function() { resource.get().limit(1001) }).toThrow(
            new Error('Limit has to be between 0-1000.')
        );
    });

    it('should throw exception if trying to set a limit less then 0', function() {
        expect(function() { resource.get().limit(-1) }).toThrow(
            new Error('Limit has to be between 0-1000.')
        );
    });

    it ('throw an exception if resource doesn\'t exist', function() {

        var resource = 'NotFound';
        expect(function() { app.getResource(resource); }).toThrow(
            new Error('Resource ' + resource + ' doesn\'t exist in your application.'
                 + '\nAvailable resources are: ' + resourceName)
        );

    });

});
