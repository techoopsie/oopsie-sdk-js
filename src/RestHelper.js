(function (oopsie) {
    'use strict';

    oopsie.__RestHelper = {

        get: function (url) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        alert(xhr.responseText);
                        resolve(xhr.responseText);
                    } else if (xhr.readyState === XMLHttpRequest.DONE) {
                        reject();
                    }
                };
                xhr.open('GET', url, true);
                xhr.send(null);
            });
    	},

        save: function(url, item) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        alert(xhr.responseText);
                        resolve(xhr.responseText);
                    } else if (xhr.readyState === XMLHttpRequest.DONE) {
                        reject();
                    }
                };
                xhr.open('POST', url, true);
                xhr.send('item=' + JSON.stringify(item));
            });
        }

    };



}(window.oopsie));
