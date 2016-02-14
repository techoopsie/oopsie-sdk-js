import RestHelper from './RestHelper';
import OopsieResource from './OopsieResource';

const OopsieService = {

    getAll: function(resourceName, callback) {

        RestHelper.get('http://localhost/' + resourceName).then(function(resources) {
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

        RestHelper.post('http://localhost/' + oopsieResource.resourceName, oopsieResource.getItem()).then(function(resource) {

            try {

                oopsieResource = new OopsieResource(oopsieResource.resourceName, resource);
                callback(null, oopsieResource);

            } catch(err) {

                callback(err, null);

            }

        }, function(err) {

            callback(err, null);

        });

    },

    get: function(resourceName, id, callback) {

        RestHelper.get('http://localhost/' + resourceName + '/' + id).then(function(resource) {

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

export default OopsieService;
