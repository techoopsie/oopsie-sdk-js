var Oopsie = (function (oopsie) {
    'use strict';

	oopsie.getAll = function () {
        return oopsie._restHelper.get('http://localhost');
	};

    oopsie.save = function(oopsieObject) {
        return oopsie._restHelper.post('http://localhost', oopsieObject);
    };

	return oopsie;
}(Oopsie || {}));
