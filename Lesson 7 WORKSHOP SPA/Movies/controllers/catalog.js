import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function getAllMovies() {
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

    const search = this.params.search || '';
    const renderData = {};

    try {
        notifications.showLoader();
        renderData.movies = (await data.getMovies(token, search))
                                .sort((m1, m2) => m2.availableTickets - m1.availableTickets);
        if (renderData.movies.code) {
            throw renderData.movies;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(renderData, { origin: encodeURIComponent('#/catalog/all_movies'), search}, this.app.userData);

    this.partial('../templates/catalog/all_movies.hbs', renderData);
}

export async function getMyMovies() {
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

    const renderData = {};

    try {
        notifications.showLoader();
        renderData.movies = (await data.getMyMovies(token, localStorage.getItem('userId')))
                                .sort((m1, m2) => m2.availableTickets - m1.availableTickets);
        if (renderData.movies.code) {
            throw renderData.movies;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(renderData, { origin: encodeURIComponent('#/catalog/my_movies')}, this.app.userData);

    this.partial('../templates/catalog/my_movies.hbs', renderData);
}