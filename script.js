// ============================================================
// SCRIPT.JS — My Web Products Hub
//
// TABLE OF CONTENTS:
//   1. Mobile Navigation Toggle
//   2. Smooth Scroll — Close Menu on Link Click
//   3. Active Navigation Highlight on Scroll
//   4. Project Card Click (placeholder)
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
  // 4. PROJECT CARD CLICK — PLACEHOLDER
  // ==========================================================

  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(function (card, index) {
    card.addEventListener('click', function () {
      const projectName = card.querySelector('h3').textContent;
      console.log('You clicked: ' + projectName);
      alert('🚧 "' + projectName + '" is coming soon! Check back later.');
    });
  });


  console.log('✅ script.js loaded successfully — My Web Products Hub is live!');


});