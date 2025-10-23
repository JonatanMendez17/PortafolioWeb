// ========================================
// PORTFOLIO JONATAN MENDEZ - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVEGACIÓN SUAVE
    // ========================================
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
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

    // ========================================
    // EFECTO DE NAVEGACIÓN ACTIVA
    // ========================================
    const activeNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.Menu a[href^="#"]');
        
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
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    };

    // ========================================
    // VALIDACIÓN DE FORMULARIO
    // ========================================
    const formValidation = () => {
        const form = document.querySelector('.Contenedor-Accion');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        // Validación en tiempo real
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearError);
        });
        
        // Envío del formulario
        form.addEventListener('submit', handleSubmit);
    };

    const validateField = (e) => {
        const field = e.target;
        const value = field.value.trim();
        
        // Remover errores previos
        clearError(e);
        
        // Validaciones específicas
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, 'Por favor ingresa un email válido');
            }
        } else if (field.type === 'text' && field.name === 'Nombre') {
            if (value.length < 2) {
                showError(field, 'El nombre debe tener al menos 2 caracteres');
            }
        } else if (field.name === 'Text') {
            if (value.length < 10) {
                showError(field, 'El mensaje debe tener al menos 10 caracteres');
            }
        }
    };

    const showError = (field, message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        field.style.borderColor = '#e74c3c';
        field.parentNode.appendChild(errorDiv);
    };

    const clearError = (e) => {
        const field = e.target;
        field.style.borderColor = '';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validación final
        let isValid = true;
        const inputs = e.target.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showError(input, 'Este campo es obligatorio');
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simular envío (aquí conectarías con tu backend)
            showSuccessMessage();
            e.target.reset();
        }
    };

    const showSuccessMessage = () => {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background: #27ae60;
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: center;
                font-weight: 600;
            ">
                ¡Mensaje enviado correctamente! Te responderé a la brevedad.
            </div>
        `;
        
        const form = document.querySelector('.Contenedor-Accion');
        form.parentNode.insertBefore(successDiv, form);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    };

    // ========================================
    // ANIMACIONES DE SCROLL
    // ========================================
    const scrollAnimations = () => {
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
        const animatedElements = document.querySelectorAll('.Tarjeta-Pres, .Contenedor-Exp, .Pre-Proyecto');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };

    // ========================================
    // INICIALIZAR TODAS LAS FUNCIONES
    // ========================================
    smoothScroll();
    activeNavigation();
    formValidation();
    scrollAnimations();

    // ========================================
    // CSS ADICIONAL PARA ANIMACIONES
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        .Menu a.active {
            color: var(--secondary-color);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Portfolio JavaScript cargado correctamente');
});