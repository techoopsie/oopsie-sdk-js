const RestHelper = require('./resthelper');
const OopsieApp = require('./oopsie.app');

class OopsieService {

    constructor(prodEndpoint, siteId, customerId) {
        this.siteId = siteId;
        this.customerId = customerId;
        this.prodEndpoint = prodEndpoint;
        this.restHelper = new RestHelper()
        this.restHelper.setProdUrl(prodEndpoint);
        this.restHelper.setSiteId(siteId);
        this.restHelper.setCustomerId(customerId);
        this.apps = {};
    }

    init(callback) {
        this.restHelper.get('/api/v1/init', (err, apps) => {
            if (err) {
                return callback(err);
            }
            for(var key in apps) {
                this.apps[key] = new OopsieApp(key, apps[key], this.restHelper);
            }
            callback(null);
        });
    }

    setApiKey(apiKey) {
        this.restHelper.setApiKey(apiKey);
    }

    getApp(appName) {
        return this.apps[appName];
    }

    getApps() {
        return this.apps;
    }

    getRestHelper() {
        return this.restHelper;
    }
};

module.exports = OopsieService;
