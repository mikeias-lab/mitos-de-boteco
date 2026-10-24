/* ============================================================
   CATEGORIAS E OPÇÕES DA "MINHA GAMBIARRA"
   Cada categoria define: unidade e vida nominal, custo do jeito certo,
   dano típico, horizonte, valores iniciais dos sliders e um roteiro de checagem.
   Sliders: calor, eletrico, grav (gravidade se falhar), A, M, C (0 a 10)
   ============================================================ */
const PERFIS = {
  'Automotivo': { unidade: 'km', rotulo: 'Durabilidade estimada', nominal: 800, multCorreto: 4, minDano: 300, multDano: 8, horizonte: 10000, horizonteTxt: '10.000 km (cerca de 6 meses)',
    padrao: { calor: 3, eletrico: 1, grav: 6, A: 5, M: 5, C: 4 }, exemplo: 'prender o retrovisor com fita silver tape e arame',
    dica: 'Confira a temperatura do ponto (motor e escape passam de 100 °C com facilidade), a vibração e se a peça é de segurança (freio, direção, pneu, cinto). Peça de segurança não se improvisa.' },
  'Moto e bike': { unidade: 'km', rotulo: 'Durabilidade estimada', nominal: 600, multCorreto: 3, minDano: 200, multDano: 8, horizonte: 8000, horizonteTxt: '8.000 km (cerca de 6 meses)',
    padrao: { calor: 2, eletrico: 1, grav: 6, A: 5, M: 5, C: 4 }, exemplo: 'lubrificar a corrente da bike com óleo de cozinha',
    dica: 'Moto e bike têm pouca proteção para quem pilota. Freio, corrente, rodas e capacete não se improvisam. Confira aperto, lubrificante adequado e se a peça é de segurança.' },
  'Elétrica': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 1000, multCorreto: 3, minDano: 400, multDano: 8, horizonte: 4320, horizonteTxt: '6 meses',
    padrao: { calor: 3, eletrico: 8, grav: 8, A: 5, M: 5, C: 4 }, exemplo: 'emendar o fio da luminária com fita isolante',
    dica: 'Confira corrente, bitola do fio, disjuntor e aterramento. Fio emendado e tomada sobrecarregada esquentam e podem causar incêndio. Instalação fixa é com eletricista.' },
  'Eletrônicos': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 720, multCorreto: 3, minDano: 250, multDano: 6, horizonte: 4320, horizonteTxt: '6 meses',
    padrao: { calor: 3, eletrico: 4, grav: 3, A: 5, M: 5, C: 5 }, exemplo: 'melhorar o sinal da TV com uma antena de arame',
    dica: 'Confira tensão e corrente, isolação dos contatos, umidade e calor. Fio solto e extensão sobrecarregada causam curto e incêndio.' },
  'Informática e Wi-Fi': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 2160, multCorreto: 3, minDano: 300, multDano: 6, horizonte: 8760, horizonteTxt: '1 ano',
    padrao: { calor: 4, eletrico: 2, grav: 2, A: 5, M: 5, C: 5 }, exemplo: 'apoiar o notebook em uma caixa para ficar na altura dos olhos',
    dica: 'Confira temperatura, fluxo de ar, compatibilidade e risco de perder dados. Peça barata que superaquece costuma sair mais cara que a peça certa.' },
  'Celular': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 4320, multCorreto: 3, minDano: 600, multDano: 5, horizonte: 8760, horizonteTxt: '1 ano',
    padrao: { calor: 3, eletrico: 3, grav: 3, A: 5, M: 5, C: 5 }, exemplo: 'secar o celular com secador de cabelo',
    dica: 'Confira líquido, calor e carregador certificado. Aparelho molhado fica desligado, e peça fora do padrão pode falhar na bateria e esquentar.' },
  'Cozinha e limpeza': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 720, multCorreto: 2.5, minDano: 150, multDano: 5, horizonte: 4320, horizonteTxt: '6 meses',
    padrao: { calor: 3, eletrico: 1, grav: 4, A: 5, M: 5, C: 5 }, exemplo: 'desentupir a pia com bicarbonato e vinagre',
    dica: 'O risco em cozinha e limpeza está em misturas químicas, calor e alimentos. Nunca misture produtos de limpeza; leia o rótulo e ventile o ambiente.' },
  'Casa e reparos': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 1440, multCorreto: 2.5, minDano: 150, multDano: 5, horizonte: 4320, horizonteTxt: '6 meses',
    padrao: { calor: 2, eletrico: 2, grav: 4, A: 5, M: 5, C: 5 }, exemplo: 'segurar a porta do armário com um prego e barbante',
    dica: 'Confira o peso que a peça segura, a estabilidade da fixação e se há água, gás ou eletricidade por perto. Quase toda falha caseira soma fixação fraca com carga maior que a prevista.' },
  'Hidráulica': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 2160, multCorreto: 3, minDano: 500, multDano: 10, horizonte: 4320, horizonteTxt: '6 meses',
    padrao: { calor: 1, eletrico: 2, grav: 3, A: 5, M: 5, C: 4 }, exemplo: 'tampar o cano furado com fita e arame',
    dica: 'Vazamento pequeno vira infiltração. Confira a pressão da linha, o tipo de vedação (fita veda-rosca, cola de PVC, massa epóxi) e se há eletricidade perto da água.' },
  'Quintal e jardim': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 2160, multCorreto: 2.5, minDano: 200, multDano: 5, horizonte: 4320, horizonteTxt: '6 meses',
    padrao: { calor: 2, eletrico: 2, grav: 3, A: 5, M: 5, C: 4 }, exemplo: 'prender a lona do quintal com garrafas PET',
    dica: 'Ao ar livre, sol, chuva e vento vencem o improviso rápido. Confira estabilidade, resistência a UV e animais, e nunca deixe eletricidade exposta.' },
  'Oficina e ferramentas': { unidade: 'horas', rotulo: 'Durabilidade estimada', nominal: 1440, multCorreto: 3, minDano: 300, multDano: 8, horizonte: 4320, horizonteTxt: '6 meses',
    padrao: { calor: 3, eletrico: 1, grav: 6, A: 5, M: 5, C: 4 }, exemplo: 'usar um cano como extensão da chave de roda',
    dica: 'Ferramenta improvisada escapa e corta. Confira a fixação da peça, o uso de óculos e luvas e se a ferramenta foi feita para o esforço.' }
};

/* Campos de detalhe: cada opção ajusta os fatores em pontos (0 a 1) */
const OPCOES = {
  material: {
    rotulo: 'Material principal',
    itens: [
      { v: 'nao', t: 'Não sei / misto', aj: {} },
      { v: 'fita', t: 'Fita adesiva ou durex', aj: { A: -0.10 } },
      { v: 'arame', t: 'Arame, clipe ou abraçadeira', aj: { A: -0.05 } },
      { v: 'cola', t: 'Cola ou epóxi', aj: { A: 0.03 } },
      { v: 'parafuso', t: 'Parafuso, prego ou rebite', aj: { A: 0.10 } },
      { v: 'silicone', t: 'Silicone ou vedante', aj: {} },
      { v: 'madeira', t: 'Madeira', aj: {} },
      { v: 'plastico', t: 'Plástico ou PET', aj: { A: -0.05 } },
      { v: 'metal', t: 'Metal ou alumínio', aj: { A: 0.05 } },
      { v: 'papel', t: 'Papel, papelão ou tecido', aj: { A: -0.15 } }
    ]
  },
  ambiente: {
    rotulo: 'Onde vai ficar',
    itens: [
      { v: 'seco', t: 'Interno e seco', aj: {} },
      { v: 'externo', t: 'Externo (sol e chuva)', aj: { C: -0.10 } },
      { v: 'umido', t: 'Úmido ou molhado', aj: { eletrico: 0.15, C: -0.10 } },
      { v: 'quente', t: 'Quente (motor, forno, escape)', aj: { calor: 0.25 } },
      { v: 'vibracao', t: 'Com vibração ou movimento', aj: { C: -0.15 } }
    ]
  },
  duracao: {
    rotulo: 'Por quanto tempo',
    itens: [
      { v: 'hoje', t: 'Só hoje', aj: { C: 0.15 } },
      { v: 'meses', t: 'Alguns meses', aj: {} },
      { v: 'definitivo', t: 'Definitivo', aj: { C: -0.15 } }
    ]
  },
  exposicao: {
    rotulo: 'Quem fica exposto se falhar',
    itens: [
      { v: 'eu', t: 'Só eu', mult: 0.7 },
      { v: 'familia', t: 'Minha família', mult: 1.0 },
      { v: 'vulneraveis', t: 'Crianças ou idosos', mult: 1.3 },
      { v: 'publico', t: 'Outras pessoas', mult: 1.4 }
    ]
  },
  experiencia: {
    rotulo: 'Sua experiência com isso',
    itens: [
      { v: 'iniciante', t: 'Iniciante', aj: { C: -0.10 } },
      { v: 'media', t: 'Intermediária', aj: {} },
      { v: 'pro', t: 'Profissional', aj: { C: 0.10, M: 0.05 } }
    ]
  }
};

/* Palavras-chave extras (somam às regras base) */
REGRAS_TEXTO.push(
  { re: /misturar|mistura|[aá]gua sanit[aá]ria|am[oô]nia|cloro|[aá]cido|soda c[aá]ustica|desentupidor|vinagre/i, etiqueta: 'Químicos', ajuste: { terceiros: 0.35 } },
  { re: /escada|telhado|andaime|subir|altura|laje/i, etiqueta: 'Altura', ajuste: { terceiros: 0.25 } },
  { re: /alavanca|extens[aã]o de cano|marreta|martelo|serra|esmerilhadeira|furadeira/i, etiqueta: 'Esforço ou corte', ajuste: { C: -0.10, terceiros: 0.10 } },
  { re: /cano|encanamento|vazamento|torneira|registro|caixa d.?[aá]gua/i, etiqueta: 'Hidráulica', ajuste: { C: -0.05 } }
);
