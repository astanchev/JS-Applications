import { UIFacade } from "./uiFacadeWeb.js";
import { observable, observe, dispose } from "./obs.js";

const a = observable({ data: [] });
const b = observable({ data: [] });

window.a = a;
window.b = b;

const obsA = (p, prev, next) => {
    next.forEach(x => console.log("A:", x));
};

observe(a, (p, prev, next) => {
    UIFacade.add(
        "cats",
        next.map(x => `<li>${x}</li>`)
    )
});

observe(a, obsA);

a.data = ["test"];

dispose(a, obsA);

observe(b, (p, prev, next) => {
    next.forEach(x => console.log("B", x));
});
