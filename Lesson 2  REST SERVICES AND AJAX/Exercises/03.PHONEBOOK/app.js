function attachEvents() {
    const ulPhoneBook = document.getElementById('phonebook');
    const inputPerson = document.getElementById('person');
    const inputPhone = document.getElementById('phone');
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');

    const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

    btnLoad.addEventListener('click', loadContacts);
    btnCreate.addEventListener('click', createContact);

    function loadContacts() {
        ulPhoneBook.innerHTML = '';

        fetch(url)
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                return res.json();
            })
            .then((data) => showContacts(data))
            .catch((err) => handleError(err));
    }

    function createContact() {
        const person = inputPerson.value;
        const phone = inputPhone.value;

        if (!person || !phone) {
            handleError();
            return;
        }

        const contact = {
            person,
            phone
        };

        fetch(url, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(contact)
            })
            .then(() => loadContacts())
            .catch((err) => handleError(err));

        inputPerson.value = '';
        inputPhone.value = '';
    }

    function showContacts(data) {
        const contactIds = Array.from(Object.keys(data));

        for (const id of contactIds) {
            const name = data[id].person;
            const phone = data[id].phone;

            const btnDelete = createElement('button', 'Delete');
            btnDelete.addEventListener('click', () => deleteContact(id));

            const liContact = createElement('li', [
                `${name}: ${phone} `,
                btnDelete
            ]);

            ulPhoneBook.appendChild(liContact);
        }
    }

    function deleteContact(id) {

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`, {
                method: 'delete',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => loadContacts())
            .catch((err) => handleError(err));

    }

    function handleError(err) {
        inputPerson.value = '';
        inputPhone.value = '';
        alert('Wrong operation!');
    }

    function createElement(type, content, attributes) {
        const result = document.createElement(type);

        if (attributes !== undefined) {
            Object.assign(result, attributes);
        }

        if (Array.isArray(content)) {
            content.forEach(append);
        } else {
            append(content);
        }

        function append(node) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }

            result.appendChild(node);
        }

        return result;
    }
}

attachEvents();