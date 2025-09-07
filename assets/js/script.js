// =====================
// ELEMENTO ANIMADO DE FUNDO
// =====================
document.addEventListener('DOMContentLoaded', function() {
  const animatedShape = document.querySelector('.animated-shape');
  
  if (animatedShape) {
    // Adicionar variação aleatória na animação
    const randomDelay = Math.random() * 3;
    animatedShape.style.animationDelay = `-${randomDelay}s`;
    
    // Interação com clique - acelerar animação
    animatedShape.addEventListener('click', function() {
      this.style.animationDuration = '3s';
      this.style.transform += ' scale(1.5)';
      
      setTimeout(() => {
        this.style.animationDuration = '12s';
        this.style.transform = this.style.transform.replace(' scale(1.5)', '');
      }, 3000);
    });
    
    // Interação com hover - pausar animação
    animatedShape.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
      this.style.filter = 'blur(0px)';
      this.style.opacity = '0.6';
    });
    
    animatedShape.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
      this.style.filter = 'blur(1px)';
      this.style.opacity = '0.3';
    });
    
    // Sincronizar com scroll
    window.addEventListener('scroll', function() {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const rotation = scrollPercent * 360;
      
      if (scrollPercent < 0.3) { // Apenas na seção hero
        animatedShape.style.transform += ` rotate(${rotation}deg)`;
      }
    });
    
    // Efeito de partículas ao passar o mouse
    animatedShape.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Criar partícula temporária
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '3px';
      particle.style.height = '3px';
      particle.style.background = 'var(--sand)';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.animation = 'particleFade 1s ease-out forwards';
      
      this.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    });
  }
});

// Adicionar keyframes para partículas
const particleKeyframes = `
  @keyframes particleFade {
    0% {
      opacity: 1;
      transform: scale(1) translate(0, 0);
    }
    100% {
      opacity: 0;
      transform: scale(0) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px);
    }
  }
`;

if (!document.querySelector('#particle-animation')) {
  const style = document.createElement('style');
  style.id = 'particle-animation';
  style.textContent = particleKeyframes;
  document.head.appendChild(style);
}
document.addEventListener('DOMContentLoaded', function() {
  const heroCards = document.querySelectorAll('.hero-card');
  const heroCardsContainer = document.querySelector('.hero-cards');
  
  if (heroCards.length > 0) {
    // Adicionar efeito de movimento baseado na posição do mouse
    heroCards.forEach((card, index) => {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
          translateY(-8px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(1.05)
        `;
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });
      
      // Efeito de pulsação sutil
      card.addEventListener('mouseenter', function() {
        const icon = card.querySelector('.hero-card-icon');
        if (icon) {
          icon.style.animation = 'pulse 0.6s ease-in-out';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = card.querySelector('.hero-card-icon');
        if (icon) {
          icon.style.animation = '';
        }
      });
    });
    
    // Efeito de ondulação quando o mouse entra na área dos cards
    if (heroCardsContainer) {
      heroCardsContainer.addEventListener('mouseenter', function() {
        heroCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.transform = 'translateY(-2px) scale(1.02)';
            setTimeout(() => {
              card.style.transform = '';
            }, 200);
          }, index * 100);
        });
      });
    }
  }
});

// Adicionar animação de pulsação
const pulseKeyframes = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

// Inserir as keyframes no documento
if (!document.querySelector('#pulse-animation')) {
  const style = document.createElement('style');
  style.id = 'pulse-animation';
  style.textContent = pulseKeyframes;
  document.head.appendChild(style);
}
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
  
  // Toggle menu mobile
  menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Fechar menu ao clicar em um item
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', function() {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// =====================
// SCROLL SUAVE
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerHeight = document.querySelector('.topbar').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// =====================
// HEADER SCROLL EFFECT
// =====================
window.addEventListener('scroll', function() {
  const header = document.querySelector('.topbar');
  
  if (window.scrollY > 100) {
    header.style.background = 'rgba(246, 245, 243, 0.98)';
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    header.style.background = 'rgba(246, 245, 243, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// =====================
// ANIMAÇÕES DE SCROLL
// =====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.service-card, .process-card, .stat-card');
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

// =====================
// CONTADOR ANIMADO
// =====================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
    }
  }
  
  updateCounter();
}

// Inicializar contadores quando visíveis
const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const text = counter.textContent;
      const number = parseInt(text.replace(/\D/g, ''));
      
      if (number > 0) {
        counter.textContent = '0' + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '') + (text.includes('h') ? 'h' : '');
        animateCounter(counter, number);
        counterObserver.unobserve(counter);
      }
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
});

// =====================
// FORMULÁRIO DE CONTATO
// =====================
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coletar dados do formulário
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Simular envio (aqui você integraria com seu backend)
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      // Simular delay de envio
      setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
});

// =====================
// LAZY LOADING PARA IMAGENS
// =====================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// =====================
// PERFORMANCE E ACESSIBILIDADE
// =====================

// Reduzir animações para usuários que preferem
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition', 'none');
}

// Melhorar foco para navegação por teclado
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', function() {
  document.body.classList.remove('keyboard-navigation');
});

// =====================
// UTILITÁRIOS
// =====================

// Debounce function para otimizar eventos de scroll
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar debounce ao scroll
const debouncedScrollHandler = debounce(function() {
  const header = document.querySelector('.topbar');
  
  if (window.scrollY > 100) {
    header.style.background = 'rgba(246, 245, 243, 0.98)';
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    header.style.background = 'rgba(246, 245, 243, 0.95)';
    header.style.boxShadow = 'none';
  }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// =====================
// DETALHES EXPANSÍVEIS
// =====================
document.addEventListener('DOMContentLoaded', function() {
  const details = document.querySelector('.services-details');
  
  if (details) {
    details.addEventListener('toggle', function() {
      if (this.open) {
        // Smooth scroll to show expanded content
        setTimeout(() => {
          this.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
          });
        }, 100);
      }
    });
  }
});

// =====================
// INICIALIZAÇÃO
// =====================
console.log('🚀 Barros & Caldeira - Site carregado com sucesso!');


// =====================
// FUNCIONALIDADE DE BUSCA DA EQUIPE
// =====================
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('team-search');
  const teamCards = document.querySelectorAll('.team-card');
  
  if (searchInput && teamCards.length > 0) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      teamCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const role = card.querySelector('.team-role').textContent.toLowerCase();
        const specialty = card.querySelector('.team-specialty').textContent.toLowerCase();
        
        const isMatch = name.includes(searchTerm) || 
                       role.includes(searchTerm) || 
                       specialty.includes(searchTerm);
        
        if (searchTerm === '' || isMatch) {
          card.classList.remove('hidden');
          if (searchTerm !== '' && isMatch) {
            card.classList.add('highlight');
          } else {
            card.classList.remove('highlight');
          }
        } else {
          card.classList.add('hidden');
          card.classList.remove('highlight');
        }
      });
    });
  }
});

