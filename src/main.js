import './css/main.css';

if (import.meta.env.DEV) {
  import('./css/debug.css');

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'd') { // Ctrl + D увімкне дебаг
      document.body.classList.toggle('debug-mode');
    }
  });
}

(() => {
  const refs = {
    openMobileMenuBtn: document.querySelector('[data-mobile-menu-open]'),
    closeMobileMenuBtn: document.querySelector('[data-mobile-menu-close]'),
    MobileMenu: document.querySelector('[data-mobile-menu]'),
  };

  refs.openMobileMenuBtn.addEventListener('click', toggleMobileMenu);
  refs.closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);

  function toggleMobileMenu() {
    refs.MobileMenu.classList.toggle('is-open');
  }
})();
