/* =============================================
   PORTFOLIO JS — MIAN TUAHA AFZAL
   ============================================= */

// ---- Loader ----
const loader    = document.getElementById('loader');
const loaderNum = document.getElementById('loader-num');
const loaderFill = document.getElementById('loaderFill');

let count = 0;
document.body.style.overflow = 'hidden';

const interval = setInterval(() => {
  count += Math.floor(Math.random() * 3) + 1;
  if (count > 100) count = 100;
  loaderNum.textContent  = String(count).padStart(3, '0');
  loaderFill.style.width = count + '%';
  if (count === 100) {
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 420);
  }
}, 28);

// ---- Custom Cursor ----
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, input, textarea, .exp-card, .cert-card, .skill-cat, .cs-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
});

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Live Clock ----
function updateClock() {
  const t = new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false
  });
  const el = document.getElementById('navTime');
  if (el) el.textContent = `Pakistan · ${t} PKT`;
}
updateClock();
setInterval(updateClock, 1000);

// ---- Menu Toggle ----
const menuOverlay = document.getElementById('menuOverlay');
const menuBtn     = document.getElementById('menuBtn');
const menuClose   = document.getElementById('menuClose');

function openMenu() {
  menuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  menuOverlay.classList.remove('open');
  document.body.style.overflow = 'auto';
}

menuBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
document.querySelectorAll('.menu-link').forEach(l => l.addEventListener('click', closeMenu));

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ---- Smooth anchor scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Hero Orb Parallax ----
window.addEventListener('mousemove', e => {
  const orb = document.querySelector('.hero-orb');
  if (!orb) return;
  const x = (e.clientX / window.innerWidth  - 0.5) * 28;
  const y = (e.clientY / window.innerHeight - 0.5) * 28;
  orb.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`;
});

// ---- Contact Form (Web3Forms) ----
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const toast     = document.getElementById('formToast');

function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className   = 'form-toast form-toast--' + type + ' form-toast--visible';
  setTimeout(() => toast.classList.remove('form-toast--visible'), 5000);
}

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Basic validation
    const name  = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg   = document.getElementById('cMsg').value.trim();
    if (!name || !email || !msg) { showToast('Please fill in all fields.', 'error'); return; }

    // Loading state
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const data = new FormData(form);
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const json = await res.json();

      if (json.success) {
        showToast('✅  Message sent! I\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        showToast('❌  Something went wrong. Please try emailing me directly.', 'error');
      }
    } catch {
      showToast('❌  Network error. Please email me directly.', 'error');
    }

    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  });
}


