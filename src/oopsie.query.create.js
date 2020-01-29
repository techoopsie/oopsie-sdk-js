const RestHelper = require('./resthelper');
const OopsieQuery = require('./oopsie.query');

class OopsieCreateQuery extends OopsieQuery {

    constructor(resourceId) {
        super(resourceId);
    }

    execute(cb) {
        RestHelper.post(this.url, this.params, cb);
    }
}

module.exports = OopsieCreateQuery;
