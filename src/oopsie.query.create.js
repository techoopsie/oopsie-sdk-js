const RestHelper = require('./resthelper');
const OopsieQuery = require('./oopsie.query');

class OopsieCreateQuery extends OopsieQuery {

    constructor(resourceId, type) {
        super(resourceId);
        this.type = type;
    }

    execute(cb) {
        if(this.type === 'ENTITY') {
            RestHelper.post(this.url, this.params, cb);
        } else if(this.type === 'BINARY') {
            console.log('POST BINARY');
            console.log(this.url);
            console.log(this.params);
        }
    }
}

module.exports = OopsieCreateQuery;
