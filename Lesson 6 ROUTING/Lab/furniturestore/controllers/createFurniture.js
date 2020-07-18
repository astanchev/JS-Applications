import * as data from '../repository/data.js';
const invalidInputText = 'This input value is invalid';
const validInputText = 'This input value is valid';

export default async function () {
    await this.partial('./templates/createFurniture.hbs');

    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const inputs = [...form.querySelectorAll('input.form-control')];

        const errors = validateInputs(inputs);
        const hasErrors = errors.length > 0 ? true : false;

        if (!hasErrors) {
            const furniture = {
                make: inputs.find(i => i.id === 'make').value.trim(),
                model: inputs.find(i => i.id === 'model').value.trim(),
                year: Number(inputs.find(i => i.id === 'year').value.trim()),
                description: inputs.find(i => i.id === 'description').value.trim(),
                price: Number(inputs.find(i => i.id === 'price').value.trim()),
                image: inputs.find(i => i.id === 'image').value.trim(),
                material: inputs.find(i => i.id === 'material').value.trim(),
                liked: false
            };

            let result = '';

            try {
                result = await data.createFurniture(furniture);
                this.redirect('#/furniture/all');
            } catch (error) {
                alert(error);
                return;
            }

        } else {
            alert(errors.join('\n'));
        }
    });
}

function validateInputs(inputs) {
    const errors = [];

    for (const i of inputs) {
        if (i.id === 'material') {
            continue;
        }

        const inputName = i.parentElement.querySelector('label').textContent;
        let isValid = true;

        if ((i.id === 'make' || i.id === 'model') && i.value.length < 4) {
            errors.push(`${inputName} is required and more than 3 symbols!`);
            isValid = false;
        } else if (i.id === 'year' && (Number(i.value) < 1950 || Number(i.value) > 2050)){
            errors.push(`${inputName} is required and should be between 1950 and 2050!`);
            isValid = false;
        } else if (i.id === 'description' && i.value.length < 11){
            errors.push(`${inputName} is required and more than 10 symbols!`);
            isValid = false;
        } else if (i.id === 'price' && Number(i.value) <= 0){
            errors.push(`${inputName} is required and should be positive number!`);
            isValid = false;
        } else if (i.id === 'image' && i.value === ''){
            errors.push(`${inputName} is required!`);
            isValid = false;
        }

        if (isValid) {
            i.classList.add('is-valid');
            i.classList.remove('is-invalid');
            i.parentElement.querySelector('div.form-control-feedback').textContent = validInputText;
        } else {
            i.classList.add('is-invalid');
            i.classList.remove('is-valid');
            i.parentElement.querySelector('div.form-control-feedback').textContent = invalidInputText;
        }
    }

    return errors;
}