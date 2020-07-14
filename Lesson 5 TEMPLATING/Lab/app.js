import {contacts} from './contacts.js';

(async function () {
    try {
        const contactCardSrc = await fetch('./contactCard.hbs').then(res => res.text());
        const contactsDivSrc = await fetch('./contactsDiv.hbs').then(res => res.text());
        const container = document.getElementById('contacts');

        Handlebars.registerPartial('contactCard', contactCardSrc);
        const template = Handlebars.compile(contactsDivSrc);

        container.innerHTML = template({ contacts });

        const buttons = Array.from(document.querySelectorAll('button'));
        buttons.forEach(b => b.addEventListener('click', (e) => {
            let div = e.target.nextElementSibling;

            if (div.style.display === '') {
                div.style.display = 'block';
            } else {
                div.style.display = '';
            }
        }));
    } catch (error) {
        alert(error);
        return;
    }
}());