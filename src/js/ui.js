/* ============================================================
   INTERFACE — estado, montagem do modelo e renderização
   ============================================================ */

const $ = (id) => document.getElementById(id);
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const nf = (x, d = 0) => x.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.matchMedia && window.matchMedia('(max-width: 999px)').matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const SLIDERS = [
  { k: 'calor', t: 'Calor envolvido', h: '0 = ambiente · 10 = motor, escape, fogão' },
  { k: 'eletrico', t: 'Eletricidade envolvida', h: '0 = nenhuma · 10 = rede de 127/220 V' },
  { k: 'grav', t: 'Gravidade se falhar', h: '0 = nada demais · 10 = machuca ou causa grande prejuízo' },
  { k: 'A', t: 'Qualidade do material para a função', h: '0 = não foi feito para isso · 10 = feito para isso' },
  { k: 'M', t: 'Base física do funcionamento', h: '0 = só crença · 10 = princípio comprovado' },
  { k: 'C', t: 'Folga de uso', h: '0 = no limite · 10 = bem abaixo do limite' },
];

const state = {
  modo: 'pronto',
  cenarioId: CENARIOS[0].id,
  varianteId: CENARIOS[0].variantes[0].id,
  busca: '',
  filtroCat: 'Todos',
  cat: 'Eletrônicos',
  ideia: '',
  orc: 40,
  sl: Object.assign({}, PERFIS['Eletrônicos'].padrao),
  tocados: {},
  tocou: false,
  opt: { material: 'nao', ambiente: 'seco', duracao: 'meses', exposicao: 'familia', experiencia: 'media' },
};

let modeloAtual = null;
let stressRaf = null;

/* ---------- Montagem do modelo ---------- */

function cenarioAtual() { return CENARIOS.find((x) => x.id === state.cenarioId); }

function modeloPronto() {
  const c = cenarioAtual();
  const v = c.variantes ? (c.variantes.find((x) => x.id === state.varianteId) || c.variantes[0]) : c;
  const pg = PERIGO[c.id] || null;
  return {
    perigo: pg,
    titulo: c.titulo + (c.variantes ? ' · ' + v.nome : ''),
    resumo: c.resumo,
    categoria: c.categoria,
    orcTxt: 'Gasto da gambiarra: ' + brl.format(v.custoGambiarra),
    horTxt: 'Horizonte: ' + c.horizonteTxt,
    horizonteTxt: c.horizonteTxt,
    unidadeDurab: c.unidadeDurab,
    durabRotulo: c.durabRotulo,
    variantes: c.variantes || null,
    cfg: {
      fatores: v.fatores, riscos: v.riscos, durabNominal: v.durabNominal,
      custoGambiarra: v.custoGambiarra, custoCorreto: v.custoCorreto, danoColateral: v.danoColateral,
      horizonteHoras: c.horizonte, unidadeDurab: c.unidadeDurab, perigo: pg ? pg.nivel : null,
    },
    veredito: v.veredito || c.veredito,
    ficha: v.ficha || c.ficha,
    estresse: v.estresse || c.estresse,
    fontes: c.fontes || [],
    detectado: [],
    ajustes: [],
    certo: CERTO[c.id] || '',
  };
}

function analisarTexto(txt) {
  const mod = {}; const etiquetas = [];
  REGRAS_TEXTO.forEach((r) => {
    if (r.re.test(txt)) {
      etiquetas.push(r.etiqueta);
      Object.entries(r.ajuste).forEach(([k, d]) => { mod[k] = (mod[k] || 0) + d; });
    }
  });
  return { mod, etiquetas };
}

/* Soma os ajustes das opções escolhidas (material, ambiente, duração, experiência) */
function ajustesDasOpcoes() {
  const soma = {}; const linhas = []; const nomes = [];
  ['material', 'ambiente', 'duracao', 'experiencia'].forEach((campo) => {
    const it = OPCOES[campo].itens.find((i) => i.v === state.opt[campo]);
    if (!it) return;
    nomes.push([OPCOES[campo].rotulo, it.t]);
    Object.entries(it.aj || {}).forEach(([k, d]) => {
      soma[k] = (soma[k] || 0) + d;
      linhas.push(OPCOES[campo].rotulo + ' (' + it.t + '): ' + k + ' ' + (d > 0 ? '+' : '−') + Math.round(Math.abs(d) * 100) + ' pontos');
    });
  });
  return { soma, linhas, nomes };
}

function modeloCustom() {
  const p = PERFIS[state.cat];
  const { mod, etiquetas } = analisarTexto(state.ideia);
  const op = ajustesDasOpcoes();
  const expo = OPCOES.exposicao.itens.find((i) => i.v === state.opt.exposicao);
  const s = state.sl;
  const orc = Math.max(0, Number(state.orc) || 0);
  const get = (k) => (mod[k] || 0) + (op.soma[k] || 0);
  const A = clamp(s.A / 10 + get('A'));
  const M = clamp(s.M / 10 + get('M'));
  const C = clamp(s.C / 10 + get('C'));
  /* Curva (x^1.5): valores baixos pesam pouco, valores altos pesam muito.
     Sem isso, quatro riscos pequenos somados já pareciam "extremos" com os controles no meio. */
  const curva = (x, teto) => teto * Math.pow(clamp(x / 10), 1.5);
  const riscos = {
    calor: clamp(curva(s.calor, 0.8) + get('calor')),
    eletrico: clamp(curva(s.eletrico, 0.8) + get('eletrico')),
    terceiros: clamp(curva(s.grav, 0.7) * expo.mult + (mod.terceiros || 0)),
    colateral: clamp(0.4 * Math.pow(1 - A, 1.5)),
  };
  const pg = perigoDoModoCustom(state.ideia, s, state.cat);
  const cfg = {
    perigo: pg ? pg.nivel : null,
    fatores: { A, M, C }, riscos,
    durabNominal: p.nominal * (0.7 + 0.6 * Math.min(1, orc / 100)),
    custoGambiarra: orc,
    custoCorreto: Math.max(orc * p.multCorreto, 80),
    danoColateral: Math.max(p.minDano, orc * p.multDano),
    horizonteHoras: p.horizonte, unidadeDurab: p.unidade,
  };
  const res = simular(cfg);
  const fraco = [['material', A], ['base física', M], ['folga de uso', C]].sort((a, b) => a[1] - b[1])[0];
  const picos = Object.entries(riscos).sort((a, b) => b[1] - a[1])[0];
  const nomeRisco = { calor: 'calor', eletrico: 'eletricidade', terceiros: 'pessoas expostas', colateral: 'dano colateral' };
  const leitura = res.viabilidade >= 75 ? 'boa base técnica' : res.viabilidade >= 60 ? 'funciona, com ressalvas' : res.viabilidade >= 30 ? 'resultado instável' : 'a física não ajuda';
  const falhaEm = Math.round(35 + res.viabilidade * 0.8);
  const nomeOpt = (campo) => (OPCOES[campo].itens.find((i) => i.v === state.opt[campo]) || {}).t;
  return {
    perigo: pg,
    titulo: state.ideia.trim() || 'Sua gambiarra (descreva a ideia ao lado)',
    resumo: '', categoria: state.cat,
    orcTxt: 'Orçamento: ' + brl.format(orc),
    horTxt: 'Horizonte: ' + p.horizonteTxt, horizonteTxt: p.horizonteTxt,
    unidadeDurab: p.unidade, durabRotulo: p.rotulo, variantes: null, cfg,
    veredito: [
      'Com os fatores informados, a nota de viabilidade é <b>' + res.viabilidade + '%</b> (' + leitura + '). O ponto mais fraco é <b>' + fraco[0] + '</b>, e o risco vem principalmente de <b>' + nomeRisco[picos[0]] + '</b>.',
      p.dica,
      'Este é um cálculo genérico: ele usa os seus ajustes e as palavras-chave do texto, não conhece o objeto real. Use como roteiro de perguntas antes de executar, não como aprovação.',
    ],
    ficha: [
      ['Categoria', state.cat],
      ['Material e local', nomeOpt('material') + ' · ' + nomeOpt('ambiente')],
      ['Uso e exposição', nomeOpt('duracao') + ' · ' + nomeOpt('exposicao')],
      ['Sua experiência', nomeOpt('experiencia')],
      ['Material (A) · Física (M) · Folga (C)', nf(A * 100) + '% · ' + nf(M * 100) + '% · ' + nf(C * 100) + '%'],
    ],
    estresse: {
      variavel: 'Esforço sobre a gambiarra', unidade: '% do uso normal', de: 0, ate: 130,
      falhaEm: falhaEm >= 130 ? null : falhaEm,
      passos: [
        { a: 50, t: 'Metade do esforço normal. A montagem segura sem sustos.' },
        { a: 100, t: 'Esforço normal de uso. Aqui aparecem as folgas e os pontos fracos.' },
        { a: 115, t: 'Acima do uso normal. Qualquer defeito de montagem vira falha.' },
      ],
      falha: 'Cedeu antes do limite. Reforce o ponto mais fraco antes de usar de verdade.',
      ok: 'Segurou além do uso normal. Ainda assim, teste devagar e com proteção.',
    },
    fontes: [],
    detectado: etiquetas,
    ajustes: op.linhas,
    certo: CERTO_CAT[state.cat] || '',
  };
}

