
const API = 'https://fakestoreapi.com/products';

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

const reducerPrice = (a, b) => (a.price ?? a) + b.price;

export {
  API,
  compareName,
  comparePrice,
  reducerPrice
}