// ============================================================
// SCRIPT.JS — My Web Products Hub
//
// TABLE OF CONTENTS:
//   1. Mobile Navigation Toggle
//   2. Smooth Scroll — Close Menu on Link Click
//   3. Active Navigation Highlight on Scroll
//   4. Project Card Click (placeholder)
// ============================================================


// ============================================================
// UTILITY — Wait for the page HTML to fully load before running
// ============================================================
document.addEventListener('DOMContentLoaded', function () {


  // ==========================================================
  // 1. MOBILE NAVIGATION TOGGLE
  //
  // When the hamburger button is clicked, add/remove the
  // "open" class on the nav-links list to show or hide it.
  // ==========================================================

  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    // classList.toggle adds the class if missing, removes it if present
    navLinks.classList.toggle('open');

    // Update the aria-label for accessibility (screen readers)
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });


  // ==========================================================
  // 2. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
  //
  // Without this, the menu stays open after the user taps a link,
  // which looks weird on mobile.
  // ==========================================================

  // querySelectorAll returns every <a> inside .nav-links as an array
  const allNavLinks = document.querySelectorAll('.nav-links a');

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');  // close the menu
    });
  });


  // ==========================================================
  // 3. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
  //
  // As you scroll down the page, the corresponding nav link
  // gets an "active" class so it's visually highlighted.
  // ==========================================================

  // Collect all the sections that have an id matching a nav link
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    // How far the page has been scrolled, plus a 100px offset for the sticky nav
    const scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId     = section.getAttribute('id');

      // Find the nav link that points to this section
      const matchingLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          // We're inside this section — mark the link active
          allNavLinks.forEach(l => l.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  // Run on page load and on every scroll event
  highlightNavOnScroll();
  window.addEventListener('scroll', highlightNavOnScroll);

  // Add the CSS for the active link right here so it's self-contained
  // (Alternatively you can add this to styles.css — your choice!)
  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .nav-links a.active {
      color: #ffffff;
      font-weight: 700;
      border-bottom: 2px solid #4a7043;
      padding-bottom: 2px;
    }
  `;
  document.head.appendChild(activeStyle);


  // ==========================================================
  // 4. PROJECT CARD CLICK — PLACEHOLDER
  //
  // Right now this just logs to the console. Later you can
  // replace this with a modal, a link, or a page redirect.
  // ==========================================================

  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(function (card, index) {
    card.addEventListener('click', function () {
      const projectName = card.querySelector('h3').textContent;
      console.log('You clicked: ' + projectName);
      // TODO: Replace this with real behavior, e.g.:
      // window.location.href = 'projects/project-1.html';
      alert('🚧 "' + projectName + '" is coming soon! Check back later.');
    });
  });


  // ==========================================================
  // LOG — Confirm the script loaded successfully
  // (You can delete this line once you've confirmed it works)
  // ==========================================================
  console.log('✅ script.js loaded successfully — My Web Products Hub is live!');


}); // End of DOMContentLoaded