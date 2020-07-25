import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export async function create() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (!this.params.title || !this.params.category || !this.params.content) {
        notifications.showError('All fields are required!');
        return;
    }

    const post = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content
    };

    const form = document.querySelector('section.background-container > form');

    try {
        notifications.showLoader();
        const createdPost = await data.createPost(token, post);
        if (createdPost.code) {
            throw createdPost;
        }
        form.reset();
        notifications.hideLoader();
        notifications.showInfo('Post created successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

export async function details(){
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs'))
    };

    let post = {};

    try {
        notifications.showLoader();
        post = await data.getPostById(token, this.params.id);
        if (post.code) {
            throw post;
        }
        notifications.hideLoader();
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }

    Object.assign(post, this.app.userData);

    this.partial('../../templates/post/details.hbs', post);
}