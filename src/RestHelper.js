const request = require('request');

class RestHelper {

    constructor() {

    }

    setProdUrl(url) {
        this.url = url;
    }

    getProdUrl() {
        return this.url;
    }

    setCustomerId(customerId) {
        this.customerId = customerId;
        this.headers['oopsie-customer-id'] = customerId;
    }

    setSiteId(siteId) {
        this.siteId = siteId;
        this.headers = this.headers || {};
        this.headers['oopsie-site-id'] = siteId;
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
        this.headers['Authorization'] = apiKey;
    }

    get(url, cb, { json } = {}) {
        return this.send(this.url + this.appendFirstSlash(url), 'GET', null, cb, json);
    }

    post(url, item, cb) {
        return this.send(this.url + this.appendFirstSlash(url), 'POST', item, cb);
    }

    put(url, item, cb) {
        return this.send(this.url + this.appendFirstSlash(url), 'PUT', item, cb);
    }

    delete(url, cb) {
        return this.send(this.url + this.appendFirstSlash(url), 'DELETE', null, cb);
    }

    appendFirstSlash(url) {
        if (url.indexOf('/') !== 0) {
            url = '/' + url;
        }
        return url;
    }

    send(url, method, item, cb, json = true) {
        let options = {
            url,
            method,
            headers: this.headers,
            withCredentials: true,
            json
        };

        if (item) {
            options.body = item;
        }
        if (!json) {
            console.log('Binary!')
            options.responseType = 'blob'
        }
        request(options, function (error, response, body) {
            if (!cb) {
                return;
            }
            if (error) {
                return cb(error);
            }
            if (response.statusCode >= 400) {
                var err = {
                    message: (body === undefined || body === '') ? 'No error message' : body.message,
                    status: response.statusCode
                };
                return cb(err);
            }
            cb(null, body);
        });
    }

    mock(xhr) {
        request.XMLHttpRequest = xhr;
    }
}

module.exports = RestHelper;
