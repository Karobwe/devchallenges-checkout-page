export default function () {
    let overlay = document.querySelector('.overlay');
    let alert = overlay.querySelector('.alert');
    let closeButton = overlay.querySelector('.alert__control__close');
    let confirmButton = overlay.querySelector('.alert__control__confirm');

    overlay.addEventListener('click', (e) => {
        closeOverlay(overlay);
    });

    alert.addEventListener('click', e => {
        e.stopPropagation();
    });

    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeOverlay(overlay);
    });

    confirmButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeOverlay(overlay);
    });
}

let closeOverlay = (overlay) => {
    if (overlay.style.display === 'flex') overlay.style.display = 'none';
    overlay.classList.remove('opened');
}

let openOverlay = (overlay, title = 'Alert title', content = 'Alert content.') => {
    overlay.querySelector('.alert__title').innerHTML = title;
    overlay.querySelector('.alert__content').innerHTML = content;
    overlay.classList.add('opened');
    overlay.style.display = 'flex';
}

export {openOverlay, closeOverlay};