const notifications = {
    info: document.getElementById('infoBox'),
    error: document.getElementById('errorBox')
};

export function showError(message) {
    notifications.error.textContent = message;
    notifications.error.style.display = 'block';
    notifications.error.addEventListener('click', (e) => {
        hideNotification(e.target);
    });

    setTimeout(() => hideNotification(notifications.error), 2000);
}

export function showInfo(message) {
    notifications.info.textContent = message;
    notifications.info.style.display = 'block';
    notifications.info.addEventListener('click', (e) => {
        hideNotification(e.target);
    });

    setTimeout(() => hideNotification(notifications.info), 2000);
}

function hideNotification(notification) {
    notification.textContent = '';
    notification.style.display = 'none';
}