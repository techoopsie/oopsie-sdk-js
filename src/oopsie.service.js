import RestHelper from './resthelper';
import OopsieApp from './oopsie.app';

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
        RestHelper.get('/init').then((apps) => {

            for(var key in apps) {
                this.apps[key] = new OopsieApp(key, apps[key]);
            }

            callback(null);
        }, (err) => {
            callback(err);
        });
    }

    getApp(appName) {
        return this.apps[appName];
    }
};

export default OopsieService;
