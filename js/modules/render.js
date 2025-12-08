// ========================================
// MÓDULO DE RENDERIZADO
// Genera HTML dinámicamente desde datos
// ========================================

import { proyectos, experiencias, freelancer, servicios, tecnologias, certificados } from '../data/portfolio-data.js';

// Icono de GitHub para repositorios
const githubIcon = `<i class="fab fa-github" aria-hidden="true"></i>`;

/* Renderiza los proyectos del portafolio */
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

/* Renderiza las experiencias profesionales */
export const renderExperiencias = () => {
  const container = document.querySelector('#experiencias');
  if (!container) return;

  let html = '<h3>Experiencias Profesionales</h3>';
  
  // Experiencias principales - Timeline
  html += '<div class="experiencias-timeline">';
  experiencias.forEach((exp, index) => {
    // Extraer cargo de la fecha
    const fechaParts = exp.fecha.split('|');
    const periodo = fechaParts[0]?.trim() || '';
    const cargo = fechaParts[1]?.trim() || '';
    
    html += `
      <div class="experiencia-timeline-item ${index === experiencias.length - 1 ? 'last' : ''}">
        <div class="timeline-marker"></div>
        <div class="experiencia-content">
          <div class="experiencia-header">
            <div class="experiencia-empresa">${exp.empresa}</div>
            <div class="experiencia-cargo">${cargo}</div>
            <div class="experiencia-fecha">${periodo}</div>
          </div>
          <div class="experiencia-body">
            ${exp.descripcion ? `
              <div class="experiencia-descripcion">${exp.descripcion}</div>
            ` : ''}
            ${exp.descripciones ? exp.descripciones.map(d => `
              <div class="experiencia-descripcion">${d}</div>
            `).join('') : ''}
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';

  // Freelancer - Sección separada
  html += '<div class="freelancer-section">';
  html += `<h3 class="freelancer-titulo">${freelancer.titulo}</h3>`;
  html += '<div class="freelancer-experiencias">';
  
  freelancer.experiencias.forEach((exp, index) => {
    const fechaParts = exp.fecha.split('|');
    const periodo = fechaParts[0]?.trim() || '';
    const cargo = fechaParts[1]?.trim() || '';
    
    html += `
      <div class="freelancer-item ${index === freelancer.experiencias.length - 1 ? 'last' : ''}">
        <div class="freelancer-header">
          <div class="freelancer-empresa">${exp.empresa}</div>
          <div class="freelancer-cargo">${cargo}</div>
          <div class="freelancer-fecha">${periodo}</div>
        </div>
        <div class="freelancer-body">
          <div class="freelancer-descripcion">${exp.descripcion}</div>
          ${exp.lista ? `
            <ul class="freelancer-lista">
              ${exp.lista.map(item => `<li>${item}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      </div>
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

