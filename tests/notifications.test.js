import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mostrarNotificacion } from '../js/modules/notifications.js';

beforeEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  vi.useFakeTimers();
});

describe('mostrarNotificacion', () => {
  it('agrega un elemento .notificacion-popup al body', () => {
    mostrarNotificacion('Test mensaje', 'exito');
    expect(document.querySelector('.notificacion-popup')).not.toBeNull();
  });

  it('muestra el mensaje recibido', () => {
    mostrarNotificacion('Mensaje de prueba', 'info');
    const popup = document.querySelector('.notificacion-popup');
    expect(popup.textContent).toContain('Mensaje de prueba');
  });

  it('aplica la clase correcta según el tipo', () => {
    const casos = ['exito', 'error', 'info'];
    casos.forEach((tipo) => {
      document.body.innerHTML = '';
      mostrarNotificacion('msg', tipo);
      const contenido = document.querySelector('.notificacion-contenido');
      expect(contenido.classList.contains(tipo)).toBe(true);
    });
  });

  it('agrega estilos al head solo una vez aunque se llame varias veces', () => {
    mostrarNotificacion('a', 'info');
    mostrarNotificacion('b', 'error');
    mostrarNotificacion('c', 'exito');
    const estilos = document.querySelectorAll('#notificacion-styles');
    expect(estilos.length).toBe(1);
  });

  it('elimina la notificación después del tiempo de duración', () => {
    mostrarNotificacion('Temporal', 'exito');
    expect(document.querySelector('.notificacion-popup')).not.toBeNull();
    // exito dura 4000ms + 300ms animación salida
    vi.advanceTimersByTime(4400);
    expect(document.querySelector('.notificacion-popup')).toBeNull();
  });

  it('los errores duran más que las notificaciones de info', () => {
    // info: 3000ms + 300ms animación salida = 3300ms total
    mostrarNotificacion('Info', 'info');
    vi.advanceTimersByTime(3400);
    expect(document.querySelector('.notificacion-popup')).toBeNull();

    document.body.innerHTML = '';
    // error: 5000ms — a los 3400ms todavía debe estar visible
    mostrarNotificacion('Error', 'error');
    vi.advanceTimersByTime(3400);
    expect(document.querySelector('.notificacion-popup')).not.toBeNull();
  });
});
