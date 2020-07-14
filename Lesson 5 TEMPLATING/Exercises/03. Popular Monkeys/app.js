import { monkeys } from './monkeys.js';

(async function () {
    try {
        const monkeyPartialSrc = await (await fetch('Templates/monkeysPartial.hbs')).text();
        const monkeysSectionSrc = await (await fetch('Templates/monkeyDiv.hbs')).text();
        const container = document.querySelector('body > section');

        Handlebars.registerPartial('monkeyPartial', monkeyPartialSrc);
        const template = Handlebars.compile(monkeysSectionSrc);
        container.innerHTML = template({ monkeys });

        Array.from(document.getElementsByTagName('button'))
            .forEach(b => b.addEventListener('click', toggleInfo));
    } catch (error) {
        alert(error);
        return;
    }

    function toggleInfo(e) {
        const div = e.target.parentElement.querySelector('p');

        div.style.display = div.style.display === 'none' ? 'block' : 'none';
    }
})();