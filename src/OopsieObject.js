(function (oopsieResource) {
    'use strict';

    oopsieResource = window.OopsieResource = function OopsieResource(resourceName, resource) {

        if ( !(this instanceof OopsieResource) ) {
            return new OopsieResource(resourceName, resource);
        }

        var self = this;
        self.resource = resource;
        self.resourceName = resourceName;
        self._items = {};

        self.setupGettersAndSetters();
        self.setValues();

        return self;
    };

    oopsieResource.prototype.setupGettersAndSetters = function() {

        for (var key in this.resource) {
            /*jslint evil: true */
            var name = key;
            var nameOfItemWithUppercase = capitalizeFirstLetter(name);
            var setter = 'set' + nameOfItemWithUppercase;
            var getter = 'get' + nameOfItemWithUppercase;
            this[setter] = new Function('value', 'this.__addItem("' + key + '", value);');
            this[getter] = new Function('return this.__getItem("' + key + '");');
        }

    };

    oopsieResource.prototype.setValues = function() {

        for (var key in this.resource) {

            var resource = this.resource[key];

            if (resource === '' || resource === undefined) {
                continue;
            }

            this.__addItem(key, resource);
        }

    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    oopsieResource.prototype.__addItem = function(key, value) {
        this._items[key] = value;
    };

    oopsieResource.prototype.__getItem = function(key) {
        return this._items[key];
    };

    oopsieResource.prototype.getItem = function() {
        return this._items;
    };


}(window.OopsieResource));
