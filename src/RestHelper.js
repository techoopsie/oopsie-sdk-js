import { Promise } from 'es6-promise';

const RestHelper = {

        setProdUrl: function(url) {
            this.url = url;
        },

        getProdUrl: function() {
            return this.url;
        },

        setCustomerId: function(customerId) {
            this.customerId = customerId;
        },

        setSiteId: function(siteId) {
            this.siteId = siteId;
        },

        get: function(url) {

            var self = this;

            return new Promise(function(resolve, reject) {

                self.sendXMLHttpRequest(
                    self.url + url,
                    'GET',
                    null,
                    resolve,
                    reject
                );

            });
    	},

        post: function(url, item) {

            var self = this;

            return new Promise(function(resolve, reject) {

                self.sendXMLHttpRequest(
                    self.url + url,
                    'POST',
                    JSON.stringify(item),
                    resolve,
                    reject
                );

            });
        },

        delete: function(url) {

            var self = this;

            return new Promise(function(resolve, reject) {

                self.sendXMLHttpRequest(
                    self.url + url,
                    'DELETE',
                    null,
                    resolve,
                    reject
                );

            });

        },

        appendFirstSlash: function(url) {
            if (url.slice(0, '/') !== '/') {
                url = '/' + url;
            }
            return url;
        },

        sendXMLHttpRequest: function(url, method, item, resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {

                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 200 &&  xhr.status < 300) {
                    var data = {};
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch (err) {}

                    resolve(data);
                    

                }  else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 0) {

                    var err = {
                        message: 'Unknown Error Occured. Server response not received.',
                        status: xhr.status
                    };

                    reject(err);

                } else if (xhr.readyState === XMLHttpRequest.DONE) {

                    var err = {
                        message: xhr.responseText === '' ? 'No error message' : JSON.parse(xhr.responseText),
                        status: xhr.status
                    };

                    reject(err);

                }

            };

            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.withCredentials = 'true';            
            xhr.setRequestHeader('oopsie-site-id', this.siteId);
            xhr.setRequestHeader('oopsie-customer-id', this.customerId);
            xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
            xhr.send(item);
        }

}

export default RestHelper;
