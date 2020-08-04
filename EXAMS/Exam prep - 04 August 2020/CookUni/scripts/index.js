import home from './controllers/home.js';
import * as users from './controllers/users.js';
import * as recipe from './controllers/recipe.js';

window.addEventListener('load', () => {
    const app = Sammy('#rooter', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.username || '',
            userId: localStorage.userId || '',
            names: localStorage.names || ''
        };

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/register', users.registerGet);
        this.post('#/register', (ctx) => {
            users.registerPost.call(ctx);
        });

        this.get('#/login', users.loginGet);
        this.post('#/login', (ctx) => {
            users.loginPost.call(ctx);
        });

        this.get('#/logout', users.logout);

        this.get('#/recipe/create', recipe.createGet);
        this.post('#/recipe/create', (ctx) => {
            recipe.createPost.call(ctx);
        });

        // this.get('#/recipe/edit/:id', recipe.editGet);
        // this.post('#/recipe/edit/:id', (ctx) => {
        //     recipe.editPost.call(ctx);
        // });

        this.get('#/recipe/details/:id', recipe.details);
        // this.get('#/recipe/delete/:id', recipe.deleteRecipe);
        // this.get('#/recipe/like/:id', recipe.likeRecipe);
    });

    app.run('/');
});