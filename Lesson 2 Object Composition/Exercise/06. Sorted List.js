function sortedList() {
    return {
        numbersList: [],
        size: 0,
        add: function (element) {
            this.numbersList.push(element);
            this.numbersList.sort((a, b) => a - b);
            this.size++;
        },
        remove: function (index) {
            if (index >= 0 && index < this.numbersList.length) {
                this.numbersList.splice(index, 1);
                this.size--;
            }
        },
        get: function (index) {
            if (index >= 0 && this.numbersList.length) {
                return this.numbersList[index];
            }
        },
        print: function () {
            console.log(this.numbersList.join(', '));
        },
    };
}


let a = sortedList();
a.add(3);
a.add(8);
a.add(2);
a.add(9);
console.log(a.size);
a.remove(1);
console.log(a.size);
a.print();
console.log(a.get(2));