class Attribute {

    constructor(attribute) {
        this.name = attribute.name;
        this.value = attribute.value;
        this.type = attribute.type;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

}

export default Attribute;
