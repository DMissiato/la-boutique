
// Async Await
// Fetch API
const getProducts = async() => {
    const res = await fetch('https://fakestoreapi.com/products')
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
        alert(`Prodotto aggiunto al Carrello! Numero prodotti: ${cartList.length}`);

        updateCart();
    });
}

function renderProducts(wrapper)
{
    products.map((product) => {
        createProduct(wrapper, product.id, product.image, product.title, product.price);
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
    let thisCart = localStorage.getItem('cart');
    if(thisCart == undefined || thisCart == null)
    {

        localStorage.setItem('cart', JSON.stringify(cartList));
        return;
    }
    thisCart = JSON.parse(localStorage.getItem('cart'));
    console.log(thisCart);
    //cartBtn.textContent = `€ ${total.toFixed(2)}`;
}


const wrapperProducts = document.querySelector('.wrapper__products');
const cartBtn = document.querySelector('.cart');
const orderEl = document.querySelector('#order');

let products = [];
const cartList = [];

getProducts();

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
