class Person {
    #first;
    #last;

    constructor(first, last) {
        this.#first = first;
        this.#last = last;
    }

    get firstName() {
        return this.#first;
    }

    set firstName(value) {
        return this.#first = value;
    }

    get lastName() {
        return this.#last;
    }

    set lastName(value) {
        return this.#last = value;
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    set fullName(value) {
        let res = value.split(' ');

        if (res.length == 2) {
            this.firstName = res[0];
            this.lastName = res[1];
        }

        return this.firstName + ' ' + this.lastName;
    }
}

let person = new Person("Peter", "Ivanov");
console.log(person.fullName);//Peter Ivanov
person.firstName = "George";
console.log(person.fullName);//George Ivanov
person.lastName = "Peterson";
console.log(person.fullName);//George Peterson
person.fullName = "Nikola Tesla";
console.log(person.firstName)//Nikola
console.log(person.lastName)//Tesla
