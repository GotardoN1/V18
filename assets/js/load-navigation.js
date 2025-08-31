// Script para carregar a navegação dinamicamente
document.addEventListener('DOMContentLoaded', function() {
  // Função para carregar a navegação
  function loadNavigation() {
    fetch('navigation.html')
      .then(response => response.text())
      .then(data => {
        // Insere a navegação no início do body
        document.body.insertAdjacentHTML('afterbegin', data);
        
        // Inicializa o menu mobile após carregar a navegação
        initializeMobileMenu();
      })
      .catch(error => {
        console.error('Erro ao carregar a navegação:', error);
      });
  }

  // Função para inicializar o menu mobile
  function initializeMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });

      // Fecha o menu ao clicar em um item
      const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
      mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
          menuBtn.classList.remove('active');
          mobileMenu.classList.remove('active');
        });
      });

      // Fecha o menu ao clicar fora dele
      document.addEventListener('click', function(event) {
        if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
          menuBtn.classList.remove('active');
          mobileMenu.classList.remove('active');
        }
      });
    }
  }

  // Carrega a navegação
  loadNavigation();
});

