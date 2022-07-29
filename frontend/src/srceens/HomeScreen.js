import { getProducts } from '../api';
import Rating from '../components/Rating';
import { parseRequestUrl } from '../utils';

const HomeScreen = {
  render: async () => {
    const {value} = parseRequestUrl();
    const products = await getProducts(value);
    if(products.error){
      return `<div class="error">${products.error}</div>`
    }
    return `
  

    <ul data-aos="" class="products">
      ${products
        .map(
          (product) => `
      <li>
        <div class="product" data-aos="fade-right">
          <a href="/#/product/${product._id}">
            <img src="../images/bandana.jpg" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/${product._id}">
            ${true}
          </a>
        </div>
        <div class="product-rating">
          ${Rating.render({
            value: product.rating,
            text: `${product.numReviews} review(s)`,
          })}
        </div>
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class="product-price">
        ₦${product.price}
        </div>
        </div>
      </li>
      `
        )
        .join('\n')}

        
    `;
  },
};
export default HomeScreen;
