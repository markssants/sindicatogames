/**
 * SINDICATO GAMES - LANDING PAGE LINK IN BIO (MERCADO LIVRE EXCLUSIVO)
 * High-Converting Interactions, Urgency Logic, Audio FX & Configuration
 */

// =============================================================================
// 1. CONFIGURATION (EDIT YOUR LINK HERE OR USE THE ON-PAGE ⚙️ GEAR ICON)
// =============================================================================
const DEFAULT_CONFIG = {
  // Substitua pelo link de convite real do seu grupo de WhatsApp:
  whatsappGroupUrl: "https://chat.whatsapp.com/JOAAJU5C4FE7GBQ624XiGZ",

  // Redes Sociais:
  instagramUrl: "https://instagram.com/sindicatogames",
  tiktokUrl: "https://tiktok.com/@sindicatogames"
};

// Storage Key
const CONFIG_KEY = "sindicato_games_links_v2";

function loadConfig() {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Storage read error:", e);
  }
  return DEFAULT_CONFIG;
}

function saveConfig(newConfig) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
  } catch (e) {
    console.warn("Storage write error:", e);
  }
}

let activeConfig = loadConfig();

// Update all links across the DOM
function applyLinksToDom(cfg) {
  const whatsappButtons = document.querySelectorAll(".btn-join-whatsapp");
  whatsappButtons.forEach(btn => {
    btn.setAttribute("href", cfg.whatsappGroupUrl);
  });
}

// =============================================================================
// 2. AUDIO SYNTHESIZER (NO EXTERNAL ASSETS NEEDED, ZERO LATENCY)
// =============================================================================
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Play a futuristic cyber chime on click
function playCyberChime() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    
    // Note 1
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Note 2 harmonic
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1174.66, now + 0.06); // D6
    gain2.gain.setValueAtTime(0.05, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.35);
  } catch (err) {
    // Ignore audio permission errors
  }
}

