import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function registerGet() {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    this.partial('../../templates/user/register.hbs', this.app.userData);
}

export async function registerPost() {
    if (this.params.email.length === 0 || !(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/gim).test(this.params.email)) {
        notifications.showError('Email is required and should be valid!');
        return;
    }

    if (this.params.password.length < 6) {
        notifications.showError('Password should be at least 6 symbols!');
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

        const registeredUser = await data.register(user);
        if (registeredUser.code) {
            throw registeredUser;
        }

        let userToLog = {
            login: this.params.email,
            password: this.params.password
        };

        const loggedUser = await data.login(userToLog);

        if (loggedUser.code) {
            throw loggedUser;
        }

        this.app.userData.email = loggedUser.email;
        this.app.userData.userId = loggedUser.objectId;

        localStorage.setItem('userToken', loggedUser['user-token']);
        localStorage.setItem('username', loggedUser.email);
        localStorage.setItem('userId', loggedUser.objectId);

        notifications.showInfo('Successful registration.');
        this.redirect('#/home');
    } catch (error) {

        notifications.showError(error.message);
    }
}

export async function loginGet() {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    this.partial('../../templates/user/login.hbs', this.app.userData);
}

export async function loginPost() {
    if (this.params.email.length === 0 ||
        !(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/gim).test(this.params.email) ||
        this.params.password.length < 6) {
        notifications.showError('Invalid credentials. Please retry your request with correct credentials.');
        return;
    }

   const user = {
        login: this.params.email,
        password: this.params.password
    };

    try {
        const loggedUser = await data.login(user);

        if (loggedUser.code) {
            throw loggedUser;
        }

        this.app.userData.email = loggedUser.email;
        this.app.userData.userId = loggedUser.objectId;

        localStorage.setItem('userToken', loggedUser['user-token']);
        localStorage.setItem('email', loggedUser.email);
        localStorage.setItem('userId', loggedUser.objectId);

        notifications.showInfo('Logged in successfully.');
        this.redirect('#/home');
    } catch (error) {
        notifications.showError(error.message);
    }
}

export async function logout() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        const logoutUser = await data.logout(token);

        if (logoutUser.code) {
            throw loggedUser;
        }

        this.app.userData.email = '';
        this.app.userData.userId = '';

        localStorage.removeItem('userToken');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');

        notifications.showInfo('Successful logout.');
        this.redirect('#/home');
    } catch (error) {
        notifications.showError(error.message);
        this.redirect('#/home');
    }
}
