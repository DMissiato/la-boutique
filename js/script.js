
// Manual import of products
//import { products } from "./product.js";

// Creare and append one product
function createProduct(parent, imgUrl, textTitle, textPrice)
{
    //create div
    const product = document.createElement('div');
    product.className = 'product';
    product.setAttribute('value', textPrice);
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
}

function renderProducts(wrapper)
{
    products.map((product) => {
        createProduct(wrapper, product.image, product.title, product.price);
    });
}

function compareName(a, b)
{
    if ( a.title < b.title ){
        return -1;
      }
      if ( a.title > b.title ){
        return 1;
      }
      return 0;
}

function comparePrice(a, b)
{
    if ( a.price < b.price ){
        return -1;
      }
      if ( a.price > b.price ){
        return 1;
      }
      return 0;
}

function updateCart()
{
    let total = localStorage.getItem('totalCart');
    if(total == undefined || total == null)
    {

        localStorage.setItem('totalCart', 0);
        console.log(localStorage.getItem('totalCart'));
        return;
    }
    total = parseFloat(localStorage.getItem('totalCart'));
    cartEl.textContent = `€ ${total.toFixed(2)}`;
}

function addToCart(price)
{
    let total = parseFloat(localStorage.getItem('totalCart'));
    total += parseFloat(price);
    localStorage.setItem('totalCart', total);
}


const wrapperProducts = document.querySelector('.wrapper__products');
const cartEl = document.querySelector('.cart');
const orderEl = document.querySelector('#order');

let products = [];

// Fetch API
fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        products = data;
        
        renderProducts(wrapperProducts);
        updateCart();
    });


// Order by name or price
orderEl.addEventListener('change', () => {
    switch(orderEl.value)
    {
        case "name":
            products = products.sort(compareName);
            console.log("name");
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

wrapperProducts.addEventListener('click', (e) => {

    if(e.target.className == 'product')
    {
        addToCart(e.target.attributes.value.value);
    }
    else if (e.target.parentNode.className == 'product')
    {
        addToCart(e.target.parentNode.attributes.value.value);
    }

    updateCart();
});