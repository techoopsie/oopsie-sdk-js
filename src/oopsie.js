
(function (oopsie) {
    'use strict';

    oopsie.init = function(url) {
        oopsie.config.url = url;
    };

	oopsie.getAll = function (domainObject) {

        return oopsie.__service.getAll(domainObject);

	};

    oopsie.save = function(oopsieObject) {

        return oopsie.__service.save(oopsieObject);

    };

    oopsie.get = function(domainObject, id) {

        return oopsie.__service.get(domainObject, id);

    };


}(window.oopsie));
