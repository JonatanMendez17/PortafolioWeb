// ========================================
// MÓDULO DE RENDERIZADO
// Genera HTML dinámicamente desde datos
// ========================================

import { proyectos, experiencias, freelancer, servicios, tecnologias, certificados } from '../data/portfolio-data.js';

// SVG de GitHub para repositorios
const githubIcon = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
`;

/**
 * Renderiza los proyectos del portafolio
 */
export const renderProyectos = () => {
  const container = document.querySelector('#portafolio .proyectos-grid');
  if (!container) return;

  container.innerHTML = proyectos.map(proyecto => `
    <div class="proyecto">
      <div class="miniatura">
        <a href="${proyecto.url}" target="_blank" rel="noopener noreferrer" class="proyecto-enlace">
          <img src="${proyecto.imagen}" alt="Icono ${proyecto.titulo}" class="proyecto-imagen" loading="lazy">
          <span class="proyecto-titulo-miniatura">${proyecto.titulo}</span>
        </a>
      </div>
      <div class="metadatos">
        <div class="proyecto-titulo">
          <a href="${proyecto.url}" target="_blank" rel="noopener noreferrer" class="proyecto-enlace-titulo">${proyecto.titulo}</a>
        </div>
        <div class="proyecto-descripcion">${proyecto.descripcion}</div>
        ${proyecto.tieneRepositorio ? `
          <div class="proyecto-info">
            ${githubIcon}
            <span>(Repositorio)</span>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
};

/**
 * Renderiza las experiencias profesionales
 */
export const renderExperiencias = () => {
  const container = document.querySelector('#experiencias');
  if (!container) return;

  let html = '<h3>Experiencias Profesionales</h3>';
  
  // Experiencias principales
  html += '<div class="experiencias-grid">';
  experiencias.forEach(exp => {
    html += `
      <div class="experiencia-item ${exp.tieneMargenInferior ? 'margen-inferior' : ''}">
        <div class="experiencia-empresa">${exp.empresa}</div>
        <div class="experiencia-fecha"><strong>${exp.fecha}</strong></div>
        ${exp.descripcion ? `<div class="experiencia-descripcion">${exp.descripcion}</div>` : ''}
        ${exp.descripciones ? exp.descripciones.map(d => `<div class="experiencia-descripcion">${d}</div>`).join('') : ''}
      </div>
    `;
  });
  html += '</div>';

  // Freelancer
  html += '<div class="experiencias-grid margen-superior-pequeño">';
  html += '<div class="experiencia-item">';
  html += `<h3>${freelancer.titulo}</h3>`;
  
  freelancer.experiencias.forEach(exp => {
    html += `
      <div class="experiencia-empresa">${exp.empresa}</div>
      <div class="experiencia-fecha"><strong>${exp.fecha}</strong></div>
      <div class="experiencia-descripcion">${exp.descripcion}</div>
      ${exp.lista ? `
        <ul class="experiencia-lista">
          ${exp.lista.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <br>
      ` : ''}
    `;
  });
  
  html += '</div></div>';
  
  container.innerHTML = html;
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

/**
 * Renderiza las tecnologías
 */
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.329 0C8.382 0 5.182 3.192 5.182 7.13c0 3.94 3.2 7.13 7.147 7.13.12 0 .24 0 .35-.01l4.24 4.89c.06.06.14.09.22.09.09 0 .18-.04.24-.11.08-.1.08-.26 0-.36l-4.25-4.92c.01-.11.01-.23.01-.34 0-3.939-3.2-7.13-7.148-7.13zm-2.555 7.13c0-1.44 1.166-2.61 2.605-2.61 1.44 0 2.605 1.17 2.605 2.61 0 1.44-1.166 2.61-2.605 2.61-1.44 0-2.605-1.17-2.605-2.61z"/>
                  <path d="M22.752 20.5l-5.12-5.91c-.06-.07-.14-.11-.23-.11-.1 0-.19.04-.25.11l-5.12 5.91c-.08.09-.08.26 0 .36.06.07.15.11.24.11h10.24c.09 0 .18-.04.24-.11.08-.1.08-.26 0-.36z"/>
                </svg>
                ${tech.nombre}
              </span>
            `;
          } else if (tech.tech === 'divi') {
            return `
              <span class="pastilla" data-tech="${tech.tech}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icono-sin-encogimiento">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M10 7h3.5a3.5 3.5 0 0 1 0 7H10z" />
                </svg>
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
    <div class="categoria">
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

/**
 * Renderiza los certificados en un carrusel
 */
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
            <div class="certificado-contenido">
              <div class="certificado-header">
                <h4 class="certificado-titulo">${cert.titulo}</h4>
                <div class="certificado-info">
                  <span class="certificado-institucion">${cert.institucion}</span>
                  <span class="certificado-fecha">${cert.fecha}</span>
                </div>
              </div>
              <div class="certificado-pdf">
                <iframe 
                  src="${cert.archivo}#toolbar=0&navpanes=0&scrollbar=0" 
                  type="application/pdf"
                  class="certificado-iframe"
                  title="Certificado: ${cert.titulo}"
                  loading="lazy">
                </iframe>
                <a href="${cert.archivo}" target="_blank" rel="noopener noreferrer" class="certificado-descargar" download>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Descargar PDF
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      ${certificados.length > 1 ? `
        <div class="carrusel-controls">
          <button type="button" class="carrusel-btn carrusel-prev" aria-label="Certificado anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div class="carrusel-indicators">
            ${certificados.map((_, index) => `
              <button type="button" class="carrusel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ir al certificado ${index + 1}"></button>
            `).join('')}
          </div>
          <button type="button" class="carrusel-btn carrusel-next" aria-label="Certificado siguiente">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      ` : ''}
    </div>
  `;
};

/**
 * Inicializa el renderizado de todo el contenido
 */
export const initRender = () => {
  renderProyectos();
  renderExperiencias();
  renderServicios();
  renderTecnologias();
  renderCertificados();
};

