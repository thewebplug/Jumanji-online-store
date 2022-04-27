/* eslint-disable eqeqeq */
import {
  parseRequestUrl,
  showLoading,
  hideLoading,
  showMessage,
  rerender,
} from '../utils';
import { getOrder, getPaystackPublicKey, payOrder, deliverOrder, verifyTransaction } from '../api';
import { getUserInfo } from '../localStorage';

const OrderScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    if(document.getElementById('deliver-order-button')){
      document.getElementById('deliver-order-button').addEventListener('click', async() => {
        showLoading();
        await deliverOrder(request.id);
        hideLoading();
        showMessage('Ordere Delivred');
        rerender(OrderScreen);
        
      });
    }

    const {totalPrice, isPaid} = await getOrder(request.id)
    const {email} = getUserInfo();
    const publicKey = await getPaystackPublicKey();
    
    const paymentForm = document.getElementById('paymentForm');
    if(!isPaid){
      paymentForm.addEventListener('submit', payWithPaystack, false);
    }
    function payWithPaystack() {
      const handler = PaystackPop.setup({
        key: publicKey, // Replace with your public key
        email,
        amount: totalPrice * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
        ref: `${Math.floor((Math.random() * 1000000000) + 1)}`, // Replace with a reference you generated
        callback(response) {
          // this happens after the payment is completed successfully
          const {reference} = response;
          // Make an AJAX call to your server with the reference to verify the transaction
          (async () => {
            const innerChecking = await verifyTransaction(reference);
            
            if(innerChecking.status == "success" && innerChecking.gateway_response == "Successful") {
              showLoading();
              await payOrder(parseRequestUrl().id, {
                reference,
                transID: response.trans,
                transactionID: response.transaction,
                trxrefID: response.trxref,
              });
                hideLoading();
                showMessage(`Payment complete! Reference: ${  reference}`, () => {
                rerender(OrderScreen);
              });
            }else{
              showMessage(`There's been an Issue with your payment Reference: ${  reference}`, () => {
                rerender(OrderScreen);
              });
            }
          })();
            

            
        },
        onClose() {
          showMessage('Transaction was not completed, window closed.');
        },
      });
      handler.openIframe();
    }
  },
  render: async () => {
    const { isAdmin } = getUserInfo();
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);
   
    return `
    <div>
      <div class="order">
        <div class="order-info">
          <div>
            <h2>Shipping</h2>
            <div>
            ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
            ${shipping.country}
            </div>
            ${
              isDelivered
                ? `<div class="success">Delivered at ${deliveredAt}</div>`
                : `<div class="error">Not Delivered</div>`
            }
             
          </div>
          <div>
            <h2>Payment</h2>
            <div>
              Payment Method : ${payment.paymentMethod}
            </div>
            ${
              isPaid
                ? `<div class="success">Paid at ${paidAt}</div>`
                : `<div class="error">Not Paid</div>`
            }
          </div>
          <div>
            <ul class="cart-list-container">
              <li>
                <h2>Shopping Cart</h2>
                <div>Price</div>
              </li>
              ${orderItems
                .map(
                  (item) => `
                <li>
                  <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" />
                  </div>
                  <div class="cart-name">
                    <div>
                      <a class="white" href="/#/product/${item.product}">${item.name} </a>
                    </div>
                    <div> Qty: ${item.qty} </div>
                  </div>
                  <div class="cart-price"> ₦${item.price}</div>
                </li>
                `
                )
                .join('\n')}
            </ul>
          </div>
        </div>
        <div class="order-action">
           <ul>
                <li>
                  <h2>Order Summary</h2>
                 </li>
                 <li><div>Items</div><div>₦${itemsPrice}</div></li>
                 <li><div>Shipping</div><div>₦${shippingPrice}</div></li>
                 <li class="total"><div>Order Total</div><div>₦${totalPrice}</div></li>  
                 <br>                
                 <li>
                  ${
                    !isPaid ?
                    `
                      <form class="fw" id="paymentForm">
                      <div class="form-submit">
                        <button class="fw paystack-btn" type="submit" onclick="payWithPaystack()">
                         <img class="paystack-image" src="images/paystack-banner.png" width="200" height="40">
                        </button>
                      </div>
                      </form>
                    `
                    : ''
                  }
                 </li>
                 <li>
                 ${
                   isPaid && !isDelivered && isAdmin
                     ? `<button id="deliver-order-button" class="primary fw">Deliver Order</button>`
                     : ''
                 }
                 <li>
               
        </div>
      </div>
    </div>
    `;
  },
};
export default OrderScreen;