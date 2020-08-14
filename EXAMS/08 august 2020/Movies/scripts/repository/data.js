const url = `https://api.backendless.com/254EE295-62D3-2399-FFCD-A0EB0A6FC000/879C00A1-3A94-413B-9475-37E8F46E4CB9/`;

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    user: 'data/Users',
    movie: 'data/Movie',
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

export async function getAllMovies(token, search) {
    let result = [];

    if (search) {
        result = await getSearchedMovies(token, search);
    } else {
        result = await getMovies(token);
    }

    return result;
}

export async function getSearchedMovies(token, search) {
    const whereURL = url + endpoints.movie + `?where=${escape(`title LIKE '%${search}%'`)}`;

    return (await fetch(whereURL, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getMovies(token) {

    return (await fetch(url + endpoints.movie, {
        headers: {
            'user-token': token
        }
    })).json();
}

export async function getMovieById(token, movieId) {
    const urlMovie = url + endpoints.movie + `/${movieId}`;

    return await (await fetch(urlMovie, {
        method: 'get',
        headers: {
            'user-token': token
        }
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

    return (await fetch(movieURL, {
        method: 'delete',
        headers: {
            'user-token': token
        }
    })).json();
}

export async function likeMovie(token, movieId, email) {
    const movieURL = url + endpoints.movie + `/${movieId}`;

    const movie = await (await fetch(movieURL, {
        method: 'get',
        headers: {
            'user-token': token
        }
    })).json();

    if (movie.ownerId === localStorage.userId) {
        throw new Error('You can not like your movie!');
    }

    const people = movie.peopleLiked.split(', ').filter(x => x !== '');
    people.push(email);

    return await (await fetch(movieURL, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({
            peopleLiked: people.join(', ')
        })
    })).json();
}