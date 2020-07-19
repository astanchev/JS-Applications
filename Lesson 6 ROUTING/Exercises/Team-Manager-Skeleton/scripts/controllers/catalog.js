export async function teamCatalog() {
    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        team: (await this.load('./../../templates/catalog/team.hbs'))
    };

    const data = Object.assign({}, this.app.userData);
    data.teams = [{
            objectId: 123,
            name: 'Cherry',
            comment: 'First team!'
        },
        {
            objectId: 456,
            name: 'Apple',
            comment: 'Second team!'
        },
        {
            objectId: 789,
            name: 'Peach',
            comment: 'Third team!'
        },
    ];

    this.partial('./../../templates/catalog/teamCatalog.hbs', data);
}

export async function teamDetails() {
    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        teamMember: (await this.load('./../../templates/catalog/teamMember.hbs')),
        teamControls: (await this.load('./../../templates/catalog/teamControls.hbs'))
    };

    const data = {
        objectId: 123,
        name: 'Cherry',
        comment: 'First team!',
        members: [
            { username: 'Peter' },
            { username: 'George' },
            { username: 'Marry' }
        ],
        isAuthor: true,
        isOnTeam: true
    };

    Object.assign(data, this.app.userData);

    this.partial('./../../templates/catalog/details.hbs', data);
}

export async function createTeam() {
    this.partials = {
        header: (await this.load('./../../templates/common/header.hbs')),
        footer: (await this.load('./../../templates/common/footer.hbs')),
        createForm: (await this.load('./../../templates/create/createForm.hbs'))
    };

    this.partial('./../../templates/create/createPage.hbs', this.app.userData);
}