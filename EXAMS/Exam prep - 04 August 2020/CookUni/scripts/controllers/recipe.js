import * as data from '../repository/data.js';
import * as notifications from '../helpers/notifications.js';

const categories = {
    'Vegetables and legumes/beans': 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg',
    'Fruits': 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg',
    'Grain Food': 'https://snackymatz.com/wp-content/uploads/2017/03/corn-syrup-563796__340-300x200.jpg',
    'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
    'Lean meats and poultry, fish and alternatives': 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg'
};

export async function createGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs')),
        notifications: (await this.load('../../templates/common/notifications.hbs'))
    };

    this.partial('../../templates/recipe/create.hbs', this.app.userData);
}

export async function createPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    const errors = [];

    if (this.params.meal.length < 4) {
        errors.push('Meal name should be at least 4 symbols');
    }

    if (this.params.ingredients.length === 0 || this.params.ingredients.split(' ').length < 2) {
        errors.push('Should be at least 2 ingredients');
    }

    if (this.params.prepMethod.length < 10) {
        errors.push('Event description should be at least 10 symbols');
    }

    if (this.params.description.length < 10) {
        errors.push('Event description should be at least 10 symbols');
    }

    if (this.params.foodImageURL.length === 0 || (!(this.params.foodImageURL.startsWith(`http://`)) && !(this.params.foodImageURL.startsWith(`https://`)))) {
        errors.push('Food image url should starts with "http://" or "https://"');
    }

    if (!Object.keys(categories).includes(this.params.category)) {
        errors.push('Category should be selected');
    }

    if (errors.length > 0) {
        notifications.showError(errors.join('\r\n'));
        return;
    }

    const recipe = {
        meal: this.params.meal,
        category: this.params.category,
        ingredients: this.params.ingredients,
        method: this.params.prepMethod,
        description: this.params.description,
        image: this.params.foodImageURL,
        categoryImageURL: categories[this.params.category],
        likes: 0
    };


    try {
        notifications.showLoader();
        const createdRecipe = await data.createRecipe(token, recipe);
        if (createdRecipe.code) {
            throw createdRecipe;
        }
        document.querySelector('form').reset();
        notifications.hideLoader();
        notifications.showInfo('Recipe shared successfully!');
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
//         header: (await this.load('../../templates/common/header.hbs')),
//         footer: (await this.load('../../templates/common/footer.hbs')),
//         notifications: (await this.load('../../templates/common/notifications.hbs'))
//     };

//     let event = {};

//     try {
//         event = await data.getEventById(token, this.params.id);
//         if (event.code) {
//             throw event;
//         }
//     } catch (error) {
//         alert(error.message);
//     }

//     let isCreator = event.ownerId === this.app.userData.userId ? true : false;

//     Object.assign(event, this.app.userData, {isCreator});

//     this.partial('../../templates/event/details.hbs', event);
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
//         footer: (await this.load('../../templates/common/footer.hbs')),
//         notifications: (await this.load('../../templates/common/notifications.hbs'))
//     };

//     let event = {};

//     try {
//         event = await data.getEventById(token, this.params.id);
//         if (event.code) {
//             throw event;
//         }
//     } catch (error) {
//         alert(error.message);
//     }

//     Object.assign(event, this.app.userData);

//     this.partial('../../templates/event/edit.hbs', event);
// }

// export async function editPost() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     const errors = [];

//     if (this.params.name.length < 6) {
//         errors.push('Event name should be at least 6 symbols');
//     }

//     if (this.params.dateTime.length === 0 || !(/^[0-3][0-9] [a-zA-Z]+( - [0-1][0-9] [aA|pP][mM])*$/g).test(this.params.dateTime)) {
//         errors.push('Event date should be valid in format "dd mmmm" or "dd mmmm - HH AM or PM"!');
//     }

//     if (this.params.description.length < 10) {
//         errors.push('Event description should be at least 10 symbols');
//     }

//     if (this.params.imageURL.length === 0 || (!(this.params.imageURL.startsWith(`http://`)) && !(this.params.imageURL.startsWith(`https://`)))) {
//         errors.push('Event image should starts with "http://" or "https://"');
//     }

//     if (errors.length > 0) {
//         document.querySelector('form').reset();
//         notifications.showError(errors.join(' '));
//         return;
//     }

//     const event = {
//         name: this.params.name,
//         dateTime: this.params.dateTime,
//         description: this.params.description,
//         image: this.params.imageURL
//     };

//     try {
//         notifications.showLoader();
//         const updatedEvent = await data.editEvent(token, this.params.id, event);
//         if (updatedEvent.code) {
//             throw updatedEvent;
//         }
//         notifications.hideLoader();
//         notifications.showInfo('Event edited successfully!');
//         this.redirect('#/home');
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }

// export async function deleteEvent() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     try {
//         notifications.showLoader();
//         const deletedTime = await data.deleteEvent(token, this.params.id);
//         if (deletedTime.code) {
//             throw deletedTime;
//         }
//         notifications.hideLoader();
//         notifications.showInfo('Event closed successfully!');
//         this.redirect('#/home');
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }

// export async function joinEvent() {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//         notifications.showError('User is not logged in');
//         this.redirect('#/home');
//         return;
//     }

//     try {
//         notifications.showLoader();
//         const event = await data.joinEvent(token, this.params.id);
//         if (event.code) {
//             throw event;
//         }
//         notifications.hideLoader();
//         notifications.showInfo(`You joined this event!`);
//         this.redirect('#/event/details/' + `${this.params.id}`);
//     } catch (error) {
//         notifications.hideLoader();
//         notifications.showError(error.message);
//     }
// }