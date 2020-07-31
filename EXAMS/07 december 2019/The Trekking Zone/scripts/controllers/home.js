import * as notifications from '../helpers/notifications.js';
import * as data from '../repository/data.js';

export default async function () {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        listTreks: (await this.load('../../templates/home/listTreks.hbs')),
        noTreks: (await this.load('../../templates/home/noTreks.hbs')),
    };

    const renderData = {};
    const token = localStorage.getItem('userToken');
    if (token) {
        try {
            notifications.showLoader();
            renderData.treks = (await data.getAllTreks(token))
                .sort((i1, i2) => i2.likes - i1.likes);
            if (renderData.treks.code) {
                throw renderData.treks;
            }
            notifications.hideLoader();
        } catch (error) {
            notifications.hideLoader();
            notifications.showError(error.message);
        }
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/home.hbs', renderData);

    notifications.hideLoader();
}