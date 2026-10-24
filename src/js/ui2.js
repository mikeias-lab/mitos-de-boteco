/* ============================================================
   TESTE DE ESTRESSE — o esforço sobe até a gambiarra falhar (ou passar)
   ============================================================ */

function resetStressUI(e) {
  const rig = $('rig');
  rig.className = 'rig';
  rig.querySelectorAll('.crack').forEach((c) => { c.style.opacity = 0; });
  $('rig-patch').style.opacity = '';
  const rr = $('rig-result'); rr.className = 'rig-result'; rr.textContent = '';
  const gi = $('gauge').firstElementChild; gi.style.width = '0%'; gi.style.background = 'var(--accent)';
  $('g-mark').style.display = 'none';
  $('g-var').textContent = e.variavel;
  $('g-val').innerHTML = nf(e.de) + '<small>' + e.unidade + '</small>';
  $('log').innerHTML = '<li>Pronto para testar. Aperte o botão para levar a gambiarra ao limite.</li>';
  const btn = $('btn-stress');
  btn.disabled = false;
  btn.querySelector('span').textContent = 'Simular teste de estresse';
}

function cancelStress() {
  if (stressRaf) { cancelAnimationFrame(stressRaf); stressRaf = null; }
}

function addLog(text, cls) {
  const li = document.createElement('li');
  if (cls) li.className = cls;
  li.textContent = text;
  $('log').appendChild(li);
}

function runStress() {
  if (!modeloAtual) return;
  const e = modeloAtual.m.estresse;
  cancelStress();
  resetStressUI(e);
  $('log').innerHTML = '';
  addLog('Iniciando: aumentando "' + e.variavel.toLowerCase() + '" de ' + nf(e.de) + ' a ' + nf(e.ate) + ' ' + e.unidade + '.');

  const btn = $('btn-stress');
  btn.disabled = true;
  btn.querySelector('span').textContent = 'Testando...';

  const rig = $('rig');
  const cracks = [...rig.querySelectorAll('.crack')];
  const gi = $('gauge').firstElementChild;
  const range = e.ate - e.de;
  const dur = reduceMotion ? 1500 : 6000;
  const falha = e.falhaEm != null && e.falhaEm < e.ate ? e.falhaEm : null;
  const t0 = performance.now();
  let idx = 0;

  /* O medidor muda de cor conforme se aproxima do limite: azul, laranja, vermelho */
  const corMedidor = (fr) => (fr > 0.85 ? 'var(--high)' : fr > 0.55 ? 'var(--mid)' : 'var(--accent)');

  const showValue = (v, fr) => {
    gi.style.width = ((v - e.de) / range * 100) + '%';
    gi.style.background = corMedidor(fr);
    $('g-val').innerHTML = nf(v) + '<small>' + e.unidade + '</small>';
  };

  const finish = (ok, v) => {
    showValue(v, ok ? 0 : 1);
    rig.classList.remove('shake');
    if (falha != null) {
      const mk = $('g-mark');
      mk.style.left = ((falha - e.de) / range * 100) + '%';
      mk.style.display = 'block';
    }
    const rr = $('rig-result');
    if (ok) {
      rig.classList.add('ok');
      rr.textContent = 'PASSOU'; rr.style.color = 'var(--low)';
      addLog('PASSOU. ' + (e.ok || 'A gambiarra aguentou o teste.'), 'good');
    } else {
      cracks.forEach((c) => { c.style.opacity = 1; });
      rig.classList.add('broken');
      $('rig-patch').style.opacity = .25;
      rr.textContent = 'FALHOU'; rr.style.color = 'var(--high)';
      addLog('FALHOU. ' + (e.falha || 'A gambiarra cedeu.'), 'bad');
    }
    rr.classList.add('show');
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Simular de novo';
    stressRaf = null;
  };

  const tick = (now) => {
    const t = Math.min(1, (now - t0) / dur);
    const v = e.de + range * t;

    if (falha != null && v >= falha) { finish(false, falha); return; }

    const fr = falha != null ? Math.max(0, (v - e.de) / (falha - e.de)) : t * 0.5;
    showValue(v, fr);
    cracks.forEach((c) => { c.style.opacity = falha != null && fr >= Number(c.dataset.c) ? 1 : 0; });
    if (fr > 0.6 && falha != null && !reduceMotion) rig.classList.add('shake');

    while (idx < e.passos.length && v >= e.passos[idx].a && (falha == null || e.passos[idx].a < falha)) {
      addLog(e.passos[idx].t);
      idx++;
    }
    if (t >= 1) { finish(true, e.ate); return; }
    stressRaf = requestAnimationFrame(tick);
  };
  stressRaf = requestAnimationFrame(tick);
}

