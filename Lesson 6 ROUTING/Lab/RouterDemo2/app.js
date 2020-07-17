const appState = {
    count: 0
};
const appRoot = 'http://localhost:8000/';

function link1() {
    document.all.content.innerHTML = 'Link 1 was pressed';
}

document.addEventListener('click', function (e) {
    if (e.target.dataset.myLink === "1") {
        e.preventDefault();
        history.pushState({
                count: appState.count++
            },
            '',
            e.target.href);
        window[
            e.target.href
            .replace(appRoot, '')
            .replace('/', '')
        ]();
    }
});