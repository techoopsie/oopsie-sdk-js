
(function () {
    'use strict';

    var oopsie = window.Oopsie = function Oopsie(appId, callback) {

        if (appId === undefined) {
            throw new Error('Oopsie needs an App Id to work.');
        }

        if ( !(this instanceof Oopsie) ) {
            return new Oopsie(appId, callback);
        }

        this.appId = appId;
        this.meta = {};
        this.resources = {};
        var self = this;

        OopsieUtil.__RestHelper.get('http://localhost').then(function(meta) {

            self.meta = meta;
            self.resources = meta.properties;
            callback();

        }, function(err) {

            console.log(err);
            callback(err);

        });

        return this;

    };

    oopsie.prototype.getResource = function(resourceName) {
        if (resourceName === undefined) {
            throw new Error('OopsieResource needs an resource in the constructor.');
        }

        if (this.resources[resourceName] === undefined) {
            var availableResourceNames = '';
            for (var resource in this.resources) {
                availableResourceNames += resource + ', ';
            }
            availableResourceNames = availableResourceNames.slice(0, availableResourceNames.length - 2);
            throw new Error('Resource ' + resourceName + ' doesnt exist in your application. '
                 + '\n Available resources are: ' + availableResourceNames);
        }

        return new OopsieResource(resourceName, this.resources[resourceName]);
    };

	oopsie.prototype.getAll = function (resourceName) {

        return OopsieUtil.__service.getAll(resourceName);

	};

    oopsie.prototype.save = function(oopsieObject) {

        return OopsieUtil.__service.save(oopsieObject);

    };

    oopsie.prototype.get = function(resourceName, id) {

        return OopsieUtil.__service.get(resourceName, id);

    };


}());