/* ============================================================
   CATÁLOGO DE CENÁRIOS — busca, filtro por categoria, lista com veredito
   ============================================================ */

function semAcento(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

function filtrados() {
  const q = semAcento(state.busca.trim());
  return CENARIOS.filter((c) => {
    if (state.filtroCat === '__perigo') { if (!c._pn) return false; }
    else if (state.filtroCat === '__famosos') { if (!POPULARES.has(c.id)) return false; }
    else if (state.filtroCat === '__aprovados') { if (c._selo.texto !== 'APROVADO') return false; }
    else if (state.filtroCat !== 'Todos' && c.categoria !== state.filtroCat) return false;
    if (!q) return true;
    return semAcento(c.titulo + ' ' + c.resumo + ' ' + c.categoria).includes(q);
  });
}

/* Filtros especiais (os que não são categoria): rótulo, classe extra e como contar */
const FILTROS_ESPECIAIS = [
  { id: '__famosos', rotulo: 'Mais famosos', cls: '', conta: (c) => POPULARES.has(c.id) },
  { id: '__aprovados', rotulo: 'Aprovados', cls: ' ok', conta: (c) => c._selo.texto === 'APROVADO' },
  { id: '__perigo', rotulo: 'Com alerta', cls: ' pg', conta: (c) => !!c._pn }
];

function montarChipsCat() {
  const chip = (id, rotulo, n, cls) => '<button type="button" class="cat-chip' + cls + '" data-c="' + esc(id) + '" aria-pressed="' + (id === state.filtroCat) + '">' + esc(rotulo) + ' · ' + n + '</button>';
  const cats = [...new Set(CENARIOS.map((c) => c.categoria))];
  $('cat-chips').innerHTML =
    chip('Todos', 'Todos', CENARIOS.length, '') +
    FILTROS_ESPECIAIS.map((f) => chip(f.id, f.rotulo, CENARIOS.filter(f.conta).length, f.cls)).join('') +
    cats.map((c) => chip(c, c, CENARIOS.filter((x) => x.categoria === c).length, '')).join('');
}

/* Marca visível nos itens que pedem atenção (o item grave já tem o selo PERIGO) */
function marcaAtencao(c) {
  return c._pn === 'atencao' ? '<i class="atn" aria-hidden="true">!</i><span class="sr-only">Atenção, risco real. </span>' : '';
}

function montarLista() {
  const lista = filtrados();
  $('lista').innerHTML = lista.length
    ? lista.map((c) => {
        const cur = c.id === state.cenarioId;
        return '<button type="button" class="cen" data-id="' + c.id + '"' + (cur ? ' aria-current="true"' : '') + '>' +
          '<span class="t">' + marcaAtencao(c) + esc(c.titulo) + '</span>' +
          '<span class="sb tone-' + c._selo.tom + (c._pn === 'critico' ? ' pg' : '') + '">' + SELO_CURTO[c._selo.texto] + '</span>' +
          '<span class="c">' + esc(c.categoria) + '</span></button>';
      }).join('')
    : '<p class="vazio">Nenhum mito encontrado. Tente outra palavra ou limpe o filtro.</p>';
  $('cont').textContent = lista.length + ' de ' + CENARIOS.length;
  $('cat-atual').textContent = cenarioAtual().titulo;
  $('resumo-cenario').textContent = cenarioAtual().resumo;
}

/* Link direto para um laudo: #c=<id>. Funciona em qualquer endereço onde o site esteja publicado. */
function idDoHash() {
  const m = /^#c=([a-z0-9-]+)$/.exec(location.hash);
  return m && CENARIOS.some((c) => c.id === m[1]) ? m[1] : null;
}
function marcarHash() {
  try { history.replaceState(null, '', '#c=' + state.cenarioId); } catch (e) { /* sem histórico: ignora */ }
}

function escolherCenario(id, fechar) {
  state.cenarioId = id;
  marcarHash();
  const c = cenarioAtual();
  if (c.variantes) state.varianteId = c.variantes[0].id;
  montarLista();
  render();
  if (fechar && isMobile()) {
    setCatAberto(false);
    $('laudo').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
}

function setCatAberto(aberto) {
  $('cat-body').classList.toggle('collapsed', !aberto);
  $('cat-toggle').setAttribute('aria-expanded', String(aberto));
}

/* ============================================================
   MINHA GAMBIARRA — categoria, detalhes e sliders
   ============================================================ */

/* A busca de parecidos (parecidosCom) fica em busca.js; aqui só a interface. */
function montarParecidos() {
  const box = $('parecidos');
  const txt = state.ideia.trim();
  if (txt.length < 3) { box.hidden = true; box.innerHTML = ''; return; }
  const achados = parecidosCom(txt);
  const q = encodeURIComponent(txt + ' mito ou verdade');
  box.hidden = false;
  box.innerHTML =
    '<span class="eyebrow">' + (achados.length ? 'Já analisamos algo parecido' : 'Nada parecido entre os ' + CENARIOS.length + ' mitos analisados') + '</span>' +
    achados.map((c) => '<button type="button" class="cen" data-id="' + c.id + '"><span class="t">' + marcaAtencao(c) + esc(c.titulo) + '</span><span class="sb tone-' + c._selo.tom + (c._pn === 'critico' ? ' pg' : '') + '">' + SELO_CURTO[c._selo.texto] + '</span><span class="c">' + esc(c.categoria) + ' · abrir laudo</span></button>').join('') +
    '<a class="web" href="https://www.google.com/search?q=' + q + '" target="_blank" rel="noopener noreferrer"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>Pesquisar na web (abre em outra aba)</a>';
}

function montarCategorias() {
  $('sel-cat').innerHTML = Object.keys(PERFIS).map((c) => '<option value="' + esc(c) + '">' + esc(c) + '</option>').join('');
  $('sel-cat').value = state.cat;
  aplicarPerfil(false);
}

/* Troca de categoria: atualiza dica, exemplo e sliders que o usuário ainda não mexeu */
function aplicarPerfil(redesenhar) {
  const p = PERFIS[state.cat];
  $('in-ideia').placeholder = 'Ex.: ' + p.exemplo;
  $('dica-cat').innerHTML = '<b>Antes de executar:</b> ' + esc(p.dica);
  SLIDERS.forEach((s) => {
    if (!state.tocados[s.k]) {
      state.sl[s.k] = p.padrao[s.k];
      const inp = $('sl-' + s.k);
      if (inp) { inp.value = p.padrao[s.k]; $('sv-' + s.k).textContent = p.padrao[s.k]; }
    }
  });
  if (redesenhar) render();
}

function montarDetalhes() {
  const box = $('detalhes');
  const selects = ['material', 'ambiente'];
  const segs = ['duracao', 'exposicao', 'experiencia'];
  let html = '<span class="eyebrow">Detalhes da montagem</span><div class="grid2">';
  selects.forEach((k) => {
    html += '<div class="field"><label for="op-' + k + '">' + OPCOES[k].rotulo + '</label><select id="op-' + k + '" class="select" data-k="' + k + '">' +
      OPCOES[k].itens.map((i) => '<option value="' + i.v + '">' + esc(i.t) + '</option>').join('') + '</select></div>';
  });
  html += '</div>';
  segs.forEach((k) => {
    html += '<div class="field"><span class="lab" id="lab-' + k + '">' + OPCOES[k].rotulo + '</span><div class="seg' + (OPCOES[k].itens.length > 3 ? ' two' : '') + '" role="group" aria-labelledby="lab-' + k + '" data-seg="' + k + '">' +
      OPCOES[k].itens.map((i) => '<button type="button" data-v="' + i.v + '" aria-pressed="' + (state.opt[k] === i.v) + '">' + esc(i.t) + '</button>').join('') + '</div></div>';
  });
  box.innerHTML = html;
  selects.forEach((k) => { $('op-' + k).value = state.opt[k]; });
}

function montarSliders() {
  $('sliders').innerHTML = SLIDERS.map((s) =>
    '<div class="slider-row"><label for="sl-' + s.k + '">' + s.t + '</label>' +
    '<span class="v" id="sv-' + s.k + '">' + state.sl[s.k] + '</span>' +
    '<input type="range" id="sl-' + s.k + '" min="0" max="10" step="1" value="' + state.sl[s.k] + '">' +
    '<small>' + s.h + '</small></div>'
  ).join('');
  SLIDERS.forEach((s) => {
    $('sl-' + s.k).addEventListener('input', (ev) => {
      state.sl[s.k] = Number(ev.target.value);
      state.tocados[s.k] = true;
      $('sv-' + s.k).textContent = ev.target.value;
      render();
    });
  });
}

/* ============================================================
   EVENTOS E INICIALIZAÇÃO
   ============================================================ */

function setModo(modo) {
  state.modo = modo;
  const pronto = modo === 'pronto';
  $('tab-pronto').setAttribute('aria-selected', String(pronto));
  $('tab-custom').setAttribute('aria-selected', String(!pronto));
  $('pane-pronto').hidden = !pronto;
  $('pane-custom').hidden = pronto;
  render();
}

function abrirLaudo() {
  if (!modeloAtual) return;
  const dlg = $('dlg-laudo');
  $('dlg-body').innerHTML = htmlLaudo();
  $('dlg-body').scrollTop = 0;
  if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); }
  else dlg.setAttribute('open', '');
}

