function decoratorFactory(target, proxyHandlers) {
    return new Proxy(target, proxyHandlers);
}

export function observable(target) {
    const observers = [];

    return decoratorFactory(target, {
        get: (target, prop) => {
            if (prop === "addObserver") {
                return (observer) => {
                    observers.push(observer);
                }
            }
            if (prop === "disposeObserver") {
                return (observer) => {
                    observers.splice(
                        observers.indexOf(observer),
                        1
                    );
                }
            }
            return Reflect.get(target, prop);
        },
        set: (t, p, v) => {
            observers.forEach(x => x(p, t[p], v));
            return Reflect.set(t, p, v);
        }
    });
}

export function observe(target, callback) {
    target.addObserver(callback);
}

export function dispose(target, callback) {
    target.disposeObserver(callback);
}
