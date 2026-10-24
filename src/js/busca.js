/* ============================================================
   BUSCA DE PARECIDOS
   Compara o que o usuário escreveu com os mitos analisados.
   Técnica: sem acento, raízes de 5 letras, grupos de sinônimos e peso por raridade
   da palavra (palavra que aparece em quase todos os mitos pesa pouco).
   Não é inteligência artificial: não entende o sentido, só as palavras.
   ============================================================ */

const STOP = new Set(('para com sem uma uns umas que dos das por como mais meu minha meus minhas usar fazer colocar deixar quando onde ' +
  'isso esse essa este esta pelo pela entre sobre tipo coisa muito pouco ficar fica ser sua seu nao tem tinha quero pode posso dar ' +
  'ligar ligado ligada ligando liga ligue ate depois antes todo toda tudo cada ainda mesmo outra outro vez vezes jeito forma gambiarra improviso quebra galho').split(' '));

/* Cada grupo reúne termos populares que significam a mesma coisa para o nosso conteúdo.
   As entradas são raízes (começo da palavra, sem acento). */
const GRUPOS = [
  ['fita', 'durex', 'silver', 'tape', 'esparadr', 'adesiv'],
  ['celul', 'smart', 'telef', 'iphon', 'andro', 'galaxy', 'motorola', 'xiaomi'],
  ['molh', 'umid', 'encharc', 'mergulh'],
  ['carreg', 'fonte', 'usb', 'bateri'],
  ['wifi', 'inter', 'rotea', 'sinal', 'anten', 'repeti', 'mesh'],
  ['tomad', 'plugu', 'plug', 'benjam', 'extens', 'adapt', 'filtro', 'regua', 'pino', 'terra'],
  ['fio', 'fiac', 'cabo', 'emend', 'fusiv', 'disjun', 'curto'],
  ['cano', 'tubo', 'tubul', 'encan', 'vazam', 'goteir', 'regist', 'sifao'],
  ['entup', 'ralo', 'pia', 'sifao', 'desent', 'gordur', 'esgoto'],
  ['cloro', 'sanit', 'alveja', 'candid', 'mistur', 'vinagr', 'amoni'],
  ['pneu', 'roda', 'calib', 'sulco', 'borrach'],
  ['carro', 'autom', 'veicul', 'motor', 'gasolin', 'combust', 'consumo', 'economiz'],
  ['moto', 'motoc', 'scoot', 'capacet'],
  ['bike', 'bicic', 'pedal', 'magrel', 'mtb', 'ciclis'],
  ['oleo', 'lubrif', 'graxa', 'wd40', 'desengr', 'spray'],
  ['corren', 'relac', 'coroa', 'pinhao', 'engrenag'],
  ['capac', 'helmet', 'viseira', 'queda', 'tombo', 'bater', 'batida', 'impacto'],
  ['freio', 'pastil', 'banguel', 'descid', 'ladeir'],
  ['mato', 'erva', 'daninh', 'capin', 'herbic', 'gramado', 'grama'],
  ['plant', 'orquid', 'jardim', 'vaso', 'flor', 'quintal', 'horta'],
  ['dengue', 'mosquit', 'aedes', 'larva', 'pernilong', 'prato'],
  ['esmeril', 'lixad', 'politr', 'amola', 'rebolo', 'makita', 'disco'],
  ['furad', 'parafus', 'broca', 'ferrament'],
  ['chave', 'alicat', 'fenda', 'philips', 'alavanc', 'martel', 'cinzel', 'formao'],
  ['pasta', 'dente', 'dental', 'termic', 'processa', 'cpu', 'cooler'],
  ['escap', 'silenc', 'descarg', 'furo'],
  ['faro', 'lanter', 'opac', 'amarel', 'polir'],
  ['gelad', 'refriger', 'freezer', 'serpent', 'secar', 'roupa', 'tenis', 'varal'],
  ['espum', 'champ', 'refrig', 'garrafa', 'gargalo', 'colher'],
  ['alumin', 'papel', 'foil', 'refletor'],
  ['comput', 'notebo', 'laptop', 'gabin', 'placa', 'esfri', 'pc'],
  ['ventil', 'climat', 'condic', 'isopor', 'gelo', 'calor'],
  ['chuve', 'resist', 'banho', 'eletri'],
  ['pomb', 'gato', 'telhad', 'afugent', 'espant'],
  ['arroz', 'saleir', 'empedr'],
  ['orquid', 'gelo', 'cubos']
];

