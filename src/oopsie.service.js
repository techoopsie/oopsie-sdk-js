const RestHelper = require('./resthelper');
const OopsieApp = require('./oopsie.app');

class OopsieService {

    constructor(prodEndpoint, siteId, customerId) {
        this.siteId = siteId;
        this.customerId = customerId;
        this.prodEndpoint = prodEndpoint;
        RestHelper.setProdUrl(prodEndpoint);
        RestHelper.setSiteId(siteId);
        RestHelper.setCustomerId(customerId);
        this.apps = {};
    }

    init(callback) {
        RestHelper.get('/init', (err, apps) => {
            if (err) {
                return callback(err);
            }
            for(var key in apps) {
                this.apps[key] = new OopsieApp(key, apps[key]);
            }
            callback(null);
        });
    }

    setApiKey(apiKey) {
        RestHelper.setApiKey(apiKey);
    }

    getApp(appName) {
        return this.apps[appName];
    }

    getApps() {
        return this.apps;
    }
};

module.exports = OopsieService;
