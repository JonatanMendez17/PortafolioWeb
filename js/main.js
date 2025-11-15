// ========================================
// ARCHIVO PRINCIPAL - INICIALIZACIÓN
// Importa y inicializa todos los módulos
// ========================================

import { desplazamientoSuave, navegacionActiva } from './modules/navigation.js';
import { validacionFormulario } from './modules/form.js';
import { animacionesScroll, agregarEstilosAnimaciones } from './modules/animations.js';
import { initTypingEffect } from './modules/typing-effect.js';
import { initEventListeners } from './modules/utils.js';
import { initRender } from './modules/render.js';
import { initCertificatesCarousel } from './modules/certificates-carousel.js';
import { EMAILJS_CONFIG } from './config/email-config.js';

// Hacer EMAILJS_CONFIG disponible globalmente para compatibilidad
window.EMAILJS_CONFIG = EMAILJS_CONFIG;

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Renderizar contenido dinámico (debe ir primero)
    initRender();
    
    // Inicializar navegación
    desplazamientoSuave();
    navegacionActiva();
    
    // Inicializar formulario
    validacionFormulario();
    
    // Inicializar animaciones (después del renderizado para que detecte los elementos dinámicos)
    setTimeout(() => {
        animacionesScroll();
    }, 100);
    agregarEstilosAnimaciones();
    
    // Inicializar carrusel de certificados (después del renderizado)
    setTimeout(() => {
        initCertificatesCarousel();
    }, 150);
    
    // Inicializar efectos
    initTypingEffect();
    
    // Inicializar event listeners
    initEventListeners();
    
    console.log('🚀 Portfolio JavaScript cargado correctamente');
});

