(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; };
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Toca um vídeo só enquanto ele está visível.
  const whenVisible = (node, onChange, rootMargin = '0px') => {
    new IntersectionObserver((entries) => entries.forEach((e) => onChange(e.isIntersecting)), { rootMargin }).observe(node);
  };
  const play = (v) => { const p = v.play(); if (p) p.catch(() => {}); };

  /* Linha do tempo no topo */
  const top = $('#top');
  const progress = $('#progress');
  const ticks = $('#ticks');
  const sections = ['projetos', 'sobre', 'curriculo', 'contato'].map((id) => document.getElementById(id));
  const navLinks = $$('.top__nav a');

  const layoutTicks = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    ticks.innerHTML = sections.map((s) => `<i style="left:${Math.min(100, (s.offsetTop / max) * 100)}%"></i>`).join('');
  };
  let queued = false;
  const onScroll = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    top.classList.toggle('is-stuck', scrollY > 24);
    let current = -1;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
    navLinks.forEach((a, i) => (i === current ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { layoutTicks(); onScroll(); });
  addEventListener('load', layoutTicks);
  layoutTicks();
  onScroll();

  /* Menu do celular */
  const menu = $('#menu');
  const closeMenu = () => menu.close();
  $('#menuOpen').addEventListener('click', () => menu.showModal());
  $('#menuClose').addEventListener('click', closeMenu);
  $$('a', menu).forEach((a) => a.addEventListener('click', closeMenu));

  /* Entrada suave das seções */
  if (!calm && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach((n) => io.observe(n));
  } else {
    $$('.reveal').forEach((n) => n.classList.add('is-in'));
  }

  /* Comparador de acabamentos */
  const stage = $('#stage');
  const range = $('#range');
  const vids = { a: $('#vidA'), b: $('#vidB') };
  const picks = { a: 'fosco', b: 'verniz-localizado' };
  const labels = { a: [$('#labelA'), $('#segA')], b: [$('#labelB'), $('#segB')] };
  const finishes = $('#finishes');
  let activeSide = 'a';
  let stageOn = false;
  let userPaused = false;

  $$('[data-finish-count]').forEach((n) => { n.textContent = FINISHES.length; });

  const groups = [...new Set(FINISHES.map((f) => f.group))];
  finishes.innerHTML = groups.map((g) => `
    <h4 class="mono">${g}</h4>
    <ul class="tiles">${FINISHES.filter((f) => f.group === g).map((f) => `
      <li><button type="button" class="tile" data-id="${f.id}">
        <span class="tile__img"><img src="midia/takes/${f.id}-mini.webp" alt="" loading="lazy" width="480" height="270"><i class="tile__badge" aria-hidden="true"></i></span>
        <span class="tile__name">${f.name}</span>
      </button></li>`).join('')}
    </ul>`).join('');

  const markTiles = () => $$('.tile', finishes).forEach((t) => {
    const side = t.dataset.id === picks.a ? 'A' : t.dataset.id === picks.b ? 'B' : '';
    t.querySelector('.tile__badge').textContent = side;
    t.classList.toggle('is-picked', !!side);
    t.setAttribute('aria-pressed', String(!!side));
  });

  const srcOf = (id) => `midia/takes/${id}.mp4`;
  const syncToA = () => {
    if (vids.b.readyState >= 2 && vids.a.readyState >= 2 && Math.abs(vids.a.currentTime - vids.b.currentTime) > 0.06) {
      vids.b.currentTime = vids.a.currentTime;
    }
  };
  vids.a.addEventListener('timeupdate', syncToA);

  const loadSide = (side) => {
    const v = vids[side];
    const other = vids[side === 'a' ? 'b' : 'a'];
    const at = other.currentTime || 0;
    v.poster = `midia/takes/${picks[side]}.webp`;
    v.src = srcOf(picks[side]);
    v.addEventListener('loadeddata', () => {
      v.currentTime = at;
      if (stageOn && !userPaused) play(v);
    }, { once: true });
    v.load();
  };

  const setPick = (side, id) => {
    if (picks[side === 'a' ? 'b' : 'a'] === id) { // escolher o mesmo do outro lado inverte os dois
      const other = side === 'a' ? 'b' : 'a';
      picks[other] = picks[side];
      labelSide(other);
      if (vids[other].src) loadSide(other);
      else vids[other].poster = `midia/takes/${picks[other]}.webp`;
    }
    picks[side] = id;
    labelSide(side);
    if (vids[side].src) loadSide(side);
    else vids[side].poster = `midia/takes/${id}.webp`;
    markTiles();
  };
  const labelSide = (side) => {
    const name = FINISHES.find((f) => f.id === picks[side]).name;
    labels[side].forEach((n) => { n.textContent = name; });
  };

  finishes.addEventListener('click', (e) => {
    const t = e.target.closest('.tile');
    if (t) setPick(activeSide, t.dataset.id);
  });

  // No desktop, o acabamento se mexe ao passar o mouse; no toque, fica a imagem para economizar dados.
  if (matchMedia('(hover: hover)').matches && !calm) {
    finishes.addEventListener('pointerover', (e) => {
      const t = e.target.closest('.tile');
      if (!t || t.querySelector('video')) return;
      const v = el(`<video muted loop playsinline src="midia/takes/${t.dataset.id}-mini.mp4"></video>`);
      t.querySelector('.tile__img').append(v);
      play(v);
    });
    finishes.addEventListener('pointerout', (e) => {
      const t = e.target.closest('.tile');
      if (t && !t.contains(e.relatedTarget)) { const v = t.querySelector('video'); if (v) v.remove(); }
    });
  }

  $$('.seg__btn').forEach((b) => b.addEventListener('click', () => {
    activeSide = b.dataset.side;
    $$('.seg__btn').forEach((o) => {
      const on = o === b;
      o.classList.toggle('is-on', on);
      o.setAttribute('aria-pressed', String(on));
    });
  }));

  const setPos = (pct) => {
    const p = Math.max(0, Math.min(100, pct));
    stage.style.setProperty('--pos', `${p}%`);
    range.value = p;
  };
  range.addEventListener('input', () => setPos(+range.value));

  // Arrastar na horizontal move a divisão; na vertical a página rola normalmente (touch-action: pan-y).
  let dragging = false;
  const fromEvent = (e) => {
    const r = stage.getBoundingClientRect();
    setPos(((e.clientX - r.left) / r.width) * 100);
  };
  stage.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.stage__play')) return;
    dragging = true;
    stage.setPointerCapture(e.pointerId);
    stage.classList.add('is-drag', 'is-used');
    fromEvent(e);
  });
  stage.addEventListener('pointermove', (e) => { if (dragging) fromEvent(e); });
  const endDrag = () => { dragging = false; stage.classList.remove('is-drag'); };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  const stagePlay = $('#stagePlay');
  const applyPlayback = () => {
    Object.values(vids).forEach((v) => { if (stageOn && !userPaused && v.src) play(v); else v.pause(); });
    stagePlay.textContent = userPaused ? 'Tocar' : 'Pausar';
  };
  stagePlay.addEventListener('click', () => { userPaused = !userPaused; applyPlayback(); });
  if (calm) userPaused = true;

  // Os vídeos só começam a baixar quando o comparador está perto de aparecer.
  whenVisible(stage, (on) => {
    if (on && !vids.a.src) { loadSide('a'); loadSide('b'); }
    stageOn = on;
    applyPlayback();
  }, '200px');
  markTiles();
  stagePlay.textContent = userPaused ? 'Tocar' : 'Pausar';

  /* Placar de ganhadores: a capa acompanha o cursor; no celular ela fica na própria linha */
  const placar = $('#placar');
  const peek = $('#placarPeek');
  placar.innerHTML = WINNERS.map((w, i) => `<li><a class="placar__row" href="#/ganhadores/${i}" data-id="${w.id}">
    <span class="mono">${String(i + 1).padStart(2, '0')}</span>
    <img class="placar__thumb" src="https://i.ytimg.com/vi/${w.id}/mqdefault.jpg" alt="" loading="lazy" width="320" height="180">
    <span class="placar__prize">${w.prize}</span>
    <span class="placar__who"><b>${w.who}</b>${w.where}</span>
    ${w.metric ? `<span class="placar__metric">${w.metric}</span>` : ''}
  </a></li>`).join('');
  placar.addEventListener('pointermove', (e) => {
    const row = e.target.closest('.placar__row');
    if (e.pointerType !== 'mouse' || !row) { peek.classList.remove('is-on'); return; }
    const src = `https://i.ytimg.com/vi/${row.dataset.id}/mqdefault.jpg`;
    const img = $('img', peek);
    if (img.getAttribute('src') !== src) img.src = src;
    const x = Math.min(e.clientX + 24, innerWidth - peek.offsetWidth - 12);
    const y = Math.max(12, Math.min(e.clientY - peek.offsetHeight / 2, innerHeight - peek.offsetHeight - 12));
    peek.style.transform = `translate(${x}px, ${y}px)`;
    peek.classList.add('is-on');
  });
  placar.addEventListener('pointerleave', () => peek.classList.remove('is-on'));

  /* Timeline de montagem: a agulha segue o cursor */
  const rolo = $('#rolo');
  rolo.addEventListener('pointermove', (e) => {
    rolo.style.setProperty('--x', `${e.clientX - rolo.getBoundingClientRect().left}px`);
  });

  /* Casos: abrem por link (#/zeluiz), então o botão Voltar do celular fecha o caso */
  const dlg = $('#case');
  const media = $('#caseMedia');
  let cameFromPage = false;
  let returningFromCase = false;
  let currentId = null;
  const works = [...SELECTED];

  const ytThumb = (id, size) => `https://i.ytimg.com/vi/${id}/${size}.jpg`;
  const ytFrame = (id, title) => `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="${title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

  const renderYoutube = (media, items, label, start = 0) => {
    const list = items.length > 1;
    media.innerHTML = `
      <div class="player"></div>
      ${list ? `<div class="reel-list">
        <p class="mono">${label} <span class="pl-count"></span></p>
        <ul class="plist">${items.map(([id, t], i) => `
          <li><button type="button" data-i="${i}"><img src="${ytThumb(id, 'mqdefault')}" alt="" loading="lazy" width="320" height="180"><span>${t}</span></button></li>`).join('')}
        </ul></div>` : ''}`;
    const player = $('.player', media);
    const show = (i, autoplay) => {
      const [id, title, shape] = items[i];
      player.classList.toggle('player--v', shape === 'v');
      if (autoplay) {
        player.innerHTML = ytFrame(id, title);
      } else {
        player.innerHTML = `<button type="button" class="facade" aria-label="Assistir: ${title}">
          <img src="${ytThumb(id, 'maxresdefault')}" alt="" width="1280" height="720">
          <span class="facade__play" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
        </button>`;
        const img = $('img', player);
        // O YouTube devolve uma imagem cinza de 120 px quando não existe capa em alta.
        img.addEventListener('load', () => { if (img.naturalWidth <= 120) img.src = ytThumb(id, 'hqdefault'); });
        img.addEventListener('error', () => { img.src = ytThumb(id, 'hqdefault'); }, { once: true });
        $('.facade', player).addEventListener('click', () => { player.innerHTML = ytFrame(id, title); });
      }
      if (list) {
        $$('.plist button', media).forEach((b, n) => b.classList.toggle('is-on', n === i));
        $('.pl-count', media).textContent = `${i + 1} de ${items.length}`;
      }
    };
    show(items[start] ? start : 0, false);
    if (list) $('.plist', media).addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      show(+b.dataset.i, true);
      player.scrollIntoView({ block: 'nearest', behavior: calm ? 'auto' : 'smooth' });
    });
  };

  const renderReels = (media, items) => {
    media.innerHTML = `<div class="reels">
      <div class="reels__phone"></div>
      <div class="reels__list">
        ${items.map(([code, t, d], i) => `<button type="button" class="reel-pick" data-i="${i}"><small class="mono">Peça ${i + 1} de ${items.length}</small><strong>${t}</strong><span>${d}</span></button>`).join('')}
        <a class="link reels__out" target="_blank" rel="noopener">Abrir no Instagram <span aria-hidden="true">↗</span></a>
      </div>
    </div>`;
    const show = (i) => {
      const [code, title] = items[i];
      $('.reels__phone', media).innerHTML = `<iframe src="https://www.instagram.com/reel/${code}/embed/" title="Reel: ${title}" loading="lazy" scrolling="no" allow="encrypted-media; fullscreen"></iframe>`;
      $('.reels__out', media).href = `https://www.instagram.com/reel/${code}/`;
      $$('.reel-pick', media).forEach((b, n) => { b.classList.toggle('is-on', n === i); b.setAttribute('aria-pressed', String(n === i)); });
    };
    $$('.reel-pick', media).forEach((b) => b.addEventListener('click', () => show(+b.dataset.i)));
    show(0);
  };

  const renderMedia = (target, p, start) => {
    if (p.media.type === 'youtube') renderYoutube(target, p.media.items, p.listLabel, start);
    if (p.media.type === 'reels') renderReels(target, p.media.items);
  };

  const renderDetails = (root, p) => {
    $('[data-text]', root).innerHTML = p.overview.map((t) => `<p>${t}</p>`).join('');
    $('[data-meta]', root).innerHTML = [['Cliente', p.client], ['Função', p.role], ['Ferramentas', p.tools], ['Ano', p.year]]
      .filter(([, v]) => v)
      .map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${v}</dd></div>`).join('');
    $('[data-steps]', root).innerHTML = (p.steps || []).map(([t, d], i) => `<li><span class="mono">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('');
  };

  const renderCase = (id, start) => {
    const p = PROJECTS[id];
    currentId = id;
    $('#caseTag').textContent = p.tag;
    $('#caseTitle').textContent = p.title;
    renderMedia(media, p, start);
    renderDetails(dlg, p);
    const next = PROJECT_ORDER[(PROJECT_ORDER.indexOf(id) + 1) % PROJECT_ORDER.length];
    const nextBtn = $('#caseNext');
    nextBtn.dataset.id = next;
    nextBtn.innerHTML = `<small class="mono">Próximo projeto</small><span>${PROJECTS[next].title} <i aria-hidden="true">→</i></span>`;
    dlg.scrollTop = 0;
  };

  /* Palco de Trabalhos selecionados: o escolhido sobe e o atual ocupa o lugar dele nas miniaturas */
  const palco = $('#palco');
  const palcoStage = $('#palcoStage');
  const palcoWork = $('#palcoWork');
  const palcoMedia = $('#palcoMedia');
  const palcoMore = $('#palcoMore');
  const palcoThumbs = $('#palcoThumbs');
  const lab = $('#lab');

  const scrollToPalco = (instant) => palco.scrollIntoView({ behavior: calm || instant ? 'auto' : 'smooth' });

  const showWork = (id) => {
    const i = works.indexOf(id);
    [works[0], works[i]] = [works[i], works[0]];
    const p = PROJECTS[id];
    const isLab = p.media.type === 'lab';
    lab.hidden = !isLab;
    palcoWork.hidden = isLab;
    palcoMedia.innerHTML = ''; // interrompe o áudio do trabalho anterior
    if (!isLab) {
      $('#palcoTag').textContent = p.tag;
      $('#palcoTitle').textContent = p.title;
      $('#palcoBlurb').textContent = p.blurb;
      renderMedia(palcoMedia, p, 0);
    }
    renderDetails(palcoMore, p);
    palcoMore.open = false;
    palcoThumbs.innerHTML = works.slice(1).map((w) => {
      const t = PROJECTS[w];
      return `<li><a class="palco__thumb" href="#/${w}">
        <span class="palco__img"><img src="${t.thumb}" alt="" loading="lazy" width="480" height="270"${t.focus ? ` style="object-position:${t.focus}"` : ''}></span>
        <small class="mono">${t.tag}</small>
        <strong>${t.title}</strong>
      </a></li>`;
    }).join('');
  };

  const pickWork = (id) => {
    if (id !== works[0]) {
      showWork(id);
      if (!calm) palcoStage.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
      $('h3', PROJECTS[id].media.type === 'lab' ? lab : palcoWork).focus({ preventScroll: true });
    }
    scrollToPalco();
  };

  // Um link para trabalho selecionado nunca abre tela nova, venha do topo ou das miniaturas.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = a.getAttribute('href').slice(2);
    if (!works.includes(id)) return;
    e.preventDefault();
    history.replaceState(null, '', `#/${id}`);
    pickWork(id);
  });

  const hashParts = (hash) => hash.match(/^#\/([\w-]+)(?:\/(\d+))?/) || [];
  const isCase = (hash) => PROJECT_ORDER.includes(hashParts(hash)[1]);

  const openFromHash = (firstLoad) => {
    const [, id, start] = hashParts(location.hash);
    if (works.includes(id)) {
      if (dlg.open) dlg.close();
      if (id !== works[0]) showWork(id);
      if (firstLoad) scrollToPalco(true);
      else if (!returningFromCase) scrollToPalco();
    } else if (isCase(location.hash)) {
      if ($('.player iframe', palcoMedia)) showWork(works[0]); // o vídeo do palco não segue tocando atrás do caso
      renderCase(id, start ? +start : 0);
      if (!dlg.open) { dlg.showModal(); document.documentElement.classList.add('is-locked'); }
    } else if (dlg.open) {
      dlg.close();
    }
    returningFromCase = false;
  };

  dlg.addEventListener('close', () => {
    media.innerHTML = ''; // interrompe o áudio do player
    currentId = null;
    document.documentElement.classList.remove('is-locked');
    if (isCase(location.hash)) {
      if (cameFromPage) { returningFromCase = true; history.back(); }
      else history.replaceState(null, '', location.pathname + location.search);
    }
    cameFromPage = false;
  });
  $('#caseClose').addEventListener('click', () => dlg.close());
  $('#caseNext').addEventListener('click', (e) => {
    const id = e.currentTarget.dataset.id;
    history.replaceState(null, '', `#/${id}`);
    renderCase(id);
  });
  addEventListener('hashchange', (e) => {
    if (!isCase(new URL(e.oldURL).hash)) cameFromPage = true;
    openFromHash(false);
  });
  showWork(works[0]);
  openFromHash(true);

  /* Copiar e-mail */
  const copy = $('#copyMail');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copy.dataset.mail);
      copy.textContent = 'Copiado!';
    } catch {
      copy.textContent = 'Selecione o e-mail ao lado';
    }
    setTimeout(() => { copy.textContent = 'Copiar'; }, 2400);
  });
})();
