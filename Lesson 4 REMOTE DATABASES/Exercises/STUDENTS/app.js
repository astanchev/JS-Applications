import createElement from './dom.js';
import * as data from './data.js';
import { editBook } from '../BOOKS/data.js';

const tBody = document.querySelector('table > tbody');
const div = createElement('div', '', {className: 'btnHolder'});
const btnAdd = createElement('button', 'Add student', {id: 'addStudent'});
const btnSave = createElement('button', 'Save', {id: 'saveStudent'});
const btnCancel = createElement('button', 'Cancel', {id: 'cancelStudent'});

function createTr() {
    const student = {
        id: createElement('input', '', {type: 'number', className: 'inputId', step: 1, min: 1}),
        firstName: createElement('input', '', {type: 'text', className: 'inputFN'}),
        lastName: createElement('input', '', {type: 'text', className: 'inputLN'}),
        facultyNumber: createElement('input', '', {type: 'text', className: 'inputFacN'}),
        grade: createElement('input', '', {type: 'number', className: 'inputGr', step: 0.01, min: 2.00, max: 6.00})
    };

    const trEl = createElement('tr', [
        createElement('td', student.id),
        createElement('td', student.firstName),
        createElement('td', student.lastName),
        createElement('td', student.facultyNumber),
        createElement('td', student.grade)
    ]);

    trEl.className = 'inputTr';

    return trEl;
}

function toggleButtons(edit) {
    if (edit) {
        div.removeChild(btnAdd);
        div.appendChild(btnSave);
        div.appendChild(btnCancel);
    } else {
        div.removeChild(btnSave);
        div.removeChild(btnCancel);
        div.appendChild(btnAdd);
    }
}

function createStudentEl(student) {
    return createElement('tr', [
        createElement('td', student.id),
        createElement('td', student.firstName),
        createElement('td', student.lastName),
        createElement('td', student.facultyNumber),
        createElement('td', student.grade.toFixed(2)),
    ]);
}

async function loadStudents() {
    tBody.innerHTML = '<tr><td colspan="5">Loading...</td><tr>';
    try {
        const students = (await data.getAllStudents()).sort((s1, s2) => s1.id - s2.id);
        tBody.innerHTML = '';
        for (const student of students) {
            tBody.appendChild(createStudentEl(student));
        }        
    } catch (error) {
        alert(error);
        return;
    }
}

async function validateInputs(row) {
    const errors = [];
    const values = {
        id: Number(row.inputId.value.trim()),
        firstName: row.inputFN.value.trim(),
        lastName: row.inputLN.value.trim(),
        facultyNumber: row.inputFacN.value.trim(),
        grade: Number(row.inputGr.value.trim()),
    };
    const allIds = await data.getAllIds();

    if (!Number.isInteger(values.id) || values.id <= 0 || allIds.some(i => i === values.id)) {
        errors.push('ID should be unique positive integer!');
        row.inputId.classList.add('inputError');
    } else {
        row.inputId.classList.remove('inputError');
    }
    
    if (values.firstName === '') {
        errors.push('First name is required!');
        row.inputFN.classList.add('inputError');
    } else {
        row.inputFN.classList.remove('inputError');
    }

    if (values.lastName === '') {
        errors.push('Last name is required!');
        row.inputLN.classList.add('inputError');
    } else {
        row.inputLN.classList.remove('inputError');
    }

    if (values.facultyNumber === '' || isNaN(Number(values.facultyNumber))) {
        errors.push('Faculty number is required and has to be string of numbers!');
        row.inputFacN.classList.add('inputError');
    } else {
        row.inputFacN.classList.remove('inputError');
    }

    if (isNaN(values.grade) || values.grade < 2 || values.grade > 6) {
        errors.push('Grade should be between 2.00 and 6.00!');
        row.inputGr.classList.add('inputError');
    } else {
        row.inputGr.classList.remove('inputError');
    }

    return errors;
}

async function createStudentRow() {
    const editRow = {
        inputId: document.querySelector('tr.inputTr > td > input.inputId'),
        inputFN: document.querySelector('tr.inputTr > td > input.inputFN'),
        inputLN: document.querySelector('tr.inputTr > td > input.inputLN'),
        inputFacN: document.querySelector('tr.inputTr > td > input.inputFacN'),
        inputGr: document.querySelector('tr.inputTr > td > input.inputGr')
    };
    const errors = await validateInputs(editRow);
    const hasErrors = errors.length > 0 ? true : false;

    if (hasErrors) {
        alert(errors.join('\n'));
        return hasErrors;
    }

    const student = {
        id: Number(editRow.inputId.value.trim()),
        firstName: editRow.inputFN.value.trim(),
        lastName: editRow.inputLN.value.trim(),
        facultyNumber: editRow.inputFacN.value.trim(),
        grade: Number(editRow.inputGr.value.trim()),
    };

    
    try {
        const savedStudent =  await data.createStudent(student);        
        return hasErrors;
    } catch (error) {
        alert(error);
        return;
    }
}

window.addEventListener('load', () => {
    loadStudents();
    document.querySelector('body').appendChild(div);
    div.appendChild(btnAdd);

    btnAdd.addEventListener('click', (e) => {
            tBody.appendChild(createTr());
            toggleButtons(true);
        });

    btnCancel.addEventListener('click', (e) => {
        tBody.removeChild(tBody.lastElementChild);
        toggleButtons(false);
    });

    btnSave.addEventListener('click', async (e) => {
        const hasErrors = await createStudentRow();

        if(hasErrors){
            return;
        } 

        tBody.removeChild(tBody.lastElementChild);
        loadStudents();
        toggleButtons(false);
    });

});