function fecharLaudo() {
  const dlg = $('dlg-laudo');
  if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
}

/* ============================================================
   COMPARTILHAR — link do laudo + botões das redes (sem scripts de terceiros)
   ============================================================ */
function dadosCompartilhar() {
  const base = location.href.split('#')[0];
  const selo = modeloAtual ? modeloAtual.r.selo.texto : '';
  if (state.modo === 'pronto') {
    return { url: base + '#c=' + state.cenarioId, texto: '"' + cenarioAtual().titulo + '": carimbo ' + selo + ' no Rastreador de Mitos de Boteco.' };
  }
  return { url: base, texto: 'Minha gambiarra recebeu o carimbo ' + selo + ' no Rastreador de Mitos de Boteco.' };
}

function abrirCompartilhar() {
  if (!modeloAtual) return;
  const d = dadosCompartilhar();
  $('share-texto').textContent = d.texto;
  $('share-url').value = d.url;
  $('share-aviso').textContent = '';
  $('share-nativo').hidden = typeof navigator.share !== 'function';
  const dlg = $('dlg-share');
  if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
}

function fecharCompartilhar() {
  const dlg = $('dlg-share');
  if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
}

function copiarLink() {
  const campo = $('share-url');
  const falhou = () => { campo.focus(); campo.select(); $('share-aviso').textContent = 'Não consegui copiar sozinho: o link está selecionado, é só copiar.'; };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(campo.value).then(() => { $('share-aviso').textContent = 'Link copiado.'; }, falhou);
  } else falhou();
}

