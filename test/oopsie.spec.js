
import OopsieSite from './../src/index.js';
import OopsieApp from './../src/oopsie.app';
var mock = require('./server.mock');

describe('OopsieResource should ', function() {
    'use strict';

    var prodEndpoint, siteId, customerId, oopsie, server, resourceName, prodSiteUrl, resourceId, appName, app, resource;

    beforeEach(function(done) {

        resourceName = 'rels';
        appName = 'app';
        resourceId = '45f23078-1241-4161-8c6b-f242d2974363';

        siteId = '1';
        customerId = '2'
        prodEndpoint = '/api/v1';
        prodSiteUrl = '';
        server = mock.serverMock('/api/v1/init', 'GET', mock.getMetaData());

        oopsie = new OopsieSite('', siteId, customerId);
        oopsie.oopsieService._getRestHelper().mock(server.xhr);

        oopsie.init(function(err) {
            if (err) {
                console.error('Got an error: ' + JSON.stringify(err));
                return done.fail();
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

    it('should throw if not new is used.', () => {
        expect(function() { var oopsie = OopsieSite('', siteId, customerId); }).toThrow(
                new Error('Cannot call a class as a function')
            );
    });

    it('OopsieApp should throw if not new is used.', () => {
        expect(function() { OopsieApp(); }).toThrow(
                new Error('Cannot call a class as a function')
            );
    });

    it('should throw if siteId not specified.', () => {
        expect(function() { var oopsie = new OopsieSite(''); }).toThrow(
                new Error('Oopsie needs an siteId to work.')
            );
    });

    it('should throw if customerId not specified.', () => {
        expect(function() { var oopsie = new OopsieSite('', siteId); }).toThrow(
                new Error('Oopsie needs an customerId to work.')
            );
    });

    describe('GET -> ', () => {

        it('get all resource entities', function() {
            var url = resource.get()._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId);
        });

        it('get all resource entities with limit', function() {
            var url = resource.get().limit(1)._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '?_limit=1');
        });

        it('get all resource entities from a view', function() {
            var url = resource.get().byView('myView')._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '/views/myView');
        });

        it('get all resource entities from a view with limit', function() {
            var url = resource.get().byView('myView').limit(10)._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '/views/myView?_limit=10');
        });

        it('get resource by specific params', function() {
            var url = resource.get().withParams({eid: 'some-eid'})._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '?eid=some-eid');
        });

        it('get resource by specific params and limit', function() {
            var url = resource.get().withParams({eid: 'some-eid'}).limit(100)._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '?eid=some-eid&_limit=100');
        });

        it('get resource view by specific params', function() {
            var url = resource.get().byView('myView').withParams({eid: 'some-eid'})._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '/views/myView?eid=some-eid');
        });

        it('get resource view by specific params and limit', function() {
            var url = resource.get().byView('myView').withParams({eid: 'some-eid'}).limit(100)._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '/views/myView?eid=some-eid&_limit=100');
        });

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

    describe('CREATE -> ', () => {

        it('url should become correct', () => {
            var url = resource.create().withParams({id: 'some-id'})._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '?id=some-id');
        });

        it('should send create request with body', done => {
            let data = { user: {}};
            let createResource = mock.serverMock('/api/v1/resources/' + resource.id, 'POST', data);
            resource.create().withParams({id: 'some-eid'}).execute((err, resp) => {
                if (err) {
                    return done.fail(err);
                }
                expect(data).toEqual(resp);
                done();
            });
        });
    });

    describe('DELETE -> ', () => {

        it('should delete with params', () => {
            var url = resource.delete().withParams({id: 'some-id'})._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '?id=some-id');
        });

        it('should send delete request', done => {
            let data = { user: {}};
            let createResource = mock.serverMock('/api/v1/resources/' + resource.id + '?id=some-id', 'DELETE', {});
            resource.delete().withParams({id: 'some-id'}).execute((err) => {
                if (err) {
                    console.log(err)
                    return done.fail(err);
                }
                done();
            });
        });

    });

    describe('SAVE -> ', () => {

        it('should save with params', () => {
            var url = resource.save().withParams({id: 'some-id'})._getUrl();
            expect(url).toEqual(prodEndpoint + '/resources/' + resourceId + '?id=some-id');
        });

        it('should throw if save is called without eid.', () => {
            expect(function() { resource.save().withParams({something: 'some-eid'}) }).toThrow(
                new Error('Save needs an id. Batch update not supported yet.')
            );
        });

    });

    describe('AUTH -> ', () => {

        it ('should get me when logged in', done => {
            let user = { user: {}};
            let meServer = mock.serverMock('/api/v1/users/me', 'GET', user);
            oopsie.me((err, me) => {
                if (err) {
                    return done.fail();
                }
                expect(user).toEqual(me)
                done();
            });
        });

        it ('should give error when not logged in', done => {
            let error = { message: 'Not logged in.', status: 401 };
            let meServer = mock.serverMock('/api/v1/users/me', 'GET', error, error.status);
            oopsie.me((err, me) => {
                if (!err) {
                    return done.fail('Should have gotten error, not logged in.');
                }
                expect(err).toEqual(error)
                done();
            });
        });

        it('should be possible to set ApiKey immeditely', () => {
            var oopsie = new OopsieSite('', siteId, customerId);
            var mySecret = 'my-key';
            oopsie.setApiKey(mySecret);
            var authHeader = oopsie.oopsieService._getRestHelper().headers['Authorization'];
            expect(authHeader).toEqual(mySecret);
        });

        it('should be logged in', done => {
            let user = {};

            let meServer = mock.serverMock('/api/v1/users/me', 'GET', user);
            oopsie.isLoggedIn((err, loggedIn) => {
                expect(loggedIn).toBe(true);
                done();
            });
        });

        it('should not be logged in', done => {
            let user = {};

            let meServer = mock.serverMock('/api/v1/users/me', 'GET', user, 401);
            oopsie.isLoggedIn((err, loggedIn) => {
                expect(loggedIn).toBe(false);
                done();
            });
        });

        it('should not be logged in when error occure', done => {
            let error = {
                message: 'Something went wrong',
                status: 500
            };

            let meServer = mock.serverMock('/api/v1/users/me', 'GET', error, error.status);
            oopsie.isLoggedIn((err, loggedIn) => {
                expect(err.status).toEqual(error.status);
                expect(err.message).toEqual(error.message)
                expect(loggedIn).toEqual(false);
                done();
            });
        });

    });

});
