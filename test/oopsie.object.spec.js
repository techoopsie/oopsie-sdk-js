

describe('OopsieObject should ', function() {
    'use strict';

    it('be defined', function () {
        expect(OopsieObject).toBeDefined();
    });

    it('throw an exception if no DomainObject is passed to constructor.', function() {
        expect(function() { new OopsieObject(); }).toThrow(
            new Error('OopsieObject needs an DomainObject in the constructor.')
        );
    });

    it('not be added to window when not using new.', function() {
        Oopsie._meta = {
            'test': {}
        };

        var oopsieObject = OopsieObject('test');
        oopsieObject.notAddedToWindow = false;
        expect(window.notAddedToWindow).toBeUndefined();
    });

    it ('throw an exception if DomainObject doesn\'t exist', function() {
        var domainObject = 'NotFound';
        expect(function() { new OopsieObject(domainObject); }).toThrow(
            new Error('DomainObject ' + domainObject + ' doesnt exist in your application')
        );
    });

    it('contain the methods testMethod & testMethod2', function() {

        Oopsie._meta = {
            'person': {
                'testMethod': 'string',
                'testMethod2': 'string'
            }
        };

        var oopsieObject = new OopsieObject('person');


        expect(oopsieObject.testMethod).toBeDefined();
        expect(oopsieObject.testMethod2).toBeDefined();

    });


});
