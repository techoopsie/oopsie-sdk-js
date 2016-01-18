function rest(url, domainObject) {

    var rest = {};

    rest.url = url + '/' + domainObject;
    rest.domainObject = domainObject;

    rest.getAll = function() {

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                alert(xhr.responseText);
            }
        }
        xhr.open('GET', this.url, true);
        xhr.send(null);

    };

    rest.save = function(item) {

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                alert(xhr.responseText);
            }
        }
        xhr.open('POST', this.url, true);
        xhr.send('item=' + JSON.stringify(item));

    };

    return rest;
};
