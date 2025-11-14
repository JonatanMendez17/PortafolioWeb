// ========================================
// MÓDULO DE NOTIFICACIONES
// Sistema de notificaciones toast/popup
// ========================================

/**
 * Muestra una notificación toast en la pantalla
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación: 'exito', 'error', 'info'
 */
export function mostrarNotificacion(mensaje, tipo = 'info') {
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

