/* ============================================
   PORTFOLIO MAIN JAVASCRIPT (REFINED)
   Author: Vicky Adrian
   ============================================ */

(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /* ================= TYPING EFFECT ================= */

    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ['Network Engineer', 'Web Developer', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typingLoop() {
      if (!typedTextSpan) return;

      const currentText = textArray[textIndex];
      typedTextSpan.textContent = isDeleting
        ? currentText.substring(0, charIndex--)
        : currentText.substring(0, charIndex++);

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
      }

      setTimeout(typingLoop, isDeleting ? 50 : 100);
    }

    typingLoop();

    /* ================= MOBILE MENU ================= */

    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('menu');

    mobileMenu?.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navMenu?.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link =>
      link.addEventListener('click', () => {
        mobileMenu?.classList.remove('active');
        navMenu?.classList.remove('active');
      })
    );

    /* ================= BACK TO TOP ================= */

    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      backToTop?.classList.toggle('show', window.scrollY > 300);
    });

    backToTop?.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );

    /* ================= PROGRESS BAR ================= */

    const progressBars = document.querySelectorAll('.progress-bar');

    const barObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.progress;
            barObserver.unobserve(bar);
          }
        });
      },
      { threshold: 0.6 }
    );

    progressBars.forEach(bar => {
      bar.style.width = '0';
      barObserver.observe(bar);
    });

    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        const offset = document.querySelector('.header')?.offsetHeight || 0;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });

    /* ================= LAZY LOAD IMAGES ================= */

    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imgObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img =>
        imgObserver.observe(img)
      );
    }

    console.log('Portfolio initialized cleanly');
  });
})();