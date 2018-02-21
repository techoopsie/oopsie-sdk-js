const RestHelper = require('./resthelper');
const OopsieQuery = require('./oopsie.query');

class OopsieDeleteQuery extends OopsieQuery {

    constructor(resourceId) {
        super(resourceId);
    }

    execute(callback) {
        RestHelper.delete(this._getUrl(), callback);
    }
}

module.exports = OopsieDeleteQuery;
