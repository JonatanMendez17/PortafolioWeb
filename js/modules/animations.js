// ========================================
// MÓDULO DE ANIMACIONES
// Maneja animaciones de scroll y efectos visuales
// ========================================

/* Inicializa las animaciones de scroll usando IntersectionObserver */
export const animacionesScroll = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos a animar
    const elementosAnimados = document.querySelectorAll('.tarjeta, .proyecto, .seccion');
    
    elementosAnimados.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

/* Agrega estilos CSS dinámicos para animaciones */
export const agregarEstilosAnimaciones = () => {
    const style = document.createElement('style');
    style.textContent = `
        nav a.activo {
            color: var(--acento);
            font-weight: 600;
        }
        
        .boton:hover {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
        }
        
        .proyecto:hover {
            transform: translateY(-4px);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
};

