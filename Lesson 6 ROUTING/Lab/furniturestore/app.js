import home from './controllers/home.js';
import createFurniture from './controllers/createFurniture.js';
import myFurniture from './controllers/myFurniture.js';
import * as manageFurniture from './controllers/furniture.js';
const loader = document.getElementById('loadingBox');


function toggleLoader(isLoading) {
    if (isLoading) {
        loader.style.display = 'inline-block';
    } else {
        loader.style.display = 'none';
    }
}

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.before({}, function () {
            toggleLoader(true);
        });

        this.after({}, function () {
            toggleLoader(false);
        });

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);
        this.get('#/furniture/all', home);

        this.get('#/furniture/create', createFurniture);
        this.post('#/furniture/create', () => false);

        this.get('#/furniture/mine', myFurniture);

        this.get('#/furniture/details/:id', manageFurniture.furnitureDetails);
        this.get('#/furniture/all/:id', manageFurniture.likeFurniture);
        this.get('#/furniture/mine/:id', manageFurniture.deleteFurniture);

        this.get('#/furniture/mine', myFurniture);
    });

    app.run('/');
});