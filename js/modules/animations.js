// ========================================
// MÓDULO DE ANIMACIONES
// Maneja animaciones de scroll y efectos visuales
// ========================================

/* Inicializa las animaciones de scroll usando IntersectionObserver */
export const animacionesScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.tarjeta, .proyecto-card, .seccion').forEach(el => {
        el.classList.add('animable');
        observer.observe(el);
    });
};

/* Agrega estilos CSS para animaciones de entrada */
export const agregarEstilosAnimaciones = () => {
    const style = document.createElement('style');
    style.textContent = `
        .animable {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .animable.visible {
            opacity: 1;
            transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
            .animable { opacity: 1; transform: none; transition: none; }
        }
    `;
    document.head.appendChild(style);
};
