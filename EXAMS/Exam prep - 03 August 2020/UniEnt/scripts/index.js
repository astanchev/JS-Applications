import home from './controllers/home.js';
import * as users from './controllers/users.js';
import * as event from './controllers/event.js';
import * as notifications from './helpers/notifications.js';

window.addEventListener('load', () => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

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
        this.get('#/profile', users.profile);

        // this.get('#/event/create', event.createGet);
        // this.post('#/event/create', (ctx) => {
        //     event.createPost.call(ctx);
        // });

        // this.get('#/event/edit/:id', event.editGet);
        // this.post('#/event/edit/:id', (ctx) => {
        //     trek.editPost.call(ctx);
        // });

        // this.get('#/event/details/:id', event.details);
        // this.get('#/event/delete/:id', event.deleteIdea);
    });

    app.run('/');
});