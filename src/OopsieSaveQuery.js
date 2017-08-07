import RestHelper from './RestHelper';

class OopsieSaveQuery {

    constructor(resourceId) {
        this.url = '/resources/' + resourceId;
    }

    withParams(params) {
        this.params = params;

        if (!this.params.eid) {
            throw new Error('Save needs an Eid.');
        }
        return this;
    }

    execute(callback) {

        RestHelper.put(this.url, this.params).then(response => {
            callback(null, response);
        }, (err) => {
            callback(err);
        });
    }
}

export default OopsieSaveQuery;
