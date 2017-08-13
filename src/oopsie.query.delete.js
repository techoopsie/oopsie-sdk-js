import RestHelper from './resthelper';

class OopsieDeleteQuery {

    constructor(resourceId) {
        this.url = '/resources/' + resourceId;
    }

    withParams(params) {
        this.params = params;
        return this;
    }

    _getUrl() {

        for (var key in this.params) {
            if (this.params.hasOwnProperty(key)) {
                this._addQueryParam(key, this.params[key]);
            }
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

    execute(callback) {

        this.url = this._getUrl();
        RestHelper.delete(this.url).then(response => {
            callback(null, response);
        }, (err) => {         
            callback(err);
        });
    }
}

export default OopsieDeleteQuery;
