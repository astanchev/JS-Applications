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