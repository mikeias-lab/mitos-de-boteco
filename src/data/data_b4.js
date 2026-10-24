/* ============================================================
   NOVOS CENÁRIOS — COZINHA E LIMPEZA (3) + CASA E REPAROS (3)
   ============================================================ */
CENARIOS.push(
  {
    id: 'sanitaria-vinagre', categoria: 'Cozinha e limpeza',
    titulo: 'Misturar água sanitária com vinagre para limpar mais',
    resumo: 'Juntar os dois produtos para uma faxina "reforçada".',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o gás irritar as vias aéreas', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.02, M: 0.10, C: 0 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.60, colateral: 0.50 },
    durabNominal: 1, custoGambiarra: 4, custoCorreto: 4, danoColateral: 3000,
    ficha: [
      ['Reação', 'hipoclorito (água sanitária) mais ácido (vinagre) libera cloro gasoso'],
      ['Efeitos', 'irritação e queimadura em vias aéreas e olhos; em grande quantidade, pode lesar os pulmões'],
      ['Outras misturas ruins', 'água sanitária com amônia (cloraminas) e com álcool'],
      ['Regra', 'usar um produto por vez, enxaguando entre eles, em local ventilado']
    ],
    estresse: {
      variavel: 'Tempo de mistura em banheiro fechado', unidade: 'min', de: 0, ate: 10, falhaEm: 2,
      passos: [{ a: 1, t: 'Cheiro forte de cloro: o gás já está se formando.' }],
      falha: 'Tosse, ardência nos olhos e dificuldade para respirar. Saia do local e ventile.', ok: ''
    },
    veredito: [
      'A água sanitária é uma solução de <b>hipoclorito</b>, e o vinagre é um ácido. Juntos, eles reagem e liberam <b>cloro gasoso</b>, que irrita e pode queimar vias aéreas e olhos. Em ambiente fechado, como um banheiro, a concentração sobe rápido.',
      'Não há ganho de limpeza que compense: cada produto já faz o seu trabalho sozinho. A mistura só <b>troca eficiência por toxicidade</b>. Outras combinações também são ruins, como água sanitária com amônia, que forma cloraminas.',
      'Use um produto de cada vez, <b>enxágue bem entre eles</b> e mantenha a janela aberta. Se sentir ardência ou tosse, saia do ambiente e procure atendimento se os sintomas continuarem.'
    ],
    fontes: [{ t: 'Canaltech: 8 misturas de limpeza perigosas', u: 'https://canaltech.com.br/ciencia/8-misturas-de-produtos-de-limpeza-perigosas-para-saude/' }]
  },

  {
    id: 'arroz-saleiro', categoria: 'Cozinha e limpeza',
    titulo: 'Grãos de arroz no saleiro para o sal não empedrar',
    resumo: 'Um punhado de arroz para absorver a umidade do sal.',
    unidadeDurab: 'horas', durabRotulo: 'Duração do efeito', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.75, M: 0.80, C: 0.70 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.02, colateral: 0.03 },
    durabNominal: 2160, custoGambiarra: 1, custoCorreto: 10, danoColateral: 20,
    ficha: [
      ['Princípio', 'o sal atrai água do ar e o arroz absorve parte dela'],
      ['Umidade crítica', 'a partir de cerca de 75% de umidade relativa o sal começa a absorver água do ar'],
      ['Limite', 'em ar muito úmido o arroz satura e o sal empedra'],
      ['Observação', 'não encontrei teste controlado; o princípio é físico e plausível']
    ],
    estresse: {
      variavel: 'Umidade relativa do ar', unidade: '%', de: 40, ate: 100, falhaEm: 95,
      passos: [
        { a: 60, t: 'Ar relativamente seco: o sal fica solto.' },
        { a: 75, t: 'Perto de 75% de umidade o sal começa a absorver água do ar.' },
        { a: 85, t: 'O arroz absorve parte da umidade e adia o empedramento.' }
      ],
      falha: 'Ambiente saturado: nem o arroz dá conta e o sal empedra.', ok: ''
    },
    veredito: [
      'O sal de cozinha é <b>higroscópico</b>: ele atrai umidade do ar. Perto de 75% de umidade relativa ele começa a absorver água e os cristais grudam. O arroz seco também absorve umidade e ajuda a segurar essa água.',
      'É uma gambiarra com <b>base física plausível</b> e risco praticamente zero. Dos cenários desta lista, é um dos poucos em que o improviso se sustenta, ainda que eu não tenha encontrado um teste controlado que meça o ganho.',
      'Fica o limite: em dias muito úmidos o arroz satura. Ainda assim, vale mais do que o sal empedrado. Troque o arroz de tempos em tempos e mantenha o saleiro fechado.'
    ],
    fontes: [{ t: 'Somente Coisas Legais: gambiarras comuns', u: 'https://somentecoisaslegais.com.br/curiosidades/7-gambiarras-mais-comuns-da-familia-brasileira' }]
  },

  {
    id: 'colher-gargalo', categoria: 'Cozinha e limpeza',
    titulo: 'Colher no gargalo para manter o gás do espumante ou refrigerante',
    resumo: 'A colherzinha de metal para a bebida não perder o gás.',
    unidadeDurab: 'horas', durabRotulo: 'Efeito da colher sobre o gás', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.05, M: 0.05, C: 0.20 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.02 },
    durabNominal: 48, custoGambiarra: 1, custoCorreto: 10, danoColateral: 20,
    ficha: [
      ['Teste de 1994', 'Zare e McGee: degustação às cegas após 26 h refrigerado, sem diferença'],
      ['MythBusters', 'chegou à mesma conclusão'],
      ['Medição', 'a pressão cai igual com e sem colher'],
      ['O que funciona', 'rolha ou tampa e manter a bebida fria']
    ],
    estresse: {
      variavel: 'Horas depois de abrir a garrafa', unidade: 'h', de: 0, ate: 26, falhaEm: 8,
      passos: [
        { a: 2, t: 'O gás escapa pela abertura do mesmo jeito: a colher não veda nada.' },
        { a: 5, t: 'Quanto mais quente a bebida, mais rápido o CO₂ sai.' }
      ],
      falha: 'Sem diferença entre a garrafa com colher e sem. O que segura o gás é a tampa e o frio.', ok: ''
    },
    veredito: [
      'A colher não faz o que a lenda diz: ela <b>não veda</b> o gargalo e o CO₂ continua escapando pela abertura. Testes às cegas e medições de pressão não encontraram diferença entre garrafas com e sem colher.',
      'O que ajuda de verdade é físico: o <b>CO₂ se dissolve melhor em líquido frio</b>, então manter a bebida gelada retém mais gás. Uma rolha ou tampa que vede impede a saída pela abertura.',
      'Resumo: é um mito inofensivo. Pode usar a colher se divertir, mas confie na <b>tampa e na geladeira</b>.'
    ],
    fontes: [{ t: 'Scientific American: a colher no espumante', u: 'https://www.scientificamerican.com/article/sparkling-wine-teaspoon-myth/' }]
  },

  {
    id: 'roupa-geladeira', categoria: 'Casa e reparos',
    titulo: 'Secar roupa ou tênis atrás da geladeira',
    resumo: 'Aproveitar o calor da grade traseira para secar mais rápido.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a geladeira sofrer', horizonte: 8760, horizonteTxt: '1 ano',
    fatores: { A: 0.25, M: 0.60, C: 0.20 },
    riscos: { calor: 0.15, eletrico: 0.10, terceiros: 0.05, colateral: 0.30 },
    durabNominal: 8760, custoGambiarra: 1, custoCorreto: 60, danoColateral: 1800,
    ficha: [
      ['Grade traseira', 'funciona como condensador e dissipa calor para o ambiente'],
      ['Recomendação do fabricante', 'nunca colocar objetos para secar atrás da geladeira'],
      ['Riscos', 'falhas de funcionamento, mais consumo de energia e dano ao compressor'],
      ['Alternativa', 'varal, secadora ou ambiente ventilado']
    ],
    estresse: {
      variavel: 'Tempo com a grade coberta', unidade: 'h', de: 0, ate: 48, falhaEm: 24,
      passos: [
        { a: 2, t: 'A roupa seca rápido: o calor do condensador ajuda.' },
        { a: 8, t: 'A geladeira dissipa menos calor e o compressor trabalha mais tempo.' },
        { a: 16, t: 'O consumo de energia sobe e o motor trabalha mais quente.' }
      ],
      falha: 'O compressor ficou sobrecarregado. Em casos extremos, o dano é irreversível.', ok: ''
    },
    veredito: [
      'Funciona, porque a grade traseira é um <b>condensador</b> que joga calor no ambiente, e roupa ali seca mais rápido. É esse calor que a geladeira precisa dissipar para conseguir gelar.',
      'Coberta por roupa, ela perde a troca de calor, o compressor trabalha mais e o <b>consumo de energia aumenta</b>. Em casos extremos, a fabricante alerta para dano irreversível ao compressor e ao produto.',
      'A orientação da própria marca é clara: <b>nunca coloque objetos</b> para secar atrás da geladeira. Um varal dobrável resolve por pouco dinheiro.'
    ],
    fontes: [{ t: 'Brastemp: roupas e tênis atrás da geladeira', u: 'https://www.brastemp.com.br/atendimento/perguntas-frequentes/posso-colocar-tenis-e-roupas-atras-da-geladeira' }]
  },

  {
    id: 'faca-chave-fenda', categoria: 'Casa e reparos',
    titulo: 'Usar faca de cozinha como chave de fenda',
    resumo: 'Sem chave por perto, a ponta da faca "resolve".',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a ponta entortar', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.35, M: 0.60, C: 0.20 },
    riscos: { calor: 0, eletrico: 0.03, terceiros: 0.20, colateral: 0.25 },
    durabNominal: 2, custoGambiarra: 1, custoCorreto: 15, danoColateral: 200,
    ficha: [
      ['Ferramenta certa', 'ponta chata ou Phillips que encaixa no parafuso'],
      ['A faca', 'lâmina fina e lisa que tende a escorregar para fora da fenda'],
      ['Riscos', 'parafuso espanado, lâmina entortada e corte na mão'],
      ['Custo da certa', 'chave de fenda básica (faixa estimada R$ 10–20)']
    ],
    estresse: {
      variavel: 'Torque aplicado', unidade: 'N·m', de: 0, ate: 4, falhaEm: 1.5,
      passos: [
        { a: 0.5, t: 'Parafuso solto sai fácil.' },
        { a: 1, t: 'A lâmina fina começa a escorregar para fora da fenda.' }
      ],
      falha: 'A ponta escorregou: parafuso espanado e risco de corte na mão.', ok: ''
    },
    veredito: [
      'Para um parafuso solto, a ponta da faca encaixa na fenda e <b>funciona uma vez</b>. O problema aparece quando ele aperta: a lâmina é lisa e fina e a fenda é rasa, então a ponta escorrega.',
      'Quando escorrega, o parafuso fica <b>espanado</b>, a lâmina entorta e a mão vai junto. Uma faca de cozinha não foi temperada para suportar esforço de torção na ponta.',
      'Uma chave de fenda básica custa pouco e dura anos. Para parafuso emperrado, a chave certa é o que evita a visita ao pronto-socorro.'
    ],
    fontes: [{ t: 'Somente Coisas Legais: gambiarras comuns', u: 'https://somentecoisaslegais.com.br/curiosidades/7-gambiarras-mais-comuns-da-familia-brasileira' }]
  },

  {
    id: 'ar-caseiro', categoria: 'Casa e reparos',
    titulo: 'Ar-condicionado caseiro: ventilador com isopor e gelo',
    resumo: 'Ventilador soprando por uma caixa de isopor com água gelada.',
    unidadeDurab: 'horas', durabRotulo: 'Duração do gelo (efeito)', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.30, M: 0.60, C: 0.20 },
    riscos: { calor: 0, eletrico: 0.12, terceiros: 0.05, colateral: 0.15 },
    durabNominal: 8, custoGambiarra: 15, custoCorreto: 150, danoColateral: 300,
    ficha: [
      ['Princípio', 'o calor flui do quente para o frio: o ar cede calor ao gelo'],
      ['Limite', 'só enquanto há gelo; não resfria o cômodo'],
      ['Toalha molhada', 'rende menos que o isopor, pois troca calor com o ambiente'],
      ['Umidade', 'o ar fica mais úmido; em ambiente muito seco isso pode até ajudar']
    ],
    estresse: {
      variavel: 'Tempo depois de o gelo começar a derreter', unidade: 'h', de: 0, ate: 6, falhaEm: 2,
      passos: [
        { a: 0.5, t: 'O ar passa pelo gelo e sai um pouco mais fresco.' },
        { a: 1.5, t: 'A água esquenta e a troca de calor perde força.' }
      ],
      falha: 'O gelo derreteu. Sem compressor, o ar volta à temperatura do ambiente.', ok: ''
    },
    veredito: [
      'Funciona em parte, e pelo motivo certo: o calor passa do ar quente para o gelo, e o ar sai um pouco mais <b>fresco</b>. É o mesmo princípio de trocar calor de um aparelho de verdade, só que sem a máquina.',
      'O limite é a física: um ar-condicionado usa um motor para <b>trabalhar sobre um fluido refrigerante</b> e continuar esfriando. Na versão caseira, quando o gelo derrete e a água chega à temperatura do cômodo, a troca de calor para.',
      'Em salas secas, o aumento de umidade pode até ajudar um pouco. Fica a atenção de manter <b>água longe de tomadas</b> e do ventilador.'
    ],
    fontes: [{ t: 'Rádio Itatiaia: ar-condicionado caseiro funciona?', u: 'https://www.itatiaia.com.br/cidades/2023/11/21/ar-condicionado-caseiro-funciona-especialista-analisa-alternativas-contra-o-calor-que-bombam-na-web' }]
  }
);
