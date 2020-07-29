import * as notifications from '../helpers/notifications.js';
import * as data from '../repository/data.js';

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
    const token = localStorage.getItem('userToken');
    if (!token) {
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    const renderData = {};

    try {
        notifications.showLoader();
        renderData.ideas = (await data.getAllIdeas(token))
                                .sort((i1, i2) => i2.likes - i1.likes);
        if (renderData.ideas.code) {
            throw renderData.ideas;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/dashboard.hbs', renderData);

    notifications.hideLoader();
}