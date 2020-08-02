const notifications = {
    info: document.querySelector('#infoBox'),
    error: document.querySelector('#errorBox'),
    loading: document.querySelector('#loadingBox')
};

notifications.error.addEventListener('click', (e) => hideNotification(e.currentTarget));
notifications.info.addEventListener('click', (e) => hideNotification(e.currentTarget));

export function showError(message) {
    notifications.error.children[0].textContent = message;
    notifications.error.style.display = 'block';

    setTimeout(() => hideNotification(notifications.error), 2000);
}

export function showInfo(message) {
    notifications.info.children[0].textContent = message;
    notifications.info.style.display = 'block';

    setTimeout(() => hideNotification(notifications.info), 2000);
}

export function showLoader() {
    notifications.loading.style.display = 'block';
}

export function hideLoader() {
    notifications.loading.style.display = 'none';
}

function hideNotification(notification) {
    notification.children[0].textContent = '';
    notification.style.display = 'none';
}