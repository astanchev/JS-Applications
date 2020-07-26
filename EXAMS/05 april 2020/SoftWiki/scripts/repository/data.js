const url = `https://api.backendless.com/17084FAB-8F1D-5FD5-FF44-C5F0788E3100/E764E0B5-4CA3-44D1-939A-F82A4D01FE3F/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    article: 'data/Article',
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

export async function createArticle(token, article) {
    return (await fetch(url + endpoints.article, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(article)
    })).json();
}

export async function getArticleById(token, articleId) {
    const articleURL = url + endpoints.article + `/${articleId}`;

    return (await fetch(articleURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getArticleByCategory(token, category) {
    const articleURL = url + endpoints.article + `?where=category%3D%27${escape(category)}%27`;

    return (await fetch(articleURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getAllArticles(token) {
    return (await fetch(url + endpoints.article, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getAllArticlesByUserId(token, userId) {
    const whereURL = url + endpoints.article + `?where=ownerId%3D%27${userId}%27`;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function editArticle(token, articleId, article) {
    const articleURL = url + endpoints.article + `/${articleId}`;

    return (await fetch(articleURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(article)
    })).json();
}

export async function deleteArticle(token, articleId) {
    const articleURL = url + endpoints.article + `/${articleId}`;

    return (await fetch(articleURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();
}