/* ---------- Utilidades de animação ---------- */

/* Anima um número até o valor final (some sob "reduzir movimento") */
function tween(el, to, fmt) {
  if (el._raf) cancelAnimationFrame(el._raf);
  const from = el._v == null ? 0 : el._v;
  el._v = to;
  if (reduceMotion || from === to) { el.firstChild.nodeValue = fmt(to); return; }
  const t0 = performance.now(), dur = 550;
  const step = (now) => {
    const t = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - t, 3);
    el.firstChild.nodeValue = fmt(from + (to - from) * e);
    if (t < 1) el._raf = requestAnimationFrame(step);
  };
  el._raf = requestAnimationFrame(step);
}

function toneOf(v) { return v >= 75 ? 'low' : v >= 45 ? 'mid' : 'high'; }
function colorVar(t) { return 'var(--' + t + ')'; }

const ICO_RISCO = {
  low: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  mid: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  high: '<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0z"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
};

const SELO_CURTO = { 'APROVADO': 'APROVADO', 'COM RESSALVAS': 'RESSALVAS', 'REPROVADO': 'REPROVADO', 'MITO CONFIRMADO': 'MITO', 'FUNCIONA POUCO': 'POUCO ÚTIL', 'PERIGO GRAVE': 'PERIGO' };

/* Veredito de cada cenário (usa a primeira variante) para o catálogo */
function veredictoDe(c) {
  const v = c.variantes ? c.variantes[0] : c;
  const r = simular({ fatores: v.fatores, riscos: v.riscos, durabNominal: v.durabNominal, custoGambiarra: v.custoGambiarra,
    custoCorreto: v.custoCorreto, danoColateral: v.danoColateral, horizonteHoras: c.horizonte, unidadeDurab: c.unidadeDurab,
    perigo: c._pn });
  return r.selo;
}
CENARIOS.forEach((c) => { c._pn = (PERIGO[c.id] || {}).nivel || null; c._selo = veredictoDe(c); });

/* ---------- Aviso de perigo (faixa no laudo e na janela de leitura) ---------- */
const ICO_ALERTA = {
  critico: '<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86z"/><path d="M12 8v5"/><path d="M12 16h.01"/>',
  atencao: ICO_RISCO.mid,
};
function htmlAlerta(p) {
  if (!p) return '';
  return '<div class="alerta alerta-' + p.nivel + '" role="group" aria-label="Aviso de perigo">' +
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + ICO_ALERTA[p.nivel] + '</svg>' +
    '<div class="alerta-corpo">' +
      '<p class="alerta-titulo">' + PERIGO_TITULO[p.nivel] + '<span>' + p.tipos.map(esc).join(' · ') + '</span></p>' +
      '<p><b>Quando acontece:</b> ' + esc(p.quando) + '</p>' +
      '<p class="alerta-nunca"><b>Regra de ouro:</b> ' + esc(p.nunca) + '</p>' +
    '</div></div>';
}

/* ---------- Renderização ---------- */

let ultimaChave = '';
let ultimoSelo = '';

