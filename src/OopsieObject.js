(function () {
    'use strict';

    window.OopsieObject = function (domainObject) {

        if ( !(this instanceof OopsieObject) ) {
            return new OopsieObject(domainObject);
        }

        var self = this;
        self.domainObject = domainObject;

        var items = {};

        function init() {
            verifyDomainObject();
            self.meta = oopsie.__meta.getDomainObject(self.domainObject);
            setupGettersAndSetters();
        }

        function setupGettersAndSetters() {

            for (var key in self.meta.item) {
                /*jslint evil: true */
                var name = key;
                var nameOfItemWithUppercase = capitalizeFirstLetter(name);
                var setter = 'set' + nameOfItemWithUppercase;
                var getter = 'get' + nameOfItemWithUppercase;
                self[setter] = new Function('value', 'this.__addItem("' + key + '", value);');
                self[getter] = new Function('return this.__getItem("' + key + '");');
            }

        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        self.__addItem = function(key, value) {
            if (!self.meta.contains(key)) {
                throw new Error('DomainObject: ' + self.domainObject + ' doesn\'t contain the key: ' + key);
            }
            items[key] = value;
        };

        self.__getItem = function(key) {
            return items[key];
        };

        self.getItem = function() {
            return items;
        };

        function verifyDomainObject() {
            if (self.domainObject === undefined) {
                throw new Error('OopsieObject needs an DomainObject in the constructor.');
            }

            oopsie.__meta.verifyDomainExists(self.domainObject);
        }

        init();

        return self;
    };

}());
