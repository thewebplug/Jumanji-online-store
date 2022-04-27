const Aside = {
    render: async () => `
     <div class="aside-header">
      <div>SHOP BY CATEGORY</div>
      <button class="aside-close-button" id="aside-close-button"><i class="fab fa-xbox"></i></button>
    </div>
    <div class="aside-body">
      <ul class="categories">
        <li>
          <a href="/#/homescreen?q=bandana"
            >Bandana
            <span><i class="fa fa-chevron-right"></i></span>
          </a>
        </li> 
      </ul>
    </div>`,
    after_render: async () => {
      document.getElementById('aside-container').classList.remove('open');
      document
        .getElementById('aside-close-button')
        .addEventListener('click', async () => {
          document.getElementById('aside-container').classList.remove('open');
        });
    },
  };
  
  export default Aside;