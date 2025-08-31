// Script para carregar o rodapé em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
  // Verifica se já existe um rodapé carregado
  if (document.querySelector('.footer')) {
    return;
  }

  // Cria um elemento para carregar o rodapé
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      // Insere o rodapé antes do fechamento do body
      document.body.insertAdjacentHTML('beforeend', data);
    })
    .catch(error => {
      console.error('Erro ao carregar o rodapé:', error);
    });
});

