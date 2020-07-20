import * as notifications from '../notifications.js';
import * as data from '../repository/data.js';

export async function joinTeam() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    try {
        const updatedUser = await data.joinTeam(this.params.id, localStorage.userId, token);
        if (updatedUser.code) {
            throw editedTeam;
        }
        notifications.showInfo('You\'ve joined the team!');
        this.redirect('#/catalog');
    } catch (error) {
        notifications.showError(error.message);
    }
}

export async function editTeamGet() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    let team = {};

    try {
        team = await data.getTeamById(this.params.id, token);
        if (team.code) {
            throw team;
        }
    } catch (error) {
        notifications.showError(error.message);
        return;
    }

    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        editForm: (await this.load('./../../templates/edit/editForm.hbs'))
    };

    Object.assign(team, this.app.userData);

    this.partial('./../../templates/edit/editPage.hbs', team);
}

export async function editTeamPost() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
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
        const editedTeam = await data.editTeam(this.params.id, team, token);
        if (editedTeam.code) {
            throw editedTeam;
        }
        notifications.showInfo('Team edited!');
        this.redirect('#/catalog');
    } catch (error) {
        notifications.showError(error.message);
    }
}

export async function leaveTeam() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        notifications.showError('User is not logged in');
        this.redirect('#/home');
        return;
    }

    
}