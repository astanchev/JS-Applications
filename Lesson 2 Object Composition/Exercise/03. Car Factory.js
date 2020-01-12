function solve(carsInfo) {
    const engineTypes = [{
            power: 90,
            volume: 1800
        },
        {
            power: 120,
            volume: 2400
        },
        {
            power: 200,
            volume: 3500
        },
    ]

    return {
        model: carsInfo.model,
        engine: engineTypes.find(e => carsInfo.power <= e.power),
        carriage: {
            type: carsInfo.carriage,
            color: carsInfo.color
        },
        wheels: Array(4)
            .fill(carsInfo.wheelsize % 2 === 0 ?
                        carsInfo.wheelsize - 1 :
                        carsInfo.wheelsize)
    };
}

console.log(solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));