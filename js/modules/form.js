// ========================================
// MÓDULO DE FORMULARIO
// Maneja validación y envío del formulario de contacto
// ========================================

import { mostrarNotificacion } from './notifications.js';
import { EMAILJS_CONFIG } from '../config/email-config.js';

/**
 * Muestra un mensaje de error en un campo del formulario
 */
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

/**
 * Limpia los mensajes de error de un campo
 */
const limpiarError = (e) => {
    const field = e.target;
    field.style.borderColor = '';
    
    const errorMessage = field.parentNode.querySelector('.mensaje-error');
    if (errorMessage) {
        errorMessage.remove();
    }
};

/**
 * Valida un campo individual del formulario
 */
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

/**
 * Maneja el envío del formulario
 */
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
        if (!EMAILJS_CONFIG || 
            EMAILJS_CONFIG.serviceID === 'YOUR_SERVICE_ID' ||
            EMAILJS_CONFIG.templateID === 'YOUR_TEMPLATE_ID' ||
            EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
            throw new Error('Por favor configura EmailJS en el archivo js/config/email-config.js. Ve a https://www.emailjs.com para crear una cuenta gratuita.');
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
            mensajeError = 'Error de configuración: Por favor configura EmailJS en js/config/email-config.js';
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

/**
 * Inicializa la validación del formulario
 */
export const validacionFormulario = () => {
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

