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

export async function updateDonor(token, donorId, money) {
    const donorURL = url + endpoints.donor + `/${donorId}`;

    const donor = (await fetch(donorURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            donation: money
        })
    })).json();

    return donor;
}

export async function getDonorByEmail(token, email) {
    const whereURL = url + endpoints.donor + `?where=email%3D%27${email}%27`;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function editCause(token, causeId, donor) {
    let donorFromDb = (await getDonorByEmail(token, donor.email))[0];
    const urlCauseWithDonors = url + endpoints.cause + `/${causeId}/donors`;

    if (donorFromDb === undefined) {
        donorFromDb = await createDonor(token, donor);
        await (await fetch(urlCauseWithDonors, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
                'user-token': token
            },
            body: JSON.stringify([donorFromDb.objectId])
        })).json();
    } else {
        donorFromDb = await updateDonor(token, donorFromDb.objectId, (donorFromDb.donation + donor.donation));
    }

    const cause = await getCauseById(token, causeId);
    const causeURL = url + endpoints.cause + `/${causeId}`;

    return (await fetch(causeURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            collectedFunds: (cause.collectedFunds + donor.donation)
        })
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

    return await (await fetch(urlCause, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}