
import { API, compareName, comparePrice, reducerPrice } from './utils.js';

// Async Await
// Fetch API
const getProducts = async() => {
    const res = await fetch(API)
    const data = await res.json();

    products = data;
    
    renderProducts(wrapperProducts);
    updateCart();
};

// Creare and append one product
function createProduct(parent, id, imgUrl, textTitle, textPrice)
{
    //create div
    const product = document.createElement('div');
    product.className = 'product';
    product.setAttribute('id', id);
    //img
    const image = document.createElement('img');
    image.src = imgUrl;
    image.alt = textTitle;

    product.appendChild(image);

    //text
    const title = document.createElement('h4');
    title.textContent =  textTitle;

    const price = document.createElement('p');
    price.textContent =  `€ ${textPrice.toFixed(2)}`;

    product.append(title, price);
    //append product
    parent.appendChild(product);

    //on click add to cart
    product.addEventListener('click', (e) => {

        cartList.push(
            products.find(
                (product) => parseInt(e.currentTarget.id) === product.id
            )
        );
        localStorage.setItem('cart', JSON.stringify(cartList));
        updateCart();

        let modal = document.createElement('div');
        modal.className = 'modalCart';
        modal.textContent = '✅ Articolo aggiunto al carrello!';

        document.body.prepend(modal);
        setTimeout(() => {
            let elem = document.querySelector('.modalCart');
            elem.remove();
        }, 3500);
    });
}

function renderProducts(wrapper)
{
    products.map((product) => {
        createProduct(wrapper, product.id, product.image, product.title, product.price);
    });
}

function updateCart()
{
    let thisCart = localStorage.getItem('cart');
    if(thisCart == undefined || thisCart == null)
    {

        localStorage.setItem('cart', JSON.stringify(cartList));
        thisCart = localStorage.getItem('cart');
        return;
    }
    thisCart = JSON.parse(thisCart);
    cartList = thisCart;
    cartBtn.firstChild.textContent = `$ ${thisCart.reduce(reducerPrice).toFixed(2)}`;
}


const wrapperProducts = document.querySelector('.wrapper__products');
const cartBtn = document.querySelector('.cart');
const orderEl = document.querySelector('#order');

let products = [];
let cartList = [];

getProducts();

// View cart
cartBtn.addEventListener('click', () => {
    console.log(cartList);
});

// Order by name or price
orderEl.addEventListener('change', () => {
    switch(orderEl.value)
    {
        case "name":
            products = products.sort(compareName);
            break;
        case "price":
            products = products.sort(comparePrice);
            break;
        default:
            return;
    }
    
    wrapperProducts.textContent = "";
    renderProducts(wrapperProducts);
});

document.addEventListener('DOMContentLoaded', () => {
    
    //slider 
    const sliderList = document.querySelector('.slider').children;
    let currSlider = 0;
    
    setInterval(() => {

        sliderList[currSlider].classList.remove('selected');
        if(currSlider+1 < sliderList.length)
        {
            currSlider += 1;
        }
        else
        {
            currSlider = 0;
        }
        sliderList[currSlider].classList.add('selected');
    }, 5000);
});