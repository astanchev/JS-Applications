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