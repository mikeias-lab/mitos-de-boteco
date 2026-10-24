/* ============================================================
   NOVOS CENÁRIOS — AUTOMOTIVO (5)
   ============================================================ */
CENARIOS.push(
  {
    id: 'farol-pasta', categoria: 'Automotivo',
    titulo: 'Pasta de dente para clarear farol amarelado',
    resumo: 'Esfregar pasta de dente no farol opaco para "devolver o brilho".',
    unidadeDurab: 'horas', durabRotulo: 'Duração do efeito', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.35, M: 0.55, C: 0.25 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.10, colateral: 0.15 },
    durabNominal: 2160, custoGambiarra: 5, custoCorreto: 120, danoColateral: 300,
    ficha: [
      ['Por que amarela', 'oxidação do plástico por sol, chuva e poluição'],
      ['O que a pasta faz', 'abrasivo leve que alivia a névoa, mas não restaura o farol'],
      ['Duração típica', 'poucas semanas até a opacidade voltar'],
      ['Solução duradoura', 'polimento técnico com proteção ou troca da peça']
    ],
    estresse: {
      variavel: 'Exposição ao sol e à chuva', unidade: 'dias', de: 0, ate: 90, falhaEm: 21,
      passos: [
        { a: 1, t: 'Farol mais claro: o abrasivo leve removeu parte da camada oxidada.' },
        { a: 8, t: 'Sem proteção nova, o plástico exposto volta a oxidar.' },
        { a: 15, t: 'A névoa amarelada reaparece nas bordas.' }
      ],
      falha: 'A opacidade voltou. O efeito da pasta é paliativo e dura poucas semanas.', ok: ''
    },
    veredito: [
      'O farol amarela porque o plástico <b>oxida</b> com sol, chuva e poluição, formando uma camada opaca. A pasta de dente tem abrasivo leve, então ela "lixa" um pouco essa camada, e a aparência melhora na hora.',
      'O problema é o que vem depois: a pasta <b>não devolve proteção</b> ao plástico. Sem ela, a oxidação recomeça e o efeito costuma durar poucas semanas. Força demais ou pano com sujeira ainda pode riscar a lente.',
      'Farol opaco ilumina pior à noite, então o risco é de visibilidade. Para durar de verdade, o caminho é <b>polimento técnico com proteção</b> ou a troca da peça.'
    ],
    fontes: [{ t: 'Click Petróleo e Gás: pasta de dente no farol', u: 'https://clickpetroleoegas.com.br/e-verdade-que-pasta-de-dente-limpa-farol-do-carro-e-deixa-como-novo-flpc96/' }]
  },

  {
    id: 'motor-quente', categoria: 'Automotivo',
    titulo: 'Esquentar o motor parado antes de sair',
    resumo: 'Deixar o carro ligado por minutos antes de rodar, "para não forçar".',
    unidadeDurab: 'horas', durabRotulo: 'Tempo parado até aquecer de verdade', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.30, M: 0.35, C: 0.60 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.15, colateral: 0.10 },
    durabNominal: 1, custoGambiarra: 3, custoCorreto: 0, danoColateral: 300,
    ficha: [
      ['Carros com injeção', 'basta esperar alguns segundos para o óleo circular e sair'],
      ['Carros antigos', 'podem se beneficiar de um breve aquecimento'],
      ['Garagem fechada', 'motor ligado parado acumula monóxido de carbono'],
      ['Custo escondido', 'motor parado queima combustível sem andar']
    ],
    estresse: {
      variavel: 'Tempo parado com o motor ligado', unidade: 'min', de: 0, ate: 10, falhaEm: 6,
      passos: [
        { a: 1, t: 'Em poucos segundos o óleo já circula. A lubrificação está garantida.' },
        { a: 3, t: 'O motor parado aquece devagar e o combustível continua sendo queimado.' }
      ],
      falha: 'Minutos de combustível gastos sem andar. O motor aquece mais rápido rodando leve.', ok: ''
    },
    veredito: [
      'Em carros modernos, com <b>injeção eletrônica</b>, a espera longa não é necessária: alguns segundos bastam para o óleo circular. Depois disso, o motor esquenta mais rápido rodando com calma do que parado.',
      'Deixar o carro ligado só queima combustível. Em <b>garagem fechada</b>, ainda acumula monóxido de carbono, um gás sem cheiro. Carros antigos são a exceção e podem se beneficiar de um aquecimento breve.',
      'Resumo: o hábito não protege o motor de um carro moderno e custa combustível. Saia com suavidade, sem acelerar forte, até a temperatura subir.'
    ],
    fontes: [{ t: 'Canaltech: 5 mitos automotivos', u: 'https://canaltech.com.br/carros/5-mitos-automotivos-em-que-voce-precisa-parar-de-acreditar/' }]
  },

  {
    id: 'economizador', categoria: 'Automotivo',
    titulo: 'Economizador de combustível (ímã, chip ou tampa)',
    resumo: 'Aparelhinho barato que promete reduzir o consumo do carro.',
    unidadeDurab: 'km', durabRotulo: 'Tempo até a "economia" sumir', horizonte: 10000, horizonteTxt: '10.000 km (cerca de 6 meses)',
    fatores: { A: 0.08, M: 0.05, C: 0.30 },
    riscos: { calor: 0.10, eletrico: 0.20, terceiros: 0.08, colateral: 0.12 },
    durabNominal: 2000, custoGambiarra: 80, custoCorreto: 40, danoColateral: 800,
    ficha: [
      ['Promessa', 'reduzir o consumo com ímã, chip ou aparelho na fiação'],
      ['Evidência', 'nenhum se mostrou eficaz, segundo a reportagem consultada'],
      ['Argumento prático', 'se funcionasse, as montadoras instalariam de fábrica'],
      ['Risco', 'alguns aparelhos oferecem risco de incêndio']
    ],
    estresse: {
      variavel: 'Quilômetros medindo o consumo', unidade: 'km', de: 0, ate: 1000, falhaEm: 300,
      passos: [
        { a: 50, t: 'O consumo no computador de bordo continua igual ao de antes.' },
        { a: 150, t: 'A variação cabe na margem normal: trânsito, temperatura e jeito de dirigir.' }
      ],
      falha: 'Descontados trânsito e estilo de direção, a diferença some. O efeito percebido tende a ser placebo.', ok: ''
    },
    veredito: [
      'Combustível vira energia numa combustão controlada pela injeção eletrônica. Um ímã na mangueira ou um chip na tomada <b>não muda a química</b> dessa queima, e a injeção já ajusta a mistura sozinha.',
      'Pelo que consultei, nenhum economizador se mostrou eficaz, e alguns oferecem <b>risco de incêndio</b>. Se funcionassem, as montadoras os instalariam de fábrica, pois consumo menor vende carro.',
      'O que realmente reduz o consumo é barato: <b>pneus calibrados</b>, filtros em dia e direção suave. Esse dinheiro rende mais do que o aparelho.'
    ],
    fontes: [{ t: 'AutoPapo: 10 mitos sobre carro', u: 'https://autopapo.com.br/noticia/10-mitos-sobre-carro/' }]
  },

  {
    id: 'banguela', categoria: 'Automotivo',
    titulo: 'Banguela: descer a serra desengrenado para economizar',
    resumo: 'Pôr em ponto morto ou desligar o motor na descida "para render mais".',
    unidadeDurab: 'km', durabRotulo: 'Descida antes de os freios esquentarem demais', horizonte: 10000, horizonteTxt: '10.000 km (cerca de 6 meses)',
    fatores: { A: 0.10, M: 0.10, C: 0.15 },
    riscos: { calor: 0.30, eletrico: 0, terceiros: 0.55, colateral: 0.30 },
    durabNominal: 6, custoGambiarra: 3, custoCorreto: 3, danoColateral: 3000,
    ficha: [
      ['Freio motor', 'engrenado, o motor ajuda a segurar o carro na descida'],
      ['Ponto morto', 'o freio de serviço faz todo o trabalho e pode superaquecer'],
      ['Motor desligado', 'servofreio e direção assistida podem perder a assistência'],
      ['Infração', 'média, 4 pontos (valor de referência no texto consultado: R$ 130,16)']
    ],
    estresse: {
      variavel: 'Velocidade na descida sem freio motor', unidade: 'km/h', de: 40, ate: 120, falhaEm: 85,
      passos: [
        { a: 60, t: 'Em ponto morto o carro ganha velocidade e o motor não segura nada.' },
        { a: 75, t: 'O freio de serviço assume tudo e começa a esquentar.' }
      ],
      falha: 'Discos e pastilhas superaquecem e perdem eficiência. Sem freio motor, não há plano B.', ok: ''
    },
    veredito: [
      'Engrenado e sem acelerar, o <b>freio motor</b> segura parte da velocidade e, em carros com injeção, o consumo cai a quase nada. Em ponto morto, o motor continua gastando para ficar ligado e você perde esse auxílio.',
      'O custo disso é segurança: o freio de serviço passa a fazer <b>todo</b> o trabalho e, em descidas longas, pode superaquecer e perder eficiência. Com o motor desligado, o servofreio e a direção podem perder a assistência.',
      'Além do perigo, descer desengrenado é <b>infração média</b> no Código de Trânsito (art. 231, IX). A economia, se existe, é de centavos.'
    ],
    fontes: [{ t: 'Âmbito Jurídico: veículo desengrenado em declive', u: 'https://ambitojuridico.com.br/infracao-687-42-transitar-com-veiculo-desengrenado-em-declive/' }]
  },

  {
    id: 'moeda-pneu', categoria: 'Automotivo',
    titulo: 'Moeda de R$ 1 para medir o desgaste do pneu',
    resumo: 'Usar a borda dourada da moeda como régua do sulco mínimo.',
    unidadeDurab: 'km', durabRotulo: 'Km até o erro custar caro', horizonte: 10000, horizonteTxt: '10.000 km (cerca de 6 meses)',
    fatores: { A: 0.30, M: 0.35, C: 0.35 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.25, colateral: 0.20 },
    durabNominal: 10000, custoGambiarra: 1, custoCorreto: 30, danoColateral: 2000,
    ficha: [
      ['Sulco mínimo legal', '1,6 mm'],
      ['Indicador oficial', 'TWI: ressaltos no fundo do sulco; ao alcançá-los, é hora de trocar'],
      ['Moeda de R$ 1', 'a borda dourada como régua de 1,6 mm é contestada e não tem medição verificada'],
      ['Melhor medida', 'o próprio TWI ou um paquímetro']
    ],
    estresse: {
      variavel: 'Desgaste do pneu', unidade: '%', de: 0, ate: 100, falhaEm: 80,
      passos: [
        { a: 40, t: 'Sulco ainda fundo. Qualquer medida diria que está tudo certo.' },
        { a: 70, t: 'Perto do limite: um erro de 1 mm na medida já vira problema.' }
      ],
      falha: 'Abaixo de 1,6 mm o pneu está careca, mas a moeda ainda pode "passar". Resultado: frenagem longa e aquaplanagem.', ok: ''
    },
    veredito: [
      'A ideia de comparar o sulco com um objeto de tamanho conhecido é boa. O problema é <b>qual objeto</b>: a borda dourada da moeda como régua de 1,6 mm é contestada, e a fonte consultada não traz medição verificada.',
      'Errar em 1 ou 2 mm aqui é grave. Abaixo de 1,6 mm o pneu perde capacidade de <b>escoar água</b>, e a frenagem molhada piora muito. Pior que não medir é medir errado e se sentir seguro.',
      'A solução é de graça: todo pneu tem o <b>TWI</b>, ressaltos no fundo do sulco. Quando o desgaste chega neles, troque. Um paquímetro de R$ 30 também resolve.'
    ],
    fontes: [{ t: 'AutoPapo: TWI e sulco mínimo do pneu', u: 'https://autopapo.com.br/blog-do-boris/sulco-minimo-do-pneu-verificacao-rapida/' }]
  }
);
