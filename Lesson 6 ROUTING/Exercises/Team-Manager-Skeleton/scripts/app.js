import home from './controllers/home.js';
import about from './controllers/about.js';
import * as catalog from './controllers/catalog.js';
import * as team from './controllers/team.js';
import * as users from './controllers/users.js';

window.addEventListener('load', () => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: undefined,
            userId: undefined,
            teamId: undefined,
            loggedIn: false,
            hasTeam: false
        };

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/about', about);

        this.get('#/register', users.registerGet);
        this.post('#/register', (ctx) => { users.registerPost.call(ctx); });

        this.get('#/login', users.loginGet);
        this.post('#/login', (ctx) => { users.loginPost.call(ctx); });

        this.get('#/logout', users.logout);

        this.get('#/catalog', catalog.teamCatalog);
        this.get('#/catalog/:id', catalog.teamDetails);

        this.get('#/create', catalog.createTeam);
        //this.post('#/create', () => false);

        this.get('#/edit/:id', team.editTeam);
        //this.post('#/edit/:id', () => false );

        this.get('#/join/:id', team.joinTeam);
        this.get('#/leave', team.leaveTeam);
    });

    app.run('/');
});