const url = `https://api.backendless.com/CB1C65F4-7865-C715-FF88-6531592D9800/B56265EE-104C-449D-8E34-4FB7A2E71952/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    user: 'data/Users',
    recipe: 'data/Recipe'
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

export async function createRecipe(token, recipe) {
    return await (await fetch(url + endpoints.recipe, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(recipe)
    })).json();
}

export async function getAllRecipes(token) {

    return (await fetch(url + endpoints.recipe, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getRecipeById(token, recipeId) {
    const urlRecipe = url + endpoints.recipe + `/${recipeId}`;

    return await (await fetch(urlRecipe, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}

// export async function editEvent(token, eventId, event) {
//     const eventURL = url + endpoints.event + `/${eventId}`;

//     return await (await fetch(eventURL, {
//         method: 'put',
//         headers: {
//             'Content-type': 'application/json',
//             'user-token': token
//         },
//         body: JSON.stringify(event)
//     })).json();
// }

// export async function deleteEvent(token, eventId) {
//     const eventURL = url + endpoints.event + `/${eventId}`;

//     return (await fetch(eventURL, {
//         method: 'delete',
//         headers: {
//             'user-token': token
//         }
//     })).json();
// }

// export async function joinEvent(token, eventId) {
//     const eventURL = url + endpoints.event + `/${eventId}`;

//     const event = await (await fetch(eventURL, {
//         method: 'get',
//         headers: {
//             'user-token': token
//         }
//     })).json();

//     if (event.ownerId === localStorage.userId) {
//         throw new Error('You can not join your event!');
//     }

//     return await (await fetch(eventURL, {
//         method: 'put',
//         headers: {
//             'Content-type': 'application/json',
//             'user-token': token
//         },
//         body: JSON.stringify({
//             participants: Number(event.participants) + 1
//         })
//     })).json();
// }

// export async function getMyEvents(token, userId) {
//     const whereURL = url + endpoints.event + `?where=ownerId%3D%27${userId}%27`;

//     return (await fetch(whereURL, {
//         headers: {
//             'user-token': token
//         }
//     })).json();
// }