function init() {
  const doLink = idDoHash();
  if (doLink) state.cenarioId = doLink;
  montarChipsCat();
  montarCategorias();
  montarSliders();
  aplicarPerfil(false);
  montarDetalhes();
  montarLista();

  $('tab-pronto').addEventListener('click', () => setModo('pronto'));
  $('tab-custom').addEventListener('click', () => setModo('custom'));

  /* Catálogo */
  $('busca').addEventListener('input', (ev) => { state.busca = ev.target.value; montarLista(); });
  $('cat-chips').addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-c]');
    if (!b) return;
    /* clicar de novo no filtro aplicado desmarca e volta a mostrar todos */
    state.filtroCat = (b.dataset.c === state.filtroCat) ? 'Todos' : b.dataset.c;
    montarChipsCat(); montarLista();
  });
  $('lista').addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-id]');
    if (b) escolherCenario(b.dataset.id, true);
  });
  $('btn-sorte').addEventListener('click', () => {
    const outros = CENARIOS.filter((c) => c.id !== state.cenarioId);
    state.busca = ''; state.filtroCat = 'Todos'; $('busca').value = '';
    montarChipsCat();
    escolherCenario(outros[Math.floor(Math.random() * outros.length)].id, true);
  });
  $('cat-toggle').addEventListener('click', () => setCatAberto($('cat-body').classList.contains('collapsed')));

  $('seg-var').addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-v]');
    if (!b) return;
    state.varianteId = b.dataset.v;
    render();
  });

  /* Minha gambiarra: nenhum resultado até o usuário digitar ou mexer nos detalhes */
  const marcarCustom = () => { if (!state.tocou) state.tocou = true; };
  $('pane-custom').addEventListener('input', marcarCustom, true);
  $('pane-custom').addEventListener('change', marcarCustom, true);
  $('pane-custom').addEventListener('click', (ev) => { if (ev.target.closest('button[data-v]')) marcarCustom(); }, true);
  $('sel-cat').addEventListener('change', (ev) => { state.cat = ev.target.value; aplicarPerfil(true); });
  $('detalhes').addEventListener('change', (ev) => {
    const k = ev.target.dataset && ev.target.dataset.k;
    if (k) { state.opt[k] = ev.target.value; render(); }
  });
  $('detalhes').addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-v]');
    if (!b) return;
    const k = b.parentElement.dataset.seg;
    state.opt[k] = b.dataset.v;
    b.parentElement.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    render();
  });
  $('in-ideia').addEventListener('input', (ev) => { state.ideia = ev.target.value; montarParecidos(); render(); });
  $('parecidos').addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-id]');
    if (!b) return;
    escolherCenario(b.dataset.id, false);
    setModo('pronto');
    $('laudo').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
  $('in-orc').addEventListener('input', (ev) => { state.orc = ev.target.value; render(); });

  $('btn-stress').addEventListener('click', runStress);
  $('btn-ler').addEventListener('click', abrirLaudo);
  $('btn-compartilhar').addEventListener('click', abrirCompartilhar);
  $('share-fechar').addEventListener('click', fecharCompartilhar);
  $('share-copiar').addEventListener('click', copiarLink);
  $('share-nativo').addEventListener('click', () => {
    const d = dadosCompartilhar();
    navigator.share({ title: 'Rastreador de Mitos de Boteco', text: d.texto, url: d.url }).catch(() => {});
  });
  $('dlg-share').addEventListener('click', (ev) => { if (ev.target === ev.currentTarget) fecharCompartilhar(); });

  /* Categorias numa barra horizontal: a roda do mouse também rola de lado (quando há o que rolar) */
  $('cat-chips').addEventListener('wheel', (ev) => {
    const el = ev.currentTarget;
    if (!ev.deltaY || ev.shiftKey || el.scrollWidth <= el.clientWidth) return;
    const noFim = (ev.deltaY > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) || (ev.deltaY < 0 && el.scrollLeft <= 0);
    if (noFim) return;
    el.scrollLeft += ev.deltaY;
    ev.preventDefault();
  }, { passive: false });
  $('dlg-fechar').addEventListener('click', fecharLaudo);
  $('dlg-laudo').addEventListener('click', (ev) => { if (ev.target === ev.currentTarget) fecharLaudo(); });

  render();
}

init();
