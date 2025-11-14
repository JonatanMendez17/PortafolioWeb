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

    const manejarEnvio = async (e) => {
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
        
        if (!isValid) return;
        
        // Deshabilitar el botón de envío mientras se procesa
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Enviando...';
        
        try {
            // Verificar que EmailJS esté cargado
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS no está cargado. Verifica que el script esté incluido en el HTML.');
            }
            
            // Verificar que la configuración esté definida
            if (typeof EMAILJS_CONFIG === 'undefined' || 
                EMAILJS_CONFIG.serviceID === 'YOUR_SERVICE_ID' ||
                EMAILJS_CONFIG.templateID === 'YOUR_TEMPLATE_ID' ||
                EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
                throw new Error('Por favor configura EmailJS en el archivo js/email-config.js. Ve a https://www.emailjs.com para crear una cuenta gratuita.');
            }
            
            // Enviar email usando EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.serviceID, 
                EMAILJS_CONFIG.templateID, 
                {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message,
                    to_email: EMAILJS_CONFIG.toEmail
                }, 
                EMAILJS_CONFIG.publicKey
            );
            
            // Éxito
            mostrarNotificacion('¡Mensaje enviado correctamente! Te responderé a la brevedad.', 'exito');
            e.target.reset();
            
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            let mensajeError = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
            
            // Mensajes de error más específicos
            if (error.text) {
                mensajeError = 'Error de configuración: Verifica que EmailJS esté configurado correctamente.';
            } else if (error.message && error.message.includes('configura')) {
                mensajeError = 'Error de configuración: Por favor configura EmailJS en js/email-config.js';
            } else if (error.status) {
                mensajeError = `Error del servidor (${error.status}). Por favor, intenta más tarde.`;
            }
            
            mostrarNotificacion(mensajeError, 'error');
        } finally {
            // Restaurar el botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    };

    // Función eliminada - ahora se usa mostrarNotificacion() para consistencia

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
    // EFECTO DE ESCRITURA (TYPING EFFECT)
    // ========================================
    const initTypingEffect = () => {
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

    // ========================================
    // INICIALIZAR TODAS LAS FUNCIONES
    // ========================================
    desplazamientoSuave();
    navegacionActiva();
    validacionFormulario();
    animacionesScroll();
    cerrarMenuAlClic();
    initTypingEffect();

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

    // ========================================
    // FUNCIÓN PARA MOSTRAR NOTIFICACIONES (POPUP)
    // ========================================
    function mostrarNotificacion(mensaje, tipo = 'info') {
        // Verificar si ya existe un estilo, si no, agregarlo
        if (!document.getElementById('notificacion-styles')) {
            const style = document.createElement('style');
            style.id = 'notificacion-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { 
                        transform: translateX(400px); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                }
                @keyframes slideOutRight {
                    from { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                    to { 
                        transform: translateX(400px); 
                        opacity: 0; 
                    }
                }
                .notificacion-popup {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                    min-width: 300px;
                    animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                .notificacion-popup .notificacion-contenido {
                    color: white;
                    padding: 16px 20px;
                    border-radius: 12px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 1.5;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notificacion-popup .notificacion-contenido.exito {
                    background: #27ae60;
                }
                .notificacion-popup .notificacion-contenido.error {
                    background: #e74c3c;
                }
                .notificacion-popup .notificacion-contenido.info {
                    background: #3498db;
                }
                .notificacion-popup .notificacion-icono {
                    width: 24px;
                    height: 24px;
                    flex-shrink: 0;
                }
                .notificacion-popup .notificacion-texto {
                    flex: 1;
                }
                .notificacion-popup.cerrando {
                    animation: slideOutRight 0.3s ease forwards;
                }
                @media (max-width: 768px) {
                    .notificacion-popup {
                        right: 10px;
                        left: 10px;
                        max-width: calc(100% - 20px);
                        min-width: auto;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Determinar icono según el tipo
        let icono = '';
        if (tipo === 'exito') {
            icono = '<svg class="notificacion-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        } else if (tipo === 'error') {
            icono = '<svg class="notificacion-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
        } else {
            icono = '<svg class="notificacion-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
        }
        
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-popup';
        notificacion.innerHTML = `
            <div class="notificacion-contenido ${tipo}">
                ${icono}
                <div class="notificacion-texto">${mensaje}</div>
            </div>
        `;
        
        // Insertar notificación
        document.body.appendChild(notificacion);
        
        // Duración según el tipo (errores duran más tiempo)
        const duracion = tipo === 'error' ? 5000 : tipo === 'exito' ? 4000 : 3000;
        
        // Remover después del tiempo especificado
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.classList.add('cerrando');
                setTimeout(() => {
                    if (notificacion.parentNode) {
                        notificacion.remove();
                    }
                }, 300);
            }
        }, duracion);
    }


    console.log('🚀 Portfolio JavaScript cargado correctamente');
});
