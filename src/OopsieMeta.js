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
            return this.item[domainObject];
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
