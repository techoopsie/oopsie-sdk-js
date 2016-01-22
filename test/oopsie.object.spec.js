describe('OopsieObject should ', function() {
    'use strict';

    var firstName, lastName;

    beforeEach(function() {

        firstName = 'TestUser';
        lastName = 'Lastname';

    });

    it('be defined', function () {

        expect(OopsieObject).toBeDefined();

    });

    it('throw an exception if no DomainObject is passed to constructor.', function() {

        expect(function() { new OopsieObject(); }).toThrow(
            new Error('OopsieObject needs an DomainObject in the constructor.')
        );

    });

    it('not be added to window when not using new.', function() {

        oopsie.__meta.item = {
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

    it('be able to create multiple without interfering with each other', function() {

        oopsie.__meta.item = {
            'person': {
                'lastName': 'string',
                'firstName': 'string'
            }
        };

        var oopsieObject = new OopsieObject('person');
        var secondOopsieObject = new OopsieObject('person');

        oopsieObject.setFirstName(firstName);
        expect(oopsieObject.getFirstName()).toBe(firstName);
        expect(secondOopsieObject.getFirstName()).toBeUndefined();

        secondOopsieObject.test = 'test';
        expect(secondOopsieObject.test).toBe('test');
        expect(oopsieObject.test).toBeUndefined();

    });

    it('work for user as this.', function() {

        var person = new OopsieObject('person');
        person.setFirstName(firstName);
        person.setLastName(lastName);

        var myMother = new OopsieObject('person');
        myMother.setFirstName('Anna');
        myMother.setLastName('Andersson');

    });

    describe('be able to create getters and setters that should ', function() {

        var oopsieObject;

        beforeEach(function() {

            oopsie.__meta.item = {
                'person': {
                    'lastName': 'string',
                    'firstName': 'string'
                }
            };

            oopsieObject = new OopsieObject('person');

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

        it('not be able to change the item without using setters', function() {

            expect(oopsieObject.items).toBeUndefined();

        });

        it('be able to get a set item', function() {

            oopsieObject.setFirstName(firstName);
            oopsieObject.setLastName(lastName);
            expect(oopsieObject.getFirstName()).toBe(firstName);
            expect(oopsieObject.getLastName()).toBe(lastName);

        });

    });

});
