// ========================================
// PORTFOLIO JONATAN MENDEZ - JAVASCRIPT
// ========================================

// ========================================
// MENÚ HAMBURGUESA - Función global
// Disponible inmediatamente para onclick en HTML
// ========================================
window.toggleMenu = function() {
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const navEnlaces = document.querySelector('.nav-enlaces');
    
    if (!menuHamburguesa || !navEnlaces) {
        // Si los elementos no existen aún, esperar un momento e intentar de nuevo
        setTimeout(() => {
            const menu = document.querySelector('.menu-hamburguesa');
            const nav = document.querySelector('.nav-enlaces');
            if (menu && nav) {
                menu.classList.toggle('activo');
                nav.classList.toggle('activo');
            }
        }, 50);
        return;
    }
    
    menuHamburguesa.classList.toggle('activo');
    navEnlaces.classList.toggle('activo');
};

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // FUNCIÓN AUXILIAR: CERRAR MENÚ HAMBURGUESA
    // ========================================
    const cerrarMenuHamburguesa = () => {
        const menuHamburguesa = document.querySelector('.menu-hamburguesa');
        const navEnlaces = document.querySelector('.nav-enlaces');
        
        if (menuHamburguesa && menuHamburguesa.classList.contains('activo')) {
            menuHamburguesa.classList.remove('activo');
        }
        if (navEnlaces && navEnlaces.classList.contains('activo')) {
            navEnlaces.classList.remove('activo');
        }
    };

    // ========================================
    // NAVEGACIÓN SUAVE
    // ========================================
    const desplazamientoSuave = () => {
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

    // ========================================
    // EFECTO DE NAVEGACIÓN ACTIVA
    // ========================================
    const navegacionActiva = () => {
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

    // ========================================
    // VALIDACIÓN DE FORMULARIO
    // ========================================
    const validacionFormulario = () => {
        const form = document.querySelector('form');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        // Validación en tiempo real
        inputs.forEach(input => {
            input.addEventListener('blur', validarCampo);
            input.addEventListener('input', limpiarError);
        });
        
        // Envío del formulario
        form.addEventListener('submit', manejarEnvio);
    };

    const validarCampo = (e) => {
        const field = e.target;
        const value = field.value.trim();
        
        // Remover errores previos
        limpiarError(e);
        
        // Validaciones específicas
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                mostrarError(field, 'Por favor ingresa un email válido');
            }
        } else if (field.name === 'name') {
            if (value.length < 2) {
                mostrarError(field, 'El nombre debe tener al menos 2 caracteres');
            }
        } else if (field.name === 'message') {
            if (value.length < 10) {
                mostrarError(field, 'El mensaje debe tener al menos 10 caracteres');
            }
        }
    };

    const mostrarError = (field, message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mensaje-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        field.style.borderColor = '#e74c3c';
        field.parentNode.appendChild(errorDiv);
    };

    const limpiarError = (e) => {
        const field = e.target;
        field.style.borderColor = '';
        
        const errorMessage = field.parentNode.querySelector('.mensaje-error');
        if (errorMessage) {
            errorMessage.remove();
        }
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validación final
        let isValid = true;
        const inputs = e.target.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                mostrarError(input, 'Este campo es obligatorio');
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simular envío (aquí conectarías con tu backend)
            mostrarMensajeExito();
            e.target.reset();
        }
    };

    const mostrarMensajeExito = () => {
        const successDiv = document.createElement('div');
        successDiv.className = 'mensaje-exito';
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
        
        const form = document.querySelector('form');
        form.parentNode.insertBefore(successDiv, form);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    };

    // ========================================
    // ANIMACIONES DE SCROLL
    // ========================================
    const animacionesScroll = () => {
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

    // ========================================
    // CERRAR MENÚ AL HACER CLIC EN UN ENLACE
    // (Ya está integrado en desplazamientoSuave, pero lo mantenemos por compatibilidad)
    // ========================================
    const cerrarMenuAlClic = () => {
        // La funcionalidad ya está integrada en desplazamientoSuave
        // Esta función se mantiene por compatibilidad pero ya no es necesaria
        // ya que desplazamientoSuave ahora cierra el menú automáticamente
    };

    // ========================================
    // INICIALIZAR TODAS LAS FUNCIONES
    // ========================================
    desplazamientoSuave();
    navegacionActiva();
    validacionFormulario();
    animacionesScroll();
    cerrarMenuAlClic();

    // ========================================
    // CSS ADICIONAL PARA ANIMACIONES
    // ========================================
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

    // ========================================
    // FUNCIONES GLOBALES PARA CV Y NAVEGACIÓN
    // ========================================
    window.descargarCV = function() {
        try {
            // Verificar que el archivo existe antes de intentar descargarlo
            fetch('recursos/CV_Jonatan__Mendez.pdf')
                .then(response => {
                    if (response.ok) {
                        // Crear un enlace temporal para descargar el CV
                        const enlace = document.createElement('a');
                        enlace.href = 'recursos/CV_Jonatan__Mendez.pdf';
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

    window.scrollToContact = function() {
        const seccionContacto = document.getElementById('contacto');
        if (seccionContacto) {
            const offsetTop = seccionContacto.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.innerHTML = `
            <div style="
                background: ${tipo === 'exito' ? '#27ae60' : tipo === 'error' ? '#e74c3c' : '#3498db'};
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                margin: 10px 0;
                font-weight: 600;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease;
            ">
                ${mensaje}
            </div>
        `;
        
        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .notificacion {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 300px;
            }
        `;
        document.head.appendChild(style);
        
        // Insertar notificación
        document.body.appendChild(notificacion);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => {
                    if (notificacion.parentNode) {
                        notificacion.remove();
                    }
                }, 300);
            }
        }, 3000);
    }


    console.log('🚀 Portfolio JavaScript cargado correctamente');
});
