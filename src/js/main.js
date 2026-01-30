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

/* ================= DETTA CHATBOT ================= */

const CHATBOT_CONFIG = {
  API_ENDPOINT: '/api/chat', // Menggunakan path relatif agar bekerja di Vercel/Local
  TIMEOUT: 30000,
};

const DOM_ELEMENTS = {
  button: null,
  panel: null,
  messages: null,
  input: null,
  form: null,
  closeBtn: null,
  sendBtn: null,
  loadingIndicator: null,
};

const CHATBOT_STATE = {
  isOpen: false,
  isLoading: false,
  conversationHistory: [],
};

document.addEventListener('DOMContentLoaded', () => {
  cacheDOMElements();
  setupEventListeners();
});

function cacheDOMElements() {
  DOM_ELEMENTS.button = document.getElementById('chatbot-button');
  DOM_ELEMENTS.panel = document.getElementById('chatbot-panel');
  DOM_ELEMENTS.messages = document.getElementById('chatbot-messages');
  DOM_ELEMENTS.input = document.getElementById('chatbot-input');
  DOM_ELEMENTS.form = document.getElementById('chatbot-form');
  DOM_ELEMENTS.closeBtn = document.getElementById('chatbot-close-btn');
  DOM_ELEMENTS.sendBtn = document.getElementById('send-btn');
  DOM_ELEMENTS.loadingIndicator = document.getElementById('loading-indicator');
}

function setupEventListeners() {
  DOM_ELEMENTS.button?.addEventListener('click', toggleChatPanel);
  DOM_ELEMENTS.closeBtn?.addEventListener('click', closeChatPanel);
  DOM_ELEMENTS.form?.addEventListener('submit', handleSendMessage);
}

function toggleChatPanel() {
  CHATBOT_STATE.isOpen ? closeChatPanel() : openChatPanel();
}

function openChatPanel() {
  CHATBOT_STATE.isOpen = true;
  DOM_ELEMENTS.panel?.classList.add('open');
  DOM_ELEMENTS.button?.classList.add('active');
  DOM_ELEMENTS.input?.focus();
}

function closeChatPanel() {
  CHATBOT_STATE.isOpen = false;
  DOM_ELEMENTS.panel?.classList.remove('open');
  DOM_ELEMENTS.button?.classList.remove('active');
}

function handleSendMessage(event) {
  event.preventDefault();

  const text = DOM_ELEMENTS.input.value.trim();
  if (!text || CHATBOT_STATE.isLoading) return;

  // 1. Tambahkan ke UI
  addMessageToChat(text, 'user');
  
  // 2. Reset input
  DOM_ELEMENTS.input.value = '';

  // 3. Kirim ke API
  sendMessageToAPI(text);
}

function addMessageToChat(text, sender) {
  if (!DOM_ELEMENTS.messages) return;

  const div = document.createElement('div');
  div.className = `chatbot-message ${sender}-message`;

  const content = document.createElement('div');
  content.className = 'message-content';
  content.textContent = text;

  div.appendChild(content);
  DOM_ELEMENTS.messages.appendChild(div);

  // Auto scroll ke bawah
  DOM_ELEMENTS.messages.scrollTop = DOM_ELEMENTS.messages.scrollHeight;
}

function toggleLoading(show) {
  CHATBOT_STATE.isLoading = show;
  if (DOM_ELEMENTS.loadingIndicator) {
    DOM_ELEMENTS.loadingIndicator.style.display = show ? 'flex' : 'none';
  }
  if (DOM_ELEMENTS.input) DOM_ELEMENTS.input.disabled = show;
  if (DOM_ELEMENTS.sendBtn) DOM_ELEMENTS.sendBtn.disabled = show;
}

async function sendMessageToAPI(message) {
  toggleLoading(true);

  // Update history sebelum kirim
  const currentHistory = CHATBOT_STATE.conversationHistory.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  const payload = {
    message: message,
    history: currentHistory,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHATBOT_CONFIG.TIMEOUT);

    const response = await fetch(CHATBOT_CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.response || "Maaf, saya tidak dapat memproses pesan.";

    // Update State History (User & Bot)
    CHATBOT_STATE.conversationHistory.push({ role: 'user', content: message });
    CHATBOT_STATE.conversationHistory.push({ role: 'bot', content: botReply });

    // Tampilkan di UI
    addMessageToChat(botReply, 'bot');

  } catch (err) {
    console.error("Chatbot Error:", err);
    const errorMessage = err.name === 'AbortError' 
      ? "Respon terlalu lama. Silakan coba lagi." 
      : "Terjadi kesalahan koneksi. Pastikan internet Anda stabil.";
    addMessageToChat(errorMessage, "bot");
  } finally {
    toggleLoading(false);
    DOM_ELEMENTS.input?.focus();
  }
}
