// Ondas animadas en canvas para la portada

export const initWaves = () => {
  const canvas = document.getElementById('portada-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animId;

  const resize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();

  const waves = [
    { amplitude: 6,  frequency: 0.025, speed: 0.018, offset: 0,   color: 'rgba(124,58,237,0.30)' },
    { amplitude: 4,  frequency: 0.035, speed: 0.025, offset: 2.1, color: 'rgba(59,130,246,0.20)'  },
    { amplitude: 3,  frequency: 0.050, speed: 0.035, offset: 4.3, color: 'rgba(168,85,247,0.15)'  },
  ];

  let t = 0;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    waves.forEach(wave => {
      wave.offset += wave.speed;

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 4) {
        const y = canvas.height * 0.6
          + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.5 + wave.offset * 0.7) * (wave.amplitude * 0.4);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    });

    t++;
    animId = requestAnimationFrame(draw);
  };

  draw();

  return () => cancelAnimationFrame(animId);
};
