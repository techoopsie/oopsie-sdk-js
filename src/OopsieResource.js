class OopsieResource {

    constructor(resourceName, resource) {
        this.resourceName = resourceName;
        this.resource = resource;
        this._items = {};
        this.setupGettersAndSetters();
        this.setValues();
    }

    setupGettersAndSetters() {

        for (var key in this.resource) {
            /*jslint evil: true */
            var name = key;
            var nameOfItemWithUppercase = this._capitalizeFirstLetter(name);
            var setter = 'set' + nameOfItemWithUppercase;
            var getter = 'get' + nameOfItemWithUppercase;
            this[setter] = new Function('value', 'this.__addItem("' + key + '", value);');
            this[getter] = new Function('return this.__getItem("' + key + '");');
        }

    }

    setValues() {

        for (var key in this.resource) {

            var resource = this.resource[key];

            if (resource === '' || resource === undefined) {
                continue;
            }

            this.__addItem(key, resource);
        }

    }

    _capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    __addItem(key, value) {
        this._items[key] = value;
    }

    __getItem(key) {
        return this._items[key];
    }

    getItem() {
        return this._items;
    }


}

export default OopsieResource;
