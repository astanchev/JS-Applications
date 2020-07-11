function host(endpoint) {
    return `https://api.backendless.com/3D3B029C-3E3D-9607-FF50-0228C3D25300/CF12A54B-0440-4005-9D86-4FD613E06599/data/${endpoint}`;
}

const api = {
    books: 'Book',
    tags: 'Tag',
    booksWithTags: 'Book?loadRelations=tags',
    bookRelations: '?loadRelations=tags'
};

export async function getAllBooks() {
    return await (await fetch(host(api.booksWithTags))).json();
}

export async function getBook(bookId) {
    return await (await fetch(host(api.books + `/${bookId}` + api.bookRelations))).json();
}

export async function createBook(book, tags) {
    const newBook = await (await fetch(host(api.books), {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(book)
    })).json();

    const newBookId = newBook.objectId;

    if (tags.length > 0) {
        const tagIDs = [];

        for (const tagName of tags) {
            const tagId = await createTag(tagName);
            tagIDs.push(tagId);
        }

        const tagsCount = await (await fetch(host(api.books + `/${newBookId}/tags`), {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tagIDs)
        })).json();
    }

    return getBook(newBookId);
}

export async function editBook(bookId, book, tags) {
    const oldBook = await getBook(bookId);

    if (oldBook.tags.length > 0) {
        const tagsIds = oldBook.tags.map(t => t.objectId);
        for (const tagId of tagsIds) {
            await deleteTag(tagId);
        }
    }
    
    const editedBook = await (await fetch(host(api.books + `/${bookId}`), {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(book)
    })).json();  

    if (tags.length > 0) {
        const tagIDs = [];

        for (const tagName of tags) {
            const tagId = await createTag(tagName);
            tagIDs.push(tagId);
        }

        const tagsCount = await (await fetch(host(api.books + `/${bookId}/tags`), {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tagIDs)
        })).json();
    }

    return getBook(bookId);
}

export async function deleteBook(bookId) {
    const book = await getBook(bookId);
    const tagsIds = book.tags.map(t => t.objectId);

    for (const tagId of tagsIds) {
        await deleteTag(tagId);
    }

    return await (await fetch(host(api.books + `/${bookId}`), {
        method: 'delete'
    })).json();
}

export async function createTag(tagName) {
    const tag = await (await fetch(host(api.tags), {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name: `${tagName}` })
    })).json();

    return tag.objectId;
}

export async function getTags(bookId) {
    return await (await fetch(host(api.books + `/${bookId}/tags`))).json();
}

export async function deleteTag(tagId) {
    return await (await fetch(host(api.tags + `/${tagId}`), {
        method: 'delete'
    })).json();
}