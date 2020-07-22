import home from './controllers/home.js';
import * as users from './controllers/users.js';
import * as movie from './controllers/movie.js';
import * as catalog from './controllers/catalog.js';
import * as notifications from './helpers/notifications.js';

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.before('/', notifications.showLoader);
        this.before('index.html', notifications.showLoader);
        this.before('#/home', notifications.showLoader);

        this.userData = {
            username: localStorage.username || '',
            userId: localStorage.userId || ''
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

        this.get('#/movie/create', movie.createGet);
        this.post('#/movie/create', (ctx) => {
            movie.createPost.call(ctx);
        });

        this.get('#/catalog/all_movies', catalog.getAllMovies);
        this.get('#/catalog/search', catalog.getAllMovies);
        this.get('#/catalog/my_movies', catalog.getMyMovies);


        this.get('#/movie/details/:id', movie.getDetails);
        this.get('#/movie/buy/:id', movie.buyTicket);

    });

    app.run('/');
});