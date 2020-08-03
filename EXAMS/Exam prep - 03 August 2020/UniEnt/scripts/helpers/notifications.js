export function showError(message) {
    const error= document.querySelector('#errorBox');
    error.textContent = message;
    error.style.display = 'block';
    error.addEventListener('click', (e) => hideNotification(e.currentTarget));
}

export function showInfo(message) {
    const info = document.querySelector('#successBox');
    info.textContent = message;
    info.style.display = 'block';
    info.addEventListener('click', (e) => hideNotification(e.currentTarget));

    setTimeout(() => hideNotification(info), 5000);
}

export function showLoader() {
    document.querySelector('#loadingBox').style.display = 'block';
}

export function hideLoader() {
    document.querySelector('#loadingBox').style.display = 'none';
}

function hideNotification(notification) {
    notification.textContent = '';
    notification.style.display = 'none';
}