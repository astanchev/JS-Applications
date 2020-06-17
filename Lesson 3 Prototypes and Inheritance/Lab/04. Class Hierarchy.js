function solve() {
    class Figure {
        
        constructor(unit = 'cm') {
            this.unit = unit;
            this.units = {
                m: 0.01,
                cm: 1,
                mm: 10
            };
        }

        changeUnits(newUnits) {
            this.unit = newUnits;
        }

        changeValue(x) {
            return x * this.units[this.unit];
        }

        get area(){
            return this.area;
        }

        toString(){
            return `Figures units: ${this.unit} Area: ${this.area} - `;
        }
    }

    class Circle extends Figure {
        constructor(radius, unit) {
            super(unit);
            this.radius = radius;
        }

        get area() {
            return this.changeValue(this.radius) * this.changeValue(this.radius) * Math.PI;
        }

        toString() {
            return super.toString() + `radius: ${this.changeValue(this.radius)}`;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, unit) {
            super(unit);
            this.width = width;
            this.height = height;
        }

        get area() {
            return this.changeValue(this.width) * this.changeValue(this.height);
        }

        toString() {
            return super.toString() + `width: ${this.changeValue(this.width)}, height: ${this.changeValue(this.height)}`;
        }
    }


    return {
        Figure,
        Circle,
        Rectangle
    };
}

let a = solve();
let c = new a.Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new a.Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString()); // Figures units: mm Area: 7853.981633974483 - radius: 50