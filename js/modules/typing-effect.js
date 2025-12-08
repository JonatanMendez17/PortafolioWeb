// ========================================
// MÓDULO DE EFECTO DE ESCRITURA
// Maneja el efecto de typing en el título
// ========================================

/* Inicializa el efecto de escritura (typing effect) */
export const initTypingEffect = () => {
    setTimeout(function() {
        const texto = "Desarrollador FullStack";
        const elemento = document.getElementById('typing-text');
        
        if (elemento) {
            let i = 0;
            function escribir() {
                if (i < texto.length) {
                    elemento.textContent += texto.charAt(i);
                    i++;
                    setTimeout(escribir, 120);
                }
            }
            escribir();
        }
    }, 1000);
};

