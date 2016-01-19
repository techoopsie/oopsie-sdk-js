var sinon = require('sinon');

describe('Oopsie ', function() {

    var xhr, requests;

    before(function() {
        xhr = sinon.useFakeXmlHttpRequest();
        requests = [];
        xhr.onCreate = function (req) { requests.push(req); };
    });

    after(function () {
        // Like before we must clean up when tampering with globals.
        xhr.restore();
    });

    it("to be defined", function () {
        expect(Oopsie).toBeDefined();
    });

    it("asd", function() {
        Oopsie("asd").getAll();
    });



});
