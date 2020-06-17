function elemelons() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new Error('Abstract class cannot be instantiated directly');
            }

            this.weight = weight;
            this.melonSort = melonSort;
            this._elementIndex = this.weight * this.melonSort.length;
        }

        get elementIndex() {
            return this._elementIndex;
        }

        toString() {
            return `Element: ${this.constructor.name.slice(0, -5)}\nSort: ${this.melonSort}\nElement Index: ${this._elementIndex}`;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Melolemonmelon extends Airmelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._elements = ['Water', 'Fire', 'Earth', 'Air'];
            this._index = 0;
        }

        morph() {
            return this._elements[this._index++ % this._elements.length];
        }

        toString() {
            let sortIndex = super.toString().indexOf('\n');
            return `Element: ${this.morph()}` + super.toString().slice(sortIndex);
        }
    }

    return { Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon };
}