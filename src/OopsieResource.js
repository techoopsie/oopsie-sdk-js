class OopsieResource {

    constructor(resourceName, resourceMeta) {
        this.resourceName = resourceName;
        this.resourceMeta = resourceMeta;
        this._items = {};
        this._setupGettersAndSetters();
        this._setValues();
    }

    _setupGettersAndSetters() {

        for (let attribute of this.resourceMeta.getAttributes()) {
            /*jslint evil: true */
            var key = attribute.getKey();
            var nameOfItemWithUppercase = this._capitalizeFirstLetter(key);
            var setter = 'set' + nameOfItemWithUppercase;
            var getter = 'get' + nameOfItemWithUppercase;
            this[setter] = new Function('value', 'this.__addItem("' + name + '", value);');
            this[getter] = new Function('return this.__getItem("' + name + '");');
        }

    }

    _setValues() {

        for (var value of this.resourceMeta.getAttributes()) {

            if (value === '' || value === undefined) {
                continue;
            }

            this.__addItem(value.getKey(), value.getValue());
        }

    }

    _capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    __addItem(key, value) {
        console.log("Adding item " + key + " value " + value);
        this._items[key].value = value;
    }

    __getItem(key) {
        return this._items[key];
    }

    getItem() {
        return this._items;
    }


}

export default OopsieResource;
