import { describe, it, expect } from 'vitest';
import {
  proyectos,
  experiencias,
  freelancer,
  tecnologias,
  certificados
} from '../js/data/portfolio-data.js';

// ── PROYECTOS ────────────────────────────────────────────────────
describe('proyectos', () => {
  it('es un array no vacío', () => {
    expect(Array.isArray(proyectos)).toBe(true);
    expect(proyectos.length).toBeGreaterThan(0);
  });

  it('cada proyecto tiene los campos requeridos', () => {
    proyectos.forEach((p) => {
      expect(p, `proyecto id=${p.id}`).toMatchObject({
        id: expect.any(Number),
        tipo: expect.stringMatching(/^(principal|secundario)$/),
        titulo: expect.any(String),
        descripcion: expect.any(String),
        tags: expect.any(Array),
        tieneRepositorio: expect.any(Boolean),
      });
      expect(p.titulo.length).toBeGreaterThan(0);
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });

  it('los proyectos con repositorio tienen URL válida', () => {
    proyectos
      .filter((p) => p.tieneRepositorio)
      .forEach((p) => {
        expect(p.url).toMatch(/^https?:\/\//);
      });
  });

  it('hay al menos un proyecto de tipo principal', () => {
    const principales = proyectos.filter((p) => p.tipo === 'principal');
    expect(principales.length).toBeGreaterThan(0);
  });

  it('no hay IDs duplicados', () => {
    const ids = proyectos.map((p) => p.id);
    const unicos = new Set(ids);
    expect(unicos.size).toBe(ids.length);
  });
});

// ── EXPERIENCIAS ─────────────────────────────────────────────────
describe('experiencias', () => {
  it('es un array no vacío', () => {
    expect(Array.isArray(experiencias)).toBe(true);
    expect(experiencias.length).toBeGreaterThan(0);
  });

  it('cada experiencia tiene los campos requeridos', () => {
    experiencias.forEach((exp) => {
      expect(exp).toMatchObject({
        empresa: expect.any(String),
        periodo: expect.any(String),
        cargo: expect.any(String),
        lista: expect.any(Array),
      });
      expect(exp.lista.length).toBeGreaterThan(0);
    });
  });

  it('solo una experiencia puede estar marcada como actual', () => {
    const actuales = experiencias.filter((e) => e.actual === true);
    expect(actuales.length).toBeLessThanOrEqual(1);
  });
});

// ── FREELANCER ───────────────────────────────────────────────────
describe('freelancer', () => {
  it('es un array no vacío', () => {
    expect(Array.isArray(freelancer)).toBe(true);
    expect(freelancer.length).toBeGreaterThan(0);
  });

  it('cada entrada tiene empresa, cargo y lista', () => {
    freelancer.forEach((f) => {
      expect(f).toMatchObject({
        empresa: expect.any(String),
        cargo: expect.any(String),
        lista: expect.any(Array),
      });
      expect(f.lista.length).toBeGreaterThan(0);
    });
  });
});

// ── TECNOLOGÍAS ──────────────────────────────────────────────────
describe('tecnologias', () => {
  it('tiene las categorías backend, frontend, herramientas y palabrasClaves', () => {
    expect(tecnologias).toHaveProperty('backend');
    expect(tecnologias).toHaveProperty('frontend');
    expect(tecnologias).toHaveProperty('herramientas');
    expect(tecnologias).toHaveProperty('palabrasClaves');
  });

  it('backend no está vacío', () => {
    expect(tecnologias.backend.length).toBeGreaterThan(0);
  });

  it('cada tecnología tiene nombre', () => {
    [...tecnologias.backend, ...tecnologias.herramientas].forEach((t) => {
      expect(typeof t.nombre).toBe('string');
      expect(t.nombre.length).toBeGreaterThan(0);
    });
  });
});

// ── CERTIFICADOS ─────────────────────────────────────────────────
describe('certificados', () => {
  it('es un array no vacío', () => {
    expect(Array.isArray(certificados)).toBe(true);
    expect(certificados.length).toBeGreaterThan(0);
  });

  it('cada certificado tiene los campos requeridos', () => {
    certificados.forEach((c) => {
      expect(c).toMatchObject({
        id: expect.any(Number),
        titulo: expect.any(String),
        institucion: expect.any(String),
        fecha: expect.any(String),
        imagen: expect.any(String),
      });
    });
  });

  it('no hay IDs duplicados', () => {
    const ids = certificados.map((c) => c.id);
    const unicos = new Set(ids);
    expect(unicos.size).toBe(ids.length);
  });

  it('las imágenes tienen extensión válida', () => {
    certificados.forEach((c) => {
      expect(c.imagen).toMatch(/\.(jpg|jpeg|png|webp)$/i);
    });
  });
});
