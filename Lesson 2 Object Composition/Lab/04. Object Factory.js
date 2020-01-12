function solve(input) {
    return Object.assign({}, ...JSON.parse(input));
}

console.log(solve(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`));