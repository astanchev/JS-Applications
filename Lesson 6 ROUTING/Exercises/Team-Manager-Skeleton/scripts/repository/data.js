const url = `https://api.backendless.com/F0BCAF4E-7B24-38A1-FF02-6B1BA9907000/6F9DE79E-40C7-41BD-9766-17B392C4DB44/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
};

export async function register(user) {
    return await (await fetch(url + endpoints.register, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user)
    })).json();
}

export async function login(user) {
    return await (await fetch(url + endpoints.login, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user)
    })).json();
}

export async function logout() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error('User is not logged in');
    }

    return await fetch(url + endpoints.logout, {
        method: 'get',
        headers: { 'user-token': token }
    });
}