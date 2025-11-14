// ========================================
// MÓDULO DE NAVEGACIÓN
// Maneja el menú hamburguesa y navegación suave
// ========================================

/**
 * Toggle del menú hamburguesa
 * Función global para compatibilidad
 */
window.toggleMenu = function() {
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const navEnlaces = document.querySelector('.nav-enlaces');
    
    if (!menuHamburguesa || !navEnlaces) {
        setTimeout(() => {
            const menu = document.querySelector('.menu-hamburguesa');
            const nav = document.querySelector('.nav-enlaces');
            if (menu && nav) {
                menu.classList.toggle('activo');
                nav.classList.toggle('activo');
                const isExpanded = menu.classList.contains('activo');
                menu.setAttribute('aria-expanded', isExpanded);
                menu.setAttribute('aria-label', isExpanded ? 'Cerrar menú' : 'Abrir menú');
            }
        }, 50);
        return;
    }
    
    menuHamburguesa.classList.toggle('activo');
    navEnlaces.classList.toggle('activo');
    
    const isExpanded = menuHamburguesa.classList.contains('activo');
    menuHamburguesa.setAttribute('aria-expanded', isExpanded);
    menuHamburguesa.setAttribute('aria-label', isExpanded ? 'Cerrar menú' : 'Abrir menú');
};

/**
 * Cierra el menú hamburguesa
 */
export const cerrarMenuHamburguesa = () => {
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const navEnlaces = document.querySelector('.nav-enlaces');
    
    if (menuHamburguesa && menuHamburguesa.classList.contains('activo')) {
        menuHamburguesa.classList.remove('activo');
        menuHamburguesa.setAttribute('aria-expanded', 'false');
        menuHamburguesa.setAttribute('aria-label', 'Abrir menú');
    }
    if (navEnlaces && navEnlaces.classList.contains('activo')) {
        navEnlaces.classList.remove('activo');
    }
};

/**
 * Inicializa el desplazamiento suave para enlaces de anclas
 */
export const desplazamientoSuave = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar menú hamburguesa si está abierto
            cerrarMenuHamburguesa();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para el menú fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

/**
 * Actualiza el estado activo de los enlaces de navegación según el scroll
 */
export const navegacionActiva = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('activo');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('activo');
            }
        });
    });
};

