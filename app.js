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
const contactForm = document.getElementById('contactForm');
const chatForm = document.getElementById('chatForm');
const notification = document.getElementById('notification');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeLanguage();
  setupEventListeners();
  setupScrollAnimations();
  animateStats();
  setupFAQ();
  setupSmoothScroll();
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
    } else if (element.tagName === 'OPTION') {
      element.textContent = text;
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
  
  // Contact form submission
  contactForm.addEventListener('submit', handleFormSubmit);
  
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
}

// Form Handling - FormSubmit handles submission naturally
function handleFormSubmit(e) {
  // Let FormSubmit.co handle the submission naturally
  // Only prevent if validation fails
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Basic validation before submission
  if (!data.name || !data.email || !data.message) {
    e.preventDefault();
    alert(currentLanguage === 'en' ? 'Please fill in all fields' : 'يرجى ملء جميع الحقول');
    return;
  }
  
  // Form will submit naturally to FormSubmit endpoint
  // No preventDefault - let it submit
}

function handleChatSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('chatName').value;
  const email = document.getElementById('chatEmail').value;
  const message = document.getElementById('chatMessage').value;
  
  // Validate
  if (!name || !email || !message) {
    return;
  }
  
  // Show success message
  showNotification();
  
  // Reset form and close modal
  chatForm.reset();
  chatModal.classList.remove('active');
}

function showNotification() {
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
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.service-card, .partnership-card, .stat-card').forEach(el => {
    observer.observe(el);
  });
}

// Animated Stats Counter with suffix support
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
  const duration = 2200;
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
  if (suffix === 'M+' && num >= 1000000) {
    return '1M+';
  }
  if (suffix === '%') {
    return num.toFixed(1) + '%';
  }
  if (suffix === '+') {
    return num + '+';
  }
  if (num >= 1000 && !suffix) {
    return (num / 1000).toFixed(0) + 'K+';
  }
  return num + suffix;
}

// FAQ Accordion with search
function setupFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSearch = document.getElementById('faqSearch');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // FAQ search functionality (if FAQ exists)
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

// Enhanced Parallax Effect for Hero
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleParallax();
      ticking = false;
    });
    ticking = true;
  }
});

function handleParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
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

// Enhanced Card Hover Effects
document.querySelectorAll('.service-card, .testimonial-card, .insight-card, .pricing-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    if (!card.classList.contains('pricing-featured')) {
      this.style.transform = 'translateY(-10px) scale(1.015)';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    if (!card.classList.contains('pricing-featured')) {
      this.style.transform = '';
    }
  });
});

// Dynamic year in footer
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Update FAQ search placeholder on language change
function updateFormPlaceholders() {
  const chatName = document.getElementById('chatName');
  const chatEmail = document.getElementById('chatEmail');
  const chatMessage = document.getElementById('chatMessage');
  const faqSearch = document.getElementById('faqSearch');
  
  // Contact form fields
  const contactName = document.getElementById('name');
  const contactEmail = document.getElementById('email');
  const contactMessage = document.getElementById('message');
  
  if (chatName) chatName.placeholder = translations[currentLanguage].chatNamePlaceholder;
  if (chatEmail) chatEmail.placeholder = translations[currentLanguage].chatEmailPlaceholder;
  if (chatMessage) chatMessage.placeholder = translations[currentLanguage].chatMessagePlaceholder;
  
  // Update contact form placeholders
  if (contactName) {
    const placeholder = contactName.getAttribute('data-placeholder-' + currentLanguage);
    if (placeholder) contactName.placeholder = placeholder;
  }
  if (contactEmail) {
    const placeholder = contactEmail.getAttribute('data-placeholder-' + currentLanguage);
    if (placeholder) contactEmail.placeholder = placeholder;
  }
  if (contactMessage) {
    const placeholder = contactMessage.getAttribute('data-placeholder-' + currentLanguage);
    if (placeholder) contactMessage.placeholder = placeholder;
  }
  
  if (faqSearch) {
    const placeholderEn = faqSearch.getAttribute('data-placeholder-en');
    const placeholderAr = faqSearch.getAttribute('data-placeholder-ar');
    faqSearch.placeholder = currentLanguage === 'en' ? placeholderEn : placeholderAr;
  }
}

// Prevent default on download buttons (since apps don't exist yet)
document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = currentLanguage === 'en' 
      ? 'Coming soon! The HitchGo app will be available shortly.'
      : 'قريباً! سيكون تطبيق HitchGo متاحاً قريباً.';
    
    const tempNotification = notification.cloneNode(true);
    const notifText = tempNotification.querySelector('.notification-text');
    notifText.textContent = message;
    document.body.appendChild(tempNotification);
    
    setTimeout(() => {
      tempNotification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      tempNotification.classList.remove('show');
      setTimeout(() => tempNotification.remove(), 300);
    }, 3000);
  });
});

// Timeline animation on scroll
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

// Initialize timeline animation
setupTimelineAnimation();