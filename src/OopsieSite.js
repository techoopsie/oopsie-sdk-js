import RestHelper from './RestHelper';
import OopsieService from './OopsieService';
import OopsieResource from './OopsieResource';
import Config from './config';

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

    getApp(appName) {
        return this.oopsieService.getApp(appName);
    }

    login(user, callback) {
        return RestHelper.post('/users/login', user).then(res => {
            callback(null, res);
        }).catch(err => {
            callback(err);
        });
    }

    register(user, callback) {
        return RestHelper.post('/users/register', user).then(res => {
            callback(null, res);
        }).catch(err => {
            callback(err);
        });
    }

    logout(callback) {
        return RestHelper.post('/users/logout').then(res => {
            callback(null, res);
        }).catch(err => {
            callback(err);
        });
    }

    refresh(callback) {
        return RestHelper.post('/users/refresh').then(res => {
            callback(null, res);
        }).catch(err => {
            callback(err);
        });
    }

};

export default OopsieSite;
