import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function createGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    this.partial('../../templates/cause/create.hbs', this.app.userData);
}

export async function createPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (this.params.cause.length < 6) {
        notifications.showError('Cause name should be at least 6 symbols');
        return;
    }

    if (this.params.image.length === 0 || (!this.params.image.startsWith(`http://`) && !this.params.image.startsWith(`https://`))) {
        notifications.showError('Cause image should starts with "http://" or "https://"');
        return;
    }

    if (isNaN(this.params.neededFunds) || Number(this.params.neededFunds) <= 0) {
        notifications.showError('Cause needed funds should be bigger than 0');
        return;
    }

    if (this.params.description.length < 10) {
        notifications.showError('Cause description should be at least 10 symbols');
        return;
    }


    const cause = {
        name: this.params.cause,
        image: this.params.image,
        description: this.params.description,
        neededFunds: Number(this.params.neededFunds)
    };

    try {
        notifications.showLoader();
        const createdCause = await data.createCause(token, cause);
        if (createdCause.code) {
            throw createdCause;
        }
        notifications.hideLoader();
        notifications.showInfo('Cause created successfully!');
        this.redirect('#/dashboard');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function details() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    let causeFromDB = {};

    try {
        notifications.showLoader();
        causeFromDB = await data.getCauseById(token, this.params.id);
        if (causeFromDB.code) {
            throw causeFromDB;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    let cause = {
        name: causeFromDB.name,
        image: causeFromDB.image,
        description: causeFromDB.description,
        collectedFunds: Number(causeFromDB.collectedFunds).toFixed(2),
        neededFunds: Number(causeFromDB.neededFunds).toFixed(2),
        donors: causeFromDB.donors.map(d => d.name),
        objectId: causeFromDB.objectId,
        isCreator: causeFromDB.ownerId === this.app.userData.userId ? true : false
    };

    Object.assign(cause, this.app.userData);

    this.partial('../../templates/cause/details.hbs', cause);
}

// export async function Donate() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     if (this.params.location.length < 6) {
//         notifications.showError('Trek name should be at least 6 symbols');
//         return;
//     }

//     if (this.params.dateTime.length === 0 || !(/^[0-3][0-9](\.|\/)[0-1][0-9](\.|\/)20[1-5][0-9]$/g).test(this.params.dateTime)) {
//         notifications.showError('Trek date should be valid in format dd.mm.yyyy or dd/mm/yyyy! and between 2010 and 2059');
//         return;
//     }

//     if (this.params.description.length < 10) {
//         notifications.showError('Trek description should be at least 10 symbols');
//         return;
//     }

//     if (this.params.image.length === 0 || (!this.params.image.startsWith(`http://`) && !this.params.image.startsWith(`https://`))) {
//         notifications.showError('Trek image should starts with "http://" or "https://"');
//         return;
//     }

//     const trek = {
//         name: this.params.location,
//         dateTime: this.params.dateTime,
//         description: this.params.description,
//         image: this.params.image
//     };

//     try {
//         notifications.showLoader();
//         const updatedTrek = await data.editTrek(token, this.params.id, trek);
//         if (updatedTrek.code) {
//             throw updatedTrek;
//         }
//         notifications.hideLoader();
//         notifications.showInfo('Trek updated successfully!');
//         this.redirect('#/home');
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }

// export async function deleteIdea() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     try {
//         notifications.showLoader();
//         const deletedTime = await data.deleteTrek(token, this.params.id);
//         if (deletedTime.code) {
//             throw deletedTime;
//         }
//         notifications.hideLoader();
//         notifications.showInfo('Trek removed successfully!');
//         this.redirect('#/home');
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }

// export async function like() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     try {
//         notifications.showLoader();
//         const trek = await data.likeTrek(token, this.params.id);
//         if (trek.code) {
//             throw trek;
//         }
//         notifications.hideLoader();
//         notifications.showInfo(`You liked this trek!`);
//         this.redirect('#/trek/details/' + `${this.params.id}`);
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }