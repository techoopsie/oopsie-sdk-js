

export default class MyObject {

  constructor(domainObject) {
    this.domainObject = domainObject;

    this.log = this.log.bind(log)
  };

  log() {
    console.log(this.domainObject);
  };

  greet(asd) {
    alert(asd);
  };

};
