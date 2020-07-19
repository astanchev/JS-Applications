import * as notifications from '../notifications.js';
import * as data from '../repository/data.js';

export async function teamCatalog() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        team: (await this.load('./../../templates/catalog/team.hbs'))
    };

    const renderData = Object.assign({}, this.app.userData);
    renderData.teams = [];

    try {
        renderData.teams = await data.getAllTeams(token);
        if (renderData.teams.code) {
            throw renderData.teams;
        }
    } catch (error) {
        notifications.showError(error.message);
    }

    this.partial('./../../templates/catalog/teamCatalog.hbs', renderData);
}

export async function teamDetails() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        teamMember: (await this.load('./../../templates/catalog/teamMember.hbs')),
        teamControls: (await this.load('./../../templates/catalog/teamControls.hbs'))
    };

    let team = {};

    try {
        team = await data.getTeamById(this.params.id, token);
        if (team.code) {
            throw team;
        }
    } catch (error) {
        notifications.showError(error.message);
        this.redirect('#/catalog');
        return;
    }

    const renderData = {
        objectId: team.objectId,
        name: team.name,
        comment: team.comment,
        members: team.members.reduce((acc, curr) => {
            acc.push({username: curr.username});
            return acc;
        }, []),
        isAuthor: team.ownerId === localStorage.userId ? true : false,
        isOnTeam: team.members.some(m => m.objectId === localStorage.userId) ? true : false
    };

    Object.assign(renderData, this.app.userData);

    this.partial('./../../templates/catalog/details.hbs', renderData);
}

export async function createTeamGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        createForm: (await this.load('./../../templates/create/createForm.hbs'))
    };

    this.partial('./../../templates/create/createPage.hbs', this.app.userData);
}

export async function createTeamPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    if (this.app.userData.hasTeam) {
        notifications.showError('You have a team and can\'t create one!');
        this.redirect('#/catalog');
        return;
    }

    if (this.params.name === '') {
        notifications.showError('Team name is required');
        return;
    }

    const team = {
        name: this.params.name,
        comment: this.params.comment
    };

    try {
        const createdTeam = await data.createTeam(team, token);
        if (createdTeam.code) {
            throw createdTeam;
        }
        this.app.userData.hasTeam = true;
        notifications.showInfo('Team created!');
        this.redirect('#/catalog');
    } catch (error) {
        notifications.showError(error.message);
    }
}