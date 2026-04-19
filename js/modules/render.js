// ========================================
// MÓDULO DE RENDERIZADO
// Genera HTML dinámicamente desde datos
// ========================================

import { proyectos, experiencias, freelancer, servicios, tecnologias, certificados } from '../data/portfolio-data.js';

// Icono de GitHub para repositorios
const githubIcon = `<i class="fab fa-github" aria-hidden="true"></i>`;

const renderTagsHtml = (tags) =>
  tags.map(t => `<span class="proyecto-tag">${t}</span>`).join('');

/* Renderiza los proyectos del portafolio */
export const renderProyectos = () => {
  const container = document.querySelector('#portafolio .proyectos-grid');
  if (!container) return;

  const principales = proyectos.filter(p => p.tipo === 'principal');
  const secundarios = proyectos.filter(p => p.tipo === 'secundario');

  const cardPrincipal = (p) => `
    <div class="proyecto-card">
      <div class="proyecto-card-header">
        <div>
          <div class="proyecto-card-titulo">${p.titulo}</div>
          ${p.cliente ? `<div class="proyecto-card-cliente">${p.cliente}</div>` : ''}
        </div>
        ${p.tieneRepositorio ? `
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="proyecto-repo-link" title="Ver repositorio">
            ${githubIcon}
          </a>` : ''}
      </div>
      <p class="proyecto-card-desc">${p.descripcion}</p>
      <div class="proyecto-tags">${renderTagsHtml(p.tags)}</div>
    </div>
  `;

  const cardSecundario = (p) => `
    <div class="proyecto-mini">
      <div class="proyecto-mini-circulo">
        ${p.tieneRepositorio
          ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="proyecto-repo-link" title="Ver repositorio">${githubIcon}</a>`
          : `<i class="fas fa-code" aria-hidden="true" style="font-size:22px;color:var(--apagado);"></i>`
        }
      </div>
      <div class="proyecto-mini-titulo">${p.titulo}</div>
    </div>
  `;

  container.innerHTML = `
    <div class="proyectos-principales">
      ${principales.map(cardPrincipal).join('')}
    </div>
  `;
};

const renderExpCard = (exp) => `
  <div class="exp-card">
    <div class="exp-card-header">
      <div class="exp-card-top">
        <span class="exp-empresa">${exp.empresa}</span>
        <span class="exp-periodo">${exp.periodo}</span>
      </div>
      <div class="exp-card-bottom">
        <span class="exp-cargo">${exp.cargo}</span>
        ${exp.actual ? '<span class="exp-badge-actual">Actual</span>' : ''}
      </div>
    </div>
    <ul class="exp-lista">
      ${exp.lista.map(item => `<li>${item}</li>`).join('')}
    </ul>
  </div>