function render() {
  cancelStress(true);
  /* Modo "Minha gambiarra" sem nada preenchido: mostra só o convite, sem resultado */
  const aguardando = state.modo === 'custom' && !state.tocou;
  $('laudo').classList.toggle('aguardando', aguardando);
  $('vazio-custom').hidden = !aguardando;
  if (aguardando) { modeloAtual = null; return; }
  const m = state.modo === 'pronto' ? modeloPronto() : modeloCustom();
  const r = simular(m.cfg);
  modeloAtual = { m, r };
  const { cfg } = m;

  /* Cabeçalho do laudo */
  $('t-laudo').textContent = m.titulo;
  $('meta-cat').textContent = m.categoria;
  $('meta-orc').textContent = m.orcTxt;
  $('meta-hor').textContent = m.horTxt;
  let h = 0; for (const ch of m.titulo) h = (h * 31 + ch.charCodeAt(0)) % 9000;
  const selo = $('selo');
  const chave = state.modo + '|' + (state.modo === 'pronto' ? state.cenarioId + state.varianteId : state.cat);
  const novoSelo = r.selo.texto + (state.modo === 'pronto' ? '#' + h : '');
  selo.className = 'selo tone-' + r.selo.tom + (r.perigo === 'critico' ? ' perigo' : '');
  selo.innerHTML = r.selo.texto + '<small>LAUDO Nº ' + (1000 + h) + '</small>';
  selo.setAttribute('aria-label', 'Veredito: ' + r.selo.texto);
  selo.closest('.panel').classList.toggle('crit', r.perigo === 'critico');
  if (!reduceMotion && (chave !== ultimaChave || novoSelo !== ultimoSelo)) {
    void selo.offsetWidth; selo.classList.add('stamp');
  }
  ultimaChave = chave; ultimoSelo = novoSelo;

  /* Faixa de perigo */
  const al = $('alerta');
  al.innerHTML = htmlAlerta(m.perigo);
  al.hidden = !m.perigo;

  /* Variantes (só no cenário do escapamento) */
  const segVar = $('seg-var');
  $('variantes').hidden = !m.variantes;
  segVar.innerHTML = '';
  if (m.variantes) {
    m.variantes.forEach((v) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = v.nome; b.dataset.v = v.id;
      b.setAttribute('aria-pressed', String(v.id === state.varianteId));
      segVar.appendChild(b);
    });
  }

  /* Viabilidade: anel */
  const tv = toneOf(r.viabilidade);
  $('ring').style.color = colorVar(tv);
  $('ring-prog').style.strokeDashoffset = 326.73 * (1 - r.viabilidade / 100);
  $('v-nota').className = 'num mono tone-' + tv;
  tween($('v-nota'), r.viabilidade, (x) => String(Math.round(x)));
  if (!$('v-nota').querySelector('small')) $('v-nota').insertAdjacentHTML('beforeend', '<small>%</small>');
  $('v-hint').textContent = r.viabilidade >= 75 ? 'Boa base técnica: o material e o mecanismo sustentam a ideia.'
    : r.viabilidade >= 60 ? 'Funciona, mas com ressalvas que você precisa conhecer.'
    : r.viabilidade >= 30 ? 'Resultado instável e difícil de repetir.' : 'A física não ajuda nesta ideia.';

  /* Risco: medidor com ponteiro */
  const rc = r.nivel.cor;
  $('r-ico').innerHTML = ICO_RISCO[rc];
  $('r-ico').style.color = colorVar(rc);
  $('r-nivel').textContent = r.nivel.nome;
  $('r-nivel').className = 'big tone-' + rc;
  $('r-pct').textContent = r.risco + '%';
  const nd = $('needle'); nd.style.left = r.risco + '%'; nd.style.color = colorVar(rc);
  const nomes = { calor: 'calor', eletrico: 'eletricidade', terceiros: 'pessoas expostas', colateral: 'dano colateral' };
  const top = Object.entries(cfg.riscos).sort((a, b) => b[1] - a[1])[0];
  $('r-hint').textContent = r.pisoAplicado
    ? 'Risco elevado pela gravidade: o modelo deu ' + r.riscoModelo + '%, mas o pior desfecho possível é sério demais para ficar abaixo de ' + r.risco + '%.'
    : top[1] > 0 ? 'Maior fonte de risco: ' + nomes[top[0]] + ' (' + Math.round(top[1] * 100) + '%).' : 'Nenhuma fonte de risco relevante.';

  /* Durabilidade + cobertura do horizonte */
  $('d-rotulo').textContent = m.durabRotulo;
  $('d-valor').innerHTML = nf(r.durab.numero) + '<small>' + r.durab.rotulo + '</small>';
  const un = m.unidadeDurab === 'km' ? 'km' : 'h';
  const cob = Math.min(100, Math.round(r.durabHoras / cfg.horizonteHoras * 100));
  const ct = cob >= 90 ? 'low' : cob >= 40 ? 'mid' : 'high';
  $('cover').style.color = colorVar(ct);
  $('cover').querySelector('i').style.width = Math.max(2, cob) + '%';
  $('cover-txt').textContent = 'Cobre ' + cob + '% do horizonte de ' + m.horizonteTxt + '.';

  /* Economia: barras comparativas */
  const e = r.economia;
  const maxV = Math.max(cfg.custoCorreto, e.longo, 1);
  $('e-certo').textContent = brl.format(cfg.custoCorreto);
  $('e-longo').textContent = brl.format(e.longo);
  $('eb-certo').style.width = Math.max(2, cfg.custoCorreto / maxV * 100) + '%';
  $('eb-longo').style.width = Math.max(2, e.longo / maxV * 100) + '%';
  $('erow-longo').style.color = e.saldo >= 0 ? 'var(--low)' : 'var(--high)';
  $('e-certo-dica').textContent = m.certo;
  $('e-certo-dica').parentElement.hidden = !m.certo;
  const saldo = $('e-saldo');
  saldo.textContent = (e.saldo >= 0 ? '+' : '−') + brl.format(Math.abs(e.saldo));
  saldo.className = e.saldo >= 0 ? 'tone-low' : 'tone-high';
  $('e-saldo-txt').textContent = (e.saldo >= 0 ? 'Sobra em ' : 'Prejuízo em ') + m.horizonteTxt;
  $('n-longo').textContent = 'Gambiarra, custo total em ' + m.horizonteTxt;
  $('d-rep').textContent = e.repeticoes + '×' + (e.repeticoes >= 12 ? ' (limite)' : '');
  $('d-gasto').textContent = brl.format(e.gastoGambiarra);
  let eh = 'Agora a gambiarra parece ' + (e.curto >= 0 ? 'poupar ' + brl.format(e.curto) : 'custar ' + brl.format(-e.curto) + ' a mais') + '.';
  if (e.naoResolvido > 0.01) eh += ' Parte do problema continua (' + Math.round(e.naoResolvido * 100) + '%), e o jeito certo ainda custará ' + brl.format(e.custoResidual) + '.';
  $('e-hint').textContent = eh;

  /* Veredito + ficha */
  $('veredito').innerHTML = m.veredito.map((p) => '<p>' + p + '</p>').join('');
  $('ficha-tec').innerHTML = m.ficha.map(([k, v]) => '<div class="row"><dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd></div>').join('');

  /* Memória de cálculo */
  const f = cfg.fatores, k = cfg.riscos, d2 = (x) => nf(x, 2);
  $('calc-pre').innerHTML =
    (m.ajustes.length ? 'Ajustes das opções escolhidas:\n  ' + m.ajustes.map(esc).join('\n  ') + '\n\n' : '') +
    'Viabilidade  = 100 × (0,40·A + 0,35·M + 0,25·C)\n' +
    '             = 100 × (0,40·<em>' + d2(f.A) + '</em> + 0,35·<em>' + d2(f.M) + '</em> + 0,25·<em>' + d2(f.C) + '</em>) = <em>' + r.viabilidade + '%</em>\n\n' +
    'Risco        = 1 − Π(1 − pᵢ)\n' +
    '             = 1 − (<em>' + d2(1 - k.calor) + '</em> × <em>' + d2(1 - k.eletrico) + '</em> × <em>' + d2(1 - k.terceiros) + '</em> × <em>' + d2(1 - k.colateral) + '</em>) = <em>' + r.riscoModelo + '%</em>\n' +
    (r.pisoAplicado ? 'Piso de perigo ' + (r.perigo === 'critico' ? '(grave)' : '(atenção)') + ' = ' + PISO_PERIGO[r.perigo] + '%  →  risco usado = máx(' + r.riscoModelo + '%, ' + PISO_PERIGO[r.perigo] + '%) = <em>' + r.risco + '%</em>\n' : '') + '\n' +
    'Durabilidade = vida nominal × (V/100)²\n' +
    '             = ' + nf(cfg.durabNominal) + ' × <em>' + d2(Math.pow(r.viabilidade / 100, 2)) + '</em> = <em>' + nf(r.durabHoras) + ' ' + un + '</em>\n\n' +
    'Longo prazo  = reposições + dano esperado + problema não resolvido\n' +
    '             = ' + brl.format(e.gastoGambiarra) + ' + ' + brl.format(e.prejuizoEsperado) + ' + ' + brl.format(e.custoResidual) + ' = <em>' + brl.format(e.longo) + '</em>\n' +
    'Saldo        = ' + brl.format(cfg.custoCorreto) + ' (jeito certo) − ' + brl.format(e.longo) + ' = <em>' + (e.saldo < 0 ? '−' : '') + brl.format(Math.abs(e.saldo)) + '</em>';

  /* Chips detectados e dica da categoria */
  $('detectado').hidden = !(state.modo === 'custom' && m.detectado.length);
  $('chips-detectado').innerHTML = m.detectado.map((t) => '<span class="chip hot">' + esc(t) + '</span>').join('');

  /* Fontes */
  $('fontes').innerHTML = m.fontes.length
    ? '<li class="eyebrow">Fontes consultadas</li>' + m.fontes.map((s) => '<li><a href="' + esc(s.u) + '" target="_blank" rel="noopener noreferrer">' + esc(s.t) + '</a></li>').join('')
    : '';

  resetStressUI(m.estresse);
}

