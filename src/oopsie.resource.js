const OopsieQuery = require('./oopsie.query.get');
const OopsieDeleteQuery = require('./oopsie.query.delete');
const OopsieCreateQuery = require('./oopsie.query.create');
const OopsieSaveQuery = require('./oopsie.query.save');

class OopsieResource {

    constructor(resource) {
        this.resourceName = resource.name;
        this.id = resource.id;
        this.attributes = resource.attributes;
        this.partitionKeys = resource.partitionKeys;
        this.clusterKeys = resource.clusterKeys;
        this.views = resource.views;
        this.auths = resource.auths;
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
