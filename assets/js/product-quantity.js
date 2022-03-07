export default function() {
    let products = document.querySelectorAll('.product .product__quantity');

    products.forEach(product => {
        let add = product.querySelector('.quantity__add');
        let subtract = product.querySelector('.quantity__subtract');
        let quantity = product.querySelector('.quantity__value');
        let title = product.parentNode.querySelector('.product__title');
        let total = document.querySelector('.cart__total');
        let shipping = document.querySelector('.cart__shipping');

        let productsData = {
            bag: {
                title: 'Vintage Backbag',
                discountPrice: 54.99,
                sellingPrice: 94.99,
                quantity: 0,
            },
            shoes: {
                title: 'Levi Shoesg',
                discountPrice: 74.99,
                sellingPrice: 124.99,
                quantity: 0,
            },
            totalPrice: 0,
            shipping: 19,
        }

        if (typeof quantity != 'number') quantity.value = 1;

        add.addEventListener('click', () => {
            let qte = parseInt(quantity.value);

            if(typeof qte === 'number') {
                qte++;
                quantity.value = qte;
            } else {
                quantity.value = 1;
            }

            updatePrices(title, productsData, quantity, shipping, total);
        });

        subtract.addEventListener('click', () => {
            let qte = parseInt(quantity.value);

            if(typeof qte === 'number' && qte >= 0) {
                if (qte >= 1) qte--;
                quantity.value = qte;
            } else {
                quantity.value = 1;
            }

            updatePrices(title, productsData, quantity, shipping, total);
        });
    });
}

/**
 * Update total price according to selected quantity
 * @param title
 * @param productsData
 * @param quantity
 * @param shipping
 * @param total
 */
let updatePrices = (title, productsData, quantity, shipping, total) => {
    if (title.innerHTML === productsData.bag.title) {
        productsData.bag.quantity = quantity.value;
    } else if (title.innerHTML === productsData.shoes.title) {
        productsData.shoes.quantity = quantity.value;
    }

    productsData.totalPrice = (productsData.shoes.discountPrice * productsData.shoes.quantity) + (productsData.bag.discountPrice * productsData.bag.quantity);

    if(productsData.bag.quantity > 0 || productsData.shoes.quantity > 0)  {
        productsData.totalPrice = productsData.totalPrice + productsData.shipping;
        shipping.innerHTML = '$' + (productsData.shipping).toFixed(2);
    } else {
        shipping.innerHTML = '$' + (0).toFixed(2);
    }

    total.innerHTML = '$' + productsData.totalPrice.toFixed(2);
}
