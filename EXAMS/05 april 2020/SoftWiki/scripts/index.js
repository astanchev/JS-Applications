import home from './controllers/home.js';
import * as users from './controllers/users.js';
import * as article from './controllers/article.js';
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

        this.get('#/login', home);
        this.post('#/login', (ctx) => {
            users.loginPost.call(ctx);
        });

        this.get('#/register', users.registerGet);
        this.post('#/register', (ctx) => {
            users.registerPost.call(ctx);
        });

        this.get('#/logout', users.logout);


        this.get('#/article/create', article.createGet);
        this.get('#/article/details/:id', article.details);
        // this.get('#/article/delete/:id', article.deleteArticle);
        // this.get('#/article/edit/:id', article.editGet);

        this.post('#/article/create', (ctx) => {
            article.createPost.call(ctx);
        });
        // this.post('#/article/edit/:id', (ctx) => {
        //     article.editPost.call(ctx);
        // });
    });

    app.run('/');
});