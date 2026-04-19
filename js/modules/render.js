// ========================================
// MÓDULO DE RENDERIZADO
// Genera HTML dinámicamente desde datos
// ========================================

import { proyectos, experiencias, freelancer, tecnologias, certificados } from '../data/portfolio-data.js';

// Icono de GitHub para repositorios
const githubIcon = `<i class="fab fa-github" aria-hidden="true"></i>`;

const renderTagsHtml = (tags) =>
  tags.map(t => `<span class="proyecto-tag">${t}</span>`).join('');

/* Renderiza los proyectos del portafolio */
export const renderProyectos = () => {
  const container = document.querySelector('#portafolio .proyectos-grid');
  if (!container) return;

  const principales = proyectos.filter(p => p.tipo === 'principal');

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

/* Renderiza las tecnologías */
export const renderTecnologias = () => {
  const container = document.querySelector('#tecnologias .categorias-tecnologias');
  if (!container) return;

  const iconHtml = (tech) => tech.icono
    ? `<i class="${tech.icono} colored tech-icono"></i>`
    : `<i class="${tech.fa || 'fas fa-code'} tech-icono"></i>`;

  const tecsFoco = [...tecnologias.backend, ...tecnologias.frontend];

  container.innerHTML = `
    <div class="tecs-foco">
      ${tecsFoco.map(tech => `
        <span class="pastilla pastilla-foco" data-tech="${tech.tech}">
          ${iconHtml(tech)}
          ${tech.nombre}
        </span>
      `).join('')}
    </div>

    <div class="tecs-secundario">
      ${tecnologias.herramientas.map(tech => `
        <span class="keyword-chip">${tech.nombre}</span>
      `).join('')}
      ${tecnologias.palabrasClaves.map(kw => `
        <span class="keyword-chip">${kw.nombre}</span>
      `).join('')}
    </div>
  `;
};

/* Modal de certificado */
const openCertModal = (cert) => {
  const existing = document.getElementById('cert-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'cert-modal';
  modal.className = 'cert-modal-overlay';
  modal.innerHTML = `
    <div class="cert-modal">
      <button class="cert-modal-cerrar" aria-label="Cerrar">&times;</button>
      <img src="${cert.imagen}" alt="${cert.titulo}" class="cert-modal-img">
      <div class="cert-modal-info">
        <div class="cert-modal-titulo">${cert.titulo}</div>
        <div class="cert-modal-meta">${cert.institucion} · ${cert.fecha}</div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('cert-modal-visible'));

  const close = () => {
    modal.classList.remove('cert-modal-visible');
    modal.addEventListener('transitionend', () => modal.remove(), { once: true });
  };

  modal.querySelector('.cert-modal-cerrar').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once: true });
};

/* Renderiza los certificados como cinta continua */
export const renderCertificados = () => {
  const container = document.querySelector('#certificados .certificados-carrusel');
  if (!container) return;

  if (!certificados || certificados.length === 0) {
    container.innerHTML = '<p class="texto-apagado">No hay certificados disponibles.</p>';
    return;
  }

  const items = certificados.map((cert, i) => `
    <div class="cert-card" data-cert-index="${i}" style="cursor:pointer;">
      <img src="${cert.imagen}" alt="${cert.titulo}" class="cert-img" loading="lazy">
      <div class="cert-info">
        <div class="cert-titulo">${cert.titulo}</div>
        <div class="cert-meta">${cert.institucion} · ${cert.fecha}</div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="cert-ticker">
      <div class="cert-track">${items + items}</div>
    </div>
  `;

  const ticker = container.querySelector('.cert-ticker');
  const track = container.querySelector('.cert-track');

  track.style.animation = 'none';

  const speed = 0.5;
  let position = 0;
  let isPaused = false;
  let isDragging = false;
  let lastX = 0;
  let mouseDownX = 0;
  let velocity = 0;

  const half = () => track.scrollWidth / 2;
  const wrap = (pos) => {
    const h = half();
    if (pos <= -h) return pos + h;
    if (pos > 0) return pos - h;
    return pos;
  };

  const tick = () => {
    if (!isPaused) {
      if (!isDragging) {
        velocity = velocity * 0.95 + speed * 0.05;
        position = wrap(position - velocity);
      } else {
        position = wrap(position);
      }
      track.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(tick);
  };

  ticker.addEventListener('mousedown', (e) => {
    isDragging = true;
    mouseDownX = e.clientX;
    lastX = e.clientX;
    velocity = 0;
    ticker.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - lastX;
    position = wrap(position + delta);
    velocity = -delta;
    lastX = e.clientX;
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    ticker.style.cursor = 'grab';

    // Si se movió menos de 5px es un click
    if (Math.abs(e.clientX - mouseDownX) < 5) {
      const card = e.target.closest('.cert-card');
      if (card) {
        const idx = parseInt(card.dataset.certIndex, 10) % certificados.length;
        isPaused = true;
        openCertModal(certificados[idx]);

        const modal = document.getElementById('cert-modal');
        if (modal) {
          const resume = () => { isPaused = false; };
          modal.addEventListener('transitionend', (ev) => {
            if (!modal.classList.contains('cert-modal-visible')) resume();
          });
        }
      }
    }
  });

  requestAnimationFrame(tick);
};

/* Renderiza la cinta de tecnologías backend */
export const renderTechTicker = () => {
  const ticker = document.getElementById('tech-ticker');
  const track = document.getElementById('tech-ticker-track');
  if (!ticker || !track) return;

  const items = tecnologias.backend.map(tech => `
    <span class="ticker-item">
      ${tech.icono
        ? `<i class="${tech.icono} colored"></i>`
        : `<i class="${tech.fa || 'fas fa-code'}"></i>`
      }
      ${tech.nombre}
    </span>
  `).join('');

  track.innerHTML = items + items;
  // Quitar animación CSS — la manejamos con JS
  track.style.animation = 'none';

  const speed = 0.6;
  let position = 0;
  let isDragging = false;
  let lastX = 0;
  let velocity = 0;

  const half = () => track.scrollWidth / 2;

  const wrap = (pos) => {
    const h = half();
    if (pos <= -h) return pos + h;
    if (pos > 0) return pos - h;
    return pos;
  };

  const tick = () => {
    if (!isDragging) {
      velocity = velocity * 0.95 + speed * 0.05;
      position = wrap(position - velocity);
    } else {
      position = wrap(position);
    }
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(tick);
  };

  ticker.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    velocity = 0;
    ticker.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - lastX;
    position = wrap(position + delta);
    velocity = -delta;
    lastX = e.clientX;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    ticker.style.cursor = 'grab';
  });

  requestAnimationFrame(tick);
};

/* Inicializa el renderizado de todo el contenido */
export const initRender = () => {
  renderProyectos();
  renderExperiencias();
  renderTecnologias();
  renderCertificados();
  renderTechTicker();
};

