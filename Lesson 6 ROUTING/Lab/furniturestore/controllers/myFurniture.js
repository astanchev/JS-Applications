import * as data from '../repository/data.js';

export default async function(){
    let furniture = [];

    try {
        furniture = await data.getMyFurniture();
    } catch (error) {
        alert(error);
        return;
    }

    this.partial('./templates/mineFurniture.hbs', {furniture});
}