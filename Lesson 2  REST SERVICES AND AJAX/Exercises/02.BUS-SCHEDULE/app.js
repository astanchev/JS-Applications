function solve() {
    const info = document.querySelector('#info span.info');
    const btnDepart = document.getElementById('depart');
    const btnArrive = document.getElementById('arrive');

    let nextStopName = 'Depot';
    let nextStopId = 'depot';

    function depart() {
        switchDisable();

        fetch(`https://judgetests.firebaseio.com/schedule/${nextStopId}.json`)
            .then((res) => {
                if (res.status !== 200) {
                    throw res;
                }
                return res.json();
            })
            .then((data) => showNextInfo(data))
            .catch((err) => handleError(err));
    }

    function arrive() {
        switchDisable();
        info.textContent = `Arriving at ${nextStopName}`;
    }

    function showNextInfo(data) {
        nextStopName = data.name;
        nextStopId = data.next;
        info.textContent = `Next stop ${nextStopName}`;
    }

    function handleError(err) {
        info.textContent = 'Error';
        disableButtons();
    }

    function switchDisable() {
        btnDepart.disabled = btnDepart.disabled === true ? false : true;
        btnArrive.disabled = btnArrive.disabled === true ? false : true;
    }

    function disableButtons() {
        btnDepart.disabled = true;
        btnArrive.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();