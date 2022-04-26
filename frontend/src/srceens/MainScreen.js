import { getProducts } from '../api';
import Rating from '../components/Rating';
import { parseRequestUrl } from '../utils';

const MainScreen = {
  render: async () => {
    const {value} = parseRequestUrl();
    const products = await getProducts(value);
    if(products.error){
      return `<div class="error">${products.error}</div>`
    }
    return `
    
    <section class="landing-page">
 	<div class="inner">
 		<div class="landing-page-content">
     
 			<section class="os-animation" data-os-animation="bounceInUp" data-os-animation-delay="0s">
 				<h1 data-aos="zoom-in-up" data-aos-duration="1000" class="main-text">SLIDERS</h1>
 				<h1 data-aos="zoom-in-up" data-aos-duration="1000" class="shop-now" style="font-size: 40px;">Drip with style</h1>
 			</section>

 			<section class="os-animation" data-os-animation="bounceInUp" data-os-animation-delay=".1s">
 				  <a class="shop-icon btn" href="#shop">
            <img src="https://img.icons8.com/ios-glyphs/60/ff9b37/shop.png" data-aos="zoom-in-up" data-aos-duration="1000" class="fas fa-shopping-cart home-cart-icon"/>
          </a>
          <br><br><br><br>

          <div class="narrow">
            <div class="col-12">
               <div class="iconsLL text-center">
                  <div class="cat-icons col-md-3">
                    <div class="feature">
                    <a href="/#/homescreen?q=trainers"><img data-aos="zoom-in-right" data-aos-duration="1000" src="https://img.icons8.com/wired/60/ff9b37/trainers.png"></a>
                    </div>
                  </div>
                
                
                  <div class="cat-icons col-md-3">
                    <div class="feature">
                      <a href="/#/homescreen?q=shirt"><img data-aos="zoom-in-right" data-aos-duration="1000" src="https://img.icons8.com/pastel-glyph/60/ff9b37/t-shirt--v3.png"></a>
                    </div>
                  </div>
                  
                  <div class="cat-icons col-md-3">
                    <div class="feature">
                      <a href="/#/homescreen?q=bandana"><img data-aos="zoom-in-right" data-aos-duration="1000" src="https://img.icons8.com/ios-glyphs/60/ff9b37/bandana.png"/></a>
                    </div>
                  </div>
                
                
                  <div class="cat-icons col-md-3">
                    <div class="feature">
                      <a href="/#/homescreen?q=cap"><img data-aos="zoom-in-right" data-aos-duration="1000" src="https://img.icons8.com/pastel-glyph/60/ff9b37/cap--v1.png"/></a>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          <br><br><br><br>
 			</section>
 		</div>
 	</div>
 </section>

    <ul data-aos=""id="shop" data-bs-spy="scroll" data-bs-target="#header-container" data-bs-offset="0" class="scrollspy-example products-main-page" tabindex="0">
      ${products
        .map(
          (product) => `
      <li>
        <div data-aos="fade-right" class="product">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
          <div class="product-name">
            <a  href="/#/product/${product._id}">
              ${product.name}
            </a>
          </div>
          <div class="product-rating">
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} <span>review(s)</span>`,
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
    </ul>

        
    `;
  },
};
export default MainScreen;
