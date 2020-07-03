function attachEvents() {
    const messages = document.getElementById('messages');
    const inputAuthor = document.getElementById('author');
    const inputContent = document.getElementById('content');
    const btnSend = document.getElementById('submit');
    const btnRefresh = document.getElementById('refresh');
    const url = 'https://rest-messanger.firebaseio.com/messanger.json';

    btnSend.addEventListener('click', sendMessage);
    btnRefresh.addEventListener('click', showMessages);

    function sendMessage() {
        const author = inputAuthor.value;
        const content = inputContent.value;
        clearInputs();

        fetch(url, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    author,
                    content
                })
            })
            .then(() => alert('Message send!'))
            .catch((err) => handleError(err));
    }

    function showMessages() {
        clearInputs();

        fetch(url)
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }

                return res.json();
            })
            .then((data) => showInfo(data))
            .catch((err) => handleError(err));
    }

    function showInfo(data) {
        messages.value = '';

        const messageIds = Array.from(Object.keys(data));
        const result = [];

        for (const id of messageIds) {
            result.push(`${data[id].author}: ${data[id].content}`);
        }

        messages.value = result.join('\n');
    }

    function handleError(err) {
        messages.value = 'Error';
    }

    function clearInputs() {
        inputAuthor.value = '';
        inputContent.value = '';
    }
}

attachEvents();