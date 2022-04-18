/* eslint-disable no-use-before-define */
import { hideLoading, parseRequestUrl, rerender, showLoading, showMessage } from '../utils';
import { deliverOrder, getOrder, getOrders, getPaypalClientId} from '../api';
import { getUserInfo } from '../localStorage';


const addPaypalSdk = async (totalPrice) => {
  const clientId = await getPaypalClientId();
  showLoading();
  if(!window.paypal){
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => finalTest(totalPrice);
    document.body.appendChild(script)
  }else{
    finalTest(totalPrice);
  }
};
    /* const getTotalAmount = () => {
      const requestUrl = parseRequestUrl();
      
    } */
    // Set up a container element for the button
    const finalTest = async (totalPrice) => {
      const clientIdll = await getOrders();// flaw
      paypal.Buttons({
        // Sets up the transaction when a payment button is clicked
        createOrder: (data, actions) => actions.order.create({
            purchase_units: [{
              amount: {
                value: totalPrice // Can also reference a variable or function
              }
            }]
          }),
        // Finalize the transaction after payer approval
        onApprove: (data, actions) => actions.order.capture().then((orderData) => {
            // Successful capture! For dev/demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            const transaction = orderData.purchase_units[0].payments.captures[0];
            alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
            // When ready to go live, remove the alert and show a success message within this page. For example:
            // const element = document.getElementById('paypal-button-container');
            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
            // Or go to another URL:  actions.redirect('thank_you.html');
          })
        }).render('#paypal-button-container');
        hideLoading()
        
      }
const OrderScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    if(document.getElementById('deliver-order-button')){
      document.addEventListener('click', async() => {
        showLoading();
        await deliverOrder(request.id);
        hideLoading();
        showMessage('Order Delivered', () => {
          rerender(OrderScreen);
        })
        rerender(OrderScreen);
      });
    }
  },
  render: async () => {
    const {isAdmin} = getUserInfo();
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);
    
    if(!isPaid){
      addPaypalSdk(totalPrice.toString()); // kickstart
    }
    return `
    
    <div>
      <h1>Order ${_id}</h1>
      <div class="order">
        <div class="order-info">
          <div>
            <h2>Shipping</h2>
            <div>
            ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, 
            ${shipping.country}
            </div>
            ${isDelivered ? `<div class="success">Delivered at ${deliveredAt}</div>`:
            `<div class="error">Not Delivered</div>`
          }
          </div>
          <div>
            <h2>Payment</h2>
            <div>
              Payment Method : ${payment.paymentMethod}
            </div>
            ${isPaid ? `<div class="success">Paid at ${paidAt}</div>`:
            `<div class="error">Not Paid</div>`
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
                      <a href="/#/product/${item.product}">${item.name} </a>
                    </div>
                    <div> Qty: ${item.qty} </div>
                  </div>
                  <div class="cart-price"> $${item.price}</div>
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
                 <li><div>Items</div><div>$${itemsPrice}</div></li>
                 <li><div>Shipping</div><div>$${shippingPrice}</div></li>
                 <li><div>Tax</div><div>$${taxPrice}</div></li>
                 <li class="total"><div>Order Total</div><div>$${totalPrice}</div></li>
                 <li><div id="paypal-button-container"></div>
                 </li> 
                 <li>${
                   isPaid && !isDelivered && isAdmin ? 
                   `<button id="deliver-order-button" class="primary fw">Deliver Order</button>` : ''
                 }</li>
                 <li>
                 
        </div>
      </div>
    </div>
    `;
  },
};
export default OrderScreen;