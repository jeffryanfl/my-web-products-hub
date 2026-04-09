// ============================================================
// SCRIPT.JS — My Web Products Hub
//
// TABLE OF CONTENTS:
//   1. No-JS Class Removal
//   2. Mobile Navigation Toggle
//   3. Smooth Scroll — Close Menu on Link Click
//   4. Active Navigation Highlight (IntersectionObserver)
//   5. Project Card Click (placeholder for non-Rockville cards)
//   6. Rockville Modal — Open / Close / Countdown / Focus Trap
// ============================================================


document.addEventListener('DOMContentLoaded', function () {


  // ==========================================================
  // 1. NO-JS CLASS REMOVAL
  // ==========================================================

  document.documentElement.classList.remove('no-js');


  // ==========================================================
  // 2. MOBILE NAVIGATION TOGGLE
  // ==========================================================

  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');

    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });


  // ==========================================================
  // 3. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
  // ==========================================================

  const allNavLinks = document.querySelectorAll('.nav-links a');

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });


  // ==========================================================
  // 4. ACTIVE NAVIGATION HIGHLIGHT (IntersectionObserver)
  // ==========================================================

  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        allNavLinks.forEach(function (l) { l.classList.remove('active'); });
        var link = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(function (section) {
    navObserver.observe(section);
  });


  // ==========================================================
  // 5. PROJECT CARD CLICK — Non-Rockville cards only
  // ==========================================================

  const projectCards = document.querySelectorAll('.project-card');
  const rockvilleCard = document.getElementById('rockvilleCard');

  projectCards.forEach(function (card) {
    // Skip the Rockville card — it has its own handler below
    if (card === rockvilleCard) return;

    card.addEventListener('click', function () {
      var projectName = card.querySelector('h3').textContent;
      alert(projectName + ' is coming soon! Check back later.');
    });

    // Keyboard support for non-Rockville cards
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });


  // ==========================================================
  // 6. ROCKVILLE MODAL — Open / Close / Countdown / Focus Trap
  // ==========================================================

  const modal      = document.getElementById('rockvilleModal');
  const modalClose = document.getElementById('modalClose');

  // Cache countdown DOM references
  const cdDays  = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins  = document.getElementById('cdMins');
  const cdSecs  = document.getElementById('cdSecs');

  // -- Open modal when Rockville card is clicked --
  rockvilleCard.addEventListener('click', function () {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';  // prevent background scroll
    startCountdown();
    modalClose.focus();  // move focus into the modal
  });

  // Keyboard support for Rockville card
  rockvilleCard.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      rockvilleCard.click();
    }
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
    rockvilleCard.focus();  // return focus to the triggering element
  }


  // -- Focus Trap inside modal --
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;

    var focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      // Shift+Tab: if on first element, wrap to last
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: if on last element, wrap to first
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });


  // -- Countdown Timer --
  // Rockville 2026 starts May 7, 2026 at 12:00 PM ET (UTC-4)
  const rockvilleDate = new Date('2026-05-07T12:00:00-04:00');
  let countdownInterval;

  function startCountdown() {
    clearInterval(countdownInterval);  // prevent stacking intervals
    updateCountdown();  // run once immediately
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  function updateCountdown() {
    var now  = new Date();
    var diff = rockvilleDate - now;

    if (diff <= 0) {
      cdDays.textContent  = '0';
      cdHours.textContent = '0';
      cdMins.textContent  = '0';
      cdSecs.textContent  = '0';
      clearInterval(countdownInterval);
      return;
    }

    var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var mins  = Math.floor((diff / (1000 * 60)) % 60);
    var secs  = Math.floor((diff / 1000) % 60);

    cdDays.textContent  = days;
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent  = String(mins).padStart(2, '0');
    cdSecs.textContent  = String(secs).padStart(2, '0');
  }


  // ==========================================================
  // LOG
  // ==========================================================
  console.log('script.js loaded — My Web Products Hub is live!');


}); // End of DOMContentLoaded
