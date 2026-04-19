import { describe, it, expect, beforeEach } from 'vitest';
import {
  renderProyectos,
  renderExperiencias,
  renderTecnologias,
  renderCertificados,
  renderTechTicker,
} from '../js/modules/render.js';

// Monta la estructura HTML mínima que necesita cada función
const montarDOM = () => {
  document.body.innerHTML = `
    <section id="portafolio">
      <div class="proyectos-grid"></div>
    </section>
    <section id="experiencias"></section>
    <section id="tecnologias">
      <div class="categorias-tecnologias"></div>
    </section>
    <section id="certificados">
      <div class="certificados-carrusel"></div>
    </section>
    <div class="tech-ticker" id="tech-ticker">
      <div class="tech-ticker-track" id="tech-ticker-track"></div>
    </div>
  `;
};

beforeEach(montarDOM);

// ── renderProyectos ───────────────────────────────────────────────
describe('renderProyectos', () => {
  it('genera el contenedor de proyectos principales', () => {
    renderProyectos();
    const grid = document.querySelector('.proyectos-principales');
    expect(grid).not.toBeNull();
  });

  it('crea al menos una proyecto-card', () => {
    renderProyectos();
    const cards = document.querySelectorAll('.proyecto-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('cada card muestra título y descripción', () => {
    renderProyectos();
    const cards = document.querySelectorAll('.proyecto-card');
    cards.forEach((card) => {
      expect(card.querySelector('.proyecto-card-titulo')?.textContent.trim().length).toBeGreaterThan(0);
      expect(card.querySelector('.proyecto-card-desc')?.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  it('los proyectos con repositorio tienen enlace a GitHub', () => {
    renderProyectos();
    const links = document.querySelectorAll('.proyecto-repo-link');
    links.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^https?:\/\//);
      expect(link.getAttribute('target')).toBe('_blank');
    });
  });

  it('no hace nada si el contenedor no existe', () => {
    document.body.innerHTML = '';
    expect(() => renderProyectos()).not.toThrow();
  });
});

// ── renderExperiencias ────────────────────────────────────────────
describe('renderExperiencias', () => {
  it('genera sección de Experiencias Profesionales y Freelancer', () => {
    renderExperiencias();
    const titulos = document.querySelectorAll('#experiencias h2');
    expect(titulos.length).toBe(2);
  });

  it('crea tarjetas con empresa, cargo y lista de ítems', () => {
    renderExperiencias();
    const cards = document.querySelectorAll('.exp-card');
    expect(cards.length).toBeGreaterThan(0);
    cards.forEach((card) => {
      expect(card.querySelector('.exp-empresa')?.textContent.trim().length).toBeGreaterThan(0);
      expect(card.querySelector('.exp-cargo')?.textContent.trim().length).toBeGreaterThan(0);
      expect(card.querySelectorAll('.exp-lista li').length).toBeGreaterThan(0);
    });
  });

  it('la experiencia actual tiene badge', () => {
    renderExperiencias();
    const badge = document.querySelector('.exp-badge-actual');
    expect(badge).not.toBeNull();
  });
});

// ── renderTecnologias ─────────────────────────────────────────────
describe('renderTecnologias', () => {
  it('genera el bloque de tecnologías foco', () => {
    renderTecnologias();
    const foco = document.querySelector('.tecs-foco');
    expect(foco).not.toBeNull();
    expect(foco.querySelectorAll('.pastilla').length).toBeGreaterThan(0);
  });

  it('genera el bloque secundario con keyword-chips', () => {
    renderTecnologias();
    const chips = document.querySelectorAll('.keyword-chip');
    expect(chips.length).toBeGreaterThan(0);
  });
});

// ── renderCertificados ────────────────────────────────────────────
describe('renderCertificados', () => {
  it('genera el ticker con cert-cards duplicadas', () => {
    renderCertificados();
    const track = document.querySelector('.cert-track');
    const cards = document.querySelectorAll('.cert-card');
    expect(track).not.toBeNull();
    // Items duplicados para loop infinito
    expect(cards.length % 2).toBe(0);
  });

  it('cada card tiene imagen con alt descriptivo', () => {
    renderCertificados();
    const imgs = document.querySelectorAll('.cert-card .cert-img');
    imgs.forEach((img) => {
      expect(img.getAttribute('alt').length).toBeGreaterThan(0);
      expect(img.getAttribute('loading')).toBe('lazy');
    });
  });

  it('cada card tiene data-cert-index', () => {
    renderCertificados();
    // Solo la primera mitad (no duplicados) tiene índices 0..n-1
    const cards = document.querySelectorAll('.cert-card');
    const indices = Array.from(cards).map((c) => Number(c.dataset.certIndex));
    expect(indices.every((i) => !isNaN(i))).toBe(true);
  });
});

// ── renderTechTicker ──────────────────────────────────────────────
describe('renderTechTicker', () => {
  it('rellena el track con ítems duplicados', () => {
    renderTechTicker();
    const track = document.getElementById('tech-ticker-track');
    const items = track.querySelectorAll('.ticker-item');
    expect(items.length % 2).toBe(0);
  });

  it('no falla si el elemento no existe en el DOM', () => {
    document.body.innerHTML = '';
    expect(() => renderTechTicker()).not.toThrow();
  });
});
