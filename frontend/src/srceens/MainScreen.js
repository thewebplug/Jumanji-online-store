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
 				<h1>SLIDERS</h1>
 				<h1 class="shop-now" style="font-size: 40px;">Drip with style</h1>
 			</section>

 			<section class="os-animation" data-os-animation="bounceInUp" data-os-animation-delay=".1s">
 				  <a class="btn" href="#shop">
            <i class="fas fa-shopping-cart home-cart-icon"></i>
          </a>
          <br><br><br><br>

          <div class="narrow">
            <div class="col-12">
               <div class="row iconsLL text-center">
                  <div class="col-md-3">
                    <div class="feature">
                      <a href="/#/homescreen?q=shoe"><i class="fad fa white fa-shoe-prints"></i></a>
                    </div>
                  </div>
                
                
                  <div class="col-md-3">
                    <div class="feature">
                      <a href="/#/homescreen?q=shirt"><i class="fas white fa-tshirt"></i></a>
                    </div>
                  </div>
                
                
                  <div class="col-md-3">
                    <div class="feature">
                      <a href="/#/homescreen?q=dress"><img src="https://img.icons8.com/ios/50/000000/wedding-dress.png"></a>
                    </div>
                  </div>
                
                
                  <div class="col-md-3">
                    <div class="feature">
                      <a href="/#/homescreen?q=cap"><img src="https://img.icons8.com/ios-glyphs/50/000000/cap.png"></a>
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

    <ul id="shop" class="products">
      ${products
        .map(
          (product) => `
      <li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/1">
            ${product.name}
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
          $${product.price}
        </div>
        </div>
      </li>
      `
        )
        .join('\n')}

        
    `;
  },
};
export default MainScreen;
