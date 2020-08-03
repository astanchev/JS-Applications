const url = `https://api.backendless.com/46FFA94D-2EAB-D211-FFDE-E34E92726F00/73D93D7C-872B-4307-866B-ED3AC1D2957F/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    user: 'data/Users',
    event: 'data/Event'
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

export async function createEvent(token, event) {
    return await (await fetch(url + endpoints.event, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(event)
    })).json();
}

export async function getAllEvents(token) {

    return (await fetch(url + endpoints.event, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getEventById(token, eventId) {
    const urlEvent = url + endpoints.event + `/${eventId}`;

    return await (await fetch(urlEvent, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function editEvent(token, eventId, event) {
    const eventURL = url + endpoints.event + `/${eventId}`;

    return await (await fetch(eventURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(event)
    })).json();
}

// export async function deleteTrek(token, trekId) {
//     const trekURL = url + endpoints.trek + `/${trekId}`;

//     return (await fetch(trekURL, {
//         method: 'delete',
//         headers: {
//             'user-token': token
//         }
//     })).json();
// }

// export async function likeTrek(token, trekId) {
//     const trekURL = url + endpoints.trek + `/${trekId}`;

//     const trek = await (await fetch(trekURL, {
//         method: 'get',
//         headers: {
//             'user-token': token
//         }
//     })).json();

//     if (trek.ownerId === localStorage.userId) {
//         throw new Error('You can not like your trek!');
//     }

//     return await (await fetch(trekURL, {
//         method: 'put',
//         headers: {
//             'Content-type': 'application/json',
//             'user-token': token
//         },
//         body: JSON.stringify({
//             likes: Number(trek.likes) + 1
//         })
//     })).json();
// }

// export async function getMyTreks(token, userId) {
//     const whereURL = url + endpoints.trek + `?where=ownerId%3D%27${userId}%27`;

//     return (await fetch(whereURL, {
//         headers: {
//             'user-token': token
//         }
//     })).json();
// }

