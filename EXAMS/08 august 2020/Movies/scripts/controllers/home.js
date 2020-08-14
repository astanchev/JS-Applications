import * as data from '../repository/data.js';

export default async function () {
    this.partials = {
        header: (await this.load('../../templates/common/header.hbs')),
        footer: (await this.load('../../templates/common/footer.hbs'))
    };

    const renderData = {};
    const search = this.params.search || '';
    const token = localStorage.getItem('userToken');
    if (token) {
        try {
            renderData.movies = await data.getAllMovies(token, search);
            if (renderData.movies.code) {
                throw renderData.movies;
            }
        } catch (error) {
            alert(error.message);
        }
    }

    Object.assign(renderData, this.app.userData);

    this.partial('../../templates/home/home.hbs', renderData);
}