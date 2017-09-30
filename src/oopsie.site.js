const RestHelper = require('./resthelper');
const OopsieService = require('./oopsie.service');

class OopsieSite {

    constructor(prodEndpoint, siteId, customerId) {
        if (siteId === undefined || typeof siteId !== 'string' || siteId === '') {
            throw new Error('Oopsie needs an siteId to work.');
        }
        if (customerId === undefined || typeof customerId !== 'string' || customerId === '') {
            throw new Error('Oopsie needs an customerId to work.');
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
        return RestHelper.post('/api/v1/users/login', user, cb);
    }

    register(user, cb) {
        return RestHelper.post('/api/v1/users/register', user, cb);
    }

    logout(cb) {
        return RestHelper.post('/api/v1/users/logout', null, cb);
    }

    refresh(cb) {
        return RestHelper.post('/api/v1/users/refresh', null, cb);
    }

};

module.exports = OopsieSite;
