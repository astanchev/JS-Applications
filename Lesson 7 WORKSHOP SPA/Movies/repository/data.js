const url = `https://api.backendless.com/F8D0A9F6-BD86-108F-FF1B-027DFC04E400/3E384696-FC1B-47FE-B94E-B1F0F70C5971/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    movie: 'data/movie',
    movieCount: 'data/movie/count',
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

export async function createMovie(token, movie) {
    return await (await fetch(url + endpoints.movie, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}

export async function editMovie(token, movieId, movie) {
    const movieURL = url + endpoints.movie + `/${movieId}`;

    return await (await fetch(movieURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}

export async function deleteMovie(token, movieId) {
    const movieURL = url + endpoints.movie + `/${movieId}`;

    return await (await fetch(movieURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getMovieCount(token, searchedGenre) {
    let result = [];

    if (!searchedGenre) {
        result = (await fetch(url + endpoints.movieCount, {
            headers: {
                'user-token': token
            }
        })).json();
    } else {
        result = (await fetch(url + endpoints.movieCount + `?where=${escape(`genres LIKE '%${searchedGenre}%'`)}`, {
            headers: {
                'user-token': token
            }
        })).json();
    }

    return result;
}

export async function getMovies(token, searchedGenre, page) {
    let result = [];

    if (searchedGenre) {
        result = await getSearchedMovies(token, searchedGenre, page);
    } else {
        result = await getAllMovies(token, page);
    }

    return result;
}

export async function getAllMovies(token, page) {
    const pagingQuery = `pageSize=9&offset=${(page-1)*9}`;

    return (await fetch(url + endpoints.movie + '?' + pagingQuery, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getSearchedMovies(token, searchedGenre, page) {
    const pagingQuery = `pageSize=9&offset=${(page-1)*9}`;
    const whereURL = url + endpoints.movie + `?where=${escape(`genres LIKE '%${searchedGenre}%'`)}`  + '&' + pagingQuery;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getMyMovies(token, userId) {
    const whereURL = url + endpoints.movie + `?where=ownerId%3D%27${userId}%27`;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getMovieById(token, movieId) {
    const movieURL = url + endpoints.movie + `/${movieId}`;

    return (await fetch(movieURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function buyTicket(token, movieId, tickets) {
    const movieURL = url + endpoints.movie + `/${movieId}`;

    return (await fetch(movieURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({availableTickets: (tickets - 1)})
    })).json();
}