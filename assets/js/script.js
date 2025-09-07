document.addEventListener('DOMContentLoaded', function() {
  
  // =====================
  // INICIALIZAÇÃO GERAL
  // =====================
  
  // Carrega componentes reutilizáveis
  loadComponent('header', 'navigation.html', initializeMobileMenu);
  loadComponent('footer', 'footer.html');

  // Inicializa animações de scroll
  setupScrollAnimations();

  // Inicializa contadores animados
  setupCounterAnimations();

  // Melhora a acessibilidade do foco
  setupFocusListeners();

  console.log('🚀 Barros & Caldeira - Site interativo carregado com sucesso!');
});


// =====================
// CARREGAMENTO DE COMPONENTES
// =====================
function loadComponent(selector, url, callback) {
  const element = document.querySelector(selector) || document.createElement(selector);
  if (!document.querySelector(selector)) {
    if (selector === 'header') document.body.prepend(element);
    else document.body.append(element);
  }
  
  fetch(url)
    .then(response => response.ok ? response.text() : Promise.reject('Componente não encontrado'))
    .then(data => {
      element.innerHTML = data;
      if (callback) callback();
    })
    .catch(error => console.error(`Erro ao carregar ${selector}:`, error));
}


// =====================
// NAVEGAÇÃO E MENU MOBILE
// =====================
function initializeMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  const closeMenu = () => {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  mobileMenuItems.forEach(item => item.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });
}


// =====================
// ANIMAÇÕES DE SCROLL (Intersection Observer)
// =====================
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.section-header, .hero-content, .hero-cards > *, .stat-card, .service-card, .process-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(el => observer.observe(el));
}


// =====================
// CONTADOR ANIMADO
// =====================
function setupCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetValue = parseInt(counter.textContent.replace(/\D/g, ''), 10);
        animateCounter(counter, targetValue);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.8 });
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;
  const suffix = element.textContent.replace(/\d/g, '');

  const update = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + suffix;
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  };
  
  element.textContent = 0 + suffix;
  requestAnimationFrame(update);
}


// =====================
// ACESSIBILIDADE
// =====================
function setupFocusListeners() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
  });
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}