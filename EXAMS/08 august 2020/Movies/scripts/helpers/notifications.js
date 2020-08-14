export function showError(message) {
    const error = document.querySelector('#errorBox');
    error.textContent = message;
    error.parentElement.style.display = 'block';
    error.addEventListener('click', (e) => hideNotification(e.currentTarget));

    setTimeout(() => hideNotification(error), 1000);
}

export function showInfo(message) {
    const info = document.querySelector('#successBox');
    info.textContent = message;
    info.parentElement.style.display = 'block';
    info.addEventListener('click', (e) => hideNotification(e.currentTarget));

    setTimeout(() => hideNotification(info), 1000);
}

function hideNotification(notification) {
    notification.textContent = '';
    notification.parentElement.style.display = 'none';
}