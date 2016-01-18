function Oopsie(domainObject) {

    var oopsie = {};
    oopsie.item = {};
    oopsie.domainObject = domainObject;
    oopsie.rest = rest("http://localhost", domainObject);

    oopsie.log = function() {
        console.log(this.domainObject);
    };

    oopsie.getAll = function() {
        return oopsie.rest.getAll();
    };

    oopsie.save = function() {
        return oopsie.rest.save(oopsie.item);
    };

    return oopsie;

};
