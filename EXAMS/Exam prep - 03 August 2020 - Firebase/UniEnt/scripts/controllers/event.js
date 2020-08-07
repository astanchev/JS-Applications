import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function createGet() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        notifications: (await this.load('../../templates/common/notifications.hbs'))
    };

    this.partial('../../templates/event/create.hbs', this.app.userData);
}

export async function createPost() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    const errors = [];

    if (this.params.name.length < 6) {
        errors.push('Event name should be at least 6 symbols');
    }

    if (this.params.dateTime.length === 0 || !(/^[0-3][0-9] [a-zA-Z]+( - [0-1][0-9] [aA|pP][mM])*$/g).test(this.params.dateTime)) {
        errors.push('Event date should be valid in format "dd mmmm" or "dd mmmm - HH AM or PM"!');
    }

    if (this.params.description.length < 10) {
        errors.push('Event description should be at least 10 symbols');
    }

    if (this.params.imageURL.length === 0 || (!(this.params.imageURL.startsWith(`http://`)) && !(this.params.imageURL.startsWith(`https://`)))) {
        errors.push('Event image should starts with "http://" or "https://"');
    }

    if (errors.length > 0) {
        document.querySelector('form').reset();
        notifications.showError(errors.join(' '));
        return;
    }

    const event = {
        name: this.params.name,
        dateTime: this.params.dateTime,
        description: this.params.description,
        image: this.params.imageURL,
        organizer: this.app.userData.email,
        participants: 0
    };

    try {
        notifications.showLoader();
        const createdEvent = await data.createEvent(event);

        notifications.hideLoader();
        notifications.showInfo('Event created successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function details() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        notifications: (await this.load('../../templates/common/notifications.hbs'))
    };

    let event = {};

    try {
        const eventDB = await data.getEventById(this.params.id);

        event = {
            objectId: eventDB.id,
            dateTime: eventDB.data().dateTime,
            description: eventDB.data().description,
            image: eventDB.data().image,
            name: eventDB.data().name,
            organizer: eventDB.data().organizer,
            participants: eventDB.data().participants
        };
    } catch (error) {
        alert(error.message);
    }

    let isCreator = event.organizer === this.app.userData.email ? true : false;

    Object.assign(event, this.app.userData, { isCreator });

    this.partial('../../templates/event/details.hbs', event);
}

export async function editGet() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        notifications: (await this.load('../../templates/common/notifications.hbs'))
    };

    let event = {};

    try {
        const eventDB = await data.getEventById(this.params.id);

        event = {
            objectId: eventDB.id,
            dateTime: eventDB.data().dateTime,
            description: eventDB.data().description,
            image: eventDB.data().image,
            name: eventDB.data().name,
            organizer: eventDB.data().organizer,
            participants: eventDB.data().participants
        };
    } catch (error) {
        alert(error.message);
    }

    Object.assign(event, this.app.userData);

    this.partial('../../templates/event/edit.hbs', event);
}

export async function editPost() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    const errors = [];

    if (this.params.name.length < 6) {
        errors.push('Event name should be at least 6 symbols');
    }

    if (this.params.dateTime.length === 0 || !(/^[0-3][0-9] [a-zA-Z]+( - [0-1][0-9] [aA|pP][mM])*$/g).test(this.params.dateTime)) {
        errors.push('Event date should be valid in format "dd mmmm" or "dd mmmm - HH AM or PM"!');
    }

    if (this.params.description.length < 10) {
        errors.push('Event description should be at least 10 symbols');
    }

    if (this.params.imageURL.length === 0 || (!(this.params.imageURL.startsWith(`http://`)) && !(this.params.imageURL.startsWith(`https://`)))) {
        errors.push('Event image should starts with "http://" or "https://"');
    }

    if (errors.length > 0) {
        document.querySelector('form').reset();
        notifications.showError(errors.join(' '));
        return;
    }

    const event = {
        name: this.params.name,
        dateTime: this.params.dateTime,
        description: this.params.description,
        image: this.params.imageURL,
        organizer: this.params.organizer,
        participants: this.params.peopleInterestedIn
    };

    try {
        notifications.showLoader();
        const updatedEvent = await data.editEvent(this.params.id, event);

        notifications.hideLoader();
        notifications.showInfo('Event edited successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function deleteEvent() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        notifications.showLoader();
        const deletedTime = await data.deleteEvent(this.params.id);

        notifications.hideLoader();
        notifications.showInfo('Event closed successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function joinEvent() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        notifications.showLoader();
        const event = await data.joinEvent(this.params.id);

        notifications.hideLoader();
        notifications.showInfo(`You joined this event!`);
        this.redirect('#/event/details/' + `${this.params.id}`);
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}