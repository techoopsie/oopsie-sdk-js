const RestHelper = require('./resthelper');
const OopsieService = require('./oopsie.service');

class OopsieSite {

    constructor(prodEndpoint, siteId, customerId) {
        if (siteId === undefined) {
            throw new Error('Oopsie needs an siteId to work.');
        }
        this._name = 'OopsieSite';
        this.siteId = siteId;
        this.prodEndpoint = prodEndpoint;
        this.customerId = customerId;
    }

    init(callback) {
        this.oopsieService = new OopsieService(this.prodEndpoint, this.siteId, this.customerId);
        this.oopsieService.init(err => {
            callback(err, this);
        });
    }

    get name() {
        return this._name;
    }

    setApiKey(apiKey) {
        this.oopsieService.setApiKey(apiKey);
    }

    getApp(appName) {
        return this.oopsieService.getApp(appName);
    }

    getApps() {
        return this.oopsieService.getApps();
    }

    login(user, cb) {
        return RestHelper.post('/users/login', user, cb);
    }

    register(user, cb) {
        return RestHelper.post('/users/register', user, cb);
    }

    logout(cb) {
        return RestHelper.post('/users/logout', null, cb);
    }

    refresh(cb) {
        return RestHelper.post('/users/refresh', null, cb);
    }

};

module.exports = OopsieSite;
