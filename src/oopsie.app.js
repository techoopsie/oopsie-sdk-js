const OopsieResource = require('./oopsie.resource');

class OopsieApp {

    constructor(appName, app, restHelper) {
    	this.name = appName;
        this.resources = {};
    	for(var i = 0; i < app.resources.length; i++) {
    		this.resources[app.resources[i].name] = new OopsieResource(app.resources[i], restHelper);
    	}
    }

    getResource(resourceName) {
        if (!this.resources[resourceName]) {
            var errorMsg = 'Resource ' + resourceName + ' doesn\'t exist in your application.\nAvailable resources are: ';
            errorMsg += Object.keys(this.resources);
            throw new Error(errorMsg);
        }
        return this.resources[resourceName];
    }

    getResources() {
        return this.resources
    }

}

module.exports = OopsieApp;