`;

/* Renderiza las experiencias profesionales */
export const renderExperiencias = () => {
  const container = document.querySelector('#experiencias');
  if (!container) return;

  container.innerHTML = `
    <h3>Experiencias Profesionales</h3>
    <div class="exp-grid">
      ${experiencias.map(renderExpCard).join('')}
    </div>
    <h3 class="exp-titulo-freelancer">Freelancer</h3>
    <div class="exp-grid">
      ${freelancer.map(renderExpCard).join('')}
    </div>
  `;
};

/**
 * Renderiza los servicios
 */
export const renderServicios = () => {
  const container = document.querySelector('#servicios .servicios-grid');
  if (!container) return;

  container.innerHTML = servicios.map(servicio => `
    <div class="servicio-item">
      <div class="servicio-titulo">${servicio.titulo}</div>
      <div class="servicio-descripcion">${servicio.descripcion}</div>
    </div>
  `).join('');
};

/* Renderiza las tecnologías */
export const renderTecnologias = () => {
  const container = document.querySelector('#tecnologias .categorias-tecnologias');
  if (!container) return;

  let html = '';

  // Backend
  html += `
    <div class="categoria">
      <h4 class="categoria-titulo">Backend</h4>
      <div class="habilidades">
        ${tecnologias.backend.map(tech => `
          <span class="pastilla" data-tech="${tech.tech}">
            <i class="${tech.icono} colored tech-icono"></i>
            ${tech.nombre}
          </span>
        `).join('')}
      </div>
    </div>
  `;

  // Frontend
  html += `
    <div class="categoria">
      <h4 class="categoria-titulo">Frontend</h4>
      <div class="habilidades">
        ${tecnologias.frontend.map(tech => `
          <span class="pastilla" data-tech="${tech.tech}">
            <i class="${tech.icono} colored tech-icono"></i>
            ${tech.nombre}
          </span>
        `).join('')}
      </div>
    </div>
  `;

  // Diseño Web
  html += `
    <div class="categoria">
      <h4 class="categoria-titulo">Diseño Web</h4>
      <div class="habilidades">
        ${tecnologias.diseno.map(tech => {
          if (tech.tech === 'elementor') {
            return `
              <span class="pastilla" data-tech="${tech.tech}">
                <i class="fab fa-elementor" aria-hidden="true"></i>
                ${tech.nombre}
              </span>
            `;
          } else if (tech.tech === 'divi') {
            return `
              <span class="pastilla" data-tech="${tech.tech}">
                <i class="fas fa-paint-brush" aria-hidden="true"></i>
                ${tech.nombre}
              </span>
            `;
          } else {
            return `
              <span class="pastilla" data-tech="${tech.tech}">
                <i class="${tech.icono} colored tech-icono"></i>
                ${tech.nombre}
              </span>
            `;
          }
        }).join('')}
      </div>
    </div>
  `;

  // Herramientas
  html += `
    <div class="categoria">
      <h4 class="categoria-titulo">Herramientas</h4>
      <div class="habilidades">
        ${tecnologias.herramientas.map(tech => `
          <span class="pastilla" data-tech="${tech.tech}">
            <i class="${tech.icono} colored tech-icono"></i>
            ${tech.nombre}
          </span>
        `).join('')}
      </div>
    </div>
    <br>
  `;

  // Palabras Claves
  html += `
    <div class="categoria categoria-completa">
      <h4 class="categoria-titulo">Palabras Claves</h4>
      <div class="habilidades">
        ${tecnologias.palabrasClaves.map(kw => `
          <span class="pastilla" data-keyword="${kw.keyword}">
            • ${kw.nombre}
          </span>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
};

/* Renderiza los certificados en un carrusel */
export const renderCertificados = () => {
  const container = document.querySelector('#certificados .certificados-carrusel');
  if (!container) return;

  // Si no hay certificados, no mostrar nada
  if (!certificados || certificados.length === 0) {
    container.innerHTML = '<p class="texto-apagado">No hay certificados disponibles.</p>';
    return;
  }

  container.innerHTML = `
    <div class="carrusel-container">
      <div class="carrusel-track">
        ${certificados.map((cert, index) => `
          <div class="certificado-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="certificado-imagen-container">
              <img 
                src="${cert.imagen}" 
                alt="Certificado: ${cert.titulo} - ${cert.institucion}"
                class="certificado-imagen"
                loading="lazy">
            </div>
          </div>
        `).join('')}
        ${certificados.length > 1 ? `
          <button type="button" class="carrusel-btn carrusel-prev" aria-label="Certificado anterior">
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button type="button" class="carrusel-btn carrusel-next" aria-label="Certificado siguiente">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        ` : ''}
      </div>
      ${certificados.length > 1 ? `
        <div class="carrusel-controls">
          <div class="carrusel-indicators">
            ${certificados.map((_, index) => `
              <button type="button" class="carrusel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ir al certificado ${index + 1}"></button>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
};

/* Inicializa el renderizado de todo el contenido */
export const initRender = () => {
  renderProyectos();
  renderExperiencias();
  renderServicios();
  renderTecnologias();
  renderCertificados();
};

