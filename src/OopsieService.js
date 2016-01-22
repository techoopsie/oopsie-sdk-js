(function (oopsie) {
    'use strict';

    oopsie.__service = {

    	getAll: function (domainObject) {
            return oopsie.__RestHelper.get('http://localhost:8080/' + domainObject);
    	},

        save: function(oopsieObject) {
            return oopsie.__RestHelper.post('http://localhost', oopsieObject);
        },

        get: function(domainObject, id) {
            return oopsie.__RestHelper.get('http//localhost' + id);
        }


    };

}(window.oopsie));
