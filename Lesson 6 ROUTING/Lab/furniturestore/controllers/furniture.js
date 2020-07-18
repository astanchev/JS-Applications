import * as data from '../repository/data.js';

export async function furnitureDetails() {
    const currentFurniture = await data.getById(this.params.id);

    this.partial('./templates/furnitureDetails.hbs', currentFurniture);
}

export async function likeFurniture() {
    const likedFurniture = await data.likeFurniture(this.params.id, true);

    this.redirect('#/furniture/all');
}

export async function deleteFurniture() {
    const disLikedFurniture = await data.likeFurniture(this.params.id, false);

    this.redirect('#/furniture/mine');
}