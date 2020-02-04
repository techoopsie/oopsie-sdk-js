const OopsieQuery = require('./oopsie.query');

class OopsieDeleteQuery extends OopsieQuery {

    constructor(resourceId, restHelper) {
        super(resourceId);
        this.restHelper = restHelper;
    }

    execute(callback) {
        this.restHelper.delete(this._getUrl(), callback);
    }
}

module.exports = OopsieDeleteQuery;
