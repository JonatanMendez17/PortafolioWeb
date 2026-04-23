// Setup global para jsdom
// No-op: evita que el loop de animación siga corriendo después del teardown
global.requestAnimationFrame = () => 0;
global.cancelAnimationFrame = () => {};

// IntersectionObserver no existe en jsdom
global.IntersectionObserver = class {
  constructor(callback) { this._cb = callback; }
  observe() {}
  unobserve() {}
  disconnect() {}
};
