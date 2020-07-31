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

    this.partial('../../templates/trek/create.hbs', this.app.userData);
}

export async function createPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (this.params.location.length < 6) {
        notifications.showError('Trek name should be at least 6 symbols');
        return;
    }

    if (this.params.dateTime.length === 0 || !(/^[0-3][0-9](\.|\/)[0-1][0-9](\.|\/)20[1-5][0-9]$/g).test(this.params.dateTime)) {
        notifications.showError('Trek date should be valid in format dd.mm.yyyy or dd/mm/yyyy! and between 2010 and 2059');
        return;
    }

    if (this.params.description.length < 10) {
        notifications.showError('Trek description should be at least 10 symbols');
        return;
    }

    if (this.params.image.length === 0 || (!this.params.image.startsWith(`http://`) && !this.params.image.startsWith(`https://`))) {
        notifications.showError('Trek image should starts with "http://" or "https://"');
        return;
    }


    const trek = {
        name: this.params.location,
        dateTime: this.params.dateTime,
        description: this.params.description,
        image: this.params.image,
        organizer: this.app.userData.email,
        likes: 0,
    };

    const form = document.querySelector('form');

    try {
        notifications.showLoader();
        const createdTrek = await data.createTrek(token, trek);
        if (createdTrek.code) {
            throw createdTrek;
        }
        form.reset();
        notifications.hideLoader();
        notifications.showInfo('Trek created successfully!');
        this.redirect('#/home');
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

    let trek = {};

    try {
        notifications.showLoader();
        trek = await data.getTrekById(token, this.params.id);
        if (trek.code) {
            throw trek;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    let isCreator = trek.ownerId === this.app.userData.userId ? true : false;

    Object.assign(trek, this.app.userData, {isCreator});

    this.partial('../../templates/trek/details.hbs', trek);
}

// export async function editGet() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     this.partials = {
//         header: (await this.load('../../templates/common/header.hbs')),
//         footer: (await this.load('../../templates/common/footer.hbs'))
//     };

//     let idea = {};

//     try {
//         notifications.showLoader();
//         idea = await data.getIdeaById(token, this.params.id);
//         if (idea.code) {
//             throw idea;
//         }
//         notifications.hideLoader();
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }

//     Object.assign(idea, this.app.userData);

//     this.partial('../../templates/idea/edit.hbs', idea);
// }

// export async function editPost() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     if (this.params.title.length < 3) {
//         notifications.showError('Idea title should be at least 3 symbols');
//         return;
//     }

//     if (this.params.image.length === 0 || (!this.params.image.startsWith(`http://`) && !this.params.image.startsWith(`https://`))) {
//         notifications.showError('Idea image should starts with "http://" or "https://"');
//         return;
//     }

//     if (this.params.description.length < 10) {
//         notifications.showError('Idea description should be at least 10 symbols');
//         return;
//     }

//     const idea = {
//         title: this.params.title,
//         description: this.params.description,
//         image: this.params.image
//     };

//     try {
//         notifications.showLoader();
//         const updatedIdea = await data.editIdea(token, this.params.id, idea);
//         if (updatedIdea.code) {
//             throw updatedIdea;
//         }
//         notifications.hideLoader();
//         notifications.showInfo('Idea updated successfully!');
//         this.redirect('#/dashboard');
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
//         const deletedTime = await data.deleteIdea(token, this.params.id);
//         if (deletedTime.code) {
//             throw deletedTime;
//         }
//         notifications.hideLoader();
//         notifications.showInfo('Idea removed successfully!');
//         this.redirect('#/dashboard');
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
//         const idea = await data.likeIdea(token, this.params.id);
//         if (idea.code) {
//             throw idea;
//         }
//         notifications.hideLoader();
//         notifications.showInfo(`You liked this idea!`);
//         this.redirect('#/idea/details/' + `${this.params.id}`);
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }