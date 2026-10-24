/* ============================================================
   MOTOR DE CÁLCULO — Rastreador de Mitos de Boteco
   Funções puras: recebem fatores (0 a 1) e devolvem os 4 indicadores.
   ============================================================ */

const clamp = (x, min = 0, max = 1) => Math.min(max, Math.max(min, x));

/* Viabilidade técnica (0–100)
   A = adequação do material ao esforço (o material aguenta o que a função pede?)
   M = mecanismo físico real (existe base física/evidência de que funciona?)
   C = margem de operação (1 – esforço/capacidade; quanto sobra de folga?)
   Pesos: material e mecanismo pesam mais que a folga. */
function calcViabilidade({ A, M, C }) {
  return Math.round(100 * (0.40 * A + 0.35 * M + 0.25 * C));
}

/* Risco (0–100): probabilidade combinada de pelo menos um dano ocorrer.
   R = 1 – Π(1 – pᵢ), com pᵢ = calor, elétrico, terceiros, colateral.
   Eventos tratados como independentes (simplificação declarada). */
function calcRisco({ calor, eletrico, terceiros, colateral }) {
  const sobrevive = [calor, eletrico, terceiros, colateral].reduce((acc, p) => acc * (1 - clamp(p)), 1);
  return Math.round(100 * (1 - sobrevive));
}

function nivelRisco(r) {
  if (r < 30) return { nome: 'Baixo', cor: 'low' };
  if (r < 60) return { nome: 'Médio', cor: 'mid' };
  return { nome: 'Extremo', cor: 'high' };
}

/* Durabilidade: vida nominal × V^2 (a vida cai mais rápido que a nota).
   nominal = quanto durariam as condições ideais da gambiarra. */
function calcDurabilidade(nominal, viabilidade) {
  const fator = Math.pow(viabilidade / 100, 2);
  return Math.max(0, nominal * fator);
}

/* Formata a durabilidade na unidade natural do cenário */
function formatDurabilidade(valor, unidade) {
  /* plural simples: 1 minuto, 2 minutos */
  const un = (n, sing, plur) => ({ numero: n, rotulo: n === 1 ? sing : plur });
  if (unidade === 'km') {
    if (valor < 1) return un(Math.max(1, Math.round(valor * 1000)), 'metro', 'metros');
    return { numero: Math.round(valor), rotulo: 'km' };
  }
  // unidade-base: horas
  if (valor < 1) return un(Math.max(1, Math.round(valor * 60)), 'minuto', 'minutos');
  if (valor < 48) return un(Math.round(valor), 'hora', 'horas');
  if (valor < 24 * 60) return un(Math.round(valor / 24), 'dia', 'dias');
  return un(Math.round(valor / (24 * 30)), 'mês', 'meses');
}

/* Economia: compara o custo da gambiarra ao do jeito certo num horizonte.
   - durabHoras e horizonteHoras estão na MESMA unidade (horas ou km, conforme o cenário)
   - repetições = quantas vezes a gambiarra precisa ser refeita no horizonte
     (limitado a 12: ninguém refaz a mesma gambiarra 400 vezes; passou disso, a pessoa desiste)
   - prejuízo longo = reposições + P(falha com dano) × custo do dano colateral */
function calcEconomia({ custoGambiarra, custoCorreto, danoColateral, risco, durabHoras, horizonteHoras, viabilidade }) {
  const MAX_REPETICOES = 12;
  const repeticoes = Math.min(MAX_REPETICOES, Math.max(1, Math.ceil(horizonteHoras / Math.max(durabHoras, 0.1))));
  const gastoGambiarra = custoGambiarra * repeticoes;
  const prejuizoEsperado = (risco / 100) * danoColateral;
  /* Se a viabilidade é baixa, o problema continua e o jeito certo ainda terá de ser comprado.
     Parte não resolvida = 1 – V/60, limitada entre 0 e 1 (V ≥ 60 resolve; V = 0 não resolve nada). */
  const naoResolvido = clamp(1 - viabilidade / 60);
  const custoResidual = custoCorreto * naoResolvido;
  const curto = custoCorreto - custoGambiarra;
  const longo = gastoGambiarra + prejuizoEsperado + custoResidual;
  const saldo = custoCorreto - longo;
  return { curto, repeticoes, gastoGambiarra, prejuizoEsperado, custoResidual, naoResolvido, longo, saldo };
}

/* Perigo: classificação de gravidade, separada da probabilidade.
   - critico: pode matar ou ferir gravemente (choque, gás, explosão, intoxicação).
     Piso de risco 60% e carimbo PERIGO GRAVE, mesmo que a gambiarra "funcione".
   - atencao: pode machucar ou causar prejuízo sério se der errado.
     Piso de risco 30% e nunca recebe APROVADO.
   O piso existe porque a fórmula mede probabilidade, e uma gambiarra que "quase nunca" mata
   continua inaceitável quando o dano possível é irreversível. */
const PISO_PERIGO = { critico: 60, atencao: 30 };

/* Veredito em uma palavra, a partir da viabilidade, do risco e do nível de perigo */
function calcSelo(v, r, perigo) {
  if (perigo === 'critico') return { texto: 'PERIGO GRAVE', tom: 'high' };
  let s;
  if (r >= 60) s = { texto: 'REPROVADO', tom: 'high' };
  else if (v >= 75 && r < 30) s = { texto: 'APROVADO', tom: 'low' };
  else if (v < 30) s = { texto: 'MITO CONFIRMADO', tom: 'mid' };
  else if (v < 45 && r < 35) s = { texto: 'FUNCIONA POUCO', tom: 'mid' };
  else if (v >= 45) s = { texto: 'COM RESSALVAS', tom: 'mid' };
  else s = { texto: 'REPROVADO', tom: 'high' };
  if (perigo === 'atencao' && s.texto === 'APROVADO') s = { texto: 'COM RESSALVAS', tom: 'mid' };
  return s;
}

/* Calcula tudo de um cenário (pré-configurado ou customizado) */
function simular(c) {
  const viabilidade = calcViabilidade(c.fatores);
  const perigo = c.perigo || null;
  const riscoModelo = calcRisco(c.riscos);
  const piso = perigo ? PISO_PERIGO[perigo] : 0;
  const risco = Math.max(riscoModelo, piso);
  const durabHoras = calcDurabilidade(c.durabNominal, viabilidade);
  const economia = calcEconomia({
    custoGambiarra: c.custoGambiarra,
    custoCorreto: c.custoCorreto,
    danoColateral: c.danoColateral,
    risco,
    durabHoras,
    horizonteHoras: c.horizonteHoras,
    viabilidade,
  });
  return {
    viabilidade,
    risco,
    riscoModelo,
    perigo,
    pisoAplicado: risco > riscoModelo,
    nivel: nivelRisco(risco),
    durabHoras,
    durab: formatDurabilidade(durabHoras, c.unidadeDurab),
    economia,
    selo: calcSelo(viabilidade, risco, perigo),
  };
}

/* Exporta para teste em Node (no navegador, é ignorado) */
if (typeof module !== 'undefined') {
  module.exports = { clamp, calcViabilidade, calcRisco, nivelRisco, calcDurabilidade, formatDurabilidade, calcEconomia, calcSelo, simular, PISO_PERIGO };
}
