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
    if (this.params.username.length < 3) {
        notifications.showError('Username is required and should be at least 3 characters long!');
        return;
    }

    const errors = [];

    if (this.params.password.length < 6) {
        errors.push('Password should be at least 6 symbols!');
    }

    if (this.params.password !== this.params.rePassword) {
        errors.push('Passwords don\'t match!');
    }

    if (errors.length > 0) {
        errors.push(errors.join(' '));
    }

    const user = {
        username: this.params.username,
        password: this.params.password
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

        localStorage.setItem('userToken', loggedUser['user-token']);
        localStorage.setItem('username', loggedUser.username);
        localStorage.setItem('userId', loggedUser.objectId);

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

        localStorage.setItem('userToken', loggedUser['user-token']);
        localStorage.setItem('username', loggedUser.username);
        localStorage.setItem('userId', loggedUser.objectId);

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

        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
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

export async function profile() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        notifications: (await this.load('../../templates/common/notifications.hbs'))
    };

    let events = [];

    try {
        events = (await data.getMyEvents(token, this.app.userData.userId));
        if (events.code) {
            throw events;
        }
    } catch (error) {
        alert(error.message);
    }

    const renderData = {
        events: events.map(e => e.name),
        count: events.length
    };

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/user/profile.hbs', renderData);
}