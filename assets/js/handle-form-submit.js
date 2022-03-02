export default function() {
    let button = document.querySelector('form input[type="submit"]');

    button.addEventListener('click', e => {
        e.preventDefault();
    });
}