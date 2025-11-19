// State management
let currentLanguage = 'en';
let currentTheme = 'light';

// Translations
const translations = {
  en: {
    chatNamePlaceholder: 'Your Name',
    chatEmailPlaceholder: 'Your Email',
    chatMessagePlaceholder: 'Your Message'
  },
  ar: {
    chatNamePlaceholder: 'اسمك',
    chatEmailPlaceholder: 'بريدك الإلكتروني',
    chatMessagePlaceholder: 'رسالتك'
  }
};

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const chatWidget = document.getElementById('chatWidget');
const chatModal = document.getElementById('chatModal');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const notification = document.getElementById('notification');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeLanguage();
  setupEventListeners();
  setupScrollAnimations();
  animateStats();
  setupSmoothScroll();
  setupParallax();
});

// Theme Management
function initializeTheme() {
  const savedTheme = currentTheme;
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
    currentTheme = 'dark';
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.querySelector('.theme-icon').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// Language Management
function initializeLanguage() {
  updateLanguage();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  updateLanguage();
}

function updateLanguage() {
  const html = document.documentElement;
  const langFlag = langToggle.querySelector('.lang-flag');
  const langText = langToggle.querySelector('.lang-text');
  
  if (currentLanguage === 'ar') {
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    langFlag.textContent = '🇸🇦';
    langText.textContent = 'EN';
  } else {
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
    langFlag.textContent = '🇬🇧';
    langText.textContent = 'AR';
  }
  
  // Update all translatable elements
  document.querySelectorAll('[data-en]').forEach(element => {
    const text = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-ar');
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = text;
    } else {
      element.textContent = text;
    }
  });
  
  // Update form placeholders
  updateFormPlaceholders();
}

function updateFormPlaceholders() {
  const chatName = document.getElementById('chatName');
  const chatEmail = document.getElementById('chatEmail');
  const chatMessage = document.getElementById('chatMessage');
  
  if (chatName) chatName.placeholder = translations[currentLanguage].chatNamePlaceholder;
  if (chatEmail) chatEmail.placeholder = translations[currentLanguage].chatEmailPlaceholder;
  if (chatMessage) chatMessage.placeholder = translations[currentLanguage].chatMessagePlaceholder;
  
  // Update contact form placeholders
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    
    if (nameInput) {
      const placeholder = nameInput.getAttribute('data-placeholder-' + currentLanguage);
      if (placeholder) nameInput.placeholder = placeholder;
    }
    if (emailInput) {
      const placeholder = emailInput.getAttribute('data-placeholder-' + currentLanguage);
      if (placeholder) emailInput.placeholder = placeholder;
    }
    if (messageTextarea) {
      const placeholder = messageTextarea.getAttribute('data-placeholder-' + currentLanguage);
      if (placeholder) messageTextarea.placeholder = placeholder;
    }
  }
}

// Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  
  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
  
  // Language toggle
  langToggle.addEventListener('click', toggleLanguage);
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Chat widget
  chatWidget.addEventListener('click', () => {
    chatModal.classList.toggle('active');
  });
  
  chatClose.addEventListener('click', () => {
    chatModal.classList.remove('active');
  });
  
  // Close chat modal on outside click
  document.addEventListener('click', (e) => {
    if (!chatModal.contains(e.target) && !chatWidget.contains(e.target)) {
      chatModal.classList.remove('active');
    }
  });
  
  // Chat form submission
  chatForm.addEventListener('submit', handleChatSubmit);
  
  // Enhanced navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Download button handlers
  document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showNotification('Coming soon! The HitchGo app will be available shortly.');
    });
  });
}

function handleChatSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('chatName').value;
  const email = document.getElementById('chatEmail').value;
  const message = document.getElementById('chatMessage').value;
  
  if (!name || !email || !message) {
    return;
  }
  
  showNotification('Thank you! Your message has been sent.');
  chatForm.reset();
  chatModal.classList.remove('active');
}

function showNotification(message) {
  const notificationText = notification.querySelector('.notification-text');
  if (message) {
    notificationText.textContent = message;
  }
  
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 5000);
}

// Smooth Scroll
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll Animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.stat-card, .testimonial-card, .feature-card, .partnership-card, .value-item, .coverage-card, .contact-method-card').forEach(el => {
    observer.observe(el);
  });
}

// Animated Stats Counter
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.getAttribute('data-target'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        animateCounter(entry.target, target, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

function animateCounter(element, target, suffix) {
  let current = 0;
  const increment = target / 60;
  const duration = 2000;
  const stepTime = duration / 60;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = formatNumber(target, suffix);
      clearInterval(timer);
    } else {
      element.textContent = formatNumber(Math.floor(current * 10) / 10, suffix);
    }
  }, stepTime);
}

function formatNumber(num, suffix) {
  if (suffix === '%') {
    return num.toFixed(1) + '%';
  }
  if (suffix === 'K+') {
    return Math.floor(num) + 'K+';
  }
  if (suffix === '+') {
    return Math.floor(num) + '+';
  }
  return Math.floor(num);
}

// Parallax Effect
let ticking = false;

function setupParallax() {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function handleParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-container');
  const shapes = document.querySelectorAll('.shape');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    hero.style.opacity = Math.max(0, 1 - (scrolled / 600));
  }
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.08;
    shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
  });
}

// Card hover effects with 3D tilt
document.querySelectorAll('.service-card, .testimonial-card, .feature-card, .partnership-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.willChange = 'transform';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.willChange = 'auto';
  });
});

// Timeline animations
function setupTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, observerOptions);
  
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s cubic-bezier(.17,.67,.3,.99)';
    observer.observe(item);
  });
}

setupTimelineAnimation();