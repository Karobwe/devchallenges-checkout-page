export default function() {
    let products = document.querySelectorAll('.product .product__quantity');

    products.forEach(product => {
        let add = product.querySelector('.quantity__add');
        let subtract = product.querySelector('.quantity__subtract');
        let quantity = product.querySelector('.quantity__value');

        if (typeof quantity != 'number') quantity.value = 0;

        add.addEventListener('click', () => {
            let qte = parseInt(quantity.value);

            if(typeof qte === 'number') {
                qte++;
                quantity.value = qte;
            } else {
                quantity.value = 1;
            }
        });

        subtract.addEventListener('click', () => {
            let qte = parseInt(quantity.value);

            if(typeof qte === 'number' && qte >= 0) {
                if (qte >= 1) qte--;
                quantity.value = qte;
            } else {
                quantity.value = 1;
            }
        });
    });
}
