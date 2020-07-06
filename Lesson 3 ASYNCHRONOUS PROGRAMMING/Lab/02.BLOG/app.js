const btnLoad = document.getElementById('btnLoadPosts');
const btnView = document.getElementById('btnViewPost');
const selectPosts = document.getElementById('posts');
const postTitle = document.getElementById('post-title');
const postBody = document.getElementById('post-body');
const ulPostComments = document.getElementById('post-comments');
const url = 'https://blog-apps-c12bf.firebaseio.com/';

function loadPosts(e) {
    e.preventDefault();

    fetch(url + 'posts.json')
        .then((res) => {
            if (res.status >= 400) {
                throw res;
            }

            return res.json();
        })
        .then((data) => appendOptions(data))
        .catch((err) => handleError(err));

}

function viewPost(e) {
    e.preventDefault();

    const postId = selectPosts.options[selectPosts.selectedIndex].value;
    //let id = null;
    ulPostComments.textContent = '';

    fetch(`${url}posts/${postId}.json`)
        .then((res) => {
            if (res.status >= 400) {
                throw res;
            }

            return res.json();
        })
        .then((data) => {
            postTitle.textContent = data.title;
            postBody.textContent = data.body;
            //id = data.id;

            if (!data.hasOwnProperty('comments')) {
                ulPostComments.textContent = '';
            } else {
                                
                Object.values(data.comments).forEach(c => {
                    const li = document.createElement("li");
                    li.textContent = c.text;
                    ulPostComments.appendChild(li);
                });
            }
        })
        .catch((err) => handleError(err));

    // fetch(`${url}comments.json`)
    //     .then((res) => {
    //         if (res.status >= 400) {
    //             throw res;
    //         }

    //         return res.json();
    //     })
    //     .then((data) => {
    //         const comments = Array.from(Object.keys(data))
    //             .filter(x => x.postId === id);

    //         if (comments.length === 0) {
    //             ulPostComments.innerHtml = '';
    //         } else {
    //             comments.forEach(x => {
    //                 const li = document.createElement("li");
    //                 li.textContent = x.text;

    //                 ulPostComments.appendChild(li);
    //             });
    //         }
    //     })
    //     .catch((err) => handleError(err));

}

function appendOptions(data) {
    Object.entries(data).forEach(([pId, post]) => {
        const opt = document.createElement('option');
        opt.value = pId;
        opt.text = post.title;
        selectPosts.appendChild(opt);
    });
}

function handleError(err) {
    alert(`Error: ${err})`);
}

function attachEvents() {
    btnLoad.addEventListener('click', loadPosts);
    btnView.addEventListener('click', viewPost);
}

attachEvents();