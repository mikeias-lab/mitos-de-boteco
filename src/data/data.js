/* ============================================================
   BASE DE CENÁRIOS
   fatores  = { A: adequação do material, M: mecanismo físico real, C: margem de operação }  (0 a 1)
   riscos   = { calor, eletrico, terceiros, colateral }  (probabilidade 0 a 1)
   Os valores em R$ são estimativas de referência; o preço do dia varia.
   ============================================================ */

const CENARIOS = [
  {
    id: 'escapamento',
    categoria: 'Automotivo',
    icone: 'car',
    titulo: 'Tampar furo de escapamento: massa veda-escape vs Durepoxi',
    resumo: 'Dois produtos, a mesma ideia: fechar o furo sem soldar.',
    unidadeDurab: 'km',
    durabRotulo: 'Durabilidade estimada',
    horizonte: 10000, // km (cerca de 6 meses de uso)
    horizonteTxt: '10.000 km (cerca de 6 meses)',
    variantes: [
      {
        id: 'massa',
        nome: 'Massa veda-escape',
        fatores: { A: 0.72, M: 0.85, C: 0.55 },
        riscos: { calor: 0.05, eletrico: 0, terceiros: 0.15, colateral: 0.10 },
        durabNominal: 4000,
        custoGambiarra: 35,
        custoCorreto: 350,
        danoColateral: 400,
        ficha: [
          ['Material', 'Cimento/pasta refratária (silicatos + carga cerâmica)'],
          ['Faixa de uso', 'Dezenas de °C até mais de 600 °C, conforme o fabricante'],
          ['Gás no tubo', '≈ 300–900 °C, mais quente perto do coletor'],
          ['Limite do reparo', 'Furo pequeno em trecho reto; vibração e dilatação trincam']
        ],
        estresse: {
          variavel: 'Ciclos de aquecer e esfriar', unidade: 'ciclos', de: 0, ate: 400, falhaEm: 260,
          passos: [
            { a: 20, t: 'Cura com o calor do próprio escapamento. A massa vitrifica e endurece.' },
            { a: 120, t: 'Pequenas microtrincas por dilatação térmica diferente entre aço e massa.' },
            { a: 220, t: 'Vibração do motor abre as trincas. Fumaça começa a escapar pela borda.' }
          ],
          falha: 'A massa trincou e soltou. Dá para refazer, mas o reparo é paliativo.',
          ok: ''
        },
        veredito: [
          'A massa veda-escape é feita para este trabalho: uma pasta refratária que <b>cura com o calor do próprio escapamento</b> e resiste a temperaturas muito acima das que o epóxi aguenta. Por isso a nota de material é alta.',
          'O problema é mecânico, não químico. O tubo dilata e contrai a cada aquecimento e vibra com o motor, enquanto a massa é rígida e frágil. <b>Furo pequeno em trecho reto dura bastante; remendo em solda aberta ou perto do coletor, não.</b>',
          'Vazamento de escape antes do catalisador ou perto da cabine também deixa entrar <b>monóxido de carbono (CO)</b>, gás sem cheiro. Se o furo está debaixo do banco, o risco deixa de ser só mecânico.'
        ]
      },
      {
        id: 'durepoxi',
        nome: 'Durepoxi',
        fatores: { A: 0.12, M: 0.30, C: 0.05 },
        riscos: { calor: 0.25, eletrico: 0, terceiros: 0.20, colateral: 0.15 },
        durabNominal: 1200,
        custoGambiarra: 18,
        custoCorreto: 350,
        danoColateral: 400,
        ficha: [
          ['Material', 'Massa epóxi bicomponente (resina + endurecedor)'],
          ['Limite térmico', '≈ 120 °C (valor de fontes secundárias; a ficha da Henkel não informa limite)'],
          ['Gás no tubo', '≈ 150–300 °C na ponta e 300–900 °C no resto'],
          ['Relação', 'Mesmo o trecho mais frio passa do limite do epóxi']
        ],
        estresse: {
          variavel: 'Temperatura no ponto do reparo', unidade: '°C', de: 20, ate: 600, falhaEm: 130,
          passos: [
            { a: 60, t: 'Epóxi curado e firme. Até aqui tudo certo.' },
            { a: 110, t: 'Perto do limite do epóxi. A resina começa a amolecer.' }
          ],
          falha: 'A resina carbonizou e o furo reabriu. O epóxi não é feito para escapamento.',
          ok: ''
        },
        veredito: [
          'O Durepoxi é um <b>epóxi</b>: uma resina orgânica que forma cadeias de polímero. Esse tipo de material <b>amolece e se degrada perto de 120 °C</b>, e o escapamento passa disso em quase todo o trajeto.',
          'Na prática, o remendo pode parecer firme na hora e falhar nas primeiras horas de uso: a resina carboniza, solta fumaça e deixa o furo aberto de novo. <b>A massa refratária é a escolha certa para essa função.</b>',
          'Se o furo estiver na ponta do tubo, o epóxi pode durar um pouco mais, mas ainda fica acima do limite. Para o tubo, a solução definitiva continua sendo solda ou troca do trecho.'
        ]
      }
    ],
    fontes: [
      { t: 'Ficha técnica Loctite Durepoxi (Henkel)', u: 'https://datasheets.tdx.henkel.com/LOCTITE-DUREPOXY-Side-by-Side-Putty-pt_BR.pdf' }
    ]
  },

  {
    id: 'bombril',
    categoria: 'Eletrônicos',
    icone: 'antenna',
    titulo: 'Bombril na antena para melhorar sinal de TV/Wi-Fi',
    resumo: 'Palha de aço enrolada na antena como "reforço".',
    unidadeDurab: 'horas',
    durabRotulo: 'Durabilidade estimada',
    horizonte: 4320,
    horizonteTxt: '6 meses',
    fatores: { A: 0.35, M: 0.40, C: 0.30 },
    riscos: { calor: 0, eletrico: 0.05, terceiros: 0.10, colateral: 0.15 },
    durabNominal: 1440,
    custoGambiarra: 6,
    custoCorreto: 90,
    danoColateral: 120,
    ficha: [
      ['TV digital (UHF)', '470–698 MHz, comprimento de onda ≈ 43–64 cm'],
      ['Wi-Fi 2,4 GHz', 'comprimento de onda ≈ 12,5 cm'],
      ['Palha de aço', 'condutora, mas fios soltos, oxidam e fazem mau contato'],
      ['Onde pode ajudar', 'sinal forte, torre perto e visada limpa']
    ],
    estresse: {
      variavel: 'Chuva e umidade', unidade: 'dias', de: 0, ate: 60, falhaEm: 25,
      passos: [
        { a: 3, t: 'Contato improvisado entre a palha e a antena. O sinal oscila conforme o vento.' },
        { a: 12, t: 'Primeiros pontos de ferrugem. A resistência de contato sobe.' },
        { a: 22, t: 'Palha oxidada solta fiapos. O sinal pode ficar pior que sem ela.' }
      ],
      falha: 'A palha enferrujou e perdeu o contato. O efeito, se existiu, acabou.',
      ok: ''
    },
    veredito: [
      'Antena funciona por <b>ressonância</b>: o tamanho e o formato do elemento precisam combinar com o comprimento de onda do sinal. Em UHF, um dipolo tem algo como 21 a 32 cm. Enrolar um bolo de palha de aço no meio <b>não cria esse dimensionamento</b>.',
      'O que pode acontecer é um efeito de "área extra": um condutor solto capta um pouco mais de energia, de forma instável. Especialistas descrevem a antena improvisada de arame como rudimentar, e só útil com sinal forte, torre próxima e visada livre. Em Wi-Fi, a palha ao redor da antena do roteador também pode <b>detonar a antena ou bloquear o sinal</b>.',
      'A palha de aço <b>enferruja</b> em poucas semanas ao relento, e fiapos soltos podem encostar no conector. Antes de improvisar: refaça a busca de canais, suba a antena e deixe-a perto de uma janela.'
    ],
    fontes: [
      { t: 'Portal Tela: antena de arame para TV digital', u: 'https://www.portaltela.com/cotidiano/tecnologia/2026/07/03/especialistas-explicam-se-e-possivel-ver-a-copa-com-antena-digital-de-arame/' }
    ]
  },

  {
    id: 'pombos',
    categoria: 'Casa e reparos',
    icone: 'bird',
    titulo: 'Garrafa PET com água no telhado para espantar pombos e gatos',
    resumo: 'Garrafas cheias espalhadas para "assustar" os bichos.',
    unidadeDurab: 'horas',
    durabRotulo: 'Duração do efeito (se houver)',
    horizonte: 4320,
    horizonteTxt: '6 meses',
    fatores: { A: 0.15, M: 0.10, C: 0.30 },
    riscos: { calor: 0.03, eletrico: 0, terceiros: 0.08, colateral: 0.12 },
    durabNominal: 336,
    custoGambiarra: 3,
    custoCorreto: 80,
    danoColateral: 150,
    ficha: [
      ['Explicação popular', 'reflexos da luz na água assustam os animais'],
      ['Evidência', 'não encontrei testes controlados que confirmem o efeito'],
      ['Habituação', 'pombos e gatos costumam se acostumar a estímulos fixos'],
      ['Alternativa', 'espetos, redes ou fio anti-pouso, instalados corretamente']
    ],
    estresse: {
      variavel: 'Tempo de exposição dos pombos', unidade: 'horas', de: 0, ate: 72, falhaEm: 12,
      passos: [
        { a: 1, t: 'Pombo estranha o objeto novo e mantém distância.' },
        { a: 5, t: 'Observa as garrafas de longe. Nada acontece com ele.' },
        { a: 10, t: 'Pousa ao lado de uma garrafa e começa a bicar o telhado.' }
      ],
      falha: 'O pombo se acostumou. O estímulo era fixo e inofensivo, então perdeu o efeito.',
      ok: ''
    },
    veredito: [
      'A explicação popular diz que o <b>reflexo da luz</b> na água espanta os bichos. Não encontrei nenhum estudo controlado que mostre isso, e a dica circula como tradição passada de geração em geração.',
      'O que se sabe de comportamento animal aponta para <b>habituação</b>: um estímulo parado e inofensivo vira paisagem em poucos dias. Para afastar pombos de verdade, o que funciona é impedir o pouso (espetos, rede, fio).',
      'Sobra um risco pequeno, mas real: garrafas no telhado <b>rolam, caem e entopem calhas</b>. Cheias de água, também podem concentrar luz do sol, o que é raro, mas não impossível perto de material seco.'
    ],
    fontes: [
      { t: 'Catraca Livre: garrafas com água na varanda (relato popular, sem estudos)', u: 'https://catracalivre.com.br/noticias/pendurar-garrafas-com-agua-e-vinagre-na-varanda-por-que-e-recomendavel/' }
    ]
  },

  {
    id: 'arroz',
    categoria: 'Celular',
    icone: 'phone',
    titulo: 'Celular molhado no arroz para secar',
    resumo: 'O clássico: caiu na água, vai pro pote de arroz.',
    unidadeDurab: 'horas',
    durabRotulo: 'Tempo até a corrosão avançar',
    horizonte: 720,
    horizonteTxt: '30 dias',
    fatores: { A: 0.15, M: 0.20, C: 0.15 },
    riscos: { calor: 0, eletrico: 0.25, terceiros: 0, colateral: 0.35 },
    durabNominal: 72,
    custoGambiarra: 4,
    custoCorreto: 120,
    danoColateral: 900,
    ficha: [
      ['A Apple recomenda', 'não usar arroz; ele pode introduzir partículas no aparelho'],
      ['Secagem real', 'evaporação lenta em ambiente seco e ventilado'],
      ['O inimigo', 'minerais da água + corrente elétrica = corrosão na placa'],
      ['O que ajuda', 'desligar, não carregar e levar à assistência se entrou líquido']
    ],
    estresse: {
      variavel: 'Tempo com o aparelho molhado e ligado', unidade: 'horas', de: 0, ate: 72, falhaEm: 20,
      passos: [
        { a: 2, t: 'Água residual sob conectores e telas. O arroz não alcança esse espaço.' },
        { a: 8, t: 'Minerais da água começam a formar depósitos entre os contatos.' },
        { a: 16, t: 'Se ligar ou carregar agora, a corrente acelera a corrosão (eletrólise).' }
      ],
      falha: 'A corrosão avançou. O aparelho molhado não foi secado, só ficou parado.',
      ok: ''
    },
    veredito: [
      'O arroz é um <b>dessecante fraco</b>. O grão absorve umidade do ar à volta, mas a água está presa dentro do aparelho, em espaços minúsculos. Pelo que a Apple orienta, o arroz não seca o celular de forma eficaz e ainda pode deixar <b>partículas nas entradas</b>.',
      'O dano real não vem da água pura, e sim dos <b>minerais dissolvidos</b> nela. Quando o aparelho está ligado, a corrente elétrica ajuda esses íons a atacar os contatos. Por isso a regra de ouro é: desligar, não carregar e secar em local ventilado.',
      '<b>Se caiu em água salgada ou com açúcar, o caso é urgente.</b> Quanto antes uma assistência limpar a placa, maiores as chances. Esperar "ver se funciona" é o que mais custa caro.'
    ],
    fontes: [
      { t: 'Olhar Digital: o que a Apple diz sobre o arroz', u: 'https://olhardigital.com.br/2025/05/27/reviews/seu-celular-caiu-na-agua-veja-o-que-diz-a-apple-sobre-coloca-lo-no-arroz/' }
    ]
  },
];

