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

    this.partial('../../templates/idea/create.hbs', this.app.userData);
}

export async function createPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (this.params.title < 3) {
        notifications.showError('Idea title should be at least 3 symbols');
        return;
    }

    if (this.params.image.length < 0 || (!this.params.image.startsWith(`http://`) && !this.params.image.startsWith(`https://`))) {
        notifications.showError('Idea image should starts with "http://" or "https://"');
        return;
    }

    if (this.params.description.length < 10) {
        notifications.showError('Idea description should be at least 10 symbols');
        return;
    }

    const idea = {
        title: this.params.title,
        description: this.params.description,
        image: this.params.image,
        creator: this.app.userData.email,
        likes: 0,
    };

    const form = document.querySelector('form');

    try {
        notifications.showLoader();
        const createdIdea = await data.createIdea(token, idea);
        if (createdIdea.code) {
            throw createdIdea;
        }
        form.reset();
        notifications.hideLoader();
        notifications.showInfo('Idea created successfully!');
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

    let idea = {};

    try {
        notifications.showLoader();
        idea = await data.getIdeaById(token, this.params.id);
        if (idea.code) {
            throw idea;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    let isCreator = idea.ownerId === this.app.userData.userId ? true : false;

    Object.assign(idea, this.app.userData, {isCreator});

    this.partial('../../templates/idea/details.hbs', idea);
}

export async function editGet() {
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

    let idea = {};

    try {
        notifications.showLoader();
        idea = await data.getIdeaById(token, this.params.id);
        if (idea.code) {
            throw idea;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(idea, this.app.userData);

    this.partial('../../templates/idea/edit.hbs', idea);
}

export async function editPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (this.params.title.length < 3) {
        notifications.showError('Idea title should be at least 3 symbols');
        return;
    }

    if (this.params.image.length === 0 || (!this.params.image.startsWith(`http://`) && !this.params.image.startsWith(`https://`))) {
        notifications.showError('Idea image should starts with "http://" or "https://"');
        return;
    }

    if (this.params.description.length < 10) {
        notifications.showError('Idea description should be at least 10 symbols');
        return;
    }

    const idea = {
        title: this.params.title,
        description: this.params.description,
        image: this.params.image
    };

    try {
        notifications.showLoader();
        const updatedIdea = await data.editIdea(token, this.params.id, idea);
        if (updatedIdea.code) {
            throw updatedIdea;
        }
        notifications.hideLoader();
        notifications.showInfo('Idea updated successfully!');
        this.redirect('#/dashboard');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function deleteIdea() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        notifications.showLoader();
        const deletedTime = await data.deleteIdea(token, this.params.id);
        if (deletedTime.code) {
            throw deletedTime;
        }
        notifications.hideLoader();
        notifications.showInfo('Idea removed successfully!');
        this.redirect('#/dashboard');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function like() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        notifications.showLoader();
        const idea = await data.likeIdea(token, this.params.id);
        if (idea.code) {
            throw idea;
        }
        notifications.hideLoader();
        notifications.showInfo(`You liked this idea!`);
        this.redirect('#/idea/details/' + `${this.params.id}`);
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function comment() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (this.params.newComment.trim() === '') {
        return;
    }


    const comment = {
        user: this.app.userData.email,
        text: this.params.newComment
    };

    try {
        notifications.showLoader();
        const numberComments = await data.addComment(token, this.params.id, comment);
        if (numberComments.code) {
            throw numberComments;
        }
        notifications.hideLoader();
        notifications.showInfo('You commented successfully!');
        this.redirect('#/idea/details/' + `${this.params.id}`);
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}