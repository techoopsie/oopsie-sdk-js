class OopsieResource {

    constructor(resourceName, meta) {
        this.resourceName = resourceName;
        this.meta = meta;
        this.resources = this.meta.getAttributesByResourceName(resourceName);
        console.log(this.resources);
        this._items = {};
        this._setupGettersAndSetters(resourceName);
        this._setValues();
    }

    _setupGettersAndSetters(resourceName) {
        console.log("setupGetters");
        console.log(this.meta);
        for (var key in this.resources) {
            /*jslint evil: true */
            var name = key;
            var nameOfItemWithUppercase = this._capitalizeFirstLetter(key);
            var setter = 'set' + nameOfItemWithUppercase;
            var getter = 'get' + nameOfItemWithUppercase;
            this[setter] = new Function('value', 'this.__addItem("' + name + '", value);');
            this[getter] = new Function('return this.__getItem("' + name + '");');
        }

    }

    _setValues() {

        for (var key in this.resources) {
            console.log(key);
            console.log(this.resourceMeta);
            var value = this.resourceMeta[key];
            if (value === '' || value === undefined) {
                continue;
            }

            this.__addItem(key, value);
        }

    }

    _capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    __addItem(key, value) {
        console.log("Adding item " + key + " value " + value);
        this._item[key] = {};
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
