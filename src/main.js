if (import.meta.env.DEV) {
  import('./css/debug.css');

  window.addEventListener('keydown', e => {
    if (e.ctrlKey && e.altKey && e.key === 'd') {
      // Ctrl + Alt + D -- turn on debug mode
      document.body.classList.toggle('debug-mode');
    }
  });
}

(() => {
  const refs = {
    openMobileMenuBtn: document.querySelector('[data-mobile-menu-open]'),
    closeMobileMenuBtn: document.querySelector('[data-mobile-menu-close]'),
    MobileMenu: document.querySelector('[data-mobile-menu]'),
    mobileMenuLinks: document.querySelectorAll(
      '[data-mobile-menu] a[href^="#"]'
    ),
  };

  refs.openMobileMenuBtn.addEventListener('click', toggleMobileMenu);
  refs.closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);

  refs.mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (refs.MobileMenu.classList.contains('is-open')) {
        toggleMobileMenu();
      }
    });
  });

  function toggleMobileMenu() {
    refs.MobileMenu.classList.toggle('is-open');
    document.body.classList.toggle('is-menu-open');
  }

  sectionsObserver();
  mediaChangeObserver();
})();

function sectionsObserver() {
  const navLinks = document.querySelectorAll('.header-nav-link');
  const sections = document.querySelectorAll('section');

  const options = {
    threshold: 0,
    rootMargin: '-80px 0px -70% 0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;

        navLinks.forEach(link => {
          link.classList.remove('current');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('current');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      navLinks.forEach(link => link.classList.remove('current'));
      navLinks[navLinks.length - 1].classList.add('current');
    }
  });
}

function mediaChangeObserver() {
  function handleTabletChange(e) {
    if (e.matches) {
      document.body.classList.remove('is-menu-open');

      const mobileMenu = document.querySelector('[data-mobile-menu]');
      if (mobileMenu) {
        mobileMenu.classList.remove('is-open');
      }
    }
  }

  const mediaQuery = window.matchMedia('(min-width: 1280px)');
  mediaQuery.addEventListener('change', handleTabletChange);
  handleTabletChange(mediaQuery);
}
