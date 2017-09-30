const RestHelper = require('./resthelper');

class OopsieCreateQuery {

    constructor(resourceId) {
        this.url = '/api/v1/resources/' + resourceId;
    }

    withParams(params) {
        this.params = params;
        return this;
    }

    execute(cb) {

        RestHelper.post(this.url, this.params, cb);
    }
}

module.exports = OopsieCreateQuery;
