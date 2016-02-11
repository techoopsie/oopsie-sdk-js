import ResourceMetas from './ResourceMetas';

class Meta {

    constructor(meta) {

        this.webServiceId = meta.webServiceId;
        this.resourceMetas = {};
        var self = this;
        meta.resourceMetas.forEach(function(resourceMetas) {
            var resourceMetas = new ResourceMetas(resourceMetas);
            self.resourceMetas[resourceMetas.getName()] = resourceMetas;
        })
        console.log("Created meta");

    }

    getResourceByName(resourceName) {

        var resource = this.resourceMetas[resourceName];

        if (resource) {
            return resource.getAttributes();
        }

        var availableResourceNames = '';
        this.resourceMetas.forEach(function(resource) {
            availableResourceNames += resource.getName() + ', ';
        })

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
