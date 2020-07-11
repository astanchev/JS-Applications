import * as data from './data.js';
import createElement from './dom.js';

const elements = {
    tBody: document.querySelector('table > tbody'),
    inputs: {
        inputTitle: document.querySelector('form > input#title'),
        inputAuthor: document.querySelector('form > input#author'),
        inputISBN: document.querySelector('form > input#isbn')
    },
    inputTags: document.querySelector('form > input#tags'),
    btnSubmit: document.querySelector('form > button'),
    btnLoad: document.querySelector('#loadBooks')
};

function clearInputs() {
    elements.inputs.inputTitle.value = '';
    elements.inputs.inputAuthor.value = '';
    elements.inputs.inputISBN.value = '';
    elements.inputTags.value = '';
}

function renderBook(book) {
    const tags = book
                    .tags
                    .map(t => t.name)
                    .join(', ');
    const deleteBtn = createElement('button', 'Delete');
    deleteBtn.addEventListener('click', deleteCurrentBook);
    const editBtn = createElement('button', 'Edit');
    editBtn.addEventListener('click', toggleEditor);

    const bookEl = createElement('tr', [
        createElement('td', book.title),
        createElement('td', book.author),
        createElement('td', book.isbn),
        createElement('td', tags),
        createElement('td', [
            editBtn,
            deleteBtn
        ])
    ]);

    bookEl.setAttribute('data-bookId', book.objectId);

    async function deleteCurrentBook() {
        try {
            deleteBtn.disabled = true;
            deleteBtn.textContent = 'Please wait...';
            const timeOfDeletion = await data.deleteBook(book.objectId);
            loadBooks();
        } catch (error) {
            alert(error);
            return;
        } finally {
            deleteBtn.disabled = false;
            deleteBtn.textContent = 'Delete';
        }
    }    

    async function toggleEditor() {
        const edit = {
            title: createElement('input', '', {type: 'text', value: book.title}),
            author: createElement('input', '', {type: 'text', value: book.author}),
            isbn: createElement('input', '', {type: 'text', value: book.isbn}),
        };
        const editTags = createElement('input', '', {type: 'text', value: tags});

        const cancelBtn = createElement('button', 'Cancel');
        cancelBtn.addEventListener('click', () => elements.tBody.replaceChild(bookEl, editor));

        const confirmBtn = createElement('button', 'Confirm');
        confirmBtn.addEventListener('click', async () => {
            if (validateInput(edit) === false) {
                alert('Title, author and isbn are required');
                return;
            }

            let tags = new Set();
            const tagsValue = editTags.value.trim();
            if (tagsValue !== '') {
                tagsValue.split(', ').forEach(t => tags.add(t));
            }
        
            const edited = {
                title: edit.title.value.trim(),
                author: edit.author.value.trim(),
                isbn: edit.isbn.value.trim()
            };  

            let editedBook = {};
            try {
                toggleInput(false, ...Object.values(edit), editTags, cancelBtn, confirmBtn);        
                editedBook = await data.editBook(book.objectId, edited, Array.from(tags));
                elements.tBody.replaceChild(renderBook(editedBook), editor);                
            } catch (error) {
                    alert(error);
                    toggleInput(true, ...Object.values(edit), editTags, cancelBtn, confirmBtn); 
                    return;
            } 
        });

        const editor = createElement('tr', [
            createElement('td', edit.title),
            createElement('td', edit.author),
            createElement('td', edit.isbn),
            createElement('td', editTags),
            createElement('td', [
                confirmBtn,
                cancelBtn
            ])
        ]);

        elements.tBody.replaceChild(editor, bookEl);
    }

    return bookEl;
}

function validateInput(input) {
    let isValid = true;
    Object.values(input).forEach(v => {
        if (v.value.trim().length === 0) {
            v.className = 'inputError';
            isValid = false;
        } else {
            v.removeAttribute('class');
        }
    });

    return isValid;
}

function toggleInput(active, ...list) {
    list.forEach(e => e.disabled = !active);
}

async function loadBooks() {

    elements.tBody.innerHTML = '<tr><td colspan="5">Loading...</td><tr>';
    elements.btnLoad.disabled = true;

    let books = [];

    try {
        books = await data.getAllBooks();
        elements.tBody.innerHTML = '';
        elements.btnLoad.disabled = false;
        books
            .sort((a, b) => a.author.localeCompare(b.author))
            .forEach(b => elements.tBody.appendChild(renderBook(b)));
    } catch (error) {
        alert(error);
        return;
    }
}

async function createBook(e) {
    e.preventDefault();
    
    if (validateInput(elements.inputs) === false) {
        alert('Title, author and isbn are required');
        return;
    }
    
    let tags = new Set();
    const tagsValue = elements.inputTags.value.trim();
    if (tagsValue !== '') {
        tagsValue.split(', ').forEach(t => tags.add(t));
    }

    const book = {
        title: elements.inputs.inputTitle.value.trim(),
        author: elements.inputs.inputAuthor.value.trim(),
        isbn: elements.inputs.inputISBN.value.trim()
    };    

    let createdBook = {};
    try {
        toggleInput(false, ...Object.values(elements.inputs), elements.btnSubmit);        
        createdBook = await data.createBook(book, Array.from(tags));
        loadBooks();
        clearInputs();
    } catch (error) {
        alert(error);
        return;
    } finally {
        toggleInput(true, ...Object.values(elements.inputs), elements.btnSubmit);
    }
}

window.addEventListener('load', (e) => {

    elements.btnLoad.addEventListener('click', loadBooks);
    elements.btnSubmit.addEventListener('click', createBook);

});