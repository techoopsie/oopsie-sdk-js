const RestHelper = require('./resthelper');
const OopsieQuery = require('./oopsie.query');

class OopsieSaveQuery extends OopsieQuery {

    constructor(resourceId) {
        super(resourceId);
    }

    withParams(params) {
        this.params = params;

        if (!this.params.id) {
            throw new Error('Save needs an id. Batch update not supported yet.');
        }
        return this;
    }

    execute(callback) {
        RestHelper.put(this.url, this.params, callback);
    }
}

module.exports = OopsieSaveQuery;
