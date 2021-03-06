const url = `https://api.backendless.com/17084FAB-8F1D-5FD5-FF44-C5F0788E3100/E764E0B5-4CA3-44D1-939A-F82A4D01FE3F/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    user: 'data/Users',
    trek: 'data/Trek'
};

export async function register(user) {
    return (await fetch(url + endpoints.register, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })).json();
}

export async function login(user) {
    return (await fetch(url + endpoints.login, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })).json();
}

export async function logout(token) {
    return await fetch(url + endpoints.logout, {
        method: 'get',
        headers: {
            'user-token': token
        }
    });
}

export async function createTrek(token, trek) {
    return await (await fetch(url + endpoints.trek, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(trek)
    })).json();
}

export async function editTrek(token, trekId, trek) {
    const trekURL = url + endpoints.trek + `/${trekId}`;

    return await (await fetch(trekURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(trek)
    })).json();
}

export async function deleteTrek(token, trekId) {
    const trekURL = url + endpoints.trek + `/${trekId}`;

    return (await fetch(trekURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function likeTrek(token, trekId) {
    const trekURL = url + endpoints.trek + `/${trekId}`;

    const trek = await (await fetch(trekURL, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();

    if (trek.ownerId === localStorage.userId) {
        throw new Error('You can not like your trek!');
    }

    return await (await fetch(trekURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            likes: Number(trek.likes) + 1
        })
    })).json();
}

export async function getAllTreks(token) {

    return (await fetch(url + endpoints.trek, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getMyTreks(token, userId) {
    const whereURL = url + endpoints.trek + `?where=ownerId%3D%27${userId}%27`;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getTrekById(token, trekId) {
    const urlTrek = url + endpoints.trek + `/${trekId}`;

    return await (await fetch(urlTrek, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}