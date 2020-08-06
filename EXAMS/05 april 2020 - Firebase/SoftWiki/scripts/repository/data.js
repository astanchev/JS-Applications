// const url = `https://api.backendless.com/17084FAB-8F1D-5FD5-FF44-C5F0788E3100/E764E0B5-4CA3-44D1-939A-F82A4D01FE3F/`;

// const endpoints = {
//     register: 'users/register',
//     login: 'users/login',
//     logout: 'users/logout',
//     article: 'data/Article',
//     user: 'data/Users'
// };

export async function register(user) {
    return (await firebase.auth().createUserWithEmailAndPassword(user.email, user.password));
}

export async function login(user) {
    return (await firebase.auth().signInWithEmailAndPassword(user.email, user.password));
}

export async function logout() {
    return await firebase.auth().signOut();
}

export async function createArticle(article) {
    return (await firebase.firestore().collection('articles').add(article));
}

export async function getArticleById(articleId) {
    return (await firebase.firestore().collection('articles').doc(articleId).get());
}

export async function getArticleByCategory(category) {
    return await (await firebase.firestore().collection('articles').where('category', '==', category).get());
}

export async function getAllArticles() {
    return (await firebase.firestore().collection('articles').get());
}

export async function getAllArticlesByUserEmail(userEmail) {
    return await (await firebase.firestore().collection('articles').where('creatorEmail', '==', userEmail).get());
}

export async function editArticle(articleId, article) {
    return (await firebase.firestore().collection('articles').doc(articleId).update(article));
}

export async function deleteArticle(articleId) {
    return (await firebase.firestore().collection('articles').doc(articleId).delete());
}