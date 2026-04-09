// ============================================================
// SCRIPT.JS — My Web Products Hub
//
// TABLE OF CONTENTS:
//   1. Mobile Navigation Toggle
//   2. Smooth Scroll — Close Menu on Link Click
//   3. Active Navigation Highlight on Scroll
//   4. Project Card Click (placeholder for non-Rockville cards)
//   5. Rockville Modal — Open / Close / Countdown
// ============================================================


document.addEventListener('DOMContentLoaded', function () {


  // ==========================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ==========================================================

  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');

    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });


  // ==========================================================
  // 2. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
  // ==========================================================

  const allNavLinks = document.querySelectorAll('.nav-links a');

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });


  // ==========================================================
  // 3. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
  // ==========================================================

  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId     = section.getAttribute('id');

      const matchingLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          allNavLinks.forEach(l => l.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  highlightNavOnScroll();
  window.addEventListener('scroll', highlightNavOnScroll);

  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .nav-links a.active {
      color: #ffffff;
      font-weight: 700;
      border-bottom: 2px solid #5a9e50;
      padding-bottom: 2px;
    }
  `;
  document.head.appendChild(activeStyle);


  // ==========================================================
  // 4. PROJECT CARD CLICK — Non-Rockville cards only
  // ==========================================================

  const projectCards = document.querySelectorAll('.project-card');
  const rockvilleCard = document.getElementById('rockvilleCard');

  projectCards.forEach(function (card) {
    // Skip the Rockville card — it has its own handler below
    if (card === rockvilleCard) return;

    card.addEventListener('click', function () {
      const projectName = card.querySelector('h3').textContent;
      alert('🚧 "' + projectName + '" is coming soon! Check back later.');
    });
  });


  // ==========================================================
  // 5. ROCKVILLE MODAL — Open / Close / Countdown
  // ==========================================================

  const modal      = document.getElementById('rockvilleModal');
  const modalClose = document.getElementById('modalClose');

  // -- Open modal when Rockville card is clicked --
  rockvilleCard.addEventListener('click', function () {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';  // prevent background scroll
    startCountdown();
  });

  // -- Close modal via X button --
  modalClose.addEventListener('click', closeModal);

  // -- Close modal by clicking the dark overlay --
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // -- Close modal with Escape key --
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    clearInterval(countdownInterval);
  }


  // -- Countdown Timer --
  // Rockville 2026 starts May 7, 2026 at 12:00 PM ET (UTC-4)
  const rockvilleDate = new Date('2026-05-07T12:00:00-04:00');
  let countdownInterval;

  function startCountdown() {
    updateCountdown();  // run once immediately
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  function updateCountdown() {
    const now  = new Date();
    const diff = rockvilleDate - now;

    if (diff <= 0) {
      document.getElementById('cdDays').textContent  = '0';
      document.getElementById('cdHours').textContent = '0';
      document.getElementById('cdMins').textContent  = '0';
      document.getElementById('cdSecs').textContent  = '0';
      clearInterval(countdownInterval);
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);
    const secs  = Math.floor((diff / 1000) % 60);

    document.getElementById('cdDays').textContent  = days;
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMins').textContent  = String(mins).padStart(2, '0');
    document.getElementById('cdSecs').textContent  = String(secs).padStart(2, '0');
  }


  // ==========================================================
  // LOG
  // ==========================================================
  console.log('✅ script.js loaded successfully — My Web Products Hub is live!');


}); // End of DOMContentLoaded