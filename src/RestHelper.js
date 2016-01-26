(function (oopsie) {
    'use strict';
    oopsie.__RestHelper = {

        get: function (url) {
            var self = this;

            return new OopsieUtil.Promise(function(resolve, reject) {
                console.log("in get");
                self.sendXMLHttpRequest(
                    url,
                    'GET',
                    null,
                    resolve,
                    reject
                );

            });
    	},

        save: function(url, item) {

            return new OopsieUtil.Promise(function(resolve, reject) {

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
                console.log(xhr.readyState);
                console.log(xhr.status);
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if (xhr.readyState === XMLHttpRequest.DONE) {
                    reject(new Error('Failed to retrieve data'));
                }
            };
            console.log("getting " + url);
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(item);
        }

    };



}(window.OopsieUtil));
