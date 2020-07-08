function host(endpoint) {
    return `https://fisher-game.firebaseio.com/catches${endpoint}.json`;
}

export async function listAll() {
    const data = await (await fetch(host(''))).json();

    return data;
}

export async function createNew(catchObject) {
    const id = await (await fetch(host(''), {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(catchObject)
    })).json();

    return id;
}

export async function updateCatch(id, catchObject) {
    const updatedCatch = await (await fetch(host(`/${id}`), {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(catchObject)
    })).json();

    return updatedCatch;
}

export async function deleteCatch(id) {
    const deletedCatch = await fetch(host(`/${id}`), {
        method: 'delete'
    });

    return true;
}
