import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function registerGet() {
    const token = localStorage.getItem('userToken');
    if (token) {
        this.redirect('#/dashboard');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    this.partial('../../templates/user/register.hbs', this.app.userData);
}

export async function registerPost() {
    const token = localStorage.getItem('userToken');
    if (token) {
        this.redirect('#/dashboard');
        return;
    }

    if (this.params.email.length === 0 || !(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/gim).test(this.params.email)) {
        notifications.showError('Email is required and should be valid!');
        return;
    }

    if (this.params.password.length < 3) {
        notifications.showError('Password should be at least 3 symbols!');
        return;
    }

    if (this.params.password !== this.params.repeatPassword) {
        notifications.showError('Passwords don\'t match!');
        return;
    }

    const user = {
        email: this.params.email,
        password: this.params.password
    };

    try {
        notifications.showLoader();
        const registeredUser = await data.register(user);
        if (registeredUser.code) {
            throw registeredUser;
        }
        notifications.hideLoader();
        notifications.showInfo('User registration successful.');
        this.redirect('#/login');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function loginGet() {
    const token = localStorage.getItem('userToken');
    if (token) {
        this.redirect('#/dashboard');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    this.partial('../../templates/user/login.hbs', this.app.userData);
}

export async function loginPost() {
    const token = localStorage.getItem('userToken');
    if (token) {
        this.redirect('#/dashboard');
        return;
    }

    const user = {
        login: this.params.email,
        password: this.params.password
    };

    try {
        notifications.showLoader();
        const loggedUser = await data.login(user);

        if (loggedUser.code) {
            throw loggedUser;
        }

        this.app.userData.email = loggedUser.email;
        this.app.userData.userId = loggedUser.objectId;

        localStorage.setItem('userToken', loggedUser['user-token']);
        localStorage.setItem('email', loggedUser.email);
        localStorage.setItem('userId', loggedUser.objectId);

        notifications.hideLoader();
        notifications.showInfo('Login successful.');
        this.redirect('#/dashboard');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function logout() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        notifications.showLoader();
        const logoutUser = await data.logout(token);

        if (logoutUser.code) {
            throw loggedUser;
        }

        this.app.userData.email = '';
        this.app.userData.userId = '';

        localStorage.removeItem('userToken');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');

        notifications.hideLoader();
        notifications.showInfo('Logout successful.');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
        this.redirect('#/home');
    }
}