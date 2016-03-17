class OopsieResource {

    constructor(resourceName, resources, id) {
        this.resourceName = resourceName;
        this.id = id;
        // Clone object.
        this.resources = JSON.parse(JSON.stringify(resources));
        
        this._setupGettersAndSetters(resourceName);
    }

    print() {
        var resources = this.getResources();
        for (var key in resources) {
            console.log(resources[key]);
        }

    }

    _setupGettersAndSetters(resourceName) {

        for (var key in this.resources) {
            /*jslint evil: true */
            var name = this.resources[key].name;
            var nameOfItemWithUppercase = this._capitalizeFirstLetter(name);
            var setter = 'set' + nameOfItemWithUppercase;
            var getter = 'get' + nameOfItemWithUppercase;
            this[setter] = new Function('value', 'this._addResourceValue("' + name + '", value);');
            this[getter] = new Function('return this._getResourceValue("' + name + '");');
        }

    }

    _capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    _addResourceValue(key, value) {
        this.resources[key].value = value;
    }

    _getResourceValue(key) {
        return this.resources[key].value;
    }

    getResources() {
        return this.resources;
    }


}

export default OopsieResource;
