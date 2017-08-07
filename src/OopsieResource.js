import OopsieQuery from './OopsieQuery';
import OopsieDeleteQuery from './OopsieDeleteQuery';
import OopsieCreateQuery from './OopsieCreateQuery';
import OopsieSaveQuery from './OopsieSaveQuery';

import RestHelper from './RestHelper';

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

    create(params, callback) {
        return new OopsieCreateQuery(this.id);
    }

    save(params, callback) {
        return new OopsieSaveQuery(this.id);
    }

    delete(params, callback) {
        return new OopsieDeleteQuery(this.id);
    }

    get() {
        return new OopsieQuery(this.id);
    }

}

export default OopsieResource;
