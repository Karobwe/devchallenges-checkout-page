import {openOverlay, closeOverlay} from './alert';

export default function() {
    let form = document.querySelector('form');
    let overlay = document.querySelector('.overlay');

    form.addEventListener('submit', e => {
        e.preventDefault();
        cleanErrorMessages();
        let thumbUp = isValidForm(form);

        if(thumbUp) {
            openOverlay(
                overlay,
                '<span class="material-icons-outlined text--success">check_circle</span>',
                'The form was submitted successfully !'
            );
            form.reset();
        } else {
            openOverlay(
                overlay,
                '<span class="material-icons-outlined text--error">info</span>',
                'The form submission failed, please verify yours inputs and retry.'
            );
        }
    });
}

/**
 * Verify if the given form's inputs are valid and show errors on those where there's
 * @TODO: Refactor duplicate code (switch repeated)
 * @param form
 * @returns {boolean}
 */
let isValidForm = function (form) {
    // Email
    switch(isEmpty(form.email.value)) {
        case true:
            inputsErrorMassages.email.isValid = false;
            showFormError(form.email, inputsErrorMassages.email.emptyMessage);
            break;
        default:
            if (!isValidEmail(form.email.value)) {
                inputsErrorMassages.email.isValid = false;
                showFormError(form.email, inputsErrorMassages.email.invalidSyntax);
            } else {
                inputsErrorMassages.email.isValid = true;
            }
    }

    // Phone
    switch(isEmpty(form.phone.value)) {
        case true:
            inputsErrorMassages.phone.isValid = false;
            showFormError(form.phone, inputsErrorMassages.phone.emptyMessage);
            break;
        default:
            if (!isValidPhone(form.phone.value)) {
                inputsErrorMassages.phone.isValid = false;
                showFormError(form.phone, inputsErrorMassages.phone.invalidSyntax);
            } else {
                inputsErrorMassages.phone.isValid = true;
            }
    }

    // Full name
    switch(isEmpty(form.fullName.value)) {
        case true:
            inputsErrorMassages.fullName.isValid = false;
            showFormError(form.fullName, inputsErrorMassages.fullName.emptyMessage);
            break;
        default:
            if (!isValidText(form.fullName.value)) {
                inputsErrorMassages.fullName.isValid = false;
                showFormError(form.fullName, inputsErrorMassages.fullName.invalidSyntax);
            } else {
                inputsErrorMassages.fullName.isValid = true;
            }
    }

    // Address
    switch(isEmpty(form.address.value)) {
        case true:
            inputsErrorMassages.address.isValid = false;
            showFormError(form.address, inputsErrorMassages.address.emptyMessage);
            break;
        default:
            if (!isValidText(form.address.value)) {
                inputsErrorMassages.address.isValid = false;
                showFormError(form.address, inputsErrorMassages.address.invalidSyntax);
            } else {
                inputsErrorMassages.address.isValid = true;
            }
    }

    // City
    switch(isEmpty(form.city.value)) {
        case true:
            inputsErrorMassages.city.isValid = false;
            showFormError(form.city, inputsErrorMassages.city.emptyMessage);
            break;
        default:
            if (!isValidText(form.city.value)) {
                inputsErrorMassages.city.isValid = false;
                showFormError(form.city, inputsErrorMassages.city.invalidSyntax);
            } else {
                inputsErrorMassages.city.isValid = true;
            }
    }

    // Country
    switch(isEmpty(form.country.value)) {
        case true:
            inputsErrorMassages.country.isValid = false;
            showFormError(form.country, inputsErrorMassages.country.emptyMessage);
            break;
        default:
            inputsErrorMassages.country.isValid = true;
    }

    // Postal code
    switch(isEmpty(form.postalCode.value)) {
        case true:
            inputsErrorMassages.postalCode.isValid = false;
            showFormError(form.postalCode, inputsErrorMassages.postalCode.emptyMessage);
            break;
        default:
            if (!isValidPostalCode(form.postalCode.value)) {
                inputsErrorMassages.postalCode.isValid = false;
                showFormError(form.postalCode, inputsErrorMassages.postalCode.invalidSyntax);
            } else {
                inputsErrorMassages.postalCode.isValid = true;
            }
    }

    return inputsErrorMassages.email.isValid && inputsErrorMassages.phone.isValid
        && inputsErrorMassages.fullName.isValid && inputsErrorMassages.address.isValid
        && inputsErrorMassages.city.isValid && inputsErrorMassages.country.isValid
        && inputsErrorMassages.postalCode.isValid;
}

/**
 * Verify if given input's value is correct according to given validation callback, if not, display error message to the user
 * @param input:HTMLElement
 * @param errorData:{isValid:boolean, emptyMessage:string, invalidSyntax:string}
 * @param validationCallback:function
 * @returns {boolean}
 */
let verifyFormInput = function (input, errorData = inputsErrorMassages.email, validationCallback = isValidText) {
    if(isEmpty(input)) {
        errorData.isValid = false;
        showFormError(input, errorData.emptyMessage);
    } else if(!validationCallback(input)) {
        errorData.isValid = false;
        showFormError(input, errorData.invalidSyntax);
    }

    return errorData.isValid;
}

