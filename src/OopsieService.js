import RestHelper from './RestHelper';
import OopsieResource from './OopsieResource';
import Config from './config';
import Meta from './meta/Meta';

class OopsieService {

    constructor(webServiceId, callback) {
        this.webServiceId = webServiceId;
        this.getMeta(callback);
    }

    setMeta(meta) {
        this.meta = meta;
    }

    getMeta(callback) {

        var self = this;
        RestHelper.get(Config.url.api + this.webServiceId + '/meta').then(function(meta) {

            self.meta = new Meta(meta);
            callback(null, meta);

        }, function(err) {
            
            callback(err);

        });

    }

    getAttributesByResourceName(resourceName) {
        return this.meta.getAttributesByResourceName(resourceName);
    }

    getAll(resourceName, callback) {
        var resourceId = this.meta.getResourceId(resourceName);
        RestHelper.get(Config.url.api + this.webServiceId + '/resources/' + resourceId).then(function(resources) {
            var oopsieResources = [];

            try {
                for (var resource in resources) {
                    oopsieResources.push(new OopsieResource(resourceName, resources[resource].attributes, resources[resource].id));
                }

            } catch(err) {

                callback(err, null);

            }

            callback(null, oopsieResources);

        }, function(err) {

            callback(err, null);

        });

    }

    save(oopsieResource, callback) {
        var resourceId = this.meta.getResourceId(oopsieResource.resourceName);
        RestHelper.post(Config.url.api + this.webServiceId + '/resources/' + resourceId, oopsieResource.getResources()).then(function(resource) {

            try {

                oopsieResource = new OopsieResource(oopsieResource.resourceName, resource.attributes, resource.id);
                callback(null, oopsieResource);

            } catch(err) {

                callback(err, null);

            }

        }, function(err) {

            callback(err, null);

        });

    }

    get(resourceName, id, callback) {
        var resourceId = this.meta.getResourceId(resourceName);
        RestHelper.get(Config.url.api + this.webServiceId + '/resources/' + resourceId + '/' + id).then(function(resource) {

            try {

                var oopsieResource = new OopsieResource(resourceName, resource.attributes, resource.id);
                callback(null, oopsieResource);

            } catch(err) {

                callback(err, null);

            }

        }, function(err) {

            callback(err, null);

        });
    }

    delete(resourceName, id, callback) {
        var resourceId = this.meta.getResourceId(resourceName);
        RestHelper.delete(Config.url.api + this.webServiceId + '/resources/' + resourceId + '/' + id).then(function(resource) {

            callback(null);

        }, function(err) {

            callback(err);

        });
    }

    hasResource(resourceName) {
        return this.meta.hasResource(resourceName);
    }

};

export default OopsieService;
