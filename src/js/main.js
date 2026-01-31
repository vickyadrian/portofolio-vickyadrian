/* ============================================
   PORTFOLIO MAIN JAVASCRIPT (REFINED)
   Author: Vicky Adrian
   Refactored by: Manus AI
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

/**
 * Konfigurasi Chatbot
 */
const CHATBOT_CONFIG = {
  API_ENDPOINT: '/api/chat',
  TIMEOUT: 30000,
};

/**
 * Cache elemen DOM untuk performa dan kemudahan akses
 */
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

/**
 * State Management Chatbot
 * Memisahkan data dari UI untuk konsistensi
 */
const CHATBOT_STATE = {
  isOpen: false,
  isLoading: false,
  conversationHistory: [], // Menyimpan riwayat chat agar AI memiliki konteks
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
  // Gunakan optional chaining untuk menghindari error jika elemen tidak ditemukan
  DOM_ELEMENTS.button?.addEventListener('click', toggleChatPanel);
  DOM_ELEMENTS.closeBtn?.addEventListener('click', closeChatPanel);
  
  // Mencegah duplikasi event listener jika script dimuat ulang
  DOM_ELEMENTS.form?.removeEventListener('submit', handleSendMessage);
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

/**
 * Handler saat user mengirim pesan
 */
function handleSendMessage(event) {
  event.preventDefault();

  const text = DOM_ELEMENTS.input.value.trim();
  
  // Validasi: Jangan kirim jika kosong atau sedang loading
  if (!text || CHATBOT_STATE.isLoading) return;

  // 1. Tampilkan pesan user di UI
  addMessageToChat(text, 'user');
  
  // 2. Reset input field segera setelah kirim
  DOM_ELEMENTS.input.value = '';

  // 3. Kirim ke API untuk mendapatkan respon AI
  sendMessageToAPI(text);
}

/**
 * Menambahkan bubble chat ke container
 * @param {string} text - Isi pesan
 * @param {string} sender - 'user' atau 'bot'
 */
function addMessageToChat(text, sender) {
  if (!DOM_ELEMENTS.messages) return;

  const div = document.createElement('div');
  div.className = `chatbot-message ${sender}-message`;

  const content = document.createElement('div');
  content.className = 'message-content';
  
  // Menggunakan textContent untuk keamanan (mencegah XSS)
  content.textContent = text;

  div.appendChild(content);
  DOM_ELEMENTS.messages.appendChild(div);

  // Auto scroll ke pesan terbaru
  DOM_ELEMENTS.messages.scrollTop = DOM_ELEMENTS.messages.scrollHeight;
}

/**
 * Mengatur status loading UI
 */
function toggleLoading(show) {
  CHATBOT_STATE.isLoading = show;
  if (DOM_ELEMENTS.loadingIndicator) {
    DOM_ELEMENTS.loadingIndicator.style.display = show ? 'flex' : 'none';
  }
  // Disable input & button saat loading untuk mencegah spam
  if (DOM_ELEMENTS.input) DOM_ELEMENTS.input.disabled = show;
  if (DOM_ELEMENTS.sendBtn) DOM_ELEMENTS.sendBtn.disabled = show;
}

/**
 * Komunikasi dengan Backend API
 */
async function sendMessageToAPI(message) {
  toggleLoading(true);

  // Payload yang dikirim ke backend mencakup pesan baru dan riwayat sebelumnya
  const payload = {
    message: message,
    history: CHATBOT_STATE.conversationHistory,
  };

  try {
    // Implementasi timeout untuk mencegah request menggantung selamanya
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.response || "Maaf, saya tidak dapat memproses pesan.";

    // PENTING: Update State History (User & Bot)
    // Ini memastikan AI tahu apa yang dibicarakan sebelumnya pada prompt berikutnya
    CHATBOT_STATE.conversationHistory.push({ role: 'user', content: message });
    CHATBOT_STATE.conversationHistory.push({ role: 'assistant', content: botReply });

    // Tampilkan respon bot di UI
    addMessageToChat(botReply, 'bot');

  } catch (err) {
    console.error("Chatbot Error:", err);
    let errorMessage = "Terjadi kesalahan koneksi. Silakan coba lagi.";
    
    if (err.name === 'AbortError') {
      errorMessage = "Respon terlalu lama. Silakan coba lagi.";
    } else if (err.message.includes("API key")) {
      errorMessage = "Konfigurasi API Key belum benar di server.";
    }
    
    addMessageToChat(errorMessage, "bot");
  } finally {
    toggleLoading(false);
    // Kembalikan fokus ke input setelah selesai
    DOM_ELEMENTS.input?.focus();
  }
}
