/* ============================================================
   LOTE 2 — MOTO E BIKE (4), HIDRÁULICA (4), QUINTAL E JARDIM (4), OFICINA E FERRAMENTAS (4)
   Os números são estimativas do modelo; a ficha e o veredito citam o que a fonte afirma
   e sinalizam o que é raciocínio próprio.
   ============================================================ */
CENARIOS.push(

  /* ---------------- MOTO E BIKE ---------------- */
  {
    id: 'oleo-cozinha-corrente', categoria: 'Moto e bike',
    titulo: 'Óleo de cozinha para lubrificar a corrente',
    resumo: 'Sem lubrificante em casa, o óleo da cozinha "quebra o galho" na corrente da moto ou da bike.',
    unidadeDurab: 'km', durabRotulo: 'Km até a corrente ficar seca de novo', horizonte: 3000, horizonteTxt: '3.000 km (uso frequente em 6 meses)',
    fatores: { A: 0.15, M: 0.35, C: 0.30 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.25, colateral: 0.20 },
    durabNominal: 300, custoGambiarra: 3, custoCorreto: 40, danoColateral: 600,
    ficha: [
      ['Segundo a fonte', 'o óleo de cozinha é viscoso, mas não tem as propriedades que o kit relação pede'],
      ['Fixação', 'não fica preso à corrente e pode respingar'],
      ['Risco na pista', 'respingos podem deixar a pista escorregadia para quem pilota'],
      ['Referência', 'o manual indica lubrificante de corrente próprio ou óleo SAE 80/90']
    ],
    estresse: {
      variavel: 'Km rodados depois de lubrificar', unidade: 'km', de: 0, ate: 400, falhaEm: 80,
      passos: [
        { a: 10, t: 'A corrente parece lubrificada e silenciosa. Esse é o momento que engana.' },
        { a: 40, t: 'O óleo, que não fica preso aos elos, começa a ser jogado para fora.' }
      ],
      falha: 'A corrente voltou a ficar seca por dentro, e o óleo respingado foi parar no pneu e na pista.', ok: ''
    },
    veredito: [
      'Óleo de cozinha parece uma boa ideia porque é <b>viscoso e escorregadio</b>. Mas a corrente precisa de um lubrificante que penetre nos elos e <b>permaneça</b> ali, e é isso que o óleo de cozinha não faz.',
      'Pela fonte, ele não se fixa na corrente e pode respingar. Para quem anda de moto, o respingo no pneu traseiro ou na pista é o risco mais sério, porque <b>deixa a pista escorregadia</b>.',
      'O lubrificante certo é barato e dura bem mais. Siga o manual: normalmente um lubrificante de corrente ou, em alguns modelos, óleo SAE 80/90.'
    ],
    fontes: [{ t: 'AutoPapo: lubrificante de corrente, qual não usar', u: 'https://autopapo.com.br/motos/lubrificante-corrente-de-moto-qual-nao-usar/' }]
  },
  {
    id: 'capacete-queda', categoria: 'Moto e bike',
    titulo: 'Continuar usando o capacete depois de uma queda, se não trincou',
    resumo: 'O capacete caiu ou bateu, parece inteiro, então segue valendo.',
    unidadeDurab: 'horas', durabRotulo: 'Proteção que ainda sobra', horizonte: 8760, horizonteTxt: '1 ano',
    fatores: { A: 0.25, M: 0.30, C: 0.30 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.55, colateral: 0.20 },
    durabNominal: 4000, custoGambiarra: 0, custoCorreto: 250, danoColateral: 5000,
    ficha: [
      ['Segundo a fonte', 'o capacete deve ser trocado após qualquer choque, mesmo sem dano visível'],
      ['Queda simples', 'até cair do braço da moto ou de uma mesa pode danificá-lo'],
      ['Validade', 'o Inmetro não fixa validade; fabricantes recomendam trocar a cada 3 ou 5 anos'],
      ['Multa', 'avaria que torne a proteção inútil: R$ 293,47 e suspensão imediata da CNH (valor citado na fonte)']
    ],
    estresse: {
      variavel: 'Energia do próximo impacto', unidade: '% do que o capacete novo absorve', de: 0, ate: 100, falhaEm: 55,
      passos: [
        { a: 20, t: 'Um tombo leve: o capacete que já levou impacto ainda parece dar conta.' },
        { a: 40, t: 'A espuma já comprimida absorve menos que a de um capacete novo.' }
      ],
      falha: 'A proteção que sobrava não foi suficiente. Você não tem como saber isso olhando por fora.', ok: ''
    },
    veredito: [
      'A parte que protege a cabeça é a <b>espuma interna</b>, que se comprime para absorver a energia da batida. Depois de um impacto, ela pode ter perdido essa capacidade mesmo que a casca esteja intacta.',
      'A fonte é direta: troque após <b>qualquer choque</b>, mesmo sem dano visível. O que não dá para ver a olho é justamente o que decide o resultado no próximo tombo.',
      'Capacete é item de segurança que não se improvisa. Já a validade não é fixada por lei: o Inmetro não estabelece prazo, mas os fabricantes costumam recomendar a troca a cada 3 ou 5 anos.'
    ],
    fontes: [{ t: 'Motonline: validade do capacete', u: 'https://motonline.com.br/noticia/capacete-de-moto-validade-quando-e-preciso-trocar/' }]
  },

  /* ---------------- HIDRÁULICA ---------------- */
  {
    id: 'fita-cano', categoria: 'Hidráulica',
    titulo: 'Fita adesiva comum no cano furado',
    resumo: 'Enrolar durex ou silver tape no cano que vaza, para "segurar até o encanador chegar".',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a fita soltar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.08, M: 0.15, C: 0.20 },
    riscos: { calor: 0, eletrico: 0.02, terceiros: 0.05, colateral: 0.45 },
    durabNominal: 48, custoGambiarra: 8, custoCorreto: 60, danoColateral: 1500,
    ficha: [
      ['Produto próprio', 'fita de silicone autofundente para reparo temporário de tubos'],
      ['Limite (fabricante)', 'resiste a até 4 bar e 90 °C, e é solução temporária'],
      ['Pressão da casa', 'cerca de 2 bar, segundo o mesmo fabricante'],
      ['Fita comum', 'não foi feita para segurar pressão de água']
    ],
    estresse: {
      variavel: 'Pressão na tubulação', unidade: '% da pressão normal da casa', de: 0, ate: 200, falhaEm: 30,
      passos: [
        { a: 10, t: 'Com pouca pressão a fita parece segurar. O vazamento diminui.' },
        { a: 20, t: 'A água começa a se infiltrar por baixo do adesivo.' }
      ],
      falha: 'A fita soltou: o jato volta e a água escorre para dentro da parede ou do forro.', ok: ''
    },
    veredito: [
      'Uma fita adesiva comum <b>não foi feita para segurar água sob pressão</b>. Ela pode parecer funcionar com o registro quase fechado, mas a pressão da linha se infiltra sob o adesivo.',
      'O dano maior costuma ser o que você não vê: água <b>escorrendo para dentro da parede</b> e causando infiltração e mofo. Esse prejuízo é maior que o do cano.',
      'Existe produto próprio para o improviso: fitas de silicone autofundentes (o fabricante cita até 4 bar e 90 °C), mas até elas são <b>solução temporária</b>. Feche o registro geral e chame um encanador.'
    ],
    fontes: [{ t: 'Henkel: reparação temporária de tubos', u: 'https://www.henkel.com/resource/blob/850686/0fe14b908d6d02b32e6e70dd150fa1e1/data/pr-fix-it-e-a-soluc-a-o-perfeita-para-reparac-o-es-tempora-rias-de-fugas-em-canos.pdf' }]
  },

  {
    id: 'agua-fervente-pvc', categoria: 'Hidráulica',
    titulo: 'Água fervendo no ralo para desentupir',
    resumo: 'Despejar uma chaleira de água fervendo na pia para derreter a gordura.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a gordura voltar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.40, M: 0.60, C: 0.35 },
    riscos: { calor: 0.25, eletrico: 0, terceiros: 0.10, colateral: 0.35 },
    durabNominal: 336, custoGambiarra: 2, custoCorreto: 40, danoColateral: 1200,
    ficha: [
      ['Segundo a fonte', 'o PVC tem baixa resistência térmica e ponto de amolecimento baixo'],
      ['Efeito repetido', 'as juntas podem perder a vedação e causar infiltração e vazamento'],
      ['Sinais de alerta', 'estalos nas paredes e manchas de umidade sob a pia'],
      ['Observação', 'a fonte não informa a temperatura-limite do PVC']
    ],
    estresse: {
      variavel: 'Despejos de água fervendo', unidade: 'vezes', de: 0, ate: 60, falhaEm: 40,
      passos: [
        { a: 1, t: 'A água quente derrete a gordura mole e a pia parece liberar.' },
        { a: 20, t: 'O calor repetido amolece o PVC e castiga as juntas.' }
      ],
      falha: 'Uma junta perdeu a vedação: a umidade aparece sob a pia e o vazamento fica escondido.', ok: ''
    },
    veredito: [
      'A lógica é boa: gordura <b>derrete com calor</b> e a água quente ajuda a soltar uma camada mole. Se o entupimento é só gordura recente, o efeito pode aparecer.',
      'O problema é o cano: a fonte aponta que o PVC tem <b>baixa resistência térmica</b> e que o calor repetido pode fazer as juntas perderem a vedação, com vazamento difícil de achar. Ela não informa a temperatura-limite, então não dá para apontar um número seguro.',
      'Alternativas mais seguras: <b>desentupidor manual</b> e limpeza do copo do sifão. E uma tela no ralo evita que o problema volte.'
    ],
    fontes: [{ t: 'Catraca Livre: ralo da cozinha e água fervendo no PVC', u: 'https://catracalivre.com.br/noticias/por-que-o-ralo-da-cozinha-nao-deve-receber-agua-fervendo-principalmente-se-a-tubulacao-for-de-pvc/' }]
  },

  {
    id: 'bicarbonato-vinagre-pia', categoria: 'Hidráulica',
    titulo: 'Bicarbonato com vinagre para desentupir a pia',
    resumo: 'A espuma "vulcão" que viralizou como desentupidor natural.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o entupimento voltar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.25, M: 0.30, C: 0.45 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.03, colateral: 0.08 },
    durabNominal: 168, custoGambiarra: 8, custoCorreto: 40, danoColateral: 300,
    ficha: [
      ['Química (raciocínio meu)', 'bicarbonato é base e vinagre é ácido: reagem entre si e soltam gás CO₂'],
      ['Onde ajuda', 'gordura leve, resíduo nas paredes e mau cheiro'],
      ['Evidência', 'os textos populares consultados afirmam a eficácia sem apresentar testes'],
      ['Se não resolver', 'desentupidor manual e limpeza física do sifão']
    ],
    estresse: {
      variavel: 'Quanto do cano está obstruído', unidade: '% do cano', de: 0, ate: 100, falhaEm: 55,
      passos: [
        { a: 20, t: 'Gordura fina e cheiro: a espuma ajuda a soltar um pouco.' },
        { a: 45, t: 'Com mais acúmulo, a espuma passa por cima e não move o que está preso.' }
      ],
      falha: 'O tampão continua lá. É hora do desentupidor manual ou de abrir o sifão.', ok: ''
    },
    veredito: [
      'A mistura <b>faz espuma</b>, e isso dá a sensação de que "trabalhou". Mas a reação gasta o ácido e a base uma contra a outra (raciocínio químico meu: sobram basicamente água, um sal e gás), e a espuma não tem força para mover um tampão sólido.',
      'Para <b>gordura leve e mau cheiro</b>, é inofensivo e pode ajudar. Os textos populares consultados dão eficácia como certa, mas sem testes que a demonstrem.',
      'Se a água não baixa, o mais confiável é o <b>desentupidor manual</b> e a limpeza do sifão. É barato, sem química e resolve o que a espuma não resolve.'
    ],
    fontes: [
      { t: 'Olhar Digital: desentupir a pia', u: 'https://olhardigital.com.br/curiosidades/?p=26910' },
      { t: 'Catraca Livre: ralo e água fervendo no PVC', u: 'https://catracalivre.com.br/noticias/por-que-o-ralo-da-cozinha-nao-deve-receber-agua-fervendo-principalmente-se-a-tubulacao-for-de-pvc/' }
    ]
  },

  {
    id: 'soda-caustica-pia', categoria: 'Hidráulica',
    titulo: 'Soda cáustica para desentupir o cano',
    resumo: 'Despejar soda no ralo para dissolver a gordura de vez.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o entupimento voltar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.35, M: 0.50, C: 0.15 },
    riscos: { calor: 0.30, eletrico: 0, terceiros: 0.35, colateral: 0.40 },
    durabNominal: 720, custoGambiarra: 12, custoCorreto: 60, danoColateral: 3000,
    ficha: [
      ['Efeito esperado', 'a gordura reage e forma uma massa tipo sabão, que pode endurecer ao esfriar (fonte)'],
      ['Calor', 'a reação pode esquentar e deformar PVC e dissolver vedações (fonte, sem testes citados)'],
      ['Saúde', 'risco de queimaduras na pele, lesão nos olhos e vapores irritantes'],
      ['Alternativa', 'desentupidor manual e limpeza do sifão']
    ],
    estresse: {
      variavel: 'Quantidade de soda no ralo', unidade: '% da dose do rótulo', de: 0, ate: 200, falhaEm: 110,
      passos: [
        { a: 50, t: 'Dose baixa: a gordura reage e o cano esquenta.' },
        { a: 100, t: 'Dose do rótulo: a massa de sabão pode endurecer mais adiante e fechar a passagem.' }
      ],
      falha: 'O calor e a corrosão passaram do que juntas e vedações aguentam: o vazamento se esconde na parede.', ok: ''
    },
    veredito: [
      'A soda <b>reage com a gordura</b> e pode abrir caminho, por isso o hábito é tão comum. Mas a massa de sabão que se forma pode endurecer quando esfria, e o cano volta a fechar mais adiante.',
      'O custo vem do <b>calor da reação e da corrosão</b>: segundo as fontes, ela pode deformar PVC, dissolver vedações de borracha e causar vazamentos que só aparecem depois. As fontes não apresentam testes que quantifiquem isso.',
      'Há também o risco para quem aplica: <b>queimaduras</b> na pele, nos olhos e vapores. Para a maioria das casas, o desentupidor manual e o sifão limpo resolvem sem esse risco.'
    ],
    fontes: [
      { t: 'Estado de Minas: o erro na limpeza da pia', u: 'https://www.em.com.br/emfoco/2026/06/11/o-erro-na-limpeza-da-pia-que-muitos-fazem-e-acaba-gerando-vazamentos-caros-em-casa/' },
      { t: 'Olhar Digital: desentupir a pia', u: 'https://olhardigital.com.br/curiosidades/?p=26910' }
    ]
  },

  /* ---------------- QUINTAL E JARDIM ---------------- */
  {
    id: 'sal-mata-mato', categoria: 'Quintal e jardim',
    titulo: 'Sal para matar o mato do quintal',
    resumo: 'Espalhar sal (ou calda de sal) nas ervas daninhas em vez de comprar herbicida.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o mato voltar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.35, M: 0.55, C: 0.35 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.05, colateral: 0.25 },
    durabNominal: 336, custoGambiarra: 5, custoCorreto: 40, danoColateral: 800,
    ficha: [
      ['Receita da fonte', '1 parte de sal para 8 de água quente, com detergente neutro, só nas folhas'],
      ['Solo', 'a fonte avisa que o sal pode prejudicar o solo e manda limitar à folha'],
      ['Plantas vizinhas', 'cobrir as que não devem morrer'],
      ['Raízes', 'a fonte não diz se a calda atinge as raízes']
    ],
    estresse: {
      variavel: 'Sal acumulado no mesmo canteiro', unidade: 'aplicações', de: 0, ate: 10, falhaEm: 4,
      passos: [
        { a: 1, t: 'Num dia de sol, as folhas murcham em poucas horas.' },
        { a: 2, t: 'O sal da calda vai ficando no chão a cada aplicação.' }
      ],
      falha: 'O solo acumulou sal demais e passou a prejudicar também as plantas que você quer manter.', ok: ''
    },
    veredito: [
      'O sal <b>seca as folhas</b> em que é aplicado, e por isso parece funcionar: num dia de sol, o mato murcha em poucas horas.',
      'O problema é o que fica no chão: a fonte avisa que o sal pode <b>prejudicar o solo</b> e recomenda aplicar só nas folhas e cobrir as plantas vizinhas. Ela também não diz se a calda atinge as raízes, então não dá para afirmar que o mato não rebrota.',
      'Para um canteiro que você quer manter, é arriscado repetir. A capina na raiz e a cobertura do solo (palha) resolvem sem acumular sal.'
    ],
    fontes: [{ t: 'eCycle: herbicida caseiro', u: 'https://www.ecycle.com.br/herbicida-caseiro/' }]
  },

  {
    id: 'gelo-orquidea', categoria: 'Quintal e jardim',
    titulo: 'Regar a orquídea com cubos de gelo',
    resumo: 'Dois ou três cubos de gelo por semana no vaso da Phalaenopsis.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a planta dar sinais de problema', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.55, M: 0.45, C: 0.55 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.15 },
    durabNominal: 6000, custoGambiarra: 2, custoCorreto: 25, danoColateral: 120,
    ficha: [
      ['Preocupação da fonte', 'choque térmico nas raízes sensíveis, sobretudo em espécies tropicais e regiões frias'],
      ['Dose citada', '2 a 3 cubos padrão para Phalaenopsis em vaso pequeno'],
      ['Como usar', 'sobre o substrato, longe do caule e das raízes aparentes'],
      ['Evidência', 'a fonte cita testes controlados sem identificá-los; trate como indício, não prova']
    ],
    estresse: {
      variavel: 'Cubos de gelo por rega', unidade: 'cubos', de: 0, ate: 8, falhaEm: 5,
      passos: [
        { a: 2, t: 'Dentro da faixa sugerida pela fonte: nenhum sinal de problema.' },
        { a: 4, t: 'Mais gelo concentra frio sobre as raízes.' }
      ],
      falha: 'Manchas e folhas amareladas: sinal para suspender o método, segundo os alertas da fonte.', ok: ''
    },
    veredito: [
      'Este não é um mito claro. A fonte aponta o risco de <b>choque térmico</b> nas raízes, mas também diz que testes em condições controladas sugerem que muitas orquídeas se adaptam a <b>poucos cubos</b> e uso moderado, desde que estejam saudáveis.',
      'Tem um detalhe de honestidade: a fonte não identifica quais testes cita. Por isso trato como <b>indício</b>, não como prova, e o resultado fica em "com ressalvas".',
      'Se for usar, fique em <b>2 a 3 cubos</b> em vaso pequeno, sobre o substrato, e pare se aparecerem manchas, folhas amareladas ou raízes escuras. Plantas debilitadas ou espécies sensíveis ao frio ficam fora do método.'
    ],
    fontes: [{ t: 'Catraca Livre: regar orquídeas com gelo', u: 'https://catracalivre.com.br/noticias/regar-orquideas-com-gelo-funciona-mesmo-especialistas-explicam-quando-a-pratica-pode-fazer-sentido/' }]
  },

  {
    id: 'areia-prato-vaso', categoria: 'Quintal e jardim',
    titulo: 'Areia no prato do vaso contra a dengue',
    resumo: 'Encher o pratinho do vaso com areia para o mosquito não ter onde botar ovos.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até refazer a rotina', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.85, M: 0.85, C: 0.70 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.02, colateral: 0.05 },
    durabNominal: 6000, custoGambiarra: 3, custoCorreto: 30, danoColateral: 100,
    ficha: [
      ['Orientação citada', 'areia grossa até a borda dos suportes de pratos e vasos (guia da Secretaria da Saúde de SP)'],
      ['Rotina', 'trocar a água ao menos 2 vezes por semana e escovar as paredes de pratos e vasos'],
      ['Alternativas', 'eliminar o prato ou usar sem espaço sobrando; vedar a boca do vaso'],
      ['Bromélias', 'acumulam água; regar 2 vezes por semana com mangueira sob pressão']
    ],
    estresse: {
      variavel: 'Dias seguidos de chuva', unidade: 'dias', de: 0, ate: 14, falhaEm: null,
      passos: [
        { a: 3, t: 'A água da chuva entra na areia e não forma poça aberta no prato.' },
        { a: 8, t: 'Se a areia encharcar, escorra a água e lave: a fonte pede limpeza duas vezes por semana.' }
      ],
      falha: '', ok: 'Sem água livre à vista, o prato deixa de servir de criadouro, desde que a rotina de limpeza continue.'
    },
    veredito: [
      'Esta gambiarra <b>funciona</b>: a orientação vem de um guia da Secretaria da Saúde de São Paulo. A areia grossa preenche o prato até a borda e tira o espaço onde a água ficaria parada.',
      'Ela não elimina a rotina: a mesma fonte pede <b>trocar a água duas vezes por semana</b> e escovar as paredes de pratos e vasos. A areia ajuda, mas não substitui o cuidado.',
      'Se possível, melhor ainda é <b>eliminar o prato</b> ou deixar o vaso sem espaço sobrando, e vedar a boca do vaso quando não for usado.'
    ],
    fontes: [{ t: 'Câmara Municipal de São Paulo: pratos e vasos e o mosquito da dengue', u: 'https://www.saopaulo.sp.leg.br/blog/pratos-e-vasos-de-planta-servem-de-criadouro-para-o-mosquito-da-dengue-conheca-medidas-para-combater-a-doenca/' }]
  },

  {
    id: 'extensao-emendada-quintal', categoria: 'Quintal e jardim',
    titulo: 'Extensão emendada com fita isolante no quintal',
    resumo: 'Emendar fios de extensão para ligar bomba, iluminação ou ferramenta ao ar livre.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a emenda falhar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.10, M: 0.30, C: 0.10 },
    riscos: { calor: 0.15, eletrico: 0.45, terceiros: 0.35, colateral: 0.25 },
    durabNominal: 300, custoGambiarra: 8, custoCorreto: 90, danoColateral: 6000,
    ficha: [
      ['Corpo de Bombeiros', 'não usar fios descascados ou estragados e não fazer ligações provisórias'],
      ['Fonte consultada', 'não trata de áreas externas; a parte da água é raciocínio físico meu'],
      ['Emenda', 'ponto de contato frágil, onde o calor e a umidade se concentram'],
      ['Solução', 'extensão própria para uso externo e, no circuito, DR (a fonte não cita o DR)']
    ],
    estresse: {
      variavel: 'Horas de chuva sobre a emenda', unidade: 'horas', de: 0, ate: 12, falhaEm: 3,
      passos: [
        { a: 1, t: 'Garoa fina: a fita isolante ainda segura por fora.' },
        { a: 2, t: 'A água começa a entrar pelas dobras da fita.' }
      ],
      falha: 'Água na emenda: fuga de corrente e faísca, com risco de choque em quem toca no cabo ou no chão molhado.', ok: ''
    },
    veredito: [
      'Uma emenda é o <b>ponto mais fraco</b> do fio: o contato é pior que o do fio inteiro, aquece mais e a fita isolante só cobre por fora. O Corpo de Bombeiros orienta a não usar fios descascados e a não fazer ligações provisórias.',
      'Ao ar livre há um agravante, raciocínio meu, não da fonte: a <b>água</b>. A umidade entra pelas dobras da fita, e eletricidade, água e pessoa descalça é a combinação que mais causa acidente grave.',
      'O certo é uma extensão <b>própria para uso externo</b>, sem emendas, e, no circuito, um DR. A fonte consultada não cita o DR, mas ele é a proteção que desliga o circuito quando há fuga de corrente.'
    ],
    fontes: [{ t: 'Idec: dicas do Corpo de Bombeiros', u: 'https://idec.org.br/consultas/dicas-e-direitos/conheca-dicas-do-corpo-de-bombeiros-para-as-instalacoes-eletricas' }]
  },

  /* ---------------- OFICINA E FERRAMENTAS ---------------- */
  {
    id: 'cano-chave-roda', categoria: 'Oficina e ferramentas',
    titulo: 'Cano como extensão da chave de roda',
    resumo: 'Encaixar um cano no cabo da chave de roda para "fazer mais força".',
    unidadeDurab: 'km', durabRotulo: 'Km até o parafuso cobrar a conta', horizonte: 10000, horizonteTxt: '10.000 km (cerca de 6 meses)',
    fatores: { A: 0.40, M: 0.65, C: 0.30 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.15, colateral: 0.30 },
    durabNominal: 15000, custoGambiarra: 15, custoCorreto: 150, danoColateral: 1200,
    ficha: [
      ['Física (raciocínio meu)', 'torque = força × braço; o cano alonga o braço e multiplica o aperto'],
      ['Aperto demais (fonte)', 'pode deformar ou romper discos e esticar ou romper os parafusos'],
      ['Aperto de menos (fonte)', 'os parafusos podem afrouxar'],
      ['Jeito certo (fonte)', 'torque do fabricante, com chave dinamométrica e aperto em estrela']
    ],
    estresse: {
      variavel: 'Torque aplicado', unidade: '% do torque especificado', de: 0, ate: 250, falhaEm: 150,
      passos: [
        { a: 80, t: 'Abaixo do valor: o parafuso pode afrouxar com o tempo.' },
        { a: 100, t: 'No torque especificado pelo fabricante: tudo certo.' },
        { a: 130, t: 'Acima do valor: parafusos esticam e os discos podem deformar.' }
      ],
      falha: 'Parafuso alongado, rosca espanada ou disco deformado, e dor de cabeça na hora de trocar um pneu furado.', ok: ''
    },
    veredito: [
      'O cano funciona porque alonga o braço da alavanca: <b>torque é força vezes distância</b>. O problema é que ele tira o controle de quanto você está apertando.',
      'A fonte (Brembo) lembra que apertar demais pode <b>deformar ou romper discos</b> e esticar ou romper parafusos, e que dificulta a remoção em um pneu furado. Apertar de menos também é ruim: o parafuso pode afrouxar.',
      'Para <b>soltar</b> uma porca emperrada, o cano pode ajudar. Para <b>apertar</b>, o certo é seguir o torque do manual do veículo, com chave dinamométrica e aperto em estrela.'
    ],
    fontes: [{ t: 'Brembo: binários de aperto', u: 'https://www.bremboparts.com/europe/pt/suporte/montagem-e-manutenção/binários-de-aperto-198994' }]
  },

  {
    id: 'chave-fenda-alavanca', categoria: 'Oficina e ferramentas',
    titulo: 'Chave de fenda como alavanca ou cinzel',
    resumo: 'Usar a chave de fenda para abrir lata, forçar tampa ou raspar tinta.',
    unidadeDurab: 'horas', durabRotulo: 'Uso até a ponta quebrar ou entortar', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.30, M: 0.55, C: 0.30 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.35, colateral: 0.20 },
    durabNominal: 100, custoGambiarra: 1, custoCorreto: 25, danoColateral: 400,
    ficha: [
      ['Segundo a fonte', 'a chave de fenda não deve ser usada como alavanca ou ferramenta de bater'],
      ['Motivo', 'o uso incorreto pode quebrá-la ou causar ferimento'],
      ['Regra geral', 'usar a ferramenta como ela foi projetada e a certa para cada trabalho'],
      ['Observação', 'a fonte não menciona o cinzel; a extensão é minha']
    ],
    estresse: {
      variavel: 'Força na alavanca', unidade: '% do que a chave suporta', de: 0, ate: 200, falhaEm: 100,
      passos: [
        { a: 50, t: 'Só para soltar uma tampa leve: a chave aguenta.' },
        { a: 80, t: 'A haste começa a entortar e a ponta a se deformar.' }
      ],
      falha: 'A ponta lascou ou a haste dobrou, e a chave pode escapar na direção da sua mão.', ok: ''
    },
    veredito: [
      'A chave de fenda é feita para <b>girar parafuso</b>. A haste e a ponta não foram projetadas para aguentar alavanca ou pancada, e a fonte diz que o uso incorreto pode <b>quebrá-la ou causar ferimento</b>.',
      'O perigo costuma ser o escape: ao forçar, a ponta pode lascar ou sair da fresta, e a mão acompanha o movimento (raciocínio meu, a fonte só cita o risco de quebrar ou ferir).',
      'O conserto é barato: um <b>abridor de latas</b>, um formão ou uma espátula custam menos que um corte, e a chave de fenda fica inteira.'
    ],
    fontes: [{ t: 'UFV: dicas sobre ferramentas (segurança do trabalho)', u: 'https://www.segurancadotrabalho.ufv.br/wp-content/uploads/2022/01/dss29_dicas-sobre-ferramentas.pdf' }]
  },
  {
    id: 'pino-terra-cortado', categoria: 'Oficina e ferramentas',
    titulo: 'Cortar o pino terra do plugue para caber em tomada velha',
    resumo: 'A furadeira tem 3 pinos e a tomada só 2 furos: corta o pino do meio e liga.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o risco aparecer', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.20, M: 0.55, C: 0.35 },
    riscos: { calor: 0, eletrico: 0.45, terceiros: 0.25, colateral: 0.15 },
    durabNominal: 8760, custoGambiarra: 3, custoCorreto: 40, danoColateral: 7000,
    ficha: [
      ['Função do terra (fonte)', 'leva a corrente de uma falha de isolação para o chão, protegendo quem usa o aparelho'],
      ['Aparelhos de 2 pinos (fonte)', 'usam dupla isolação, outro tipo de proteção'],
      ['Sem o terceiro pino', 'a fonte não trata do corte; a conclusão decorre da função descrita'],
      ['Se o aparelho tem 3 pinos', 'foi projetado para contar com o terra']
    ],
    estresse: {
      variavel: 'Falha na isolação do aparelho', unidade: '% de falha', de: 0, ate: 100, falhaEm: 20,
      passos: [
        { a: 5, t: 'Sem falha, o aparelho funciona normal e parece que o pino não fazia diferença.' },
        { a: 15, t: 'A carcaça metálica começa a "pegar" tensão.' }
      ],
      falha: 'Sem o terra, a corrente da falha passa por quem segura o aparelho. É para isso que o pino existe.', ok: ''
    },
    veredito: [
      'O aparelho <b>funciona</b> sem o pino terra, e é por isso que a prática parece inofensiva. O terceiro pino só faz diferença quando algo dá errado.',
      'Quando a isolação falha, o terra dá à corrente um caminho seguro até o chão. Sem ele, o caminho pode ser <b>você</b>. A fonte descreve essa função, mas não trata do corte; a conclusão decorre diretamente dela.',
      'Se a tomada é de 2 furos, o certo é <b>trocá-la por uma de 3 pinos</b> com fio terra de verdade (um eletricista resolve) ou usar aparelho de dupla isolação, que não depende do terra.'
    ],
    fontes: [{ t: 'Canaltech: por que a tomada brasileira tem três pinos', u: 'https://canaltech.com.br/produtos/por-que-o-padrao-de-tomada-do-brasil-tem-tres-pinos/' }]
  }
);
