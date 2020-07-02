function loadRepos() {
	const repos = document.querySelector('#repos');
	const username = document.querySelector('#username');

	const url = `https://api.github.com/users/${username.value}/repos`;
	[repos.textContent, username.value] = ['', ''];

	$.ajax({
        url,
        success: displayRepos,
        error: displayError
	});
	
	// Not Work in Judge

	// fetch(url)
	// 	.then((res) => {
	// 		if (res.ok) {
	// 			return res.json();
	// 		} else if (!res.ok) {
	// 			throw res;
	// 		}
	// 	})
	// 	.then((data) => displayRepos(data))
	// 	.catch((err) => displayError(err));

	function displayRepos(data) {
		data.forEach((repo) => {
			const a = document.createElement('a');
			const li = document.createElement('li');

			a.href = repo.html_url;
			a.textContent = repo.full_name;

			li.appendChild(a);
			repos.appendChild(li);
		});
	}

	function displayError(err) {
		const li = document.createElement('li');
		li.textContent = `Error: ${err.status} (${err.statusText})`;
		repos.appendChild(li);
	}
}