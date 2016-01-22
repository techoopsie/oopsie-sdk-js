(function (oopsie) {
    'use strict';

    oopsie.__meta = {
        item: {},

        init: function() {
            oopsie.__RestHelper.get('http://localhost').then(function(data) {
                this.item = data;
            });
        },

        getDomainObject: function(domainObject) {
            return this.getItem(domainObject);
        },

        getItem: function(domainObject) {

            var self = {};
            self.item = this.item[domainObject];

            self.contains = function(key) {
                return this.item[key] !== undefined;
            };

            return self;

        },

        contains: function(domainObject, key) {
            return this.item[domainObject] !== undefined;
        },

        verifyDomainExists: function(domainObject) {
            if (this.item[domainObject] === undefined) {
                throw new Error('DomainObject ' + domainObject + ' doesnt exist in your application');
            }
        }

    };

}(window.oopsie));
