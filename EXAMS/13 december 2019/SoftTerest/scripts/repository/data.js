const url = `https://api.backendless.com/17084FAB-8F1D-5FD5-FF44-C5F0788E3100/E764E0B5-4CA3-44D1-939A-F82A4D01FE3F/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    user: 'data/Users',
    idea: 'data/Idea',
    comments: '?loadRelations=comments',
    comment: 'data/Comment'
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

export async function createIdea(token, idea) {
    return await (await fetch(url + endpoints.idea, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(idea)
    })).json();
}

export async function editIdea(token, ideaId, idea) {
    const ideaURL = url + endpoints.idea + `/${ideaId}`;

    return await (await fetch(ideaURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(idea)
    })).json();
}

export async function getAllIdeas(token) {

    return (await fetch(url + endpoints.idea, {
        headers: {
            'user-token': token
        }
    })).json();
}