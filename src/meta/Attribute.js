class Attribute {

    constructor(name, type) {
        this.name = name;
        this.type = type;

        this.verify(name);
        this.verify(type);
    }

    verify(input) {
        if (input === undefined) {
            throw new Error('Attribute can\'t be undefined');
        }
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
