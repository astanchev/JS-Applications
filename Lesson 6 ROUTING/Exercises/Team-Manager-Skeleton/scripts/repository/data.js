const url = `https://api.backendless.com/F0BCAF4E-7B24-38A1-FF02-6B1BA9907000/6F9DE79E-40C7-41BD-9766-17B392C4DB44/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    team: 'data/team',
    members: '?loadRelations=members',
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

export async function getAllTeams(token) {
    return await (await fetch(url + endpoints.team, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getTeamById(teamId, token) {
    const urlTeam = url + endpoints.team + `/${teamId}` + endpoints.members;

    return await (await fetch(urlTeam, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function createTeam(team, token) {
    const createdTeam = await (await fetch(url + endpoints.team, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(team)
    })).json();

    const teamId = createdTeam.objectId;
    const userId = localStorage.getItem('userId');

    const numberUsers = await (await fetch(url + endpoints.team + `/${teamId}/members`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify([userId])
    })).json();

    if (numberUsers.code) {
        return numberUsers;
    } else {
        const user = await (await fetch(url + endpoints.user + `/${userId}`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
                'user-token': token
            },
            body: JSON.stringify({
                teamId: teamId
            })
        })).json();

        return createdTeam;
    }
}

export async function joinTeam(teamId, userId, token) {
    const numberUsers = await (await fetch(url + endpoints.team + `/${teamId}/members`, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify([userId])
    })).json();

    const user = await (await fetch(url + endpoints.user + `/${userId}`, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            teamId: teamId
        })
    })).json();

    return user;
}

export async function leaveTeam(userId, token) {
    const user = await (await fetch(url + endpoints.user + `/${userId}`, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();

    const urlTeam = url + endpoints.team + `/${user.teamId}` + endpoints.members;
    const teamWithMembers = await (await fetch(urlTeam, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();
    let teamMembers = teamWithMembers.members.map(m => m.objectId);
    const userIndex = teamMembers.indexOf(userId);

    if (userIndex < 0) {
        throw new Error('You are not a member of that team!');
    }

    teamMembers.splice(userIndex, 1);

    const numberUsers = await (await fetch(url + endpoints.team + `/${user.teamId}/members`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(teamMembers)
    })).json();

    const updatedUser = await (await fetch(url + endpoints.user + `/${userId}`, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            teamId: ''
        })
    })).json();

    return updatedUser;
}

export async function editTeam(teamId, newTeam, token) {
    return await (await fetch(url + endpoints.team + `/${teamId}`, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(newTeam)
    })).json();
}