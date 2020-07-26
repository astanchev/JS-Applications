import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

export default async function () {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        article: (await this.load('../../templates/article/article.hbs')),
        noArticles: (await this.load('../../templates/article/noArticles.hbs')),
        login: (await this.load('../../templates/user/login.hbs'))
    };

    const renderData = {};
    const token = localStorage.getItem('userToken');

    if (token) {
        try {
            renderData.javaScriptArticles = (await data.getArticleByCategory(token, 'JavaScript'));
            if (renderData.javaScriptArticles.code) {
                throw renderData.javaScriptArticles;
            }
            renderData.javaArticles = (await data.getArticleByCategory(token, 'Java'));
            if (renderData.javaArticles.code) {
                throw renderData.javaArticles;
            }
            renderData.pytonArticles = (await data.getArticleByCategory(token, 'Pyton'));
            if (renderData.pytonArticles.code) {
                throw renderData.pytonArticles;
            }
            renderData.cSharpArticles = (await data.getArticleByCategory(token, 'C#'));
            if (renderData.cSharpArticles.code) {
                throw renderData.cSharpArticles;
            }
        } catch (error) {
            notifications.hideLoader();
            notifications.showError(error.message);
            return;
        }
    }

    for (const key in renderData) {
        if (renderData.hasOwnProperty(key)) {
            renderData[key].sort((a1, a2) => (a2.title).localeCompare(a1.title));
        }
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/home.hbs', renderData);

    notifications.hideLoader();
}