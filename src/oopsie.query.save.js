const OopsieQuery = require('./oopsie.query');

class OopsieSaveQuery extends OopsieQuery {

    constructor(resourceId, restHelper) {
        super(resourceId);
        this.restHelper = restHelper;
    }

    withParams(params) {
        this.params = params;

        if (!this.params.id) {
            throw new Error('Save needs an id. Batch update not supported yet.');
        }
        return this;
    }

    execute(callback) {
        this.restHelper.put(this.url, this.params, callback);
    }
}

module.exports = OopsieSaveQuery;
