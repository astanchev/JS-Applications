import home from './controllers/home.js';
import dashboard from './controllers/dashboard.js';
import * as users from './controllers/users.js';
import * as cause from './controllers/cause.js';
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

        this.get('#/dashboard', dashboard);

        this.get('#/register', users.registerGet);
        this.post('#/register', (ctx) => {
            users.registerPost.call(ctx);
        });

        this.get('#/login', users.loginGet);
        this.post('#/login', (ctx) => {
            users.loginPost.call(ctx);
        });

        this.get('#/logout', users.logout);

        this.get('#/cause/create', cause.createGet);
        this.post('#/cause/create', (ctx) => {
            cause.createPost.call(ctx);
        });

        // this.post('#/cause/donate/:id', (ctx) => {
        //     cause.Donate.call(ctx);
        // });

        this.get('#/cause/details/:id', cause.details);
        // this.get('#/cause/delete/:id', cause.deleteIdea);
    });

    app.run('/');
});