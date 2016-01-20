
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
        expect(Oopsie).toBeDefined();
    });

    it('have getAll() defined', function() {
        expect(Oopsie.getAll).toBeDefined();
    });

    it('be able to call getAll()', function() {
        Oopsie.getAll();
    });



});
