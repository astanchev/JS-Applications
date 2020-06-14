function solve(input) {
    const actions = {
        add: (a, x) => [...a, x],
        remove: (a, x) => a.filter(y => y !== x),
        print: (a, _) => {
            console.log(a.join(',')); 
            return a; 
            // if there are more print commands if we don't return
            // console.log returns undefined and arr[] is undefined
        }
    }

    let arr = [];
    input
        .map(x => x.split(' '))
        .forEach(([command, params]) => 
                arr = actions[command](arr, params)
                );
}

function listProcessor(params) {

    const execute = (function () {
        let inner = [];

        return {
            add: (element) => {
                inner.push(element);
            },
            remove: (element) => {
                inner = inner.filter((x) => x !== element);
            },
            print: () => {
                console.log(inner.join(','));
            }
        }
    })();

    params.forEach((tokens) => {
        const [command, string] = tokens.split(/\s+/);
        execute[command](string);
    });
}

function solve2(input) {    
    const result = []
    input.forEach((e) => {
        const [cmd, str] = e.split(' ');

        if (cmd === 'add') {
            result.push(str);
        } else if (cmd === 'remove') {
            removeStr(str);
        } else if (cmd === 'print') {
            console.log(result);
        }
    });

    function removeStr(str) {
        let strIndex = result.indexOf(str);

        while (strIndex >= 0) {
            result.splice(strIndex, 1);
            strIndex = result.indexOf(str);
        }
    }
}

console.log(solve([
    'add JSFundamentals', 
    'print', 
    'add JSAdvanced', 
    'print',
    'add JSApplications',
    'print'
]))

// console.log(solve([
//                     'add hello', 
//                     'add again', 
//                     'remove hello', 
//                     'add again', 
//                     'print'
//                   ]))