(function (oopsie) {
    'use strict';

    oopsie.__service = {

    	getAll: function (resource) {
            return OopsieUtil.__RestHelper.get('http://localhost/' + resource);
    	},

        save: function(oopsieObject) {
            return OopsieUtil.__RestHelper.post('http://localhost', oopsieObject);
        },

        get: function(resource, id) {
            return OopsieUtil.__RestHelper.get('http://localhost/' + resource + '/' + id);
        }

    };

}(window.OopsieUtil));
