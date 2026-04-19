import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock de dependencias con efectos secundarios
vi.mock('../js/modules/notifications.js', () => ({
  mostrarNotificacion: vi.fn(),
}));

vi.mock('../js/config/email-config.js', () => ({
  EMAILJS_CONFIG: {
    serviceID: 'test_service',
    templateID: 'test_template',
    publicKey: 'test_key',
    toEmail: 'test@test.com',
  },
}));

import { validacionFormulario } from '../js/modules/form.js';
import { mostrarNotificacion } from '../js/modules/notifications.js';

const montarFormulario = () => {
  document.body.innerHTML = `
    <form id="formulario-contacto">
      <input name="name" id="name" type="text" />
      <input name="email" id="email" type="email" />
      <textarea name="message" id="message"></textarea>
      <button type="submit">Enviar</button>
    </form>
  `;
  validacionFormulario();
};

beforeEach(() => {
  montarFormulario();
  vi.clearAllMocks();
});

// Helpers
const campo = (name) => document.querySelector(`[name="${name}"]`);
const blur = (el) => el.dispatchEvent(new Event('blur', { bubbles: true }));
const errorDe = (el) => el.parentNode.querySelector('.mensaje-error');

describe('validación en tiempo real (blur)', () => {
  it('muestra error si el email tiene formato inválido', () => {
    const email = campo('email');
    email.value = 'no-es-un-email';
    blur(email);
    expect(errorDe(email)).not.toBeNull();
    expect(errorDe(email).textContent).toContain('email válido');
  });

  it('no muestra error con email válido', () => {
    const email = campo('email');
    email.value = 'usuario@dominio.com';
    blur(email);
    expect(errorDe(email)).toBeNull();
  });

  it('muestra error si el nombre tiene menos de 2 caracteres', () => {
    const name = campo('name');
    name.value = 'J';
    blur(name);
    expect(errorDe(name)).not.toBeNull();
    expect(errorDe(name).textContent).toContain('2 caracteres');
  });

  it('no muestra error con nombre válido', () => {
    const name = campo('name');
    name.value = 'Jonatan';
    blur(name);
    expect(errorDe(name)).toBeNull();
  });

  it('muestra error si el mensaje tiene menos de 10 caracteres', () => {
    const msg = campo('message');
    msg.value = 'corto';
    blur(msg);
    expect(errorDe(msg)).not.toBeNull();
    expect(errorDe(msg).textContent).toContain('10 caracteres');
  });

  it('no muestra error con mensaje suficientemente largo', () => {
    const msg = campo('message');
    msg.value = 'Este es un mensaje suficientemente largo';
    blur(msg);
    expect(errorDe(msg)).toBeNull();
  });
});

describe('limpieza de errores al escribir', () => {
  it('elimina el error cuando el usuario escribe en el campo', () => {
    const email = campo('email');
    email.value = 'mal';
    blur(email);
    expect(errorDe(email)).not.toBeNull();

    email.dispatchEvent(new Event('input', { bubbles: true }));
    expect(errorDe(email)).toBeNull();
  });
});

describe('envío del formulario', () => {
  it('bloquea el envío si hay campos vacíos', () => {
    const form = document.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    // Campos vacíos → debe mostrar errores, no llamar a notificación de éxito
    const errores = document.querySelectorAll('.mensaje-error');
    expect(errores.length).toBeGreaterThan(0);
  });

  it('llama a mostrarNotificacion con error si emailjs no está disponible', async () => {
    // Completar el formulario con datos válidos
    campo('name').value = 'Jonatan Mendez';
    campo('email').value = 'jonatan@test.com';
    campo('message').value = 'Este es un mensaje de prueba largo';

    // emailjs no está definido en el entorno de test
    const form = document.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    // Esperar promesa async
    await vi.waitFor(() => {
      expect(mostrarNotificacion).toHaveBeenCalledWith(
        expect.stringContaining('Error'),
        'error'
      );
    });
  });
});
