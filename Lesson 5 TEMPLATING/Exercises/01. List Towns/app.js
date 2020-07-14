(async function () {
    try {
        const townSrc = await (await fetch('Templates/townPartial.hbs')).text();
        const townUlSrc = await (await fetch('Templates/townsUl.hbs')).text();
        const container = document.querySelector('div#root');
        const inputTowns = document.querySelector('input#towns');

        Handlebars.registerPartial('townPartial', townSrc);
        const template = Handlebars.compile(townUlSrc);

        document.querySelector('button#btnLoadTowns').addEventListener('click', (e) => {
            e.preventDefault();

            let towns = inputTowns.value;

            if (towns === '') {
                return;
            }

            towns = towns.split(', ');

            container.innerHTML = template({towns});
        });

    } catch (error) {
        alert(error);
        return;
    }
})();