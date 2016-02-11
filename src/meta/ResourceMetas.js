import Attribute from './Attribute'

class ResourceMetas {

    constructor(resourceMetas) {
        this._id = resourceMetas.resourceId;
        this._name = resourceMetas.name;
        this._attributes = {};
        var self = this;
        console.log("Creating resourceMetas");
        for (var value of resourceMetas.attributeMetas) {
            var attribute = new Attribute(value);
            console.log("Attribute created");
            console.log(attribute);
            self._attributes[attribute.getName()] = attribute;
        }
        console.log("Created resourceMetas");
        this._filterMetas = resourceMetas.filterMetas;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getAttributes() {
        return this._attributes;
    }

    getAttributeByName(attributeKey) {
        return this._attributes[attributeKey];
    }

}

export default ResourceMetas;
