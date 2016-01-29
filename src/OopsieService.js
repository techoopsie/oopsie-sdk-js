(function (oopsie) {
    'use strict';

    oopsie.__service = {

    	getAll: function (resourceName, callback) {

            OopsieUtil.__RestHelper.get('http://localhost/' + resourceName).then(function(resources) {
                var oopsieResources = [];

                try {

                    for (var resource in resources) {
                        oopsieResources.push(new OopsieResource(resourceName, resources[resource]));
                    }

                } catch(err) {

                    callback(err, null);

                }

                callback(null, oopsieResources);

            }, function(err) {

                callback(err, null);

            });

    	},

        save: function(oopsieResource, callback) {

            OopsieUtil.__RestHelper.post('http://localhost/' + oopsieResource.resourceName, oopsieResource).then(function(resource) {

                try {

                    var oopsieResource = new OopsieResource(oopsieResource.resourceName, resource);
                    callback(null, oopsieResource);

                } catch(err) {

                    callback(err, null);

                }

            }, function(err) {

                callback(err, null);

            });

        },

        get: function(resourceName, id, callback) {

            OopsieUtil.__RestHelper.get('http://localhost/' + resourceName + '/' + id).then(function(resource) {

                try {

                    var oopsieResource = new OopsieResource(resourceName, resource);
                    callback(null, oopsieResource);

                } catch(err) {

                    callback(err, null);

                }

            }, function(err) {

                callback(err, null);

            });
        }

    };

}(window.OopsieUtil));
