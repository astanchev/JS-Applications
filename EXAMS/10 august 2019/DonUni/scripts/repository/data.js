const url = `https://api.backendless.com/17084FAB-8F1D-5FD5-FF44-C5F0788E3100/E764E0B5-4CA3-44D1-939A-F82A4D01FE3F/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    user: 'data/Users',
    cause: 'data/Cause',
    donor: 'data/Donor',
    donors: '?loadRelations=donors',
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

export async function createCause(token, cause) {
    return await (await fetch(url + endpoints.cause, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(cause)
    })).json();
}

export async function createDonor(token, donor) {
    return await (await fetch(url + endpoints.donor, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(donor)
    })).json();
}

export async function deleteDonor(token, donorId) {
    const donorURL = url + endpoints.donor + `/${donorId}`;

    return await (await fetch(donorURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function addDonor(token, causeId, donor) {
    const urlCauseWithDonors = url + endpoints.donor + `/${causeId}/donors`;

    const newDonor = await createDonor(token, donor);

    return await (await fetch(urlCauseWithDonors, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify([newDonor.objectId])
    })).json();
}

// export async function editTrek(token, trekId, trek) {
//     const trekURL = url + endpoints.trek + `/${trekId}`;

//     return await (await fetch(trekURL, {
//         method: 'put',
//         headers: {
//             'Content-type': 'application/json',
//             'user-token': token
//         },
//         body: JSON.stringify(trek)
//     })).json();
// }

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

export async function getAllCauses(token) {

    return (await fetch(url + endpoints.cause, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getMyCauses(token, userId) {
    const whereURL = url + endpoints.cause + `?where=ownerId%3D%27${userId}%27`;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getCauseById(token, causeId) {
    const urlCause = url + endpoints.cause + `/${causeId}` + endpoints.donors;

    return await (await fetch(urlTrek, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}