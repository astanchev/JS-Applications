import * as notifications from '../helpers/notifications.js';
import * as data from '../repository/data.js';

export default async function () {
    this.partials = {
        notifications: (await this.load('../../templates/common/notifications.hbs')),
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        listRecipes: (await this.load('../../templates/home/listRecipes.hbs')),
        noRecipes: (await this.load('../../templates/home/noRecipes.hbs')),
    };

    const renderData = {};
    // const token = localStorage.getItem('userToken');
    // if (token) {
    //     try {
    //         renderData.events = (await data.getAllEvents(token))
    //             .sort((i1, i2) => i2.participants - i1.participants);
    //         if (renderData.events.code) {
    //             throw renderData.events;
    //         }
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/home.hbs', renderData);

}