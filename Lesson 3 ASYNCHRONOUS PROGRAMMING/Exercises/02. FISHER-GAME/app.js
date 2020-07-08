import * as data from './data.js';
import createElement from './dom.js';

const catchesDiv = document.getElementById('catches');
const fieldsetElements = {
    angler: document.querySelector('#addForm input.angler'),
    weight: document.querySelector('#addForm input.weight'),
    species: document.querySelector('#addForm input.species'),
    location: document.querySelector('#addForm input.location'),
    bait: document.querySelector('#addForm input.bait'),
    captureTime: document.querySelector('#addForm input.captureTime'),
    btnAdd: document.querySelector('#addForm button.add')
};

async function changeCatch(e) {
    e.preventDefault();

    try {
        const id = e.target.parentElement.getAttribute('data-id');
        const newData = createCatchToUpdate(e.target.parentElement);
        let changedObject = {};
        changedObject = await data.updateCatch(id, newData);
    } catch (error) {
        loadCatches();
        return;
    }

    loadCatches();
}

function createCatchToUpdate(catchEl) {
    const angler = catchEl.querySelector('input.angler').value.trim();
    const weight = catchEl.querySelector('input.weight').value.trim();
    const species = catchEl.querySelector('input.species').value.trim();
    const location = catchEl.querySelector('input.location').value.trim();
    const bait = catchEl.querySelector('input.bait').value.trim();
    const captureTime = catchEl.querySelector('input.captureTime').value.trim();

    if (angler === '' ||
        Number(weight) <= 0 ||
        species === '' ||
        location === '' ||
        bait === '' ||
        Number(captureTime) <= 0) {
        alert('Wrong data!');
        return;
    }

    return {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
    };
}

async function deleteCatch(e) {
    e.preventDefault();

    const id = e.target.parentElement.getAttribute('data-id');

    try {
        await data.deleteCatch(id);
    } catch (error) {
        alert(`Error: ${error}`);
        return;
    }

    loadCatches();
}

function createCatchEl(id, catchObject) {   

    let btnUpdate = createElement('button', 'Update', {className: 'update'});
    let btnDelete = createElement('button', 'Delete', {className: 'delete'});    

    const inputAngler = createElement('input', '', {type: 'text',className: 'angler'});
    inputAngler.setAttribute('value', catchObject.angler);

    const inputWeight = createElement('input', '', {type: 'number',className: 'weight'});
    inputWeight.setAttribute('value', catchObject.weight);

    const inputSpecies = createElement('input', '', {type: 'text',className: 'species'});
    inputSpecies.setAttribute('value', catchObject.species);

    const inputLocation = createElement('input', '', {type: 'text',className: 'location'});
    inputLocation.setAttribute('value', catchObject.location);

    const inputBait = createElement('input', '', {type: 'text',className: 'bait'});
    inputBait.setAttribute('value', catchObject.bait);

    const inputCaptureTime = createElement('input', '', {type: 'number',className: 'captureTime'});
    inputCaptureTime.setAttribute('value', catchObject.captureTime);

    const el = createElement('div', [
        createElement('label', 'Angler'),
        inputAngler,
        createElement('hr', ''),
        createElement('label', 'Weight'),
        inputWeight,
        createElement('hr', ''),
        createElement('label', 'Species'),
        inputSpecies,
        createElement('hr', ''),
        createElement('label', 'Location'),
        inputLocation,
        createElement('hr', ''),
        createElement('label', 'Bait'),
        inputBait,
        createElement('hr', ''),
        createElement('label', 'Capture Time'),
        inputCaptureTime,
        createElement('hr', ''),
        btnUpdate,
        btnDelete
    ], {className: 'catch'});

    el.setAttribute('data-id', id);
    el.innerHTML = el.innerHTML.replace('</hr>', '');
    el.querySelector('button.delete').addEventListener('click', deleteCatch);    
    el.querySelector('button.update').addEventListener('click', changeCatch);

    return el;
}

function validateInputs() {
    if (fieldsetElements.angler.value === '' ||
        Number(fieldsetElements.weight.value) <= 0 ||
        fieldsetElements.species.value === '' ||
        fieldsetElements.location.value === '' ||
        fieldsetElements.bait.value === '' ||
        Number(fieldsetElements.captureTime.value) <= 0) {
        alert('Wrong data!');
        clearInputs();
        return;
    }

}

function clearInputs() {
    fieldsetElements.angler.value = '';
    fieldsetElements.weight.value = '';
    fieldsetElements.species.value = '';
    fieldsetElements.location.value = '';
    fieldsetElements.bait.value = '';
    fieldsetElements.captureTime.value = '';
}

async function loadCatches() {
    catchesDiv.innerHTML = '';

    let catches = {};
    try {
        catches = await data.listAll();
    } catch (error) {
        alert(`Error: ${error}`);
        return;
    }

    if (!catches) {
        catchesDiv.innerHTML = 'No catches';
    } else {
        Object.entries(catches).forEach(([id, info]) => {
            const catchEl = createCatchEl(id, info);
            catchesDiv.appendChild(catchEl);
        });
    }
}

async function addCatch(e) {
    e.preventDefault();

    validateInputs();

    const catchObject = {
        angler: fieldsetElements.angler.value,
        weight: fieldsetElements.weight.value,
        species: fieldsetElements.species.value,
        location: fieldsetElements.location.value,
        bait: fieldsetElements.bait.value,
        captureTime: fieldsetElements.captureTime.value,
    };

    let id = '';
    try {
        id = await data.createNew(catchObject);
    } catch (error) {
        alert(`Error: ${error}`);
        clearInputs();
        return;
    }

    loadCatches();
    clearInputs();
}

function attachEvents() {
    document.querySelector('button.load').addEventListener('click', loadCatches);
    fieldsetElements.btnAdd.addEventListener('click', addCatch);
}

attachEvents();