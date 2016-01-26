(function (oopsieResource) {
    'use strict';

    var oopsieResource = window.OopsieResource = function OopsieResource(resourceName, resource) {

        if ( !(this instanceof OopsieResource) ) {
            return new OopsieResource(resourceName, resource);
        }

        var self = this;
        self.resource = resource[resourceName];
        self.resourceName = resourceName;
        self.items = {};

        self.setupGettersAndSetters();

        return self;
    };

    oopsieResource.prototype.setupGettersAndSetters = function() {

        for (var key in self.resource) {
            /*jslint evil: true */
            var name = key;
            var nameOfItemWithUppercase = capitalizeFirstLetter(name);
            var setter = 'set' + nameOfItemWithUppercase;
            var getter = 'get' + nameOfItemWithUppercase;
            self[setter] = new Function('value', 'this.__addItem("' + key + '", value);');
            self[getter] = new Function('return this.__getItem("' + key + '");');
        }

    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    oopsieResource.prototype.__addItem = function(key, value) {
        this.items[key] = value;
    };

    oopsieResource.prototype.__getItem = function(key) {
        return this.items[key];
    };

    oopsieResource.prototype.getItem = function() {
        return this.items;
    };


}(window.OopsieResource));
