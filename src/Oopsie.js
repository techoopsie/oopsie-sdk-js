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
        var self = this;

        this.oopsieService = new OopsieService(webResourceId, function(err, meta) {

            callback(err, self);

        });

    }

    get name() {
        return this._name;
    }


    createResource(resourceName) {
        if (resourceName === undefined) {
            throw new Error('OopsieResource needs an resource in the constructor.');
        }
        return new OopsieResource(resourceName, this.oopsieService.getAttributesByResourceName(resourceName));
    }

    /*
    *  Requests to get/save OopsieResources
    *
    */

    getAll(resourceName, callback) {

        this.oopsieService.getAll(resourceName, callback);

    }

    save(oopsieResource, callback) {

        if (!oopsieResource || ! (oopsieResource instanceof OopsieResource) ) {
            throw new Error('Save neeeds an OopsieResource as first argument.');
        }

        this.oopsieService.save(oopsieResource, callback);

    }

    get(resourceName, id, callback) {

        if (!resourceName) {
            throw new Error('ResourceName can\'t be null or undefined');
        }

        if (!id) {
            throw new Error('Id can\'t be null or undefined');
        }

        if (!this.oopsieService.hasResource(resourceName)) {
            throw new Error('Resource: ' + resourceName + ' doesn\'t exist.');
        }

        this.oopsieService.get(resourceName, id, callback);

    }

    delete(resourceName, id, callback) {

        if (!resourceName) {
            throw new Error('ResourceName can\'t be null or undefined');
        }

        if (!id) {
            throw new Error('Id can\'t be null or undefined');
        }

        if (!this.oopsieService.hasResource(resourceName)) {
            throw new Error('Resource: ' + resourceName + ' doesn\'t exist.');
        }

        this.oopsieService.delete(resourceName, id, callback);

    };

};

export default Oopsie;
