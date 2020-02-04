const OopsieQuery = require('./oopsie.query');

class OopsieCreateQuery extends OopsieQuery {

    constructor(resourceId, restHelper) {
        super(resourceId);
        this.restHelper = restHelper;
    }

    execute(cb) {
        this.restHelper.post(this.url, this.params, cb);
    }
}

module.exports = OopsieCreateQuery;