function norm(s) { return semAcento(s); }

function palavrasDe(texto) {
  return norm(texto).split(/[^a-z0-9]+/).filter((t) => t.length >= 2 && !STOP.has(t));
}

/* Raiz de uma palavra: até 5 letras; palavras curtas ficam inteiras */
function raizDe(w) { return w.length > 5 ? w.slice(0, 5) : w; }

/* Expande uma palavra do usuário com os sinônimos do(s) grupo(s) a que pertence */
function expandir(w) {
  const r = raizDe(w);
  const saida = new Set([r]);
  GRUPOS.forEach((g) => {
    if (g.some((m) => (m.length >= 3 && (w.startsWith(m) || (r.length >= 5 && m.startsWith(r)))) || m === w)) g.forEach((m) => saida.add(raizDe(m)));
  });
  return [...saida];
}

let INDICE_BUSCA = null;

function montarIndiceBusca() {
  INDICE_BUSCA = CENARIOS.map((c) => {
    const v = c.variantes ? c.variantes[0] : c;
    const ficha = (c.ficha || v.ficha || []).map((f) => f[0] + ' ' + f[1]).join(' ');
    const principal = palavrasDe(c.titulo + ' ' + c.resumo + ' ' + c.categoria + ' ' + ficha);
    const titulo = palavrasDe(c.titulo);
    const apoio = palavrasDe(((v.veredito || c.veredito) || []).join(' ').replace(/<[^>]+>/g, ' ') + ' ' + (CERTO[c.id] || ''));
    return { c, principal, titulo, apoio };
  });
  /* frequência de cada raiz entre os mitos, para dar menos peso às palavras comuns */
  const freq = {};
  INDICE_BUSCA.forEach((d) => {
    const raizes = new Set(d.principal.concat(d.titulo).map(raizDe));
    raizes.forEach((r) => { freq[r] = (freq[r] || 0) + 1; });
  });
  INDICE_BUSCA.freq = freq;
}

/* Raízes curtas (até 4 letras) só casam com a palavra inteira (ou o plural): "moto" não casa com "motor" */
function temRaiz(lista, raiz) {
  return raiz.length <= 4 ? lista.some((p) => p === raiz || p === raiz + 's') : lista.some((p) => p.startsWith(raiz));
}

/* Devolve até 3 mitos parecidos, do mais ao menos parecido */
function parecidosCom(texto) {
  if (!INDICE_BUSCA) montarIndiceBusca();
  const toks = [...new Set(palavrasDe(texto))].filter((t) => t.length >= 3 || GRUPOS.some((g) => g.includes(t)));
  if (!toks.length) return [];
  const N = INDICE_BUSCA.length;
  const pontuados = INDICE_BUSCA.map((d) => {
    let score = 0;
    toks.forEach((t) => {
      const raizes = expandir(t);
      const exato = raizes[0];
      /* peso: palavra rara vale mais; sinônimo vale menos que a palavra exata */
      const df = Math.max(1, INDICE_BUSCA.freq[exato] || 1);
      const peso = Math.log(1 + N / df);
      const noTitulo = raizes.some((r) => temRaiz(d.titulo, r));
      const exatoPrincipal = temRaiz(d.principal, exato);
      const sinPrincipal = !exatoPrincipal && raizes.some((r) => temRaiz(d.principal, r));
      const noApoio = !exatoPrincipal && !sinPrincipal && raizes.some((r) => temRaiz(d.apoio, r));
      if (exatoPrincipal) score += peso * (noTitulo ? 1.5 : 1);
      else if (sinPrincipal) score += peso * (noTitulo ? 1.0 : 0.7);
      else if (noApoio) score += peso * 0.3;
    });
    return { c: d.c, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  if (!pontuados.length) return [];
  const topo = pontuados[0].score;
  /* mínimo absoluto: uma única palavra fraca não basta para sugerir um mito */
  if (topo < 1.4) return [];
  return pontuados.filter((x) => x.score >= topo * 0.65).slice(0, 3).map((x) => x.c);
}
