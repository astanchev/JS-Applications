import home from './controllers/home.js';
import * as users from './controllers/users.js';
import * as trek from './controllers/trek.js';
import * as notifications from './helpers/notifications.js';

window.addEventListener('load', () => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        this.before('/', notifications.showLoader);
        this.before('index.html', notifications.showLoader);
        this.before('#/home', notifications.showLoader);

        this.userData = {
            email: localStorage.email || '',
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
        this.get('#/profile', users.profile);

        this.get('#/trek/create', trek.createGet);
        this.post('#/trek/create', (ctx) => {
            trek.createPost.call(ctx);
        });

        this.get('#/trek/edit/:id', trek.editGet);
        this.post('#/trek/edit/:id', (ctx) => {
            trek.editPost.call(ctx);
        });

        this.get('#/trek/details/:id', trek.details);
        this.get('#/trek/delete/:id', trek.deleteIdea);
        this.get('#/trek/like/:id', trek.like);
    });

    app.run('/');
});