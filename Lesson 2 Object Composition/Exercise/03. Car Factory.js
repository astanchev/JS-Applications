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
    ];

    return {
        model: carsInfo.model,
        engine: engineTypes
                .filter(e => carsInfo.power <= e.power)
                .reduce((min, curr) => min.power <= curr.power ? min : curr, {}),
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

function solve2(car) {
    const engine = {
        small: {
            power: 90,
            volume: 1800
        },
        normal: {
            power: 120,
            volume: 2400
        },
        monster: {
            power: 200,
            volume: 3500
        }
    };

    const carriage = {
        hatchback: {
            type: 'hatchback',
            color: ''
        },
        coupe: {
            type: 'coupe',
            color: ''
        }
    };

    let engineToAdd = addEngine(car.power);
    let carriageToAdd = {
        type: car.carriage,
        color: car.color
    };
    let wheelsToAdd = addWheels(car.wheelsize);

    return {
        model: car.model,
        engine: engineToAdd,
        carriage: carriageToAdd,
        wheels: wheelsToAdd
    };

    function addEngine(minPower) {
        const engineToReturn = {};
        let minEnginePower = 1000000;

        for (const key in engine) {
            if (engine.hasOwnProperty(key)) {
                const element = engine[key];

                if (element.power >= minPower && element.power < minEnginePower) {
                    engineToReturn.power = element.power;
                    engineToReturn.volume = element.volume;
                    minEnginePower = element.power;
                }
            }
        }
        
        return engineToReturn;
    }

    function addWheels(size) {
        if (size % 2 === 0) {
            size -= 1;
        }

        return Array(4).fill(size);
    }    
}

console.log(solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));