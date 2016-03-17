import Attribute from './Attribute'

class ResourceMetas {

    constructor(resourceMetas) {
        this._id = resourceMetas.resourceId;
        this._name = resourceMetas.name;
        this._attributes = {};
        var self = this;

        for (let value of resourceMetas.attributeMetas) {
            var attribute = new Attribute(value);
            self._attributes[attribute.getName()] = attribute;
        }

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
