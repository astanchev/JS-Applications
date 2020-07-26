var canvas;
var ctx;
var down = false; //mouse is pressed
var color = 'black'; //default drawing color
var width = 1; // drawing width
var isEraser = false; // is eraser On/Off

//calling window.onload to make sure the HTML is loaded
window.onload = function () {
    canvas = document.getElementById('canvas');

    const colorBtns = Array.from(document.querySelectorAll('.colors'));
    colorBtns.forEach(b => b.addEventListener('click', (e) => {
        e.preventDefault();
        isEraser = false;
        canvas.style.cursor = 'crosshair';
        changeColor(e.target.id);
    }));

    const eraseBtn = document.querySelector('#eraser');
    eraseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isEraser = true;
        canvas.style.cursor = 'not-allowed';
    });

    const clearBtn = document.querySelector('#clear');
    clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearCanvas();
    });

    const inputWidth = document.querySelector('#penWidth');
    inputWidth.addEventListener('change', changeLine);

    ctx = canvas.getContext('2d');
    ctx.lineWidth = width;

    //handling mouse click and move events
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mouseup', handleUp);


};

function handleMove(e) {
    xPos = e.clientX - canvas.offsetLeft;
    yPos = e.clientY - canvas.offsetTop;
    if (down == true) {
        if (!isEraser) {
            ctx.lineTo(xPos, yPos); //create a line from old point to new one
            ctx.strokeStyle = color;
            ctx.stroke();
        } else {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineTo(xPos, yPos);
            ctx.strokeStyle = "rgba(255,255,255,1)";
            ctx.stroke();
        }
    }
}

function handleDown() {
    down = true;
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
}

function handleUp() {
    down = false;
}

function changeColor(new_color) {
    color = new_color;
}

function changeLine() {
    ctx.lineWidth = Number(document.getElementById('penWidth').value);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}