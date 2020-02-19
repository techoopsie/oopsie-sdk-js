const OopsieService = require('./oopsie.service');

class OopsieSite {

    constructor(prodEndpoint, siteId, customerId, name = 'OospieSite') {
        if (siteId === undefined || typeof siteId !== 'string' || siteId === '') {
            throw new Error('Oopsie needs an siteId to work.');
        }
        if (customerId === undefined || typeof customerId !== 'string' || customerId === '') {
            throw new Error('Oopsie needs an customerId to work.');
        }
        this._name = name;
        this.siteId = siteId;
        this.prodEndpoint = prodEndpoint;
        this.customerId = customerId;
        this.oopsieService = new OopsieService(this.prodEndpoint, this.siteId, this.customerId);
    }

    init(callback) {
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

    me(cb) {
        return this._restHelper().get('/api/v1/users/me', cb);
    }

    isLoggedIn(cb) {
        return this.me((err, resp) => {

            if (err && err.status === 401) {
                return cb(null, false);
            } else if (err) {
                return cb(err, false);
            }
            cb(null, true);
        });
    }

    login(user, cb) {
        return this._restHelper().post('/api/v1/users/login', user, cb);
    }

    socialLogin(loginInfo, cb) {
        return this._restHelper().post('/api/v1/users/socialLogin', loginInfo, cb);
    }

    register(user, cb) {
        return this._restHelper().post('/api/v1/users/register', user, cb);
    }

    logout(cb) {
        return this._restHelper().post('/api/v1/users/logout', null, cb);
    }

    refresh(cb) {
        return this._restHelper().post('/api/v1/users/refresh', null, cb);
    }

    _restHelper() {
        return this.oopsieService.getRestHelper()
    }

};

module.exports = OopsieSite;
