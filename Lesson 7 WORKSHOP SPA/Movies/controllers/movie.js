import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function createGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../templates/common/header.hbs')),
        footer: (await this.load('../templates/common/footer.hbs'))
    };

    this.partial('../templates/movie/create.hbs', this.app.userData);
}

export async function createPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (this.params.title < 6) {
        notifications.showError('Movie title should be at least 6 symbols');
        return;
    }

    if (this.params.image.length < 0 || (!this.params.image.startsWith(`http://`) && !this.params.image.startsWith(`https://`))) {
        notifications.showError('Movie image should starts with "http://" or "https://"');
        return;
    }

    if (this.params.description.length < 10) {
        notifications.showError('Movie description should be at least 10 symbols');
        return;
    }

    if (this.params.tickets === '' || isNaN(this.params.tickets) || Number(this.params.tickets) < 0) {
        notifications.showError('Movie available tickets shouldn\'t be negative number');
        return;
    }

    const movie = {
        title: this.params.title,
        description: this.params.description,
        image: this.params.image,
        availableTickets: Number(this.params.tickets),
        genres: this.params.genres
    };

    const form = document.querySelector('div#addMovie > form');

    try {
        notifications.showLoader();
        const createdMovie = await data.createMovie(token, movie);
        if (createdMovie.code) {
            throw createdMovie;
        }
        form.reset();
        notifications.hideLoader();
        notifications.showInfo('Movie created successfully.');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function getDetails() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../templates/common/header.hbs')),
        footer: (await this.load('../templates/common/footer.hbs'))
    };

    let movie = {};

    try {
        notifications.showLoader();
        movie = await data.getMovieById(token, this.params.id);
        if (movie.code) {
            throw movie;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(movie, { origin: encodeURIComponent('#/movie/details/' +  this.params.id)}, this.app.userData);

    this.partial('../templates/movie/details.hbs', movie);
}

export async function buyTicket() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (Number(this.params.availableTickets) === 0) {
        notifications.showError(`There are no available tickets for ${this.params.title}!`);
        return;
    }

    try {
        notifications.showLoader();
        const movie = await data.buyTicket(token, this.params.id, Number(this.params.availableTickets));
        if (movie.code) {
            throw movie;
        }
        notifications.hideLoader();
        notifications.showInfo(`Successfully bought ticket for ${this.params.title}!`);

        if (this.params.search) {
            this.redirect( this.params.origin + `?search=${this.params.search}`);
        } else {
            this.redirect( this.params.origin);
        }
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function editGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../templates/common/header.hbs')),
        footer: (await this.load('../templates/common/footer.hbs'))
    };

    let movie = {};

    try {
        notifications.showLoader();
        movie = await data.getMovieById(token, this.params.id);
        if (movie.code) {
            throw movie;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(movie, this.app.userData);

    this.partial('../templates/movie/edit.hbs', movie);
}

export async function editPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (this.params.title < 6) {
        notifications.showError('Movie title should be at least 6 symbols');
        return;
    }

    if (this.params.image.length < 0 || (!this.params.image.startsWith(`http://`) && !this.params.image.startsWith(`https://`))) {
        notifications.showError('Movie image should starts with "http://" or "https://"');
        return;
    }

    if (this.params.description.length < 10) {
        notifications.showError('Movie description should be at least 10 symbols');
        return;
    }

    if (this.params.tickets === '' || isNaN(this.params.tickets) || Number(this.params.tickets) < 0) {
        notifications.showError('Movie available tickets shouldn\'t be negative number');
        return;
    }

    const movie = {
        title: this.params.title,
        description: this.params.description,
        image: this.params.image,
        availableTickets: Number(this.params.tickets),
        genres: this.params.genres
    };

    try {
        notifications.showLoader();
        const editedMovie = await data.editMovie(token, this.params.id, movie);
        if (editedMovie.code) {
            throw editedMovie;
        }
        notifications.hideLoader();
        notifications.showInfo('Movie edited successfully.');
        this.redirect('#/catalog/my_movies');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

}

export async function deleteGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }


    this.partials = {
        header: (await this.load('../templates/common/header.hbs')),
        footer: (await this.load('../templates/common/footer.hbs'))
    };

    let movie = {};

    try {
        notifications.showLoader();
        movie = await data.getMovieById(token, this.params.id);
        if (movie.code) {
            throw movie;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(movie, this.app.userData);

    this.partial('../templates/movie/delete.hbs', movie);
}

export async function deletePost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

}