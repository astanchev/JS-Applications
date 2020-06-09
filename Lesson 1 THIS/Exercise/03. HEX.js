class Hex {
    constructor(value) {
        this.value = value;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return `0x` + `${this.value.toString(16)}`.toUpperCase();
    }

    plus(number){
        if (number instanceof Hex) {
            return new Hex(this.value + number.valueOf());
        } else { 
            return new Hex(this.value + parseInt(number.toString(), 16));
        }
    }

    minus(number){
        if (number instanceof Hex) {
            return new Hex(this.value - number.valueOf());
        } else { 
            return new Hex(this.value - parseInt(number.toString(), 16));
        }
    }

    parse(str) {
        this.value = parseInt(str, 16);

        return this.value;
    }

}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');