/**
 * Check if a string is a valid email address
 * @param email:string
 * @returns {boolean}
 */
let isValidEmail = function (email) {
    if(isEmpty(email)) return  false;

    let emailFormat = /^([A-Za-z0-9])+([A-Za-z0-9_+\-.])*@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return emailFormat.test(email);
}

/**
 * Check if a string is a valid phone number (French format)
 * @param phone:string
 * @returns {boolean}
 */
let isValidPhone = function (phone) {
    if(isEmpty(phone)) return false;

    let phoneFormat = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    return phoneFormat.test(phone);
}

/**
 * Check if a string is a valid postal code (French format)
 * @param postalCode:string
 * @returns {boolean}
 */
let isValidPostalCode = function (postalCode) {
    if(isEmpty(postalCode)) return false;

    let frenchPostalCodeFormat = /^[0-9]{5}$/;

    return frenchPostalCodeFormat.test(postalCode);
}

/**
 * Check if a string don't contain special characters, except alphanumeric, ".", "-", "," and any whitespace.
 * Whitespace include spaces, tabs, and newlines.
 * @param text:string
 * @returns {boolean}
 */
let isValidText = function (text) {
    if(!isString(text)) return false;
    let noSpecialCharsFormat = /[A-Za-z0-9'.\-\s,]+/;
    return noSpecialCharsFormat.test(text);
}

/**
 * Verify if an object is an empty string
 * @param variable:string|Object
 * @returns {boolean}
 */
let isEmpty = function (variable) {
    return isString(variable) && (variable === '');
}

/**
 * Check if an object is a string
 * @param variable:string|Object
 * @returns {boolean}
 */
let isString = function (variable) {
    return typeof variable === 'string';
}

/**
 * Display error message and highlight the input with a red border
 * @param formItemInput:HTMLElement Form input to highlight
 * @param errorMessage:string Message shown to the user
 */
let showFormError = function (formItemInput, errorMessage = '') {
    let formFieldWrapper = formItemInput.parentNode;
    let formItemContainer = formFieldWrapper.parentNode;
    let newDiv = document.createElement('div');
    let newContent = document.createTextNode(errorMessage);

    formFieldWrapper.classList.add('form__field__wrapper--error');
    newDiv.appendChild(newContent);
    newDiv.classList.add('text--error');
    insertAfter(newDiv, formItemContainer.querySelector('.form__label'));
}

let inputsErrorMassages = {
    email: {
        isValid: true,
        emptyMessage: 'Email is mandatory.',
        invalidSyntax: 'Please enter a valid email address using the following format: joe@example.com'
    },
    phone: {
        isValid: true,
        emptyMessage: 'Phone is mandatory.',
        invalidSyntax: 'Please enter a valid phone number.'
    },
    fullName: {
        isValid: true,
        emptyMessage: 'Full name is mandatory.',
        invalidSyntax: 'Please enter a valid name, without special characters.'
    },
    address: {
        isValid: true,
        emptyMessage: 'Address is mandatory.',
        invalidSyntax: 'Please enter a valid address.'
    },
    city: {
        isValid: true,
        emptyMessage: 'City is mandatory.',
        invalidSyntax: 'Please enter a valid city name.'
    },
    country: {
        isValid: true,
        emptyMessage: 'Please select a country.',
        invalidSyntax: null
    },
    postalCode: {
        isValid: true,
        emptyMessage: 'Postal code is mandatory.',
        invalidSyntax: 'Please enter a valid postal code.'
    },
};

let testIsValidEmail = function () {
    let mocks = [
        'hello@world.fr',
        'hey-hey98@mock.design',
        '1255@455.45',
        'aze5z_ds@sdsf.d5',
        4545454,
        {a:2020, b:2022},
        '466464@445.com',
        'aeds_vd@dvdf.dev'
    ]

    mocks.forEach(item => {
        console.log(item, 'is valid email: ', isValidEmail(item));
    });
}

let testIsValidPhone = function () {
    let mocks = [
        '0123456789',
        1234567890,
        '+336123456',
        +336123456,
        '-0660123456',
        '0952141516',
        '+336 96 97 98'
    ]

    mocks.forEach(item => {
        console.log(item, 'is valid phone: ', isValidPhone(item));
    });
}

/**
 * Insert an element after another one
 * See https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
 *
 * @param newNode:HTMLElement The node to be inserted
 * @param referenceNode:HTMLElement The node to put newNode after
 */
let insertAfter = function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let cleanErrorMessages = function() {
    let allInputsWithError = document.querySelectorAll('.form__field__wrapper--error');
    let allErrorMessages = document.querySelectorAll('.form-item__container .text--error');

    allInputsWithError.forEach(input => {
        input.classList.toggle('form__field__wrapper--error');
    });

    allErrorMessages.forEach(message => {
        message.parentNode.removeChild(message);
    });
}
