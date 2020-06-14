function solve(inputList) {
    const carsList = {};

    const commandsList = {
        create: function ([name, inherits, parentName]) {

            if (!carsList[name]) {
                carsList[name] = {};
            }

            if (inherits && parentName) {
                carsList[name] = Object.create(carsList[parentName]);
            }
        },
        set: function ([name, key, value]) {
            carsList[name][key] = value;
        },
        print: function ([name]) {
            const propertiesList = [];

            for (const key in carsList[name]) {
                propertiesList.push(`${key}:${carsList[name][key]}`);
            }

            console.log(propertiesList.join(', '));
        }
    };

    inputList.forEach((element) => {
        const paramsList = element.split(' ');
        const command = paramsList.shift();
        commandsList[command](paramsList);
    });
}

function solve2(input) { 
    const resultObj = {};

    for (const line of input) {
        const lineParts = line.split(' ');

        if (lineParts.indexOf('create') >= 0) {
            if (lineParts.indexOf('inherit') >= 0) {
                resultObj[lineParts[1]] = Object.create(resultObj[lineParts[3]]);
            } else {
                resultObj[lineParts[1]] = {};
            }
        } else if (lineParts.indexOf('set') >= 0) {
            resultObj[lineParts[1]][lineParts[2]] = lineParts[3];           
        } else if (lineParts.indexOf('print') >= 0) {
            const objToPrint = resultObj[lineParts[1]];
            console.log(print(objToPrint));
        }
    }

    function print(obj) {
        const result = [];
        for (const key in obj) {
            result.push(`${key}:${obj[key]}`);
        }

        return result.join(', ');
    }
}

console.log(solve([
                    'create c1',
                    'create c2 inherit c1',
                    'set c1 color red',
                    'set c2 model new',
                    'print c1',
                    'print c2'
                  ]));