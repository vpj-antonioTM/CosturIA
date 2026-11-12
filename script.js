const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    navigation.classList.toggle('is-open', !isOpen);
    
    // NUEVO: Bloquear el scroll del fondo cuando el menú móvil está abierto
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
      navigation.classList.remove('is-open');
      
      // NUEVO: Restaurar el scroll
      document.body.style.overflow = '';
    });
  });
}

// NUEVO: Animación de aparición al hacer scroll
const revealElements = document.querySelectorAll('.section');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealOnScroll.observe(el);
});

// NUEVO: Lógica para copiar el correo al portapapeles
const copyBtn = document.getElementById('copy-email');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('costuria.proyecto@gmail.com').then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '¡Correo copiado al portapapeles! ✅';
      setTimeout(() => { 
        copyBtn.innerHTML = originalText; 
      }, 3000);
    }).catch(err => {
      console.error('Error al copiar el correo: ', err);
    });
  });
}
