(function () {

    Array.prototype.last = function () {
        return this[this.length - 1];
    }

    Array.prototype.skip = function (start) {
        let skipStart = [];

        for (let index = start; index < this.length; index++) {
            let element = this[index];
            skipStart[skipStart.length] = element;
        }

        return skipStart;
    }

    Array.prototype.take = function (end) {
        let takeEnd = [];

        for (let index = 0; index < end; index++) {            
            let element = this[index];
            takeEnd[takeEnd.length] = element;
        }

        return takeEnd;
    }

    Array.prototype.sum = function () {
        let sum = 0;

        for (let index = 0; index < this.length; index++) {
            let element = this[index];
            sum += element;
        }

        return sum;
    }

    Array.prototype.average = function () {
        let sum = 0;

        for (let index = 0; index < this.length; index++) {
            let element = this[index];
            sum += element;
        }

        let average = sum / this.length;
        return average;
    }
})();