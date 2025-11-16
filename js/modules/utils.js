// ========================================
// MÓDULO DE UTILIDADES
// Funciones auxiliares y utilidades generales
// ========================================

import { mostrarNotificacion } from './notifications.js';

/**
 * Descarga el CV del usuario
 */
export const descargarCV = function() {
    try {
        // Verificar que el archivo existe antes de intentar descargarlo
        fetch('imag/CV_Jonatan__Mendez.pdf')
            .then(response => {
                if (response.ok) {
                    // Crear un enlace temporal para descargar el CV
                    const enlace = document.createElement('a');
                    enlace.href = 'imag/CV_Jonatan__Mendez.pdf';
                    enlace.download = 'CV_Jonatan_Mendez.pdf';
                    enlace.target = '_blank';
                    
                    // Agregar el enlace al DOM temporalmente
                    document.body.appendChild(enlace);
                    
                    // Intentar la descarga
                    enlace.click();
                    
                    // Remover el enlace después de la descarga
                    setTimeout(() => {
                        if (enlace.parentNode) {
                            document.body.removeChild(enlace);
                        }
                    }, 100);
                    
                    // Mostrar mensaje de confirmación
                    mostrarNotificacion('CV descargado correctamente', 'exito');
                } else {
                    throw new Error('Archivo no encontrado');
                }
            })
            .catch(error => {
                console.error('Error al verificar/descargar CV:', error);
                mostrarNotificacion('Error: No se pudo encontrar el archivo CV', 'error');
            });
        
    } catch (error) {
        console.error('Error al descargar CV:', error);
        mostrarNotificacion('Error al descargar el CV. Verifica que el archivo existe.', 'error');
    }
};

/**
 * Hace scroll suave hasta la sección de contacto
 */
export const scrollToContact = function() {
    const seccionContacto = document.getElementById('contacto');
    if (seccionContacto) {
        const offsetTop = seccionContacto.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

/**
 * Inicializa los event listeners para botones y acciones
 */
export const initEventListeners = () => {
    // Menú hamburguesa
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    if (menuHamburguesa) {
        menuHamburguesa.addEventListener('click', window.toggleMenu);
    }
    
    // Logo link - recargar página
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.reload();
        });
    }
    
    // Botones con data-action
    document.querySelectorAll('[data-action="cv"]').forEach(button => {
        button.addEventListener('click', descargarCV);
    });
    
    document.querySelectorAll('[data-action="contact"]').forEach(button => {
        button.addEventListener('click', scrollToContact);
    });
    
    // Botones con clase boton-cv
    document.querySelectorAll('.boton-cv').forEach(button => {
        button.addEventListener('click', descargarCV);
    });
};

// Exportar funciones globales para compatibilidad
window.descargarCV = descargarCV;
window.scrollToContact = scrollToContact;

