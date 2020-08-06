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
    const userId = localStorage.getItem('userId');

    if (userId) {
        try {
            const jsArticles = (await data.getArticleByCategory('JavaScript'));
            renderData.javaScriptArticles = [];
            jsArticles.forEach((a => {
                renderData.javaScriptArticles.push({
                    title: a.data().title,
                    content: a.data().content,
                    objectId: a.id
                });
            }));
            const javaArticles = (await data.getArticleByCategory('Java'));
            renderData.javaArticles = [];
            javaArticles.forEach((a => {
                renderData.javaArticles.push({
                    title: a.data().title,
                    content: a.data().content,
                    objectId: a.id
                });
            }));
            const pytonArticles = (await data.getArticleByCategory('Pyton'));
            renderData.pytonArticles = [];
            pytonArticles.forEach((a => {
                renderData.pytonArticles.push({
                    title: a.data().title,
                    content: a.data().content,
                    objectId: a.id
                });
            }));
            const cSharpArticles = (await data.getArticleByCategory('C#'));
            renderData.cSharpArticles = [];
            cSharpArticles.forEach((a => {
                renderData.cSharpArticles.push({
                    title: a.data().title,
                    content: a.data().content,
                    objectId: a.id
                });
            }));
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