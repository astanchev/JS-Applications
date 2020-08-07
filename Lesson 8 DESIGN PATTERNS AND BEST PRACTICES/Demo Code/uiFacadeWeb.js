// MONSTER OF A CODE CASTING TYPES AND MAKING DECISION
import {  } from "myUglyModuleThatOnlyIUse.js";

export const UIFacade = {
    add: (domID, HTML) => {
        document.all[domID].innerHTML = typeof HTML !== "string" ? HTML.toString() : HTML;
    }
}