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
        donors: causeFromDB.donors.map(d => d.email),
        objectId: causeFromDB.objectId,
        isCreator: causeFromDB.ownerId === this.app.userData.userId ? true : false
    };

    Object.assign(cause, this.app.userData);

    this.partial('../../templates/cause/details.hbs', cause);
}

export async function Donate() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (isNaN(this.params.currentDonation) || Number(this.params.currentDonation) <= 0) {
        return;
    }

    if (Number(this.params.current) >= Number(this.params.needed)) {
        notifications.showInfo(`You collected the money for this cause!`);
        document.querySelector('form').reset();
        return;
    }

    const donor = {
        email: this.app.userData.email,
        donation: Number(this.params.currentDonation)
    };

    try {
        notifications.showLoader();
        const updatedCause = await data.editCause(token, this.params.id, donor);
        if (updatedCause.code) {
            throw updatedCause;
        }
        notifications.hideLoader();
        notifications.showInfo(`You donated ${donor.donation.toFixed(2)} for this cause!`);
        this.redirect('#/cause/details/' + `${this.params.id}`);
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

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