var OopsieObject = function (domainObject) {
    'use strict';

    verifyDomainObject(domainObject);

    if ( this === window ) {
        return new OopsieObject(domainObject);
    }

    var oopsieObject = {};
    oopsieObject.domainObject = domainObject;

    oopsieObject._addItem = function(key, value) {
        console.log(key + ' ghjgjg ' + value);
    };

    var columns = Oopsie._meta[oopsieObject.domainObject];
    for (var key in columns) {
        /*jslint evil: true */
        oopsieObject[key] = new Function('value', 'this._addItem("' + key + '", value);');
    }

    function verifyDomainObject(domainObject) {
        if (domainObject === undefined) {
            throw new Error('OopsieObject needs an DomainObject in the constructor.');
        }

        if (Oopsie._meta[domainObject] === undefined) {
            throw new Error('DomainObject ' + domainObject + ' doesnt exist in your application');
        }
    }

    return oopsieObject;

};
