function loadCommits() {
    const username = document.getElementById('username').value;
    const repository = document.getElementById('repo').value;
    const ulContainer = document.getElementById('commits');
    ulContainer.innerHTML = '';
    const url = `https://api.github.com/repos/${username}/${repository}/commits`;

    fetch(url)
        .then((res) => {
            if (res.status >= 400) {
                throw res;
            }

            return res.json();
        })
        .then((data) => {
            data.forEach(el => {
                const li = document.createElement('li');
                li.textContent = `${el.commit.author.name}: ${el.commit.message}`;
                ulContainer.appendChild(li);
            });
        })
        .catch((err) => {
            const li = document.createElement('li');
            li.textContent = `Error: ${err.status} ${err.statusText}`;
            ulContainer.appendChild(li);
        });
}