(function (oopsie) {
    'use strict';

    oopsie.__RestHelper = {

        get: function (url) {

            url = this.appendFirstSlash(url);

            return new oopsie.Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        alert(xhr.responseText);
                        resolve(xhr.responseText);
                    } else if (xhr.readyState === XMLHttpRequest.DONE) {
                        reject();
                    }
                };
                xhr.open('GET', oopsie.config.url + url, true);
                xhr.send(null);
            });
    	},

        save: function(url, item) {

            url = this.appendFirstSlash(url);

            return new oopsie.Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        alert(xhr.responseText);
                        resolve(xhr.responseText);
                    } else if (xhr.readyState === XMLHttpRequest.DONE) {
                        reject();
                    }
                };
                xhr.open('POST', oopsie.config.url + url, true);
                xhr.send('item=' + JSON.stringify(item));
            });
        },

        appendFirstSlash: function(url) {
            if (url.slice(0, '/') !== '/') {
                url = '/' + url;
            }
        }

    };



}(window.oopsie));
