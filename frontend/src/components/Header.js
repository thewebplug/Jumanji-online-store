import { getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    return ` 
  <button id="aside-open-button">
      <p>&#9776;</p>
  </button>
  <div class="brand-title">
    <a href="/#/">jumanji</a>
  </div>
  <div class="search">
  <form class="search-form"  id="search-form">
    <input type="text" name="q" id="q" value="${value || ''}" /> 
    <button  type="submit"><i class="fa fa-search"></i></button>
  </form>        
  </div>
  <div class="sign-in">
    ${
      name
        ? `<a class="profile-icon" href="/#/profile"><i class="fas fa-user-alt"></i></a>`
        : `<a class="profile" href="/#/signin">Sign-In</a>`
    }    
      <a class="cart-icon" href="/#/cart">
      <i class="fal fa fa-shopping-cart"></i></a>
      ${isAdmin ? `<a class="dashboard-icon" href="/#/dashboard">Dashboard</a>` : ''}
  </div>`;
  },
  after_render: () => {
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/?q=${searchKeyword}`;
      });

    document
      .getElementById('aside-open-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.add('open');
      });
  },
};
export default Header;