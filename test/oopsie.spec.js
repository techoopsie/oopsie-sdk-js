
describe('Oopsie should ', function() {
    'use strict';
    var xhr, requests;

    beforeEach(function() {
        xhr = sinon.sandbox.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function (req) { requests.push(req); };
    });

    afterEach(function () {
        // Like before we must clean up when tampering with globals.
        xhr.restore();
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

    it('be able to call getAll()', function() {
        oopsie.getAll();
    });



});
