import home from './controllers/home.js';
import * as users from './controllers/users.js';
import * as post from './controllers/post.js';
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


        this.get('#/post/details/:id', post.details);
        this.get('#/post/delete/:id', post.deletePost);
        this.get('#/post/edit/:id', post.editGet);

        this.post('#/post/create', (ctx) => {
            post.createPost.call(ctx);
        });
        this.post('#/post/edit/:id', (ctx) => {
            post.editPost.call(ctx);
        });
    });

    app.run('/');
});