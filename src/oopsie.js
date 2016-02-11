import RestHelper from './RestHelper';
import OopsieService from './OopsieService';
import OopsieResource from './OopsieResource';
import Meta from './meta/Meta';
import Config from './config';

class Oopsie {

    constructor(webResourceId, callback) {

        if (webResourceId === undefined) {
            throw new Error('Oopsie needs an webResourceId to work.');
        }
        this._name = 'Oopsie';
        this.webResourceId = webResourceId;
        this.meta = {};
        var self = this;

        RestHelper.get(Config.url.api + webResourceId + '/meta').then(function(meta) {
            console.log("Creating meta");
            self.meta = new Meta(meta);
            callback();

        }, function(err) {

            callback(err);

        });
    }

    get name() {
        return this._name;
    }


    createResource(resourceName) {
        if (resourceName === undefined) {
            throw new Error('OopsieResource needs an resource in the constructor.');
        }

        var resourceMeta = this.meta.getResourceByName(resourceName);
        console.log("Creating resource with ");
        console.log(resourceMeta);
        return new OopsieResource(resourceName, resourceMeta);
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

        if (!this.meta.hasResource(resourceName)) {
            throw new Error('Resource: ' + resourceName + ' doesn\'t exist.');
        }

        OopsieService.get(resourceName, id, callback);

    }

};

export default Oopsie;
