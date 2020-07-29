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

export async function getMyIdeas(token, userId) {
    const whereURL = url + endpoints.idea + `?where=ownerId%3D%27${userId}%27`;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getIdeaById(token, ideaId) {
    const urlIdea = url + endpoints.idea + `/${ideaId}` + endpoints.comments;

    return await (await fetch(urlIdea, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function deleteIdea(token, ideaId) {
    const urlIdeaWithComments = url + endpoints.idea + `/${ideaId}` + endpoints.comments;

    const ideaWithComments = await (await fetch(urlIdeaWithComments, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();

    let ideaComments = ideaWithComments.comments.map(c => c.objectId);

    const ideaURL = url + endpoints.idea + `/${ideaId}`;

    const ideaDeleteTime =  await (await fetch(ideaURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();

    if (ideaComments.length > 0) {
        for (const c of ideaComments) {
            await deleteComment(token, c);
        }
    }

    return ideaDeleteTime;
}

export async function deleteComment(token, commentId) {
    const commentURL = url + endpoints.comment + `/${commentId}`;

    return await (await fetch(commentURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function likeIdea(token, ideaId) {
    const ideaURL = url + endpoints.idea + `/${ideaId}`;

    const idea = await (await fetch(ideaURL, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();

    return await (await fetch(ideaURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({likes: Number(idea.likes) + 1})
    })).json();
}