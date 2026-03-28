/* ============================================================
   RAJA D – PORTFOLIO SCRIPT
   ============================================================ */

/* ---------- Theme Toggle ---------- */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
}

/* ---------- Navbar scroll & active ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Back to top
  const backToTop = document.getElementById('back-to-top');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

/* ---------- Hamburger Menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* ---------- Back to Top ---------- */
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Typewriter Effect ---------- */
const typewriterEl = document.getElementById('typewriter');
const words = ['Frontend developer', 'React.js Developer', 'java Developer', 'MERN Stack Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 110;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 55;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 110;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typingSpeed = 1800; // pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}
setTimeout(type, 800);

/* ---------- Intersection Observer (AOS-like) ---------- */
const aosElements = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');

      // Trigger skill bars when skills section is visible
      if (entry.target.closest('#skills')) {
        animateSkillBars();
      }
      // Trigger CGPA bar
      if (entry.target.closest('#education')) {
        animateCGPABar();
      }
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

aosElements.forEach(el => observer.observe(el));

/* ---------- Skill Bar Animations ---------- */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  skillsAnimated = true;
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const target = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = target + '%';
    }, 200);
  });
}

/* ---------- CGPA Bar ---------- */
let cgpaAnimated = false;

function animateCGPABar() {
  if (cgpaAnimated) return;
  cgpaAnimated = true;
  const cgpaFill = document.querySelector('.cgpa-fill');
  if (cgpaFill) {
    const target = cgpaFill.getAttribute('data-cgpa');
    setTimeout(() => {
      cgpaFill.style.width = target + '%';
    }, 300);
  }
}

/* ---------- Smooth Scroll for internal links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

/* ---------- Contact Form ---------- */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.querySelector('.contact-form button');
  const success = document.getElementById('form-success');
  const form = document.getElementById('contact-form');

  // Collect form data
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector('textarea').value;

  btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Redirecting…';
  btn.disabled = true;

  // Format the WhatsApp message
  const whatsappNumber = "918098381447";
  const whatsappMessage = `Hello Raja,\n\nI am contacting you from your portfolio website.\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:*\n${message}`;

  // Encode the message
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  setTimeout(() => {
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    form.reset();
    btn.innerHTML = '<i class="bx bx-check"></i> Sent via WhatsApp';
    btn.disabled = false;
    success.classList.add('visible');

    setTimeout(() => {
      btn.innerHTML = '<i class="bx bx-send"></i> Send Message';
      success.classList.remove('visible');
    }, 5000);
  }, 800);
}

/* ---------- Resume Download ---------- */
function downloadResume() {
  // Create a simple placeholder resume notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed; bottom: 80px; right: 24px; z-index: 9999;
    background: linear-gradient(135deg, #10b981, #14b8a6);
    color: white; padding: 14px 22px; border-radius: 12px;
    font-size: 0.88rem; font-weight: 600;
    box-shadow: 0 8px 24px rgba(16, 185, 129,0.4);
    display: flex; align-items: center; gap: 10px;
    font-family: 'Inter', sans-serif;
    animation: slideInRight 0.4s ease;
    max-width: 280px;
  `;
  notification.innerHTML = `<i class='bx bx-info-circle' style="font-size:1.2rem"></i> Resume will be available soon!`;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.4s ease';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

/* ---------- Floating badge parallax on mouse move ---------- */
document.addEventListener('mousemove', (e) => {
  const badges = document.querySelectorAll('.hero-badge-float');
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;
  const xRatio = (clientX / innerWidth - 0.5) * 2;
  const yRatio = (clientY / innerHeight - 0.5) * 2;

  badges.forEach((badge, i) => {
    const factor = (i + 1) * 6;
    badge.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
  });
});

/* ---------- Cursor glow effect ---------- */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
  
  // Magnetic effect on hover
  const target = e.target.closest('a, button');
  if (target) {
    cursorGlow.style.width = '150px';
    cursorGlow.style.height = '150px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)';
  } else {
    cursorGlow.style.width = '400px';
    cursorGlow.style.height = '400px';
    cursorGlow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)';
  }
});

/* ---------- Slide-in right keyframe for notification ---------- */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  
  /* Faster transition for immediate tracking on mousemove */
  .tilt-active {
    transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease !important;
  }
  
  /* Preserve 3D setting for inner children pop-out effect */
  .project-card > *, .skill-category > *, .edu-card > *, .timeline-content > * {
    transform: translateZ(20px);
  }
`;
document.head.appendChild(style);

/* ---------- Advanced 3D Tilt Effect ---------- */
const tiltElements = document.querySelectorAll('.project-card, .skill-category, .edu-card, .timeline-content');

tiltElements.forEach(el => {
  // Setup 3D space
  el.style.transformStyle = 'preserve-3d';

  el.addEventListener('mousemove', e => {
    el.classList.add('tilt-active');
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -1 to 1
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    // Max tilt angles based on element size
    const rotateX = yPct * -10;
    const rotateY = xPct * 10;

    // 3D pop effect for inner contents
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    el.style.zIndex = '10';

    // Dynamic lighting based on mouse position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    el.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%), var(--clr-surface)`;
  });

  el.addEventListener('mouseleave', () => {
    el.classList.remove('tilt-active');
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.zIndex = '1';
    el.style.background = ''; // reset to default
  });
});

/* ---------- Advanced Parallax & Depth Scroll ---------- */
const parallaxItems = [
  { selector: '.hero-video-bg', speed: 0.15 },
  { selector: '.hero-image-wrap', speed: 0.1 },
];

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  // Translate background shapes
  parallaxItems.forEach(item => {
    const el = document.querySelector(item.selector);
    if (el) {
      el.style.transform = `translateY(${scrolled * item.speed}px)`;
    }
  });

  // Hero content parallax & fade
  const heroContent = document.querySelector('.hero-content');
  const heroSection = document.querySelector('.hero');

  if (heroContent && heroSection && scrolled < heroSection.offsetHeight) {
    const opacity = 1 - (scrolled / heroSection.offsetHeight) * 1.5;
    const yMove = scrolled * 0.25;
    heroContent.style.opacity = Math.max(opacity, 0);
    heroContent.style.transform = `translateY(${yMove}px)`;
  }
});

/* ---------- Hacker Matrix Background ---------- */
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  let width, height, columns, drops;

  // Mix of Katakana, Latin, and Numerals for authentic Hacker vibe
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
  const fontSize = window.innerWidth < 768 ? 14 : 18;

  const setupMatrix = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize) + 1;
    drops = [];
    // Start code at random scatter heights
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }
  };

  window.addEventListener('resize', setupMatrix);
  setupMatrix();

  const drawMatrix = () => {
    // Semi-transparent black overlays the canvas to create fading code trails
    ctx.fillStyle = 'rgba(10, 14, 26, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `600 ${fontSize}px "Fira Code", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));

      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Glow effect for the head of the falling code trail
      if (Math.random() > 0.94) {
        ctx.fillStyle = '#ffffff'; // White head
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#6366f1';
      } else if (Math.random() > 0.8) {
        ctx.fillStyle = '#6366f1'; // Indigo tail
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#4f46e5'; // Darker Indigo
        ctx.shadowBlur = 0;
      }

      ctx.fillText(text, x, y);

      // Loop character row back to the top randomly
      if (y > height && Math.random() > 0.985) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  // Run efficiently at ~25 FPS to mimic classic hacker terminals
  setInterval(drawMatrix, 40);
}
