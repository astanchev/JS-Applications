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

    const renderData = {};
    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/article/create.hbs', renderData);
}

export async function createArticle() {
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

    const article = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content,
        creatorEmail: this.app.userData.email
    };

    try {
        notifications.showLoader();
        const createdArticle = await data.createArticle(token, article);
        if (createdArticle.code) {
            throw createdArticle;
        }
        notifications.hideLoader();
        notifications.showInfo('Article created successfully!');
        this.redirect('#/home');
    } catch (error) {
        notifications.hideLoader();
        notifications.showError(error.message);
    }
}

// export async function details() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     this.partials = {
//         header: (await this.load('../../templates/common/header.hbs'))
//     };

//     let post = {};

//     try {
//         notifications.showLoader();
//         post = await data.getPostById(token, this.params.id);
//         if (post.code) {
//             throw post;
//         }
//         notifications.hideLoader();
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }

//     Object.assign(post, this.app.userData);

//     this.partial('../../templates/post/details.hbs', post);
// }

// export async function deletePost() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     try {
//         notifications.showLoader();
//         const deleteTime = await data.deletePost(token, this.params.id);
//         if (deleteTime.code) {
//             throw deleteTime;
//         }
//         notifications.hideLoader();
//         notifications.showInfo('Post deleted successfully!');
//         this.redirect('#/home');
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }

// export async function editGet() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     this.partials = {
//         header: (await this.load('../../templates/common/header.hbs')),
//         post: (await this.load('../../templates/post/post.hbs'))
//     };

//     const renderData = {};

//     try {
//         notifications.showLoader();
//         renderData.posts = (await data.getAllPostsByUserId(token, localStorage.getItem('userId')));
//         if (renderData.posts.code) {
//             throw renderData.posts;
//         }
//         renderData.post = await data.getPostById(token, this.params.id);
//         if (renderData.post.code) {
//             throw post;
//         }
//         notifications.hideLoader();
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }

//     Object.assign(renderData, this.app.userData);

//     this.partial('../../templates/post/edit.hbs', renderData);
// }

// export async function editPost() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     if (!this.params.title || !this.params.category || !this.params.content) {
//         notifications.showError('All fields are required!');
//         return;
//     }

//     const post = {
//         title: this.params.title,
//         category: this.params.category,
//         content: this.params.content
//     };

//     try {
//         notifications.showLoader();
//         const editedPost = await data.editPost(token, this.params.id, post);
//         if (editedPost.code) {
//             throw editedPost;
//         }
//         notifications.hideLoader();
//         notifications.showInfo('Post edited successfully!');
//         this.redirect('#/home');
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }