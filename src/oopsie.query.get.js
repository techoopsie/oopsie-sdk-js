const RestHelper = require('./resthelper');

class OopsieQuery {

    constructor(resourceId) {
        this.url = '/resources/' + resourceId;
        this.limitBy = -1;
        this.view = null;
        this._expandRelations = false;
    }

    byView(view) {
        this.view = view;
        return this;
    }

    withParams(params) {
        this.params = params;
        return this;
    }

    limit(limit) {
        if (limit < 0 || limit > 1000) {
            throw new Error('Limit has to be between 0-1000.');
        }
        this.limitBy = limit;
        return this;
    }

    expandRelations() {
        this._expandRelations = true;
        return this;
    }

    _getUrl() {

        if (this.view) {
            this.url += '/views/' + this.view;
        }

        for (var key in this.params) {
            if (this.params.hasOwnProperty(key)) {
                this._addQueryParam(key, this.params[key]);
            }
        }

        if (this.limitBy !== -1) {
            this._addQueryParam('_limit', this.limitBy);
        }

        if (this._expandRelations) {
            this._addQueryParam('_expandRelations', true);
        }

        return this.url;
    }

    _addQueryParam(key, value) {
        if (this.url.indexOf('?') === -1) {
            this.url += '?' + key + '=' + value;
        } else {
            this.url += '&' + key + '=' + value;
        }
    }

    hasNextPage() {
        return this.nextPageUrl !== null;
    }

    nextPage(callback) {
        var url = this.nextPageUrl.substring(RestHelper.getProdUrl().length);
        RestHelper.get(url, (err, response) => {
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
        var url = this.prevPageUrl.substring(RestHelper.getProdUrl().length);
        RestHelper.get(url, (err, response) => {
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

        this.url = this._getUrl();
        RestHelper.get(this.url, (err, response) => {
            if (err) {
                return callback(err);
            }
            this.nextPageUrl = response.metadata.nextPageUrl;
            this.prevPageUrl = response.metadata.prevPageUrl;
            callback(null, response);
        });
        return this;
    }


}

module.exports = OopsieQuery;
