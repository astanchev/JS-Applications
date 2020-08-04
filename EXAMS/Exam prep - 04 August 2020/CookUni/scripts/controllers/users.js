import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function registerGet() {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        notifications: (await this.load('../../templates/common/notifications.hbs'))
    };

    this.partial('../../templates/user/register.hbs', this.app.userData);
}

export async function registerPost() {
    const errors = [];

    if (this.params.firstName.length < 2) {
        errors.push('First name is required and should be at least 2 characters long!');
    }
    if (this.params.lastName.length < 2) {
        errors.push('Last name is required and should be at least 2 characters long!');
    }

    if (this.params.username.length < 3) {
        errors.push('Username is required and should be at least 3 characters long!');
    }

    if (this.params.password.length < 6) {
        errors.push('Password should be at least 6 symbols!');
    }

    if (this.params.password !== this.params.repeatPassword) {
        errors.push('Passwords don\'t match!');
    }

    if (errors.length > 0) {
        notifications.showError(errors.join(' '));
        return;
    }

    const user = {
        username: this.params.username,
        password: this.params.password,
        firstName: this.params.firstName,
        lastName: this.params.lastName,
    };

    try {
        notifications.showLoader();
        const registeredUser = await data.register(user);
        if (registeredUser.code) {
            throw registeredUser;
        }

        let userToLog = {
            login: this.params.username,
            password: this.params.password
        };

        const loggedUser = await data.login(userToLog);

        if (loggedUser.code) {
            throw loggedUser;
        }

        this.app.userData.username = loggedUser.username;
        this.app.userData.userId = loggedUser.objectId;
        this.app.userData.names = loggedUser.firstName + ' ' + loggedUser.lastName;

        localStorage.setItem('userToken', loggedUser['user-token']);
        localStorage.setItem('username', loggedUser.username);
        localStorage.setItem('userId', loggedUser.objectId);
        localStorage.setItem('names', this.app.userData.names);

        notifications.hideLoader();
        notifications.showInfo('User registration successful.');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function loginGet() {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        notifications: (await this.load('../../templates/common/notifications.hbs'))
    };

    this.partial('../../templates/user/login.hbs', this.app.userData);
}

export async function loginPost() {
    if (this.params.username.length === 0 || this.params.password.length === 0) {
        return;
    }

    const user = {
        login: this.params.username,
        password: this.params.password
    };

    try {
        notifications.showLoader();
        const loggedUser = await data.login(user);

        if (loggedUser.code) {
            throw loggedUser;
        }

        this.app.userData.username = loggedUser.username;
        this.app.userData.userId = loggedUser.objectId;
        this.app.userData.names = loggedUser.firstName + ' ' + loggedUser.lastName;

        localStorage.setItem('userToken', loggedUser['user-token']);
        localStorage.setItem('username', loggedUser.username);
        localStorage.setItem('userId', loggedUser.objectId);
        localStorage.setItem('names', this.app.userData.names);

        notifications.hideLoader();
        notifications.showInfo('Login successful.');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError('Invalid credentials. Please retry your request with correct credentials.');
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

        this.app.userData.username = '';
        this.app.userData.userId = '';
        this.app.userData.names = '';

        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('names');

        notifications.hideLoader();
        notifications.showInfo('Logout successful.');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
        this.redirect('#/home');
    }
}