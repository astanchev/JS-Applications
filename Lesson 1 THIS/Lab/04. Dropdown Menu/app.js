function solve() {
    const dropdown = document.getElementById('dropdown');
    let dropdownUl = document.getElementById('dropdown-ul');
    let box = document.getElementById('box');
    // let background = box.style.background;
    // let color = box.style.color;

    dropdown.addEventListener('click', resize);
    dropdownUl.addEventListener('click', getColor);

    function resize() {
        if (dropdownUl.style.display === 'block') {
            dropdownUl.style.display = 'none';
            setBoxColor('black', 'white');
        } else {
            dropdownUl.style.display = 'block';
        }
    }

    function getColor(e) {
        if (e.target.classList.value.match('deep')) {
            const background = e.target.textContent;
            setBoxColor(background, 'black');
        }
    }

    function setBoxColor(background, color) {
        box.style.background = background;
        box.style.color = color;
    }
}