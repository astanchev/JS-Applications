import * as notifications from '../helpers/notifications.js';

export async function showIndex() {
    const token = localStorage.getItem('userToken');
    if (token) {
        this.redirect('#/dashboard');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    this.partial('../../templates/home/home.hbs', this.app.userData);

    notifications.hideLoader();
}

export async function showDashboard() {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    this.partial('../../templates/home/dashboard.hbs', this.app.userData);

    notifications.hideLoader();
}