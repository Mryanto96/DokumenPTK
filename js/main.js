// ===== DARK MODE =====
const html = document.documentElement;

function setTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  const ball = document.querySelector('.dark-toggle-ball');
  if (ball) ball.innerHTML = dark ? '🌙' : '☀️';
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;
  setTheme(isDark);
}

function toggleTheme() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// ===== ACTIVE NAV =====
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

// ===== FADE UP ON SCROLL =====
function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  
  els.forEach(el => observer.observe(el));
}

// ===== WHATSAPP FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      showNotif('Harap isi semua field!', 'error');
      return;
    }
    
    const waMessage = `*PORTAL SMP PERSIAPAN NEGERI PULAU TIGA*\n\n👤 *Nama*: ${name}\n📧 *Email*: ${email}\n\n📝 *Pesan*:\n${message}\n\n_Terima kasih sudah mengirim pesan. Pesan Anda akan segera di proses. ✋_`;
    const encoded = encodeURIComponent(waMessage);
    const waNumber = '6282254730476';
    
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
    showNotif('Membuka WhatsApp...', 'success');
    form.reset();
  });
}

// ===== NOTIFICATION =====
function showNotif(text, type = 'success') {
  const existing = document.querySelector('.notif');
  if (existing) existing.remove();
  
  const notif = document.createElement('div');
  notif.className = 'notif';
  notif.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    padding: 14px 20px; border-radius: 12px;
    background: ${type === 'success' ? 'linear-gradient(135deg,#25D366,#128C7E)' : 'linear-gradient(135deg,#FF6B6B,#FF8B94)'};
    color: white; font-weight: 600; font-size: 0.9rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    display: flex; align-items: center; gap: 8px;
    animation: fadeUp 0.4s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
  `;
  notif.innerHTML = `${type === 'success' ? '✅' : '⚠️'} ${text}`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

// ===== VIEW TOGGLE (documents page) =====
function initViewToggle() {
  const gridBtn = document.getElementById('gridBtn');
  const tableBtn = document.getElementById('tableBtn');
  const gridView = document.getElementById('gridView');
  const tableView = document.getElementById('tableView');
  
  if (!gridBtn) return;
  
  gridBtn.addEventListener('click', () => {
    gridView.style.display = 'grid';
    tableView.style.display = 'none';
    gridBtn.classList.add('active');
    tableBtn.classList.remove('active');
  });
  
  tableBtn.addEventListener('click', () => {
    gridView.style.display = 'none';
    tableView.style.display = 'block';
    gridBtn.classList.remove('active');
    tableBtn.classList.add('active');
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNav();
  initFadeUp();
  initContactForm();
  initViewToggle();
  
  // Dark toggle click
  const toggle = document.querySelector('.dark-toggle');
  if (toggle) toggle.addEventListener('click', toggleTheme);
  
  // Hamburger
  const ham = document.querySelector('.hamburger');
  if (ham) ham.addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobileMenu')?.classList.remove('open');
    });
  });
  
  // Add fade-up to elements on page
  setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.05}s`;
    });
  }, 100);
});
