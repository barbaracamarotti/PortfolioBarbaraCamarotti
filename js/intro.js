// Abertura da claquete: roda uma vez por sessão e remove a si mesma no fim.
(function () {
  var root = document.documentElement;
  var el = document.getElementById('intro');
  if (!el) return;
  if (!root.classList.contains('is-intro')) { el.remove(); return; }

  var tc = el.querySelector('[data-tc]');
  var t0 = performance.now();
  var raf = 0;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var tick = function (t) {
    var f = Math.floor((t - t0) / 1000 * 24);
    tc.textContent = '00:00:' + pad(Math.floor(f / 24)) + ':' + pad(f % 24);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  var done = false;
  var end = function () {
    if (done) return;
    done = true;
    // pulou antes da íris: o nome não fica esperando o atraso da intro
    if (performance.now() - t0 < 2500) root.classList.remove('has-intro');
    cancelAnimationFrame(raf);
    root.classList.remove('is-intro');
    el.remove();
    document.removeEventListener('keydown', onKey);
    try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}
  };
  var onKey = function (e) { if (e.key === 'Escape') end(); };

  el.addEventListener('animationend', function (e) { if (e.target === el) end(); });
  el.querySelector('.intro__skip').addEventListener('click', end);
  document.addEventListener('keydown', onKey);
  setTimeout(end, 3700); // rede de segurança se o navegador não disparar o fim da animação
})();
