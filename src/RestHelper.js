import { Promise } from 'es6-promise';

const RestHelper = {


        get: function(url) {

            var self = this;

            return new Promise(function(resolve, reject) {

                self.sendXMLHttpRequest(
                    url,
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
                    url,
                    'POST',
                    'item=' + JSON.stringify(item),
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

                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

                    resolve(JSON.parse(xhr.responseText));

                } else if (xhr.readyState === XMLHttpRequest.DONE) {

                    var err = {
                        message: JSON.parse(xhr.responseText),
                        status: xhr.status
                    };
                    reject(err);

                }

            };

            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(item);
        }

}

export default RestHelper;
