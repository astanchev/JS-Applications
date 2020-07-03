function getInfo() {
    const busStop = document.getElementById('stopId');
    const divStopName = document.getElementById('stopName');
    const ulBuses = document.getElementById('buses');
    const url = `http://localhost:3000/businfo/${busStop.value}.json`;
    busStop.value = '';
    ulBuses.innerHTML = '';

    fetch(url)
        .then((res) => {
            if (res.status !== 200) {
                throw res;
            }
            
            return res.json();
        })
        .then((data) => showInfo(data))
        .catch((err) => handleError(err));

    function showInfo(data) {
        divStopName.textContent = data.name;

        for (const key in data.buses) {
            const liBuses = document.createElement('li');
            liBuses.textContent = `Bus ${key} arrives in ${data.buses[key]}`;
            ulBuses.appendChild(liBuses);
        }
    }

    function handleError(err) {
        divStopName.textContent = 'Error';
    }

}