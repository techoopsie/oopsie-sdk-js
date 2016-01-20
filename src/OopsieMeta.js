var Oopsie = (function (oopsie) {
    'use strict';
    /*oopsie._meta = {
        'person': {
            'lastname': 'string',
            'firstname': 'string'
        }
    };*/
    oopsie._meta = {};
    oopsie._restHelper.get('http://localhost').then(function(data) {
        oopsie._meta = data;
    });

	return oopsie;
}(Oopsie || {}));
