const url = `https://api.backendless.com/F8D0A9F6-BD86-108F-FF1B-027DFC04E400/3E384696-FC1B-47FE-B94E-B1F0F70C5971/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    movie: 'data/movie',
    user: 'data/Users'
};

export async function register(user) {
    return await (await fetch(url + endpoints.register, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })).json();
}

export async function login(user) {
    return await (await fetch(url + endpoints.login, {
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

export async function createMovie(token, movie) {
    return await (await fetch(url + endpoints.movie, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}