import * as data from './data.js';
import createElement from './dom.js';

const symbols = {
    'Sunny': '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast': '&#x2601;',
    'Rain': '&#x2614;',
    'Degrees': '&deg;',
};

window.addEventListener('load', () => {
    const mainDiv = document.querySelector('#forecast');
    const todayDiv = document.querySelector('#current');
    const upcomingDiv = document.querySelector('#upcoming');
    const inputLocation = document.querySelector('#location');
    const todayDivLabel = `<div class="label">Current conditions</div>`;
    const upcomingDivLabel = `<div class="label">Three-day forecast</div>`;

    document.querySelector('#submit').addEventListener('click', getForecast);

    async function getForecast() {
        todayDiv.innerHTML = todayDivLabel;
        upcomingDiv.innerHTML = upcomingDivLabel;

        const locationName = inputLocation.value.trim();
        if (locationName === '') {
            return;
        }

        let code = '';

        try {
            code = await data.getCode(locationName);
        } catch (error) {
            alert(`Error! Not supported town: ${locationName}.`);
            return;
        }

        const todayRes = data.getToday(code);
        const upcomingRes = data.getUpcoming(code);

        const [today, upcoming] = [await todayRes, await upcomingRes];

        const symbolSpan = createElement('span', '', {
            className: 'condition symbol'
        });
        symbolSpan.innerHTML = symbols[today.forecast.condition];

        const tempSpan = createElement('span', '', {
            className: 'forecast-data'
        });
        tempSpan.innerHTML = `${today.forecast.low}${symbols.Degrees}/${today.forecast.high}${symbols.Degrees}`;

        const todayEl = createElement('div', [
            symbolSpan,
            createElement('span', [
                createElement('span', today.name, {
                    className: 'forecast-data'
                }),
                tempSpan,
                createElement('span', today.forecast.condition, {
                    className: 'forecast-data'
                })
            ], {
                className: 'condition'
            })
        ], {
            className: 'forecasts'
        });

        todayDiv.appendChild(todayEl);

        const forecastInfoDiv = createElement('div', upcoming.forecast.map(renderUpcoming), {
            className: 'forecasts'
        });

        upcomingDiv.appendChild(forecastInfoDiv);

        mainDiv.style.display = 'block';
    }

    function renderUpcoming(forecast) {
        const symbolSpan = createElement('span', '', {
            className: 'symbol'
        });
        symbolSpan.innerHTML = symbols[forecast.condition];

        const tempSpan = createElement('span', '', {
            className: 'forecast-data'
        });
        tempSpan.innerHTML = `${forecast.low}${symbols.Degrees}/${forecast.high}${symbols.Degrees}`;

        const result = createElement('span', [
            symbolSpan,
            tempSpan,
            createElement('span', forecast.condition, {
                className: 'forecast-data'
            })
        ], {
            className: 'upcoming'
        });

        return result;
    }


});