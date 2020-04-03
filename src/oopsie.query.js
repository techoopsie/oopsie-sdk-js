class OopsieQuery {

    constructor(resourceId) {
        this.url = '/api/v1/resources/' + resourceId;
        this.limitBy = -1;
        this.auth = null;
    }

    asAuth(auth) {
        this.auth = auth
        return this;
    }

    withParams(params) {
        this.params = params;
        return this;
    }


    _getUrl() {
        let url = this.url;
        if (this.view) {
            url += '/views/' + this.view;
        }

        for (var key in this.params) {
            if (this.params.hasOwnProperty(key)) {
                url = this._addQueryParam(key, this.params[key], url);
            }
        }

        if (this.limitBy !== -1) {
            url = this._addQueryParam('_limit', this.limitBy, url);
        }

        if (this.auth) {
            url = this._addQueryParam('_auth', this.auth, url);
        }

        return url;
    }

    _addQueryParam(key, value, url) {
        if (url.indexOf('?') === -1) {
            url += '?' + key + '=' + value;
        } else {
            url += '&' + key + '=' + value;
        }
        return url;
    }
}

module.exports = OopsieQuery;
