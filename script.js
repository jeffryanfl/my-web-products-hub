// ============================================================
// SCRIPT.JS — Web Products Hub
//
// TABLE OF CONTENTS:
//   1. No-JS Class Removal
//   2. Mobile Navigation Toggle
//   3. Smooth Scroll — Close Menu on Link Click
//   4. Active Navigation Highlight (IntersectionObserver)
//   5. Project Card Click (generic cards)
//   6. Rockville Modal — Open / Close / Countdown / Focus Trap
//   7. Risk Management Modal — Open / Close / Focus Trap
//   8. Risk Calculator — Sliders + Chart.js
//   9. Interactive 5×5 Matrix — Highlight + Score Readout
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
  // 5. PROJECT CARD CLICK — Generic cards only
  // ==========================================================

  const projectCards = document.querySelectorAll('.project-card');
  const rockvilleCard = document.getElementById('rockvilleCard');
  const riskCard = document.getElementById('riskCard');

  // Cards with dedicated modals are handled separately
  var modalCards = [rockvilleCard, riskCard];

  projectCards.forEach(function (card) {
    if (modalCards.indexOf(card) !== -1) return;

    card.addEventListener('click', function () {
      var projectName = card.querySelector('h3').textContent;
      alert(projectName + ' is coming soon! Check back later.');
    });

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
  // 7. RISK MANAGEMENT MODAL — Open / Close / Focus Trap
  // ==========================================================

  var riskModal      = document.getElementById('riskModal');
  var riskModalClose = document.getElementById('riskModalClose');

  riskCard.addEventListener('click', function () {
    riskModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    riskModalClose.focus();
    // Canvas has zero size while the modal is hidden (display:none).
    // Wait one frame so the browser can lay out the now-visible modal,
    // then create or resize the chart.
    requestAnimationFrame(function () {
      requestAnimationFrame(initRiskChart);
    });
  });

  riskCard.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      riskCard.click();
    }
  });

  riskModalClose.addEventListener('click', closeRiskModal);

  riskModal.addEventListener('click', function (e) {
    if (e.target === riskModal) closeRiskModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && riskModal.classList.contains('active')) {
      closeRiskModal();
    }
  });

  function closeRiskModal() {
    riskModal.classList.remove('active');
    document.body.style.overflow = '';
    riskCard.focus();
  }

  // Focus trap for risk modal
  riskModal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;

    var focusable = riskModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });


  // ==========================================================
  // 8. RISK CALCULATOR — Sliders + Chart.js
  // ==========================================================

  var sliderImpact     = document.getElementById('sliderImpact');
  var sliderLikelihood = document.getElementById('sliderLikelihood');
  var sliderControl    = document.getElementById('sliderControl');

  var sliderImpactVal     = document.getElementById('sliderImpactVal');
  var sliderLikelihoodVal = document.getElementById('sliderLikelihoodVal');
  var sliderControlVal    = document.getElementById('sliderControlVal');

  // Central update — called on every slider move
  function onSliderInput() {
    sliderImpactVal.textContent     = sliderImpact.value;
    sliderLikelihoodVal.textContent = sliderLikelihood.value;
    sliderControlVal.textContent    = sliderControl.value + '%';
    updateRiskChart();
    updateCalcMatrix();
  }

  sliderImpact.addEventListener('input', onSliderInput);
  sliderLikelihood.addEventListener('input', onSliderInput);
  sliderControl.addEventListener('input', onSliderInput);

  // --- Chart instance (null until modal is first opened) ---
  var riskCalcChart = null;

  // Return text tier for a numeric risk score (0-25 scale)
  function riskTier(score) {
    if (score >= 17) return 'Critical';
    if (score >= 10) return 'High';
    if (score >= 5)  return 'Medium';
    return 'Low';
  }

  // Core risk calculation — pure function, no DOM dependency.
  // Accepts impact (1-5), likelihood (1-5), controlEffectiveness (0-100).
  // Returns scores and their text tiers.
  function calculateRisk(impact, likelihood, controlEffectiveness) {
    var inherentRisk = impact * likelihood;
    var residualRisk = inherentRisk * (1 - (controlEffectiveness / 100));

    return {
      inherentRisk:     inherentRisk,
      inherentTier:     riskTier(inherentRisk),
      residualRisk:     residualRisk,
      residualTier:     riskTier(residualRisk)
    };
  }

  // Read current slider positions and run the calculation
  function getRiskScores() {
    return calculateRisk(
      parseInt(sliderImpact.value),
      parseInt(sliderLikelihood.value),
      parseInt(sliderControl.value)
    );
  }

  // ==========================================================
  // 9. INTERACTIVE 5×5 MATRIX — highlight + score readout
  // ==========================================================

  var calcCells = document.querySelectorAll('#calcMatrix .calc-cell');

  // Score readout elements
  var inherentScoreText = document.getElementById('inherentScoreText');
  var inherentTierText  = document.getElementById('inherentTierText');
  var residualScoreText = document.getElementById('residualScoreText');
  var residualTierText  = document.getElementById('residualTierText');

  // Paint every cell with its static tier colour and score label once
  calcCells.forEach(function (cell) {
    var i = parseInt(cell.getAttribute('data-i'));
    var l = parseInt(cell.getAttribute('data-l'));
    var score = i * l;
    var tier  = riskTier(score);

    cell.textContent = score;
    cell.classList.add('tier-' + tier.toLowerCase());
  });

  // Find the residual cell: the grid cell whose score is closest to residualRisk
  function nearestCell(residualRisk) {
    var best = null;
    var bestDiff = Infinity;
    calcCells.forEach(function (cell) {
      var i = parseInt(cell.getAttribute('data-i'));
      var l = parseInt(cell.getAttribute('data-l'));
      var diff = Math.abs(i * l - residualRisk);
      if (diff < bestDiff) { bestDiff = diff; best = cell; }
    });
    return best;
  }

  function updateCalcMatrix() {
    var scores = getRiskScores();

    // Clear previous highlights
    calcCells.forEach(function (cell) {
      cell.classList.remove('mark-inherent', 'mark-residual');
    });

    // Highlight inherent cell (exact match — impact × likelihood)
    var impact     = parseInt(sliderImpact.value);
    var likelihood = parseInt(sliderLikelihood.value);
    var inherentCell = document.querySelector(
      '.calc-cell[data-i="' + impact + '"][data-l="' + likelihood + '"]'
    );
    if (inherentCell) inherentCell.classList.add('mark-inherent');

    // Highlight residual cell (nearest grid position)
    var residualCell = nearestCell(scores.residualRisk);
    if (residualCell) residualCell.classList.add('mark-residual');

    // Update score readout
    inherentScoreText.textContent = scores.inherentRisk;
    inherentTierText.textContent  = scores.inherentTier;
    residualScoreText.textContent = scores.residualRisk % 1 === 0
      ? scores.residualRisk
      : scores.residualRisk.toFixed(1);
    residualTierText.textContent  = scores.residualTier;
  }

  // Paint initial state
  updateCalcMatrix();


  // Called from slider listeners — only touches data, never creates the chart
  function updateRiskChart() {
    if (!riskCalcChart) return;                   // chart not built yet

    var scores = getRiskScores();
    riskCalcChart.data.datasets[0].data = [scores.inherentRisk, scores.residualRisk];
    riskCalcChart.update();
  }

  // Called once per modal open — creates or resizes the chart
  function initRiskChart() {
    var scores = getRiskScores();

    // If the chart already exists, just resize it to match the now-visible
    // container dimensions and push in the latest data.
    if (riskCalcChart) {
      riskCalcChart.data.datasets[0].data = [scores.inherentRisk, scores.residualRisk];
      riskCalcChart.resize();
      riskCalcChart.update();
      return;
    }

    // First open — create the chart from scratch
    var ctx = document.getElementById('riskCalcChart').getContext('2d');

    riskCalcChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Inherent Risk', 'Residual Risk'],
        datasets: [{
          label: 'Risk Score',
          data: [scores.inherentRisk, scores.residualRisk],
          backgroundColor: [
            'rgba(220, 53, 69, 0.85)',   // red  — inherent
            'rgba(60, 120, 216, 0.85)'   // blue — residual
          ],
          borderColor: [
            'rgb(220, 53, 69)',
            'rgb(60, 120, 216)'
          ],
          borderWidth: 1,
          borderRadius: 6,
          maxBarThickness: 80
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        scales: {
          y: {
            beginAtZero: true,
            max: 25,
            title: {
              display: true,
              text: 'Risk Score (Impact \u00d7 Likelihood)',
              color: '#cdd5e0'
            },
            ticks: { color: '#8a95a5', stepSize: 5 },
            grid:  { color: 'rgba(255,255,255,0.06)' }
          },
          x: {
            ticks: { color: '#cdd5e0' },
            grid:  { display: false }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return 'Score: ' + context.parsed.y.toFixed(1);
              }
            }
          }
        }
      }
    });
  }


  // ==========================================================
  // LOG
  // ==========================================================
  console.log('script.js loaded — Web Products Hub is live!');


}); // End of DOMContentLoaded
