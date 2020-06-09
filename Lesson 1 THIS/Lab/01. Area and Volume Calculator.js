function area() {
    return this.x * this.y;
}

function vol() {
    return this.x * this.y * this.z;
}

function solve(area, vol, input) {
    return JSON.parse(input)
        .map(x => {
            return {
                area: Math.abs(area.call(x)),
                volume: Math.abs(vol.call(x))
            };
        });
}

function solve2(area, vol, input) {
    const result = [];

    const inputObjs = JSON.parse(input);
    for (const obj of inputObjs) {        
        result.push({
            area: Math.abs(area.call(obj)),
            volume: Math.abs(vol.call(obj))
        });
    }

    return result;
}

console.log(solve(
    area,
    vol,
    `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`));