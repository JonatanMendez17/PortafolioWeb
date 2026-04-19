// Setup global para jsdom
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// IntersectionObserver no existe en jsdom
global.IntersectionObserver = class {
  constructor(callback) { this._cb = callback; }
  observe() {}
  unobserve() {}
  disconnect() {}
};
