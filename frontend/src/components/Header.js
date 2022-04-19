import { getUserInfo } from '../localStorage';

const Header = {
  render: () => ` 
  <button id="aside-open-button">
      <p><i class="fas fa-hamburger hamburger"></i></p>
  </button>

  `,
  after_render: () => {

  },
};
export default Header;