// =============================================================================
// 3. CONFETTI BURST (NEON GOLD & GREEN GAMER PARTICLES)
// =============================================================================
function spawnNeonConfetti(originX, originY) {
  const colors = ["#FFE600", "#FFD000", "#F59E0B", "#25D366", "#00A650", "#FFFFFF"];
  const particleCount = 28;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti-piece";
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.boxShadow = `0 0 8px ${particle.style.backgroundColor}`;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 60 + Math.random() * 120;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity - 30; // Slight upward bias
    const rot = Math.random() * 720 - 360;

    const anim = particle.animate(
      [
        { transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0.4) rotate(${rot}deg)`, opacity: 0 }
      ],
      {
        duration: 800 + Math.random() * 400,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards"
      }
    );

    anim.onfinish = () => particle.remove();
  }
}

// =============================================================================
// 4. EVERGREEN COUNTDOWN & SLOTS URGENCY
// =============================================================================
function initCountdown() {
  const timerEl = document.getElementById("timerValue");
  const slotsRemainingEl = document.getElementById("slotsRemaining");
  const stickyRemainingEl = document.getElementById("stickyRemaining");
  const slotsFill = document.getElementById("slotsFill");

  if (!timerEl) return;

  const DURATION_KEY = "sindicato_timer_expiry_v2";
  let expiry = localStorage.getItem(DURATION_KEY);

  // 10 minutes session countdown
  if (!expiry || parseInt(expiry, 10) < Date.now()) {
    expiry = Date.now() + 10 * 60 * 1000 + 48 * 1000; // ~10:48
    localStorage.setItem(DURATION_KEY, expiry);
  } else {
    expiry = parseInt(expiry, 10);
  }

  function update() {
    const distance = Math.max(0, expiry - Date.now());
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // Dynamic slot reduction
    const progress = Math.min(1, Math.max(0, distance / (10 * 60 * 1000)));
    const remainingSlots = Math.max(3, Math.round(progress * 14));
    
    if (slotsRemainingEl) slotsRemainingEl.textContent = remainingSlots;
    if (stickyRemainingEl) stickyRemainingEl.textContent = remainingSlots;

    const percentageFilled = Math.min(98, 100 - Math.round(remainingSlots * 2.5));
    if (slotsFill) slotsFill.style.width = `${percentageFilled}%`;

    if (distance <= 0) {
      // Smooth reset to preserve urgency
      expiry = Date.now() + 9 * 60 * 1000 + 30 * 1000;
      localStorage.setItem(DURATION_KEY, expiry);
    }
  }

  update();
  setInterval(update, 1000);
}

// =============================================================================
// 5. ANNOUNCEMENT TICKER (ROTATING DEALS HEADER)
// =============================================================================
function initAnnouncementTicker() {
  const tickerItems = document.querySelectorAll(".ticker-item");
  if (!tickerItems.length) return;

  let currentIndex = 0;
  setInterval(() => {
    tickerItems[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % tickerItems.length;
    tickerItems[currentIndex].classList.add("active");
  }, 3600);
}

// =============================================================================
// 6. LIVE SOCIAL PROOF TOAST (MERCADO LIVRE & WHATSAPP)
// =============================================================================
function initLiveToast() {
  const toast = document.getElementById("liveToast");
  const titleEl = document.getElementById("toastTitle");
  const textEl = document.getElementById("toastText");

  if (!toast) return;

  const socialEvents = [
    { title: "Matheus F. (São Paulo)", text: "acabou de entrar no Grupo WhatsApp!" },
    { title: "Gabriel R. (Curitiba)", text: "economizou R$ 810 na RTX 4060 Full!" },
    { title: "Lucas 'Kaos' (Rio de Janeiro)", text: "acabou de entrar no Grupo VIP!" },
    { title: "🔥 Achadinho Mercado Livre:", text: "SSD NVMe 1TB por R$ 319 com Frete Grátis" },
    { title: "Felipe M. (Belo Horizonte)", text: "acabou de entrar no Grupo WhatsApp!" },
    { title: "⚡ Cupom Mercado Livre:", text: "PS5 Slim com R$ 700 OFF esgotando rápido!" },
    { title: "Thiago S. (Brasília)", text: "acabou de entrar no Grupo VIP!" },
    { title: "Rodrigo B. (Porto Alegre)", text: "pegou o cupom de 50% OFF em teclado mecânico" }
  ];

  let index = 0;

  function showNextToast() {
    const item = socialEvents[index % socialEvents.length];
    titleEl.textContent = item.title;
    textEl.textContent = item.text;

    toast.classList.add("show");

    // Hide after 4.2 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4200);

    index++;
  }

  // First toast after 3 seconds
  setTimeout(showNextToast, 3000);

  // Subsequent toasts every 12 to 16 seconds
  setInterval(showNextToast, 13000);
}

// =============================================================================
// 7. STICKY MOBILE BOTTOM BAR (IN-BIO CONVERSION)
// =============================================================================
function initStickyMobileBar() {
  const stickyBar = document.getElementById("mobileStickyCta");
  const heroBtn = document.getElementById("mainWhatsappBtn");

  if (!stickyBar || !heroBtn) return;

  // Use IntersectionObserver to display sticky bar when hero button is scrolled past
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            stickyBar.classList.add("visible");
          } else {
            stickyBar.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(heroBtn);
  } else {
    // Fallback scroll listener
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      if (scrollPos > 320) {
        stickyBar.classList.add("visible");
      } else {
        stickyBar.classList.remove("visible");
      }
    }, { passive: true });
  }
}

// =============================================================================
// 8. FAQ ACCORDION
// =============================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Optional: close other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove("active");
          other.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        }
      });

      if (isActive) {
        item.classList.remove("active");
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
        playCyberChime();
      }
    });
  });
}

// =============================================================================
// 9. CONFIGURATION MODAL (EASY USER SETUP)
// =============================================================================
function initConfigModal() {
  const modal = document.getElementById("configModal");
  const toggleBtn = document.getElementById("configToggleBtn");
  const closeBtn = document.getElementById("modalCloseBtn");
  const form = document.getElementById("configForm");

  const inputWhatsapp = document.getElementById("cfgWhatsapp");
  const inputInstagram = document.getElementById("cfgInstagram");
  const inputTiktok = document.getElementById("cfgTiktok");

  if (!modal || !toggleBtn || !form) return;

  toggleBtn.addEventListener("click", () => {
    inputWhatsapp.value = activeConfig.whatsappGroupUrl;
    inputInstagram.value = activeConfig.instagramUrl;
    inputTiktok.value = activeConfig.tiktokUrl;
    modal.showModal();
  });

  closeBtn?.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    activeConfig = {
      whatsappGroupUrl: inputWhatsapp.value.trim() || DEFAULT_CONFIG.whatsappGroupUrl,
      instagramUrl: inputInstagram.value.trim() || DEFAULT_CONFIG.instagramUrl,
      tiktokUrl: inputTiktok.value.trim() || DEFAULT_CONFIG.tiktokUrl
    };

    saveConfig(activeConfig);
    applyLinksToDom(activeConfig);
    modal.close();
    playCyberChime();

    // Show friendly confirmation toast
    const toast = document.getElementById("liveToast");
    const titleEl = document.getElementById("toastTitle");
    const textEl = document.getElementById("toastText");
    if (toast && titleEl && textEl) {
      titleEl.textContent = "✅ Link Atualizado com Sucesso!";
      textEl.textContent = "O botão do grupo agora aponta para seu WhatsApp.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4000);
    }
  });
}

// =============================================================================
// 10. CTA CLICK HANDLERS & SOUND FX TOGGLE
// =============================================================================
function initCtaClickEffects() {
  const ctaButtons = document.querySelectorAll(".btn-join-whatsapp");

  ctaButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      spawnNeonConfetti(originX, originY);
      playCyberChime();

      // Check if URL is still default placeholder
      const href = btn.getAttribute("href");
      if (href && href.includes("SEU_LINK_AQUI")) {
        console.info("💡 Lembre-se de configurar o link real do seu grupo do WhatsApp no app.js ou clicando na engrenagem ⚙️!");
      }
    });
  });

  // Sound toggle button
  const soundBtn = document.getElementById("soundToggleBtn");
  if (soundBtn) {
    const onIcon = soundBtn.querySelector(".sound-icon-on");
    const offIcon = soundBtn.querySelector(".sound-icon-off");

    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        onIcon.style.display = "block";
        offIcon.style.display = "none";
        playCyberChime();
      } else {
        onIcon.style.display = "none";
        offIcon.style.display = "block";
      }
    });
  }

  // Update current year in footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// =============================================================================
// INITIALIZE APPLICATION
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  applyLinksToDom(activeConfig);
  initCountdown();
  initAnnouncementTicker();
  initLiveToast();
  initStickyMobileBar();
  initFaqAccordion();
  initConfigModal();
  initCtaClickEffects();
});
