import RestHelper from './RestHelper';

class OopsieCreateQuery {

    constructor(resourceId) {
        this.url = '/resources/' + resourceId;
    }

    withParams(params) {
        this.params = params;
        return this;
    }

    execute(callback) {

        RestHelper.post(this.url, this.params).then(response => {
            callback(null, response);
        }, (err) => {
            callback(err);
        });
    }
}

export default OopsieCreateQuery;
