import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export default async function() {
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
        renderData.causes = await data.getAllCauses(token);
        if (renderData.causes.code) {
            throw renderData.causes;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/dashboard/dashboard.hbs', renderData);

    notifications.hideLoader();
}