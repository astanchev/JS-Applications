import home from './controllers/home.js';
import * as users from './controllers/users.js';
import * as movie from './controllers/movie.js';

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: localStorage.email || '',
            userId: localStorage.userId || ''
        };

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/movie/search', home);

        this.get('#/register', users.registerGet);
        this.post('#/register', (ctx) => {
            users.registerPost.call(ctx);
        });

        this.get('#/login', users.loginGet);
        this.post('#/login', (ctx) => {
            users.loginPost.call(ctx);
        });

        this.get('#/logout', users.logout);

        this.get('#/movie/create', movie.createGet);
        this.post('#/movie/create', (ctx) => {
            movie.createPost.call(ctx);
        });

        this.get('#/movie/edit/:id', movie.editGet);
        this.post('#/movie/edit/:id', (ctx) => {
            movie.editPost.call(ctx);
        });

        this.get('#/movie/details/:id', movie.details);
        this.get('#/movie/delete/:id', movie.deleteMovie);
        this.get('#/movie/like/:id', movie.like);
    });

    app.run('/');
});