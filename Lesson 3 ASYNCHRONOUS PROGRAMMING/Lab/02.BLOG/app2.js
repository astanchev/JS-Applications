const baseURL = 'https://blog-apps-c12bf.firebaseio.com/';

const select = document.querySelector('#posts');
const option = document.createElement('option');

const btnLoad = document.getElementById('btnLoadPosts');
const btnView = document.getElementById('btnViewPost');

const postTitle = document.querySelector('#post-title');
const postBody = document.querySelector('#post-body');

const postComments = document.querySelector('#post-comments');
const li = document.createElement('li');

async function loadPosts() {
    select.textContent = '';
    const posts = await getPosts();

    Object.entries(posts).forEach(([id, info]) => {
        const optionClone = option.cloneNode();
        optionClone.value = id;
        optionClone.textContent = info.title;
        select.appendChild(optionClone);
    });
}

async function viewPost() {
    const postId = select.options[select.selectedIndex].value;
    const [post, comments] = await Promise.all([getPost(postId), getComments()]);

    postTitle.textContent = post.title;
    postBody.textContent = post.body;
    postComments.textContent = '';

    Object.entries(comments)
        .filter(([id, info]) => {
            return info.postId === post.id;
        })
        .forEach(([id, info]) => {
            const liClone = li.cloneNode();
            liClone.textContent = info.text;
            postComments.appendChild(liClone);
        });
}

function getPosts() {
    return fetch(baseURL + 'posts.json').then((res) => res.json());
}

function getPost(postId) {
    return fetch(`${baseURL}posts/${postId}.json`).then((res) => res.json());
}

function getComments() {
    return fetch(`${baseURL}comments.json`).then((res) => res.json());
}

function attachEvents() {
    btnLoad.addEventListener('click', loadPosts);
    btnView.addEventListener('click', viewPost);
}

attachEvents();