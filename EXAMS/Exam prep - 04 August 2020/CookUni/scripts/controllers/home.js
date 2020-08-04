import * as data from '../repository/data.js';

export default async function () {
    this.partials = {
        notifications: (await this.load('../../templates/common/notifications.hbs')),
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        listRecipes: (await this.load('../../templates/home/listRecipes.hbs')),
        noRecipes: (await this.load('../../templates/home/noRecipes.hbs')),
    };

    const renderData = {};
    const token = localStorage.getItem('userToken');
    if (token) {
        try {
            renderData.recipes = await data.getAllRecipes(token);
            if (renderData.recipes.code) {
                throw renderData.recipes;
            }
            renderData.recipes.sort((r1, r2) => r2.likes - r1.likes);
        } catch (error) {
            alert(error.message);
        }
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/home.hbs', renderData);

}