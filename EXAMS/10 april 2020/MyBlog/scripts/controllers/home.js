import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export default async function () {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        post: (await this.load('../../templates/post/post.hbs'))
    };

    const renderData = {};
    const token = localStorage.getItem('userToken');

    if (token) {
        try {
            renderData.posts = (await data.getAllPostsByUserId(token, localStorage.getItem('userId')));
            if (renderData.posts.code) {
                throw renderData.posts;
            }
        } catch (error) {
            notifications.hideLoader();
            notifications.showError(error.message);
        }
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/home.hbs', renderData);

    notifications.hideLoader();
}