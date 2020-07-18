import * as data from '../repository/data.js';

export default async function () {
    let furniture = [];

    try {
        furniture = await data.getAllFurniture();
    } catch (error) {
        alert(error);
        return;
    }

    this.partial('./templates/allFurniture.hbs', {furniture});
}