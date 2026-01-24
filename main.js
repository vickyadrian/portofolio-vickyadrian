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

/* ============================================
   DETTA AI CHATBOT - JAVASCRIPT COMPONENT
   ============================================
   
   Fungsionalitas:
   - Toggle buka/tutup panel chatbot
   - Mengirim pesan user
   - Menerima respon dari API
   - Loading indicator
   - Message history management
   
   Instruksi:
   1. Ganti API_ENDPOINT dengan endpoint backend Anda
   2. Customize sendMessage() sesuai API format Anda
   3. Tambahkan error handling dan validation sesuai kebutuhan
   
   ============================================ */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

/**
 * Konfigurasi API Chatbot
 * PENTING: Ganti dengan endpoint backend Anda sendiri
 */
const CHATBOT_CONFIG = {
  API_ENDPOINT: 'https://portofolio-vickyadrian.vercel.app/api/chat', // Backend aman
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
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
  notificationBadge: null,
};

const CHATBOT_STATE = {
  isOpen: false,
  isLoading: false,
  messageCount: 0,
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
  DOM_ELEMENTS.notificationBadge = document.getElementById('notification-badge');
}

function setupEventListeners() {
  DOM_ELEMENTS.button.addEventListener('click', toggleChatPanel);
  DOM_ELEMENTS.closeBtn.addEventListener('click', closeChatPanel);
  DOM_ELEMENTS.form.addEventListener('submit', handleSendMessage);
}

function toggleChatPanel() {
  CHATBOT_STATE.isOpen ? closeChatPanel() : openChatPanel();
}

function openChatPanel() {
  CHATBOT_STATE.isOpen = true;
  DOM_ELEMENTS.panel.classList.add('open');
  DOM_ELEMENTS.button.classList.add('active');
  DOM_ELEMENTS.input.focus();
}

function closeChatPanel() {
  CHATBOT_STATE.isOpen = false;
  DOM_ELEMENTS.panel.classList.remove('open');
  DOM_ELEMENTS.button.classList.remove('active');
}

function handleSendMessage(event) {
  event.preventDefault();

  const text = DOM_ELEMENTS.input.value.trim();
  if (!text || CHATBOT_STATE.isLoading) return;

  addMessageToChat(text, 'user');
  DOM_ELEMENTS.input.value = '';

  CHATBOT_STATE.conversationHistory.push({
    role: 'user',
    content: text,
    timestamp: new Date(),
  });

  sendMessageToAPI(text);
}

function addMessageToChat(text, sender) {
  const div = document.createElement('div');
  div.className = `chatbot-message ${sender}-message`;

  const content = document.createElement('div');
  content.className = 'message-content';
  content.textContent = text;

  div.appendChild(content);
  DOM_ELEMENTS.messages.appendChild(div);

  DOM_ELEMENTS.messages.scrollTop = DOM_ELEMENTS.messages.scrollHeight;
}

async function sendMessageToAPI(message) {
  CHATBOT_STATE.isLoading = true;
  DOM_ELEMENTS.input.disabled = true;
  DOM_ELEMENTS.sendBtn.disabled = true;

  const payload = {
    message: message,
    conversationId: getConversationId(),
    history: CHATBOT_STATE.conversationHistory,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CHATBOT_CONFIG.TIMEOUT);

    const response = await fetch(CHATBOT_CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    clearTimeout(timeout);

    const data = await response.json();
    const botReply = data.response || "Maaf, saya tidak dapat memproses pesan.";

    addMessageToChat(botReply, 'bot');

    CHATBOT_STATE.conversationHistory.push({
      role: 'bot',
      content: botReply,
      timestamp: new Date(),
    });

  } catch (err) {
    addMessageToChat("Kesalahan koneksi. Coba lagi.", "bot");
  } finally {
    CHATBOT_STATE.isLoading = false;
    DOM_ELEMENTS.input.disabled = false;
    DOM_ELEMENTS.sendBtn.disabled = false;
    DOM_ELEMENTS.input.focus();
  }
}

function getConversationId() {
  let id = localStorage.getItem('detta_conversation_id');
  if (!id) {
    id = "conv_" + Date.now();
    localStorage.setItem('detta_conversation_id', id);
  }
  return id;
}
