/* ============================================================
   NOVOS CENÁRIOS — ELÉTRICA (4)
   ============================================================ */
CENARIOS.push(
  {
    id: 'fusivel-aluminio', categoria: 'Elétrica',
    titulo: 'Papel alumínio ou arame no lugar do fusível',
    resumo: 'O fusível queimou e a "solução" é fechar o circuito com metal.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o fio esquentar demais', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.02, M: 0.10, C: 0.05 },
    riscos: { calor: 0.45, eletrico: 0.45, terceiros: 0.35, colateral: 0.40 },
    durabNominal: 200, custoGambiarra: 1, custoCorreto: 5, danoColateral: 8000,
    ficha: [
      ['Função do fusível', 'queimar de propósito e cortar a corrente antes de o fio esquentar'],
      ['O que a gambiarra faz', 'conduz qualquer corrente, sem limite'],
      ['Consequência', 'fios superaquecem, derretem a isolação e podem causar incêndio'],
      ['Orientação', 'usar o fusível ou disjuntor correto; fusível queimando sempre pede um técnico']
    ],
    estresse: {
      variavel: 'Corrente no circuito', unidade: '% do limite do fio', de: 0, ate: 200, falhaEm: 105,
      passos: [
        { a: 50, t: 'Tudo funciona. Parece que a gambiarra deu certo.' },
        { a: 90, t: 'Perto do limite do fio: a isolação já esquenta.' }
      ],
      falha: 'O alumínio não queimou, o fio sim. Sem fusível, nada cortou a corrente a tempo.', ok: ''
    },
    veredito: [
      'O fusível é o <b>elo fraco de propósito</b>: ele queima antes do fio, para cortar a corrente quando algo passa do limite. Trocar por papel alumínio ou arame faz o aparelho voltar a funcionar, mas desfaz a proteção.',
      'Sem o fusível, uma sobrecarga ou curto faz circular corrente acima do que o fio suporta. A isolação <b>derrete</b>, o fio esquenta dentro da parede e o resultado pode ser incêndio.',
      'Se o fusível queima com frequência, o problema está no circuito ou no aparelho, e vale chamar um técnico. O Corpo de Bombeiros também orienta trocar chaves antigas de fusível por <b>disjuntores</b>.'
    ],
    fontes: [{ t: 'Idec: dicas do Corpo de Bombeiros para instalações elétricas', u: 'https://idec.org.br/consultas/dicas-e-direitos/conheca-dicas-do-corpo-de-bombeiros-para-as-instalacoes-eletricas' }]
  },

  {
    id: 'fio-tomada', categoria: 'Elétrica',
    titulo: 'Ligar o fio direto na tomada, sem plugue',
    resumo: 'Enfiar as pontas do fio nos furos, ou dobrar o cabo até o contato pegar.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o mau contato voltar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.08, M: 0.40, C: 0.10 },
    riscos: { calor: 0.25, eletrico: 0.55, terceiros: 0.30, colateral: 0.35 },
    durabNominal: 100, custoGambiarra: 1, custoCorreto: 10, danoColateral: 5000,
    ficha: [
      ['A gambiarra', 'pontas do fio nos furos da tomada, ou cabo dobrado até o contato "pegar"'],
      ['Problema', 'contato ruim gera faísca e aquecimento; fio exposto dá choque'],
      ['Corpo de Bombeiros', 'não fazer ligações provisórias e revisar fios e tomadas'],
      ['Solução', 'plugue novo ou tomada certificada (faixa estimada R$ 5–15)']
    ],
    estresse: {
      variavel: 'Puxões no fio', unidade: 'puxões', de: 0, ate: 40, falhaEm: 12,
      passos: [
        { a: 3, t: 'O fio fica frouxo no furo e só encosta no metal.' },
        { a: 8, t: 'O ponto de contato aquece e a tomada começa a escurecer.' }
      ],
      falha: 'Faísca e curto. Fio solto no furo é o caminho mais curto para um choque.', ok: ''
    },
    veredito: [
      'Eletricidade precisa de <b>contato firme</b>. Um fio solto no furo toca o metal apenas em um ponto minúsculo, e nesse ponto a corrente vira calor. Quanto maior o aparelho, mais rápido isso esquenta.',
      'O contato também falha com o tempo: um puxão ou vibração afrouxa tudo. Cada falha gera <b>faísca</b>, e as pontas do fio ficam expostas para quem encostar, inclusive crianças e animais.',
      'O conserto certo custa pouco: um plugue novo. O Corpo de Bombeiros é claro em orientar a <b>não fazer ligações provisórias</b>.'
    ],
    fontes: [
      { t: 'Idec: dicas do Corpo de Bombeiros', u: 'https://idec.org.br/consultas/dicas-e-direitos/conheca-dicas-do-corpo-de-bombeiros-para-as-instalacoes-eletricas' },
      { t: 'Somente Coisas Legais: gambiarras comuns', u: 'https://somentecoisaslegais.com.br/curiosidades/7-gambiarras-mais-comuns-da-familia-brasileira' }
    ]
  },

  {
    id: 'benjamim-t', categoria: 'Elétrica',
    titulo: 'Benjamim (T) para ligar vários aparelhos na mesma tomada',
    resumo: 'Ferro, micro-ondas e ventilador no mesmo "T".',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a tomada superaquecer', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.30, M: 0.50, C: 0.25 },
    riscos: { calor: 0.35, eletrico: 0.20, terceiros: 0.15, colateral: 0.30 },
    durabNominal: 500, custoGambiarra: 12, custoCorreto: 80, danoColateral: 6000,
    ficha: [
      ['Cálculo', 'P = V × I: 127 V × 10 A = 1.270 W numa tomada de 10 A'],
      ['Em 220 V', 'a mesma tomada de 10 A chega a 2.200 W'],
      ['Corpo de Bombeiros', 'não ligar mais de um aparelho elétrico na mesma tomada'],
      ['Carga leve', 'carregadores e luminárias somam pouca potência; o problema são aparelhos de calor']
    ],
    estresse: {
      variavel: 'Potência somada na tomada', unidade: 'W', de: 0, ate: 4000, falhaEm: 1270,
      passos: [
        { a: 400, t: 'Carregadores e luminária: carga leve, sem problema.' },
        { a: 900, t: 'Entra o ventilador e o notebook: já perto do limite da tomada.' }
      ],
      falha: 'Com ferro ou micro-ondas junto, a soma passou do que a tomada e o fio suportam. O resultado é aquecimento e risco de incêndio.', ok: ''
    },
    veredito: [
      'O benjamim não cria potência: ele só <b>divide a mesma tomada</b>. A conta é simples: potência é tensão vezes corrente. Numa tomada de 10 A em 127 V, o limite é cerca de 1.270 W, e um ferro de passar ou um micro-ondas já consomem isso sozinhos.',
      'Se a soma passa do limite, a corrente excede o que o <b>fio e os contatos</b> suportam. Eles esquentam, a isolação amolece e o plástico da tomada derrete, muitas vezes sem o disjuntor desarmar.',
      'Para cargas leves, como carregadores, o risco é bem menor. Para aparelhos de calor, o certo é <b>uma tomada por aparelho</b>, como orienta o Corpo de Bombeiros.'
    ],
    fontes: [{ t: 'Idec: dicas do Corpo de Bombeiros', u: 'https://idec.org.br/consultas/dicas-e-direitos/conheca-dicas-do-corpo-de-bombeiros-para-as-instalacoes-eletricas' }]
  },

  {
    id: 'chuveiro-resistencia', categoria: 'Elétrica',
    titulo: 'Cortar a resistência do chuveiro para esquentar mais',
    resumo: 'Encurtar a resistência para o chuveiro ficar "mais quente".',
    unidadeDurab: 'horas', durabRotulo: 'Vida da resistência modificada', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.15, M: 0.70, C: 0.05 },
    riscos: { calor: 0.45, eletrico: 0.40, terceiros: 0.35, colateral: 0.40 },
    durabNominal: 300, custoGambiarra: 2, custoCorreto: 45, danoColateral: 7000,
    ficha: [
      ['Física', 'P = V² / R: menos resistência significa mais potência e mais corrente'],
      ['Exemplo (127 V)', '4.400 W ≈ 34,6 A; encurtando 10%, sobe para ≈ 38,5 A'],
      ['Fiação e disjuntor', 'dimensionados para a corrente original do chuveiro'],
      ['Segurança', 'fio terra é obrigatório; fita isolante comum não aguenta a potência']
    ],
    estresse: {
      variavel: 'Corrente no circuito do chuveiro', unidade: '% da original', de: 100, ate: 140, falhaEm: 110,
      passos: [
        { a: 102, t: 'Resistência encurtada: a potência sobe e a água esquenta mais.' },
        { a: 106, t: 'A corrente já passa do que o projeto original previa.' }
      ],
      falha: 'A corrente passou do que fio e disjuntor foram dimensionados para suportar. O circuito esquenta.', ok: ''
    },
    veredito: [
      'Funciona, e é por isso que a prática é perigosa. Encurtar a resistência diminui <b>R</b>, e como a potência é V²/R, o chuveiro esquenta mais. Numa conta de 127 V: um chuveiro de 4.400 W puxa cerca de 34,6 A, e com 10% menos resistência passa de 38 A.',
      'A fiação, o disjuntor e o plugue foram dimensionados para a corrente <b>original</b>. Com mais corrente, o circuito esquenta, as emendas afrouxam e a isolação sofre. Uma resistência modificada também aquece de forma desigual e queima mais rápido.',
      'Água e eletricidade pedem margem: o <b>fio terra é obrigatório</b>, e fita isolante comum não aguenta a potência. Para esquentar mais, o certo é trocar por um chuveiro compatível com o circuito, instalado por um eletricista.'
    ],
    fontes: [{ t: 'Canaltech: riscos do chuveiro elétrico', u: 'https://canaltech.com.br/eletro/chuveiro-eletrico-e-perigoso-saiba-como-evitar-problemas/' }]
  }
);
