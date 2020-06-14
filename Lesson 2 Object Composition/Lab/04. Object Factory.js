function solve(input) {
    return Object.assign({}, ...JSON.parse(input));
}

function solve2(input) { 
    const resultObj = {};
    const data = JSON.parse(input);

    for (const obj of data) {
        const objProps = Array.from(Object.entries(obj));
        for (const [prop, value] of objProps) {
            if (!resultObj.hasOwnProperty(prop)) {
                resultObj[prop] = value;
            }
        }
    }

    return resultObj;
}

console.log(solve(`[{"canMove": true},{"canMove": false, "doors": 4},{"capacity": 5}]`));