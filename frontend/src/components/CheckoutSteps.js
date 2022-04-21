const CheckoutSteps = {
  render: (props) => `
    <div class="checkout-steps">
      <div class="checkout-inner">
            <div class="${props.step1 ? 'steps activeLL' : 'steps'}">
                  1
              <!--Signin-->
            </div>
            <div class="${props.step1 ? 'line activeLL' : 'line'}">
            </div>
            <div class="${props.step2 ? 'steps activeLL' : 'steps'}">
                  2
              <!--Shipping-->
            </div>
            <div class="${props.step2 ? 'line activeLL' : 'line'}">
            </div>
            <div class="${props.step3 ? 'steps activeLL' : 'steps'}">
                  3
              <!--Payment-->
            </div>
            <div class="${props.step3 ? 'line activeLL' : 'line'}">
            </div>
            <div class="${props.step4 ? 'steps activeLL' : 'steps'}">
                  4
              <!--Place Order-->
            </div>      
      </div>
    <div class="checkout-words">
        <div><p class="${props.step1 ? 'activeLL-mini mg-rght-min-13' : 'mg-rght-min-13'}">Signin<p></div>
        <div><p class="${props.step2 ? 'activeLL-mini ' : ''}">Shipping</p></div>
        <div><p class="${props.step3 ? 'activeLL-mini' : ''}">Payment</p></div>
        <div><p class="${props.step4 ? 'activeLL-mini mg-lft-min-10' : 'mg-lft-min-10'}">Order</p></div>
      </div>
    </div>
    `,
};
export default CheckoutSteps;
