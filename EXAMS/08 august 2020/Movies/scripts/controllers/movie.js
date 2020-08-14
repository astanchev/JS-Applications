import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function createGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    this.partial('../../templates/movie/create.hbs', this.app.userData);
}

export async function createPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (!this.params.title || !this.params.description || !this.params.imageUrl) {
        notifications.showError('Invalid inputs!');
        return;
    }

    const movie = {
        title: this.params.title,
        description: this.params.description,
        image: this.params.imageUrl,
        creator: this.app.userData.email,
        peopleLiked: '',
    };

    try {
        const createdTrek = await data.createMovie(token, movie);
        if (createdTrek.code) {
            throw createdTrek;
        }

        notifications.showInfo('Created successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.showError(error.message);
    }
}

export async function details() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    let movie = {};

    try {
        movie = await data.getMovieById(token, this.params.id);
        if (movie.code) {
            throw movie;
        }
    } catch (error) {
        notifications.showError(error.message);
    }

    let isCreator = movie.ownerId === this.app.userData.userId ? true : false;
    const people = movie.peopleLiked.split(', ').filter(x => x !== '');
    const count = people.length;

    let isLiked = false;
    if (people.indexOf(this.app.userData.email) > - 1) {
        isLiked = true;
    }

    Object.assign(movie, this.app.userData, {isCreator, isLiked, count});

    this.partial('../../templates/movie/details.hbs', movie);
}

export async function editGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    let movie = {};

    try {
        movie = await data.getMovieById(token, this.params.id);
        if (movie.code) {
            throw movie;
        }
    } catch (error) {
        alert(error.message);
        return;
    }

    Object.assign(movie, this.app.userData);

    this.partial('../../templates/movie/edit.hbs', movie);
}

export async function editPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (!this.params.title || !this.params.description || !this.params.imageUrl) {
        notifications.showError('Invalid inputs!');
        return;
    }

    const movie = {
        title: this.params.title,
        description: this.params.description,
        image: this.params.imageUrl
    };

    try {
        const updatedMovie = await data.editMovie(token, this.params.id, movie);
        if (updatedMovie.code) {
            throw updatedMovie;
        }
        notifications.showInfo('Edited successfully!');
        this.redirect('#/movie/details/' + `${this.params.id}`);
    } catch (error) {
        notifications.showError(error.message);
    }
}

export async function deleteMovie() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        const deletedTime = await data.deleteMovie(token, this.params.id);
        if (deletedTime.code) {
            throw deletedTime;
        }
        notifications.showInfo('Deleted successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.showError(error.message);
    }
}

export async function like() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        const movie = await data.likeMovie(token, this.params.id, this.app.userData.email);
        if (movie.code) {
            throw movie;
        }
        notifications.showInfo(`Liked successfully!`);
        this.redirect('#/movie/details/' + `${this.params.id}`);
    } catch (error) {
        notifications.showError(error.message);
    }
}