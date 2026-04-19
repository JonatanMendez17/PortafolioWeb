import { describe, it, expect, beforeEach } from 'vitest';
import { animacionesScroll, agregarEstilosAnimaciones } from '../js/modules/animations.js';

beforeEach(() => {
  document.body.innerHTML = `
    <div class="tarjeta">Tarjeta 1</div>
    <div class="tarjeta">Tarjeta 2</div>
    <div class="proyecto-card">Proyecto 1</div>
    <div class="seccion">Sección 1</div>
  `;
  document.head.innerHTML = '';
});

describe('animacionesScroll', () => {
  it('agrega la clase .animable a todos los elementos observables', () => {
    animacionesScroll();
    const animables = document.querySelectorAll('.animable');
    expect(animables.length).toBe(4); // 2 tarjeta + 1 proyecto-card + 1 seccion
  });

  it('no lanza error si no hay elementos en el DOM', () => {
    document.body.innerHTML = '';
    expect(() => animacionesScroll()).not.toThrow();
  });

  it('no agrega .animable a elementos que no corresponden', () => {
    document.body.innerHTML += '<div class="otro">No animable</div>';
    animacionesScroll();
    const otro = document.querySelector('.otro');
    expect(otro.classList.contains('animable')).toBe(false);
  });
});

describe('agregarEstilosAnimaciones', () => {
  it('agrega un elemento <style> al head', () => {
    agregarEstilosAnimaciones();
    const styles = document.querySelectorAll('head style');
    expect(styles.length).toBeGreaterThan(0);
  });

  it('el estilo incluye la clase .animable', () => {
    agregarEstilosAnimaciones();
    const styleContent = document.querySelector('head style').textContent;
    expect(styleContent).toContain('.animable');
  });

  it('el estilo incluye .animable.visible', () => {
    agregarEstilosAnimaciones();
    const styleContent = document.querySelector('head style').textContent;
    expect(styleContent).toContain('.animable.visible');
  });

  it('incluye regla prefers-reduced-motion', () => {
    agregarEstilosAnimaciones();
    const styleContent = document.querySelector('head style').textContent;
    expect(styleContent).toContain('prefers-reduced-motion');
  });
});
