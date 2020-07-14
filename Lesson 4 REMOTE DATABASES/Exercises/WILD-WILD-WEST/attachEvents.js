function attachEvents() {
    const url = `https://api.backendless.com/3D3B029C-3E3D-9607-FF50-0228C3D25300/CF12A54B-0440-4005-9D86-4FD613E06599/data/Players`;
    const playersDiv = document.querySelector('#players');
    const saveBtn = document.querySelector('#save');
    const reloadBtn = document.querySelector('#reload');
    const canvas = document.querySelector('#canvas');

    async function getAllPlayers() {
        return await (await fetch(url)).json();
    }

    async function getPlayer(playerId) {
        return await (await fetch(url + `/${playerId}`)).json();
    }

    async function removePlayer(playerId) {
        return await (await fetch(url + `/${playerId}`, {
            method: 'delete'
        })).json();
    }

    async function createPlayer(player) {
        return await (await fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(player)
        })).json();
    }

    async function updatePlayer(playerId, player) {
        return await (await fetch(url + `/${playerId}`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(player)
        })).json();
    }

    function createElement(type, content, attributes) {
        const result = document.createElement(type);

        if (attributes !== undefined) {
            Object.assign(result, attributes);
        }

        if (Array.isArray(content)) {
            content.forEach(append);
        } else if(content !== null || content !== undefined){
            append(content);
        }

        function append(node) {
            if (typeof node === 'string' || typeof node === 'number') {
                node = document.createTextNode(node);
            }

            result.appendChild(node);
        }

        return result;
    }

    function createPlayerEl(player) {
        const btnPlay = createElement('button', 'Play', {className: 'play'});
        btnPlay.addEventListener('click', async () => {
            await startGame(player.objectId);
        });
        const btnDelete = createElement('button', 'Delete', {className: 'delete'});
        btnDelete.addEventListener('click', async () => {
            try {
                await removePlayer(player.objectId);
                loadPlayers();
            } catch (error) {
                alert(error);
                return;
            }
        });

        const playerEl = createElement('div', [
            createElement('div', [
                createElement('label', 'Name:'),
                createElement('label', player.name, {className: 'name'})
            ], {className: 'row'}),
            createElement('div', [
                createElement('label', 'Money:'),
                createElement('label', player.money, {className: 'money'})
            ], {className: 'row'}),
            createElement('div', [
                createElement('label', 'Bullets:'),
                createElement('label', player.bullets, {className: 'bullets'})
            ], {className: 'row'}),
            btnPlay,
            btnDelete
        ], {className: 'player'});
        playerEl.setAttribute('data-id', player.objectId);

        async function startGame() {
            document.querySelectorAll('.delete').forEach(b => b.disabled = true);
            document.querySelectorAll('.play').forEach(b => b.disabled = true);

            saveBtn.addEventListener('click', savePlayer);
            reloadBtn.addEventListener('click', reloadGun);

            canvas.style.display = 'block';
            saveBtn.style.display = 'inline-block';
            reloadBtn.style.display = 'inline-block';
            loadCanvas(player);
        }

        async function savePlayer() {
            try {
                await updatePlayer(player.objectId, player);

                clearInterval(document.getElementById('canvas').intervalId);

                saveBtn.removeEventListener('click', savePlayer);
                reloadBtn.removeEventListener('click', reloadGun);

                canvas.style.display = 'none';
                saveBtn.style.display = 'none';
                reloadBtn.style.display = 'none';

                playerEl.querySelector('.money').textContent = player.money;
                playerEl.querySelector('.bullets').textContent = player.bullets;

                document.querySelectorAll('.delete').forEach(b => b.disabled = false);
                document.querySelectorAll('.play').forEach(b => b.disabled = false);
            } catch (error) {
                alert(error);
                return;
            }
        }

        async function reloadGun() {
            player.money -= 60;
            player.bullets = 6;
            try {
                await updatePlayer(player.objectId, player);
                playerEl.querySelector('.money').textContent = player.money;
                playerEl.querySelector('.bullets').textContent = player.bullets;
            } catch (error) {
                alert(error);
                return;
            }
        }

        return playerEl;
    }

    async function loadPlayers() {
        playersDiv.innerHTML = '';

        try {
            const players = await getAllPlayers();
            players.forEach(p => playersDiv.appendChild(createPlayerEl(p)));
        } catch (error) {
            alert(error);
            return;
        }
    }

    async function addPlayer() {
        const player = {
            name: document.querySelector('#addName').value.trim(),
            money: 500,
            bullets: 6
        };

        try {
            const createdPlayer = await createPlayer(player);
            loadPlayers();
        } catch (error) {
            alert(error);
            return;
        }
    }


    document.querySelector('#addPlayer').addEventListener('click', addPlayer);

    loadPlayers();
}