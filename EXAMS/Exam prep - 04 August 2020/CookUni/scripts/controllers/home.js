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
            const recipes = await data.getAllRecipes(token);
            if (recipes.code) {
                throw recipes;
            }

            renderData.recipes = [];
            recipes.forEach(r => renderData.recipes.push({
                meal: r.meal,
                category: r.category,
                ingredients: r.ingredients.split(', '),
                method: r.prepMethod,
                description: r.description,
                image: r.image,
                categoryImageURL: r.categoryImageURL,
                likes: r.likes,
                objectId: r.objectId
            }));
            renderData.recipes.sort((r1, r2) => r2.likes - r1.likes);
        } catch (error) {
            alert(error.message);
        }
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/home.hbs', renderData);

}