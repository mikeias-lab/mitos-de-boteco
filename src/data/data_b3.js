/* ============================================================
   NOVOS CENÁRIOS — INFORMÁTICA E WI-FI (3) + CELULAR (2)
   ============================================================ */
CENARIOS.push(
  {
    id: 'pasta-dente-termica', categoria: 'Informática e Wi-Fi',
    titulo: 'Pasta de dente no lugar da pasta térmica do processador',
    resumo: 'Sem pasta térmica à mão, a pasta de dente "quebra o galho".',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a pasta secar e trincar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.15, M: 0.35, C: 0.15 },
    riscos: { calor: 0.30, eletrico: 0.03, terceiros: 0, colateral: 0.40 },
    durabNominal: 720, custoGambiarra: 2, custoCorreto: 30, danoColateral: 1500,
    ficha: [
      ['Função', 'preencher microfalhas entre o processador e o dissipador e conduzir o calor'],
      ['Pasta de dente', 'não foi feita para isso e pode ter componentes que corroem'],
      ['Custo da certa', 'pasta térmica custa de R$ 10 a R$ 100'],
      ['Aplicação certa', 'quantidade de um grão de ervilha, no centro']
    ],
    estresse: {
      variavel: 'Temperatura da CPU sob carga', unidade: '°C', de: 40, ate: 100, falhaEm: 90,
      passos: [
        { a: 60, t: 'Em repouso ainda parece normal.' },
        { a: 75, t: 'Sob carga, a temperatura sobe mais rápido do que com pasta térmica.' }
      ],
      falha: 'O processador reduz a frequência para se proteger (throttling) e o PC engasga. A pasta seca e piora o contato.', ok: ''
    },
    veredito: [
      'A pasta térmica existe para preencher as <b>microfalhas</b> entre o processador e o dissipador. O ar nessas falhas isola o calor, e a pasta o conduz. A de dente até preenche, mas conduz mal e foi feita para outra coisa.',
      'Pior: ela <b>seca</b> em dias e racha, abrindo bolsas de ar. A fonte consultada ainda alerta que a pasta de dente pode ter componentes corrosivos, que podem deteriorar o processador.',
      'A economia é pequena: uma pasta térmica adequada custa de R$ 10 a R$ 100. Use a quantidade de <b>um grão de ervilha</b> no centro, e pouca é melhor que muita.'
    ],
    fontes: [{ t: 'Canaltech: pasta térmica, mitos e cuidados', u: 'https://canaltech.com.br/hardware/pasta-termica-no-processador-mitos-verdades-e-cuidados-importantes-208618/' }]
  },

  {
    id: 'gabinete-aberto', categoria: 'Informática e Wi-Fi',
    titulo: 'Tirar a tampa do gabinete para o PC esfriar mais',
    resumo: 'Rodar o computador com a lateral aberta contra o superaquecimento.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a poeira cobrir os componentes', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.45, M: 0.40, C: 0.50 },
    riscos: { calor: 0.08, eletrico: 0.05, terceiros: 0.10, colateral: 0.35 },
    durabNominal: 1440, custoGambiarra: 1, custoCorreto: 60, danoColateral: 800,
    ficha: [
      ['Fluxo projetado', 'em geral o ar entra pela frente e sai por trás ou por cima'],
      ['Gabinete aberto', 'tira esse caminho e deixa as peças expostas'],
      ['Poeira', 'bloqueia dissipadores e ventoinhas e faz a CPU reduzir a frequência'],
      ['Alternativa', 'limpeza, filtros nas entradas e ventoinhas bem posicionadas']
    ],
    estresse: {
      variavel: 'Tempo de uso com o gabinete aberto', unidade: 'meses', de: 0, ate: 12, falhaEm: 6,
      passos: [
        { a: 1, t: 'Peças ao ar livre: a temperatura pode até cair um pouco no começo.' },
        { a: 3, t: 'A poeira começa a cobrir as ventoinhas e os dissipadores.' }
      ],
      falha: 'A poeira entupiu o dissipador e a temperatura voltou a subir, agora com mais sujeira.', ok: ''
    },
    veredito: [
      'Abrir a lateral pode baixar a temperatura <b>no curto prazo</b>, principalmente em gabinetes muito apertados. Mas o projeto do gabinete prevê um caminho de ar: entra pela frente, passa pelas peças e sai por trás ou por cima. Sem a tampa, esse caminho se desorganiza.',
      'O custo vem a médio prazo: sem filtros, a <b>poeira</b> entra livre e entope dissipadores e ventoinhas. Casos reais mostram radiadores soterrados de poeira que levaram o processador a reduzir a frequência para se proteger.',
      'O resultado varia de gabinete para gabinete. O caminho seguro é <b>limpar</b>, usar filtros nas entradas e arrumar o fluxo, em vez de deixar o PC aberto.'
    ],
    fontes: [{ t: 'Hardware.com.br: poeira e superaquecimento', u: 'https://www.hardware.com.br/noticias/jogador-abre-computador-gabinete-superaquecimento-radiador-poeira/amp/' }]
  },

  {
    id: 'aluminio-roteador', categoria: 'Informática e Wi-Fi',
    titulo: 'Papel alumínio atrás do roteador para direcionar o Wi-Fi',
    resumo: 'Um refletor caseiro para jogar o sinal em um cômodo específico.',
    unidadeDurab: 'horas', durabRotulo: 'Durabilidade estimada', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.60, M: 0.70, C: 0.50 },
    riscos: { calor: 0.02, eletrico: 0.03, terceiros: 0, colateral: 0.05 },
    durabNominal: 4320, custoGambiarra: 1, custoCorreto: 150, danoColateral: 150,
    ficha: [
      ['Estudo citado', 'Dartmouth College: até +55% de sinal na direção desejada e até −63% na oposta (segundo a reportagem)'],
      ['Limite', 'o ganho vale para direções específicas; às vezes é quase imperceptível'],
      ['Cuidado', 'não envolva o roteador inteiro: pode piorar a conexão'],
      ['Mais importante', 'a posição do roteador, alto e no centro da casa']
    ],
    estresse: {
      variavel: 'Distância do roteador, na direção do refletor', unidade: 'm', de: 0, ate: 20, falhaEm: 12,
      passos: [
        { a: 4, t: 'Cômodo ao lado, na direção do refletor: pode haver melhora perceptível.' },
        { a: 8, t: 'Duas paredes depois, o ganho encolhe entre concreto e móveis.' }
      ],
      falha: 'O ganho sumiu. Paredes e distância pesam mais do que o refletor.', ok: ''
    },
    veredito: [
      'Essa gambiarra tem <b>base física real</b>. O Wi-Fi é uma onda eletromagnética que se espalha em todas as direções, e o alumínio reflete parte dela. Um refletor atrás do roteador joga mais sinal para a frente e menos para trás.',
      'O ganho é <b>direcional e condicional</b>. A reportagem cita um estudo da Dartmouth com aumentos de até 55% no sentido desejado, mas diz que em alguns casos a melhora é quase imperceptível e que envolver o roteador inteiro pode piorar.',
      'Antes do alumínio, mexa no que mais pesa: <b>a posição do roteador</b>. Alto, no centro e longe de paredes grossas vale mais. Se precisar de cobertura ampla, repetidor ou mesh resolvem de verdade.'
    ],
    fontes: [{ t: 'NSC Total: papel alumínio no Wi-Fi', u: 'https://www.nsctotal.com.br/?p=7908826' }]
  },

  {
    id: 'carga-noite', categoria: 'Celular',
    titulo: 'Deixar o celular carregando a noite toda',
    resumo: 'Será que carregar durante o sono estraga a bateria?',
    unidadeDurab: 'horas', durabRotulo: 'Vida útil estimada da bateria', horizonte: 8760, horizonteTxt: '1 ano',
    fatores: { A: 0.70, M: 0.75, C: 0.60 },
    riscos: { calor: 0.10, eletrico: 0.08, terceiros: 0.05, colateral: 0.10 },
    durabNominal: 21600, custoGambiarra: 0, custoCorreto: 0, danoColateral: 400,
    ficha: [
      ['O mito', 'carregar a noite toda estraga a bateria'],
      ['Na prática', 'celulares modernos interrompem a carga ao chegar a 100%'],
      ['Cuidado real', 'calor, carregador sem certificação e risco elétrico'],
      ['Boa prática', 'carregador certificado pela Anatel, longe de travesseiro e cobertor']
    ],
    estresse: {
      variavel: 'Tempo ligado depois de chegar a 100%', unidade: 'h', de: 0, ate: 10, falhaEm: null,
      passos: [
        { a: 1, t: 'Chega a 100% e o circuito de gerenciamento interrompe a carga.' },
        { a: 4, t: 'Pequenas recargas mantêm a bateria perto de 100%.' },
        { a: 8, t: 'O calor extra (capa, travesseiro) pesa mais que as horas.' }
      ],
      falha: '', ok: 'A bateria aguentou. O cuidado vai para o calor e para a qualidade do carregador.'
    },
    veredito: [
      'O mito diz que a bateria "vicia" ou estraga se ficar ligada a noite toda. Nos celulares modernos isso <b>não é bem assim</b>: o aparelho interrompe a carga ao chegar a 100% e só repõe pequenas quantidades.',
      'O que realmente castiga uma bateria de lítio é <b>calor</b> e carregador ruim. Dormir com o celular debaixo do travesseiro ou do cobertor impede a dissipação e junta os dois piores cenários.',
      'Mesmo desmentido o mito, a fonte consultada não recomenda deixar carregando a noite inteira, por causa do risco elétrico. Carregador <b>certificado</b> e o aparelho em superfície aberta resolvem quase tudo.'
    ],
    fontes: [{ t: 'Olhar Digital: 7 mitos sobre a bateria do celular', u: 'https://olhardigital.com.br/2025/11/03/dicas-e-tutoriais/7-mitos-sobre-a-bateria-de-celular-que-voce-ainda-acredita/' }]
  },

  {
    id: 'carregador-generico', categoria: 'Celular',
    titulo: 'Carregador genérico sem marca e sem certificação',
    resumo: 'Será que qualquer carregador de banca serve para o celular?',
    unidadeDurab: 'horas', durabRotulo: 'Vida útil estimada do carregador', horizonte: 8760, horizonteTxt: '1 ano',
    fatores: { A: 0.50, M: 0.70, C: 0.50 },
    riscos: { calor: 0.15, eletrico: 0.20, terceiros: 0.08, colateral: 0.20 },
    durabNominal: 8760, custoGambiarra: 20, custoCorreto: 90, danoColateral: 2000,
    ficha: [
      ['O mito', 'carregador genérico sempre prejudica o celular'],
      ['O que importa', 'certificação da Anatel e amperagem e voltagem compatíveis'],
      ['Evitar', 'itens falsificados ou de origem duvidosa'],
      ['Risco real', 'sem proteção contra sobretemperatura e sobrecorrente']
    ],
    estresse: {
      variavel: 'Temperatura do carregador', unidade: '°C', de: 25, ate: 90, falhaEm: 70,
      passos: [
        { a: 40, t: 'Aquece um pouco: é normal em qualquer carregador.' },
        { a: 55, t: 'Sem proteção de sobretemperatura, o aquecimento continua subindo.' }
      ],
      falha: 'Componentes baratos perdem a isolação. Sem certificação, não há garantia de proteção contra falha.', ok: ''
    },
    veredito: [
      'Dizer que todo carregador genérico estraga o celular é exagero. O que decide é a <b>certificação da Anatel</b> e a compatibilidade de tensão e corrente com o aparelho. Marca famosa sem selo também não é garantia.',
      'O perigo de um carregador de origem duvidosa está no que ele <b>não tem</b>: proteção contra sobrecorrente, sobretemperatura e isolação adequada. Quando falha, falha esquentando, e pode atingir o celular e a tomada.',
      'A diferença de preço é pequena perto do risco. Compre carregador <b>certificado</b>, de loja confiável, e troque o que estiver esquentando demais.'
    ],
    fontes: [{ t: 'Olhar Digital: 7 mitos sobre a bateria do celular', u: 'https://olhardigital.com.br/2025/11/03/dicas-e-tutoriais/7-mitos-sobre-a-bateria-de-celular-que-voce-ainda-acredita/' }]
  }
);
