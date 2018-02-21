const OopsieQuery = require('./oopsie.query.get');
const OopsieDeleteQuery = require('./oopsie.query.delete');
const OopsieCreateQuery = require('./oopsie.query.create');
const OopsieSaveQuery = require('./oopsie.query.save');

class OopsieResource {

    constructor(resource) {
       
        this.resourceName = resource.name;
        this.id = resource.id;
        this.attributes = resource.attributes;
        this.views = resource.views;
        this.auths = resource.auths;
        this.authEnabled = resource.authEnabled;

         // Make sure you can always get the full init object.
        this._resource = resource;
    }

    hasAuthEnabled() {
        return this.authEnabled;
    }

    create() {
        return new OopsieCreateQuery(this.id);
    }

    save() {
        return new OopsieSaveQuery(this.id);
    }

    delete() {
        return new OopsieDeleteQuery(this.id);
    }

    get() {
        return new OopsieQuery(this.id);
    }

}

module.exports = OopsieResource;
