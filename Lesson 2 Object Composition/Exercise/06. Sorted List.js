function sortedList() {
    const numbersList = [];

    return {
        size: 0,
        add: function (element) {
            numbersList.push(element);
            numbersList.sort((a, b) => a - b);
            this.size++;
        },
        remove: function (index) {
            if (index >= 0 && index < numbersList.length) {
                numbersList.splice(index, 1);
                this.size--;
            }
        },
        get: function (index) {
            if (index >= 0 && numbersList.length) {
                return numbersList[index];
            }
        },
        print: function () {
            console.log(numbersList.join(', '));
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