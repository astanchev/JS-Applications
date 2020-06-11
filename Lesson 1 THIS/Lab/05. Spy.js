function spy(obj, fn) {
    let originalFN = obj[fn];

    const res = {
        count: 0
    };

    obj[fn] = function () {
        res.count++;
        return originalFN.apply(obj, arguments);
    };

    return res;
}

let obj = {
    method:()=>"invoked"
};
let spy1 = spy(obj,"method");

obj.method();
obj.method();
obj.method();

console.log(spy1); // { count: 3 }
