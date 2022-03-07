import './styles/app.scss';

import controlsQuantities from './js/product-quantity';
import handleFormSubmit from './js/handle-form-submit';
import controlFormFieldFocus from './js/control-form-field-focus';
import overlayAlert from './js/alert';
import productPrice from './js/product-price';

document.addEventListener("DOMContentLoaded", function(){
    controlsQuantities();
    handleFormSubmit();
    controlFormFieldFocus();
    overlayAlert();
    productPrice();
});