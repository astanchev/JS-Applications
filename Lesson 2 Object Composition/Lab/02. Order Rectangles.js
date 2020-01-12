function solve(data) {
    const template = {
        width: 0,
        height: 0,
        area: function () {
            return this.width * this.height;
        },
        compareTo: function (other) {
            return other.area() - this.area() ||
                other.width - this.width;
        }
    }

    return data
        .map(([width, height]) => Object.assign(
            Object.create(template), {
                width,
                height
            }
        ))
        .sort((a, b) => a.compareTo(b))
}

console.log(solve([
    [1, 20],
    [20, 1],
    [5, 3],
    [5, 3]
]));