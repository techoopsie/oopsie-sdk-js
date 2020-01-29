const request = require('request');

const RestHelper = {

    setProdUrl: function(url) {
        this.url = url;
    },

    getProdUrl: function() {
        return this.url;
    },

    setCustomerId: function(customerId) {
        this.customerId = customerId;
        this.headers['oopsie-customer-id'] = customerId;
    },

    setSiteId: function(siteId) {
        this.siteId = siteId;
        this.headers = this.headers || {};
        this.headers['oopsie-site-id'] = siteId;
    },

    setApiKey: function(apiKey) {
        this.apiKey = apiKey;
        this.headers['Authorization'] = apiKey;
    },

    get: function(url, cb) {
        return this.send(this.url + this.appendFirstSlash(url), 'GET', null, cb);
    },

    post: function(url, item, cb) {
        return this.send(this.url + this.appendFirstSlash(url), 'POST', item, cb);
    },

    put: function(url, item, cb) {
        return this.send(this.url + this.appendFirstSlash(url), 'PUT', item, cb);
    },

    delete: function(url, cb) {
        return this.send(this.url + this.appendFirstSlash(url), 'DELETE', null, cb);
    },

    appendFirstSlash: function(url) {
        if (url.indexOf('/') !== 0) {
            url = '/' + url;
        }
        return url;
    },

    send: function(url, method, item, cb) {
        let options = {
            url: url,
            method: method,
            headers: this.headers,
            withCredentials: true,
            json: true
        };

        if (item) {
            options.body = item;
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
    },

    mock: function(xhr) {
        request.XMLHttpRequest = xhr;
    }
}

module.exports = RestHelper;
