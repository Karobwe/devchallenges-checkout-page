export default async function getProducts() {
    waitForElm('.cart').then(cart => {
        return productsToObject();
    });
    return {};
};

let updateTotal = async () => {
    let products = getProducts();
    let productsHTMLElements = document.querySelectorAll('.product');
    let totalHTMLElement = document.querySelector('.cart__total');

    productsHTMLElements.forEach(product => {
        let subtract = product.querySelector('.quantity__subtract');
        let add = product.querySelector('.quantity__add');
        let title = product.querySelector('.product__title').innerHTML;

        add.addEventListener('click', e => {
            let quantity = product.querySelector('.quantity__value').value;

            switch (title) {
                case 'Vintage Backbag':
                    // products.bag.quantity = quantity;
                    // products.totalPrice = (products.bag.discountPrice * products.bag.quantity) + (products.shoes.discountPrice * products.shoes.quantity) + products.shipping;
                    // totalHTMLElement.innerHTML = products.totalPrice;
                    console.log(products.bag)
                    break;
                case 'Levi Shoes':
                    products.shoes.quantity = quantity;
                    products.totalPrice = (products.bag.discountPrice * products.bag.quantity) + (products.shoes.discountPrice * products.shoes.quantity) + products.shipping;
                    totalHTMLElement.innerHTML = products.totalPrice;
                    break;
            }
        });
    });
}

let productsToObject = () => {
    let products = document.querySelectorAll('.product');
    let shipping = document.querySelector('.cart__shipping').innerHTML.slice(1);
    let totalPrice = document.querySelector('.cart__total').innerHTML.slice(1);
    let bag, shoes = null;

    products.forEach(product => {
        let title = product.querySelector('.product__title').innerHTML;
        let discountPrice = product.querySelector('.discount__price').innerHTML;
        let sellingPrice = product.querySelector('.selling__price').innerHTML;
        let quantity = product.querySelector('.quantity__value').value;

        if (title === 'Vintage Backbag') {
            bag = {title: title, quantity: quantity, discountPrice: discountPrice, sellingPrice: sellingPrice};
        } else if(title === 'Levi Shoes') {
            shoes = {title: title, quantity: quantity, discountPrice: discountPrice, sellingPrice: sellingPrice};
        }
    });

    return {bag, shoes, shipping: parseFloat(shipping), totalPrice: parseFloat(totalPrice)};
}

/**
 * Wait until an element with the given selector exist on the DOM
 * See https://stackoverflow.com/a/61511955/7058317
 * @param selector
 * @returns {Promise<unknown>}
 */
let waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}