const OopsieQuery = require('./oopsie.query');

class OopsieGetQuery extends OopsieQuery {

    constructor(resourceId, type, restHelper) {
        super(resourceId);
        this.view = null;
        this._audit = false;
        this.type = type;
        this.restHelper = restHelper
    }

    byView(view) {
        this.view = view;
        return this;
    }

    limit(limit) {
        if (limit < 0 || limit > 1000) {
            throw new Error('Limit has to be between 0-1000.');
        }
        this.limitBy = limit;
        return this;
    }

    hasNextPage() {
        return this.nextPageUrl !== null;
    }

    nextPage(callback) {
        var url = this.nextPageUrl.substring(this.restHelper.getProdUrl().length);
        this.restHelper.get(url, (err, response) => {
            if (err) {
                return callback(err);
            }
            this.nextPageUrl = response.metadata.nextPageUrl;
            this.prevPageUrl = response.metadata.prevPageUrl;
            callback(null, response);
        });
        return this;
    }

    hasPrevPage() {
        return this.prevPageUrl !== null;
    }

    prevPage(callback) {
        var url = this.prevPageUrl.substring(this.restHelper.getProdUrl().length);
        this.restHelper.get(url, (err, response) => {
            if (err) {
                return callback(err);
            }
            this.nextPageUrl = response.metadata.nextPageUrl;
            this.prevPageUrl = response.metadata.prevPageUrl;
            callback(null, response);
        });
        return this;
    }

    execute(callback) {
        this.restHelper.get(this._getUrl(), (err, response) => {
            if (err) {
                return callback(err);
            }

            if(response.metadata) {
                this.nextPageUrl = response.metadata.nextPageUrl;
                this.prevPageUrl = response.metadata.prevPageUrl;
            }
            callback(null, response);
        }, {json: this.type !== 'BINARY'});
        return this;
    }
}

module.exports = OopsieGetQuery;
