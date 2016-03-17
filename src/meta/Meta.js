import ResourceMetas from './ResourceMetas';

class Meta {

    constructor(meta) {

        this.webServiceId = meta.webServiceId;
        this.resourceMetas = {};

        var self = this;
        for (var index in meta.resourceMetas) {
            var resourceMetas = meta.resourceMetas[index];
            var resourceMetas = new ResourceMetas(resourceMetas);
            self.resourceMetas[resourceMetas.getName()] = resourceMetas;

        };

    }

    getResourceId(resourceName) {
        return this.resourceMetas[resourceName].getId();
    }

    getAttributesByResourceName(resourceName) {

        var resource = this.resourceMetas[resourceName];

        if (resource) {
            return resource.getAttributes();
        }

        var availableResourceNames = '';

        for (var key in this.resourceMetas) {
            availableResourceNames += key + ', ';
        }

        availableResourceNames = availableResourceNames.slice(0, availableResourceNames.length - 2);
        throw new Error('Resource ' + resourceName + ' doesnt exist in your application. ' +
            '\n Available resources are: ' + availableResourceNames);

    }

    /* Helpers */
    hasResource(resourceName) {
        return this.resourceMetas[resourceName] !== undefined
    }

};

export default Meta;
