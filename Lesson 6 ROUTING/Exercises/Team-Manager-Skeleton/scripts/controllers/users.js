import * as data from '../repository/data.js';
import * as notifications from '../notifications.js';

export async function registerGet() {
    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        registerForm: (await this.load('./../../templates/register/registerForm.hbs'))
    };

    this.partial('./../../templates/register/registerPage.hbs', this.app.userData);
}

export async function registerPost() {
    if (this.params.username.length < 3) {
        notifications.showError('Username should be at least 3 symbols!');
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
        username: this.params.username,
        password: this.params.password
    };

    try {
        const registeredUser = await data.register(user);
        if (registeredUser.code) {
            throw registeredUser;
        }
        notifications.showInfo('Successful registration!');
        this.redirect('#/login');
    } catch (error) {
        notifications.showError(error.message);
    }
}

export async function loginGet() {
    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        loginForm: (await this.load('./../../templates/login/loginForm.hbs'))
    };

    this.partial('./../../templates/login/loginPage.hbs', this.app.userData);
}

export async function loginPost() {
    const user = {
        login: this.params.username,
        password: this.params.password
    };

    try {
        const loggedUser = await data.login(user);

        if (loggedUser.code) {
            throw loggedUser;
        }

        this.app.userData.username = loggedUser.username;
        this.app.userData.userId = loggedUser.objectId;
        this.app.userData.loggedIn = true;

        if (loggedUser.teamId) {
            this.app.userData.hasTeam = true;
            this.app.userData.teamId = loggedUser.teamId;
        }

        localStorage.setItem('userToken', loggedUser['user-token']);
        localStorage.setItem('username', loggedUser.username);
        localStorage.setItem('userId', loggedUser.objectId);

        notifications.showInfo('Successful login!');
        this.redirect('#/home');
    } catch (error) {
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
        const logoutUser = await data.logout(token);

        if (logoutUser.code) {
            throw loggedUser;
        }

        this.app.userData.username = undefined;
        this.app.userData.userId = undefined;
        this.app.userData.teamId = undefined;
        this.app.userData.loggedIn = false;
        this.app.userData.hasTeam = false;

        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');

        notifications.showInfo('Successful logout!');
        this.redirect('#/home');
    } catch (error) {
        notifications.showError(error.message);
        this.redirect('#/home');
    }
}