/* Laudo em formato de leitura (abre em uma janela) */
function htmlLaudo() {
  const { m, r } = modeloAtual;
  const e = r.economia;
  const sinal = e.saldo >= 0 ? '+' : '−';
  const tv = toneOf(r.viabilidade);
  return '<div class="dlg-sel"><div class="selo tone-' + r.selo.tom + (r.perigo === 'critico' ? ' perigo' : '') + '">' + esc(r.selo.texto) + '</div></div>' +
    '<h2 id="dlg-titulo">' + esc(m.titulo) + '</h2>' + htmlAlerta(m.perigo) +
    '<p class="hint">' + esc(m.categoria) + ' · ' + esc(m.orcTxt) + ' · ' + esc(m.horTxt) + '</p>' +
    '<div class="dlg-nums">' +
      '<div><span>Viabilidade</span><b class="tone-' + tv + '">' + r.viabilidade + '%</b></div>' +
      '<div><span>Perigo</span><b class="tone-' + r.nivel.cor + '">' + r.nivel.nome + ' · ' + r.risco + '%</b></div>' +
      '<div><span>Durabilidade</span><b>' + nf(r.durab.numero) + ' ' + esc(r.durab.rotulo) + '</b></div>' +
      '<div><span>Saldo no período</span><b class="tone-' + (e.saldo >= 0 ? 'low' : 'high') + '">' + sinal + brl.format(Math.abs(e.saldo)) + '</b></div>' +
    '</div>' +
    '<h3>Veredito da engenharia</h3><div class="prose">' + m.veredito.map((p) => '<p>' + p + '</p>').join('') + '</div>' +
    (m.certo ? '<h3>Como seria o jeito certo</h3><p class="prose">' + esc(m.certo) + '</p>' : '') +
    '<h3>Ficha técnica</h3><dl class="dlg-ficha">' + m.ficha.map(([k, v]) => '<div><dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd></div>').join('') + '</dl>' +
    (m.fontes.length ? '<h3>Fontes</h3><ul class="dlg-fontes">' + m.fontes.map((s) => '<li><a href="' + esc(s.u) + '" target="_blank" rel="noopener noreferrer">' + esc(s.t) + '</a></li>').join('') + '</ul>' : '') +
    '<p class="hint">Estimativa de um modelo simples, não medição de laboratório.</p>';
}
