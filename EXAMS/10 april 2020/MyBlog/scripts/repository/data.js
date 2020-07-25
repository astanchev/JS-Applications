const url = `https://api.backendless.com/17084FAB-8F1D-5FD5-FF44-C5F0788E3100/E764E0B5-4CA3-44D1-939A-F82A4D01FE3F/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    post: 'data/Post',
    user: 'data/Users'
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

export async function createPost(token, post) {
    return (await fetch(url + endpoints.post, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(post)
    })).json();
}

export async function getPostById(token, postId) {
    const postURL = url + endpoints.post + `/${postId}`;

    return (await fetch(postURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getAllPosts(token) {
    return (await fetch(url + endpoints.post, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getAllPostsByUserId(token, userId) {
    const whereURL = url + endpoints.post + `?where=ownerId%3D%27${userId}%27`;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function editPost(token, postId, post) {
    const postURL = url + endpoints.post + `/${postId}`;

    return (await fetch(postURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(post)
    })).json();
}

export async function deletePost(token, postId) {
    const postURL = url + endpoints.post + `/${postId}`;

    return (await fetch(postURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();
}