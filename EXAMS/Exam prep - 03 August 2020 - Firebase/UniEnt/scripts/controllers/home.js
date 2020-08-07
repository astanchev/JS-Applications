import * as notifications from '../helpers/notifications.js';
import * as data from '../repository/data.js';

export default async function () {
    this.partials = {
        notifications: (await this.load('../../templates/common/notifications.hbs')),
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        listEvents: (await this.load('../../templates/home/listEvents.hbs')),
        error: (await this.load('../../templates/home/error.hbs')),
    };

    const renderData = {};
    const userId = localStorage.getItem('userId');
    if (userId) {
        try {
            const events = (await data.getAllEvents());
            renderData.events = [];
            events.forEach(e => {
                renderData.events.push({
                    objectId: e.id,
                    dateTime: e.data().dateTime,
                    description: e.data().description,
                    image: e.data().image,
                    name: e.data().name,
                    organizer: e.data().organizer,
                    participants: e.data().participants
                });
            });
            renderData.events.sort((i1, i2) => i2.participants - i1.participants);
        } catch (error) {
            alert(error.message);
        }
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/home.hbs', renderData);

}