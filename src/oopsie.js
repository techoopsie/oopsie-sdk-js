import RestHelper from './RestHelper';
import OopsieService from './OopsieService';
import OopsieResource from './OopsieResource';
import Config from './config';

class Oopsie {

    constructor(webResourceId, callback) {

        if (webResourceId === undefined) {
            throw new Error('Oopsie needs an webResourceId to work.');
        }
        this._name = 'Oopsie';
        this.webResourceId = webResourceId;
        this.meta = {};
        this.resources = {};
        var self = this;

        RestHelper.get(Config.url.api + webResourceId + '/meta').then(function(meta) {

            self.meta = meta;
            self.resources = meta.properties;
            callback();

        }, function(err) {

            callback(err);

        });
    }

    get name() {
        return this._name;
    }


    getResource(resourceName) {
        if (resourceName === undefined) {
            throw new Error('OopsieResource needs an resource in the constructor.');
        }

        if (this.resources[resourceName] === undefined) {
            var availableResourceNames = '';
            for (var resource in this.resources) {
                availableResourceNames += resource + ', ';
            }
            availableResourceNames = availableResourceNames.slice(0, availableResourceNames.length - 2);
            throw new Error('Resource ' + resourceName + ' doesnt exist in your application. ' +
                '\n Available resources are: ' + availableResourceNames);
        }

        return new OopsieResource(resourceName, this.resources[resourceName]);
    }

            /*
             *  Requests to get/save OopsieResources
             *
             */

    getAll(resourceName, callback) {

        OopsieService.getAll(resourceName, callback);

    }

    save(oopsieResource, callback) {

        if (!oopsieResource || ! (oopsieResource instanceof OopsieResource) ) {
            throw new Error('Save neeeds an OopsieResource as first argument.');
        }

        OopsieService.save(oopsieResource, callback);

    }

    get(resourceName, id, callback) {

        if (!resourceName) {
            throw new Error('ResourceName can\'t be null or undefined');
        }

        if (!id) {
            throw new Error('Id can\'t be null or undefined');
        }

        if (!this._hasResource(resourceName, this.resources)) {
            throw new Error('Resource: ' + resourceName + ' doesn\'t exist.');
        }

        OopsieService.get(resourceName, id, callback);

    }

    /* Helpers */
    _hasResource(resourceName, resources) {
        return resources[resourceName] !== undefined;
    }

};

export default Oopsie;
