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

  // ===== LOADING INDICATOR =====
  let loadingOverlay = null;

  function showLoadingIndicator(fileName) {
  // Hapus loading yang sudah ada
  if (loadingOverlay) hideLoadingIndicator();

  loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-card">
      <div class="loading-spinner"></div>
      <div class="loading-text">
        <i class="fas fa-download"></i> Mengunduh File
        <strong style="display:block; margin-top:8px; font-size:1rem;">${fileName}</strong>
      </div>
      <div class="loading-message">Mohon tunggu, sedang mengunduh...</div>
      <div class="loading-hint">
        <i class="fas fa-info-circle"></i> 
        Koneksi internet mungkin lambat, harap sabar
      </div>
    </div>
  `;
  document.body.appendChild(loadingOverlay);

  // Animasi fade in
  setTimeout(() => {
    if (loadingOverlay) loadingOverlay.style.opacity = '1';
  }, 10);
  }

  function hideLoadingIndicator() {
  if (loadingOverlay) {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      if (loadingOverlay && loadingOverlay.remove) {
        loadingOverlay.remove();
        loadingOverlay = null;
      }
    }, 300);
  }
  }

  // ===== DOWNLOAD HANDLER =====
  function initDownloadButtons() {
  // Tunggu sebentar agar tabel sudah ter-load
  setTimeout(() => {
    const downloadBtns = document.querySelectorAll('.btn-download');

    downloadBtns.forEach(btn => {
      // Hapus event listener lama (hindari duplikasi)
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Ambil nama file dari baris tabel
        let fileName = '';
        const row = this.closest('tr');
        if (row) {
          const nameCell = row.querySelector('td:nth-child(2)');
          if (nameCell) {
            const nameSpan = nameCell.querySelector('span');
            fileName = nameSpan ? nameSpan.innerText : 'dokumen.pdf';
          }
        }

        // Bersihkan nama file
        fileName = fileName.replace(/[\\/*?:"<>|]/g, '').trim();
        if (!fileName.endsWith('.pdf')) fileName += '.pdf';

        const url = this.getAttribute('href');

        if (url) {
          // Tampilkan loading
          showLoadingIndicator(fileName);

          // Simulasikan proses download (beri waktu untuk loading)
          setTimeout(() => {
            // Buat link download
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Sembunyikan loading setelah download dimulai
            setTimeout(() => {
              hideLoadingIndicator();
              showNotif(`📥 ${fileName} mulai diunduh`, 'success');
            }, 6000);
          }, 600);
        }
      });
    });
  }, 2000);
  }

  // ===== WHATSAPP FORM =====
  function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
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
    position: fixed; bottom: 24px; right: 24px; z-index: 10001;
    padding: 14px 20px; border-radius: 12px;
    background: ${type === 'success' ? 'linear-gradient(135deg,#25D366,#128C7E)' : 'linear-gradient(135deg,#FF6B6B,#FF8B94)'};
    color: white; font-weight: 600; font-size: 0.9rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    display: flex; align-items: center; gap: 8px;
    animation: slideInRight 0.3s ease;
    font-family: 'Plus Jakarta Sans', sans-serif;
    max-width: 350px;
  `;
  notif.innerHTML = `${type === 'success' ? '✅' : '⚠️'} ${text}`;
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
  }

  // ===== VIEW TOGGLE (documents page) =====
  function initViewToggle() {
  const gridBtn = document.getElementById('gridBtn');
  const tableBtn = document.getElementById('tableBtn');
  const gridView = document.getElementById('gridView');
  const tableView = document.getElementById('tableView');

  if (!gridBtn) return;

  gridBtn.addEventListener('click', () => {
    if (gridView) gridView.style.display = 'grid';
    if (tableView) tableView.style.display = 'none';
    gridBtn.classList.add('active');
    tableBtn.classList.remove('active');
  });

  tableBtn.addEventListener('click', () => {
    if (gridView) gridView.style.display = 'none';
    if (tableView) tableView.style.display = 'block';
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
  initDownloadButtons();

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