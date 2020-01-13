function solve() {
    class Figure {
        units = {
            m: 0.01,
            cm: 1,
            mm: 10
        }
        defaultUnit;

        constructor(unit = 'cm') {
            this.defaultUnit = unit;
        }

        changeUnits(unit) {
            this.defaultUnit = unit;
        }
        changeValue(x) {
            return x * this.units[this.defaultUnit];
        }
        get area() {
            return NaN;
        }
        toString() {
            return `Figures units: ${this.defaultUnit} Area: ${this.area}`;
        }
    }

    class Circle extends Figure {
        radius;
        constructor(r, unit) {
            super(unit);
            this.radius = r;
        }

        get area() {
            return Math.PI * Math.pow(this.changeValue(this.radius), 2);
        }
        toString() {
            return `${super.toString()} - radius: ${this.changeValue(this.radius)}`;
        }
    }

    class Rectangle extends Figure {
        width = 0;
        height = 0;
        constructor(w, h, unit) {
            super(unit);
            this.width = w;
            this.height = h;
        }

        get area() {
            return this.changeValue(this.width) * this.changeValue(this.height);
        }
        toString() {
            return `${super.toString()} - width: ${this.changeValue(this.width)}, height: ${this.changeValue(this.height)}`;
        }
    }

    return {
        Figure,
        Circle,
        Rectangle
    }
}

// let c = new Circle(5);
// console.log(c.area); // 78.53981633974483
// console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

// r.changeUnits('cm');
// console.log(r.area); // 12
// console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

// c.changeUnits('mm');
// console.log(c.area); // 7853.981633974483
// console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50

// let classes = solve();
// let Figure = classes.Figure;
// let Rectangle = classes.Rectangle;
// let Circle = classes.Circle;

//     let c = new Circle(5);
//     assert.equal(c.area,78.53981633974483, "1");
//     assert.equal(c.toString(),"Figures units: cm Area: 78.53981633974483 - radius: 5","2"); 
//     let r = new Rectangle(3, 4, 'mm');
//     assert.equal(r.area,1200,"3");
//     assert.equal(r.toString(),"Figures units: mm Area: 1200 - width: 30, height: 40", "4");
//     r.changeUnits('cm');
//     assert.equal(r.area,12,"5");
//     assert.equal(r.toString(),"Figures units: cm Area: 12 - width: 3, height: 4","5");

//     c.changeUnits('mm');
//     console.log(c.area); // 7853.981633974483
//     console.log(c.toString()) // Figures units: mm Area: 7853.981633974483 - radius: 50