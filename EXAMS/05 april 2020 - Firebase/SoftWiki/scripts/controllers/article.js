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
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    const renderData = {};
    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/article/create.hbs', renderData);
}

export async function createPost() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (!this.params.title || !this.params.category || !this.params.content) {
        notifications.showError('All fields are required!');
        return;
    }

    const allowedCategories = ['javascript', 'java', 'pyton', 'c#'];

    if (allowedCategories.every(c => c !== this.params.category.toLowerCase())) {
        notifications.showError('Category should be one of: JavaScript, Java, Pyton or C#!');
        return;
    }

    const article = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content,
        creatorEmail: this.app.userData.email
    };

    try {
        notifications.showLoader();
        const createdArticle = await data.createArticle(article);

        notifications.hideLoader();
        notifications.showInfo('Article created successfully!');
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
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    let article = {};

    try {
        notifications.showLoader();
        const articleDB = (await data.getArticleById(this.params.id));

        article = {
            objectId: articleDB.id,
            category: articleDB.data().category,
            title: articleDB.data().title,
            content: articleDB.data().content,
            creatorEmail: articleDB.data().creatorEmail,
        };

        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    if (article.creatorEmail === this.app.userData.email) {
        article.isCreator = true;
    } else {
        article.isCreator = false;
    }

    Object.assign(article, this.app.userData);

    this.partial('../../templates/article/details.hbs', article);
}

export async function deleteArticle() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        notifications.showLoader();
        await data.deleteArticle(this.params.id);

        notifications.hideLoader();
        notifications.showInfo('Article deleted successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
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
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    let article = {};

    try {
        const articleDB = (await data.getArticleById(this.params.id));

        article = {
            objectId: articleDB.id,
            category: articleDB.data().category,
            title: articleDB.data().title,
            content: articleDB.data().content,
            creatorEmail: articleDB.data().creatorEmail,
        };

        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(article, this.app.userData);

    this.partial('../../templates/article/edit.hbs', article);
}

export async function editPost() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (!this.params.title || !this.params.category || !this.params.content) {
        notifications.showError('All fields are required!');
        return;
    }

    const allowedCategories = ['javascript', 'java', 'pyton', 'c#'];

    if (allowedCategories.every(c => c !== this.params.category.toLowerCase())) {
        notifications.showError('Category should be one of: JavaScript, Java, Pyton or C#!');
        return;
    }

    const article = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content
    };

    try {
        notifications.showLoader();
        const editedArticle = await data.editArticle(this.params.id, article);

        notifications.hideLoader();
        notifications.showInfo('Article edited successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}