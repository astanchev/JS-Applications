(async function () {
    try {
        const catSrc = await (await fetch('Templates/liCatPartial.hbs')).text();
        const catsUlSrc = await (await fetch('Templates/ulCats.hbs')).text();
        const container = document.querySelector('section#allCats');

        Handlebars.registerPartial('liCatPartial', catSrc);
        const template = Handlebars.compile(catsUlSrc);
        container.innerHTML = template({cats});

        Array.from(document.getElementsByTagName('button'))
                .forEach(b => b.addEventListener('click', toggleInfo));
    } catch (error) {
        alert(error);
        return;
    }

    function toggleInfo(e) {
        const div = e.target.parentElement.querySelector('div.status');

        div.style.display = div.style.display === 'none' ? 'block' : 'none';
    }
})();
