(function (oopsie) {
    'use strict';

    oopsie.__service = {

    	getAll: function () {
            return oopsie.__RestHelper.get('http://localhost');
    	},

        save: function(oopsieObject) {
            return oopsie.__RestHelper.post('http://localhost', oopsieObject);
        }

    };

}(window.oopsie));
