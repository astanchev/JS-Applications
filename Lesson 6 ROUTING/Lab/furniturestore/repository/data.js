const url = `https://api.backendless.com/3D3B029C-3E3D-9607-FF50-0228C3D25300/CF12A54B-0440-4005-9D86-4FD613E06599/data/Furniture`;

export async function createFurniture(furniture) {
    return await (await fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(furniture)
    })).json();
}

export async function getAllFurniture() {
    return await (await fetch(url)).json();
}

export async function getMyFurniture() {
    return (await (await fetch(url)).json()).filter(x => x.liked === true);
}

export async function getById(id) {
    return await (await fetch(url + `/${id}`)).json();
}

export async function likeFurniture(id, isLike) {
    return await (await fetch(url + `/${id}`, {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({"liked": isLike})
    })).json();
}