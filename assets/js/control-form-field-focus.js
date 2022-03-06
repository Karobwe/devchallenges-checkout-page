export default function() {
    let formFields = document.querySelectorAll('.form__field__wrapper');

    formFields.forEach(field => {
        let icon = field.querySelector('.material-icons');
        let input = field.querySelector('.form-item__input');

        icon.addEventListener('click', () => {
            highlightBorder(field);
            input.focus();
        });

        input.addEventListener('focus', () => {
            highlightBorder(field);
        });

        input.addEventListener('blur', () => {
            resetBorder(field);
        });
    });
}

let highlightBorder = (field) => {
    field.style.border = 'solid 2px rgba(130, 130, 130, 1)';
    if(field.classList.contains('form__field__wrapper--error')) {
        field.style.borderColor = 'rgba(189,39,30,1)';
    }
}

let resetBorder = (field) => {
    field.style.border = '';
}