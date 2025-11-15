// ========================================
// MÓDULO DE CARRUSEL DE CERTIFICADOS
// Maneja la navegación automática y manual del carrusel
// ========================================

let currentIndex = 0;
let autoPlayInterval = null;
let isPaused = false;
const AUTO_PLAY_DELAY = 5000; // 5 segundos

/**
 * Inicializa el carrusel de certificados
 */
export const initCertificatesCarousel = () => {
  const carrusel = document.querySelector('.carrusel-container');
  if (!carrusel) return;

  const slides = carrusel.querySelectorAll('.certificado-slide');
  const prevBtn = carrusel.querySelector('.carrusel-prev');
  const nextBtn = carrusel.querySelector('.carrusel-next');
  const indicators = carrusel.querySelectorAll('.carrusel-indicator');

  if (slides.length <= 1) return; // No necesita carrusel si solo hay un certificado

  // Event listeners para botones de navegación
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1, slides, indicators);
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1, slides, indicators);
      resetAutoPlay();
    });
  }

  // Event listeners para indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index, slides, indicators);
      resetAutoPlay();
    });
  });

  // Pausar auto-play al hacer hover
  carrusel.addEventListener('mouseenter', () => {
    isPaused = true;
    clearInterval(autoPlayInterval);
  });

  // Reanudar auto-play al salir del hover
  carrusel.addEventListener('mouseleave', () => {
    isPaused = false;
    startAutoPlay(slides, indicators);
  });

  // Iniciar auto-play
  startAutoPlay(slides, indicators);

  // Pausar cuando la ventana pierde el foco
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(autoPlayInterval);
    } else if (!isPaused) {
      startAutoPlay(slides, indicators);
    }
  });
};

/**
 * Navega a un slide específico
 */
const goToSlide = (index, slides, indicators) => {
  const totalSlides = slides.length;
  
  // Ajustar índice si está fuera de rango
  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Actualizar slides
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentIndex);
  });

  // Actualizar indicadores
  if (indicators) {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
    });
  }
};

/**
 * Inicia el auto-play del carrusel
 */
const startAutoPlay = (slides, indicators) => {
  clearInterval(autoPlayInterval);
  
  autoPlayInterval = setInterval(() => {
    if (!isPaused && !document.hidden) {
      goToSlide(currentIndex + 1, slides, indicators);
    }
  }, AUTO_PLAY_DELAY);
};

/**
 * Reinicia el auto-play
 */
const resetAutoPlay = () => {
  if (!isPaused) {
    const carrusel = document.querySelector('.carrusel-container');
    if (!carrusel) return;
    
    const slides = carrusel.querySelectorAll('.certificado-slide');
    const indicators = carrusel.querySelectorAll('.carrusel-indicator');
    startAutoPlay(slides, indicators);
  }
};

