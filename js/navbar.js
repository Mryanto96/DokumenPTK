// Navbar HTML template - included via JS
function renderNavbar() {
  return `
  <nav class="navbar">
    <div class="container">
      <div class="nav-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon">SMP</div>
          <div class="logo-text">
            <span class="logo-title">SMP Persiapan Negeri</span>
            <span class="logo-sub">Pulau Tiga • Maluku</span>
          </div>
        </a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="documents.html">Dokumen</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
        <div class="nav-right">
          <button class="dark-toggle" aria-label="Toggle dark mode">
            <div class="dark-toggle-ball">☀️</div>
          </button>
          <button class="hamburger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <a href="index.html">🏠 Home</a>
    <a href="documents.html">📁 Dokumen</a>
    <a href="contact.html">📬 Contact</a>
    <a href="about.html">👤 About</a>
  </div>
  `;
}
