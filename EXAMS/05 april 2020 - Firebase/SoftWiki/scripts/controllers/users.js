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

    if (this.params.password.length < 3) {
        notifications.showError('Password should be at least 3 symbols!');
        return;
    }

    if (this.params.password !== this.params['rep-pass']) {
        notifications.showError('Passwords don\'t match!');
        return;
    }

    const user = {
        email: this.params.email,
        password: this.params.password
    };

    try {
        notifications.showLoader();
        const registeredObject = await data.register(user);

        this.app.userData.email = user.email;
        this.app.userData.userId = registeredObject.user.uid;

        localStorage.setItem('email', user.email);
        localStorage.setItem('userId', registeredObject.user.uid);

        notifications.hideLoader();
        notifications.showInfo('User registration successful.');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

// export async function loginGet() {
//     this.partials = {
//         header: (await this.load('../../templates/common/header.hbs')),
//         footer: (await this.load('../../templates/common/footer.hbs'))
//     };

//     this.partial('../../templates/user/login.hbs', this.app.userData);
// }

export async function loginPost() {
    const user = {
        email: this.params.email,
        password: this.params.password
    };

    try {
        notifications.showLoader();
        const loggedObject = await data.login(user);

        this.app.userData.email = user.email;
        this.app.userData.userId = loggedObject.user.uid;

        localStorage.setItem('email', user.email);
        localStorage.setItem('userId', loggedObject.user.uid);

        notifications.hideLoader();
        notifications.showInfo('Login successful.');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function logout() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        notifications.showLoader();
        await data.logout();

        this.app.userData.email = '';
        this.app.userData.userId = '';

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