/* Palavras-chave: cada regra ajusta os fatores (em pontos de 0 a 1) e gera uma etiqueta */
const REGRAS_TEXTO = [
  { re: /fita|durex|silver|crepe/i, etiqueta: 'Fita adesiva', ajuste: { A: -0.15, C: -0.10 } },
  { re: /arame|clipe|grampo|barbante|el[aá]stico/i, etiqueta: 'Amarração improvisada', ajuste: { A: -0.10, C: -0.10 } },
  { re: /cola|durepoxi|epoxi|ep[oó]xi|super ?bonder|silicone/i, etiqueta: 'Adesivo/vedante', ajuste: { A: 0.05 } },
  { re: /el[eé]trica|fio|benjamim|extens[aã]o|tomada|110|127|220|gato de energia|desencapa/i, etiqueta: 'Eletricidade', ajuste: { eletrico: 0.30, terceiros: 0.10 } },
  { re: /escape|motor|radiador|bateria|aquec|forno|fog[aã]o|chapa|solda/i, etiqueta: 'Calor', ajuste: { calor: 0.30 } },
  { re: /freio|dire[cç][aã]o|pneu|volante|suspens[aã]o|cinto|capacete|escada/i, etiqueta: 'Segurança crítica', ajuste: { terceiros: 0.45, A: -0.10 } },
  { re: /g[aá]s|botij[aã]o|inflam[aá]vel|combust[ií]vel|gasolina|[aá]lcool/i, etiqueta: 'Inflamável', ajuste: { calor: 0.25, terceiros: 0.25 } },
  { re: /[aá]gua|chuva|molhad|umidade|vazamento/i, etiqueta: 'Umidade', ajuste: { eletrico: 0.10, C: -0.10 } },
  { re: /temporari|s[oó] por hoje|at[eé] amanh[aã]|quebra.?galho/i, etiqueta: 'Uso temporário', ajuste: { C: 0.10 } }
];
