import * as home from './controllers/home.js';
import * as users from './controllers/users.js';
import * as idea from './controllers/idea.js';
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

        this.get('index.html', home.showIndex);
        this.get('#/home', home.showIndex);
        this.get('/', home.showIndex);

        this.get('#/dashboard', home.showDashboard);

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


        this.get('#/idea/create', idea.createGet);
        this.post('#/idea/create', (ctx) => {
            idea.createPost.call(ctx);
        });

        this.get('#/idea/edit/:id', idea.editGet);
        this.post('#/idea/edit/:id', (ctx) => {
            idea.editPost.call(ctx);
        });

        this.post('#/idea/comment/:id', (ctx) => {
            idea.comment.call(ctx);
        });

        this.get('#/idea/details/:id', idea.details);
        this.get('#/idea/delete/:id', idea.deleteIdea);
        this.get('#/idea/like/:id', idea.like);


    });

    app.run('/');
});