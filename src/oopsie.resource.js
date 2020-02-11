const OopsieQuery = require('./oopsie.query.get');
const OopsieDeleteQuery = require('./oopsie.query.delete');
const OopsieCreateQuery = require('./oopsie.query.create');
const OopsieSaveQuery = require('./oopsie.query.save');

class OopsieResource {

    constructor(resource, restHelper) {
       
        this.resourceName = resource.name;
        this.id = resource.id;
        this.attributes = resource.attributes;
        this.views = resource.views;
        this.auths = resource.auths;
        this.authEnabled = resource.authEnabled;
         // Make sure you can always get the full init object.
        this._resource = resource;
        this.restHelper = restHelper;
    }

    hasAuthEnabled() {
        return this.authEnabled;
    }

    create() {
        return new OopsieCreateQuery(this.id, this.restHelper);
    }

    save() {
        return new OopsieSaveQuery(this.id, this.restHelper);
    }

    delete() {
        return new OopsieDeleteQuery(this.id, this.restHelper);
    }

    get() {
        return new OopsieQuery(this.id, this._resource.type, this.restHelper);
    }

    getAttributes() {
        return this.attributes;
    }

}

module.exports = OopsieResource;
