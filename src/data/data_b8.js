/* ============================================================
   LOTE 5 — MITOS DE COZINHA, CASA E CELULAR (tom leve)
   Os números são estimativas do modelo; a ficha e o veredito citam o que a fonte afirma
   e sinalizam o que é raciocínio próprio ("observação do projeto").
   Itens com risco real têm aviso em data_perigo.js.
   ============================================================ */
CENARIOS.push(

  /* ---------------- CASA E REPAROS ---------------- */
  {
    id: 'ar-condicionado-16', categoria: 'Casa e reparos',
    titulo: 'Ar-condicionado no 16 °C para gelar mais rápido',
    resumo: 'Chegar em casa suando e jogar o controle no mínimo, como se o frio saísse mais forte.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo de frio a mais que você ganha', horizonte: 168, horizonteTxt: '1 semana',
    fatores: { A: 0.08, M: 0.40, C: 0.35 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.15 },
    durabNominal: 2, custoGambiarra: 2, custoCorreto: 0, danoColateral: 150,
    ficha: [
      ['Segundo a fonte', 'a temperatura do controle funciona como meta para o ambiente; colocar no mínimo não faz o ambiente gelar mais rápido'],
      ['Efeito colateral', 'quanto mais baixa a meta, mais tempo o compressor tende a ficar ligado, com mais consumo de energia (o percentual depende do modelo, do clima e do isolamento)'],
      ['Faixa citada', '23 a 24 °C, atribuída pela matéria a "referências técnicas", sem identificar quais'],
      ['Evidência', 'reportagem que cita a Embrapa por paráfrase, sem medição própria; o tempo de frio extra é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Minutos com o ar no mínimo (16 °C)', unidade: 'min', de: 0, ate: 60, falhaEm: 30,
      passos: [
        { a: 5, t: 'O ar sopra na mesma força de sempre: o controle só define até onde ele tenta chegar.' },
        { a: 15, t: 'O ambiente ainda está longe de 16 °C e o compressor segue trabalhando sem folga.' }
      ],
      falha: 'Meia hora depois, o ambiente não ficou pronto antes do vizinho que ajustou em 23 °C, e a conta de luz já tomou nota.', ok: ''
    },
    veredito: [
      'Este é um <b>clássico de verão</b>: baixar o controle para o mínimo não faz o ar-condicionado gelar mais rápido. A matéria explica que a temperatura do controle é uma <b>meta</b>, não um botão de intensidade.',
      'O efeito prático é outro: com a meta lá embaixo, o compressor tende a ficar <b>mais tempo ligado</b>, e isso pesa na conta de luz. A matéria não dá um percentual único, porque ele depende do aparelho, do clima e do isolamento da casa.',
      'O que ajuda de verdade, segundo a fonte, é ajustar entre 23 e 24 °C e fechar portas e janelas. Dica de boteco: o frio sai na mesma velocidade, só a sua ansiedade é que acelera.'
    ],
    fontes: [
      { t: 'Canaltech: qual é o limite da temperatura do ar-condicionado', u: 'https://canaltech.com.br/eletro/qual-e-o-limite-da-temperatura-do-ar-condicionado-entenda-porque-ele-nao-gela-mais' },
      { t: 'Catraca Livre: o erro de colocar o ar-condicionado em 16 graus', u: 'https://catracalivre.com.br/noticias/o-erro-de-colocar-o-ar-condicionado-em-dezesseis-graus-que-dobra-o-valor-do-seu-boleto/' }
    ]
  },

  {
    id: 'fogao-aquecer-casa', categoria: 'Casa e reparos',
    titulo: 'Ligar o fogão ou o forno a gás para esquentar a casa',
    resumo: 'Noite gelada, abrir a porta do forno e deixar ligado "só pra tirar o frio".',
    unidadeDurab: 'horas', durabRotulo: 'Tempo de calor antes do problema', horizonte: 24, horizonteTxt: '1 dia',
    fatores: { A: 0.60, M: 0.50, C: 0.30 },
    riscos: { calor: 0.30, eletrico: 0, terceiros: 0.45, colateral: 0.30 },
    durabNominal: 3, custoGambiarra: 10, custoCorreto: 100, danoColateral: 5000,
    ficha: [
      ['Segundo a fonte (CDC)', 'usar um forno a gás para aquecer a casa expõe a família ao risco de intoxicação por monóxido de carbono; a recomendação é não fazer isso'],
      ['Folheto do CDC (2005)', 'orienta nunca usar fogão ou forno a gás para aquecer a casa, nem churrasqueira ou braseiro dentro de casa'],
      ['Bombeiros (reportagem)', 'fogueira dentro de casa para aquecer é extremamente perigosa; sem ventilação, o monóxido se acumula e é inalado sem perceber'],
      ['Evidência', 'fontes oficiais de saúde e de bombeiros; os tempos do teste são ilustração do modelo']
    ],
    estresse: {
      variavel: 'Horas com o fogão ligado, janelas fechadas', unidade: 'h', de: 0, ate: 6, falhaEm: 2,
      passos: [
        { a: 0.5, t: 'A cozinha esquenta mesmo, e parece uma ótima ideia.' },
        { a: 1, t: 'O ar do ambiente vai sendo trocado por gases da queima, sem cor de alerta nenhuma.' }
      ],
      falha: 'Sem ventilação, o monóxido de carbono se acumula e a pessoa o inala sem perceber: risco de intoxicação grave.', ok: ''
    },
    veredito: [
      'O fogão <b>esquenta</b>, e é por isso que a ideia é tão tentadora no inverno. O problema é o que sai junto do calor: o CDC afirma que usar um forno a gás para aquecer a casa expõe a família ao <b>risco de intoxicação por monóxido de carbono</b>.',
      'O gás não avisa: a matéria dos bombeiros diz que, sem ventilação, ele se acumula e a pessoa o <b>inala sem perceber</b>. Por isso este item leva o carimbo máximo, independentemente do quanto "funcione".',
      'Para o frio, a saída é roupa, cobertor e fechar frestas. Se precisar de aquecedor, que seja um aparelho feito para isso, instalado e ventilado conforme o fabricante.'
    ],
    fontes: [
      { t: 'CDC: Don\'t Heat Your Home with a Gas Oven', u: 'https://www.cdc.gov/natural-disasters/psa-toolkit/dont-heat-your-home-with-a-gas-oven.html' },
      { t: 'CDC: ficha informativa sobre o envenenamento por monóxido de carbono (2005)', u: 'https://stacks.cdc.gov/view/cdc/47932/cdc_47932_DS1.pdf' },
      { t: 'Tribuna do Paraná: gambiarra para se aquecer é perigosa e pode gerar morte', u: 'https://www.tribunapr.com.br/noticias/parana/gambiarra-para-se-aquecer-e-perigosa-e-pode-gerar-morte/amp/' }
    ]
  },

  {
    id: 'lapis-ziper', categoria: 'Casa e reparos',
    titulo: 'Lápis no zíper emperrado',
    resumo: 'O zíper da mochila travou e você lembra que o grafite do lápis é lubrificante.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até travar de novo', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.65, M: 0.85, C: 0.65 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.04 },
    durabNominal: 720, custoGambiarra: 0, custoCorreto: 30, danoColateral: 40,
    ficha: [
      ['Segundo a fonte', 'esfregar a ponta de um lápis grafite bem apontado nos dentes do zíper, dos dois lados da trava, e mover o cursor de leve para espalhar o pó'],
      ['Por que, segundo a fonte', 'o grafite age como lubrificante seco e não deixa mancha de gordura, ao contrário do óleo de cozinha'],
      ['Ressalvas', 'não forçar o cursor (pode rasgar a fita ou quebrar o puxador); se continuar travado, pode haver dentes tortos ou fios presos'],
      ['Evidência', 'reportagem baseada em vídeo de rede social, sem teste independente; a duração é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Passadas de lápis nos dentes', unidade: 'passadas', de: 0, ate: 20, falhaEm: 15,
      passos: [
        { a: 3, t: 'O grafite entra nas irregularidades e passa a agir como lubrificante seco.' },
        { a: 8, t: 'O cursor começa a deslizar. A fonte pede para não forçar.' }
      ],
      falha: 'Zíper com dente torto ou fio preso: o lápis não conserta peça quebrada, e a costureira agradece a visita.', ok: ''
    },
    veredito: [
      'O lápis no zíper é uma <b>gambiarra de bolso</b> com lógica: o grafite é um lubrificante seco, e a matéria diz que ele destrava sem sujar a roupa como o óleo de cozinha faria.',
      'A prova é fraca, e é bom saber: a matéria se apoia em um <b>vídeo de rede social</b>, sem teste independente. Por isso o carimbo é de ressalvas e não de aprovação.',
      'A regra de ouro da própria fonte é não forçar o cursor. Se não destravar, o problema é mecânico (dente torto, fio preso) e o lápis não resolve.'
    ],
    fontes: [{ t: 'Catraca Livre: como consertar zíper emperrado usando só um lápis', u: 'https://catracalivre.com.br/noticias/como-consertar-ziper-emperrado-usando-so-um-lapis-de-escrever/' }]
  },

  /* ---------------- COZINHA E LIMPEZA ---------------- */
  {
    id: 'cerveja-sal-gelo', categoria: 'Cozinha e limpeza',
    titulo: 'Gelo, água e sal para gelar a cerveja rápido',
    resumo: 'A cerveja está quente e a visita já chegou: baldinho com gelo, água e uma pitada generosa de sal.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo que a cerveja segue gelada', horizonte: 6, horizonteTxt: '1 tarde',
    fatores: { A: 0.90, M: 0.85, C: 0.80 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.02 },
    durabNominal: 1, custoGambiarra: 1, custoCorreto: 12, danoColateral: 20,
    ficha: [
      ['Segundo a fonte', 'colocar as latas ou garrafas numa mistura de gelo, água e cerca de 2 colheres de sopa de sal, em um recipiente grande'],
      ['Por que, segundo a fonte', 'o sal reduz o ponto de congelamento da água, e a mistura fica mais fria que o gelo sozinho'],
      ['Tempo citado', 'perto de 0 °C em menos de 10 minutos (número da reportagem, sem medição divulgada)'],
      ['Evidência', 'explicação física correta e conhecida; o tempo vem de reportagem sem fonte, e a duração gelada é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Minutos na mistura de gelo, água e sal', unidade: 'min', de: 0, ate: 15, falhaEm: null,
      passos: [
        { a: 2, t: 'A mistura fica mais fria que o gelo sozinho e a lata começa a ceder calor.' },
        { a: 8, t: 'Segundo a fonte, a bebida já está perto de 0 °C em menos de 10 minutos.' }
      ],
      falha: '', ok: 'Cerveja no ponto, visita feliz, e a física leva o crédito.'
    },
    veredito: [
      'Aqui o boteco acertou: a mistura de <b>gelo, água e sal</b> funciona porque o sal baixa o ponto de congelamento da água, e a mistura fica mais fria que o gelo puro. A água ajuda porque encosta na lata inteira, o que o gelo solto no ar não faz (observação do projeto).',
      'A reportagem fala em perto de 0 °C em <b>menos de 10 minutos</b>. É número de matéria, sem medição divulgada, então trate como ordem de grandeza.',
      'Observação do projeto: a mistura fica abaixo de 0 °C, então vale não esquecer a lata lá dentro por tempo demais. Cronometre e tire quando estiver no ponto.'
    ],
    fontes: [{ t: 'TudoGostoso: como gelar a cerveja em menos de 15 minutos, 2 truques simples', u: 'https://www.tudogostoso.com.br/noticias/como-gelar-a-cerveja-em-menos-de-15-minutos-2-truques-simples-vao-te-ajudar-a-resfriar-a-bebida-bem-rapidinho-a19445.htm' }]
  },

  {
    id: 'cerveja-freezer', categoria: 'Cozinha e limpeza',
    titulo: 'Cerveja no freezer (e esquecer lá)',
    resumo: 'Colocar a garrafa no congelador "só uns minutinhos" e voltar à vida normal.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo antes de virar problema', horizonte: 6, horizonteTxt: '1 tarde',
    fatores: { A: 0.85, M: 0.60, C: 0.35 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.10, colateral: 0.45 },
    durabNominal: 2, custoGambiarra: 0, custoCorreto: 12, danoColateral: 60,
    ficha: [
      ['Segundo a fonte', 'enrolar a lata ou garrafa em papel-toalha ou pano úmido e colocar no freezer; a fonte indica de 10 a 15 minutos'],
      ['Aviso da fonte', 'a cerveja esquecida no congelador pode congelar e estourar; a fonte recomenda usar um timer'],
      ['Alternativa', 'mistura de gelo, água e sal, que também aparece na mesma reportagem'],
      ['Evidência', 'reportagem sem fonte externa; o tempo até estourar não é informado, e o valor do teste é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Minutos esquecida no freezer', unidade: 'min', de: 0, ate: 180, falhaEm: 120,
      passos: [
        { a: 15, t: 'Pelo relato da fonte, em 10 a 15 minutos a cerveja já está geladinha.' },
        { a: 60, t: 'Passou da hora: a água começa a congelar nas bordas da garrafa.' }
      ],
      falha: 'Congelou, expandiu e estourou: a cerveja virou pastilha e o freezer virou campo de cacos.', ok: ''
    },
    veredito: [
      'Gelar no freezer <b>funciona</b>: a própria reportagem fala em 10 a 15 minutos com a garrafa enrolada em papel-toalha úmido. O problema nunca foi gelar, e sim a memória de quem coloca e some.',
      'A fonte avisa que a cerveja esquecida pode <b>congelar e estourar</b>. O tempo exato não é informado e depende do freezer e da bebida, então o valor do teste aqui é só ilustração.',
      'Resumo de boteco: use um <b>alarme</b> e, se a visita for longa, prefira gelo, água e sal. Garrafa estourada no freezer ensina a lição pela via mais cara.'
    ],
    fontes: [{ t: 'TudoGostoso: como gelar a cerveja em menos de 15 minutos, 2 truques simples', u: 'https://www.tudogostoso.com.br/noticias/como-gelar-a-cerveja-em-menos-de-15-minutos-2-truques-simples-vao-te-ajudar-a-resfriar-a-bebida-bem-rapidinho-a19445.htm' }]
  },

  {
    id: 'colher-pau-panela', categoria: 'Cozinha e limpeza',
    titulo: 'Colher de pau na panela para não transbordar',
    resumo: 'A água do macarrão sobe, e a colher de pau atravessada na boca da panela promete segurar a espuma.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo de espuma sob controle', horizonte: 1, horizonteTxt: '1 hora',
    fatores: { A: 0.50, M: 0.80, C: 0.55 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.03, colateral: 0.05 },
    durabNominal: 0.5, custoGambiarra: 0, custoCorreto: 0, danoColateral: 50,
    ficha: [
      ['Segundo a fonte', 'a madeira seca quebra a continuidade da espuma formada pelo amido, e as bolhas estouram ao encostar na colher'],
      ['Onde vale', 'alimentos ricos em amido (macarrão, arroz, batata, lentilha), sobretudo em fogo alto, quando a espuma sobe rápido'],
      ['Ressalva da fonte', 'a explicação depende de a madeira estar seca; a matéria só cita de passagem um debate sobre segurança e higiene'],
      ['Evidência', 'reportagem sem estudo, especialista ou teste citado; a duração do efeito é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Minutos com fogo alto', unidade: 'min', de: 0, ate: 20, falhaEm: 12,
      passos: [
        { a: 3, t: 'A espuma sobe e esbarra na colher: as bolhas estouram e a água desce.' },
        { a: 8, t: 'A espuma volta a subir e a colher segue segurando, enquanto a madeira estiver seca.' }
      ],
      falha: 'Colher molhada e fogo alto: a espuma passa por cima e o amido escorre pelo fogão. Baixar o fogo resolve melhor.', ok: ''
    },
    veredito: [
      'A colher de pau é <b>o truque de vó mais exibido da internet</b>. A explicação da matéria é plausível: a madeira seca interrompe a espuma de amido, e as bolhas estouram ao encostar nela.',
      'Mas a fonte não traz teste nem especialista, e o próprio texto sugere que a colher precisa estar <b>seca</b>. Em fogo muito alto, a espuma costuma vencer a colher.',
      'O jeito mais simples e confiável é baixar um pouco o fogo e usar uma panela mais funda. A colher fica como um bônus charmoso.'
    ],
    fontes: [{ t: 'Gazeta SP: o truque da colher de madeira que impede a panela de transbordar', u: 'https://www.gazetasp.com.br/gazeta-mais/parece-magica-o-truque-da-colher-de-madeira-que-impede-a-panela-de/' }]
  },

  {
    id: 'sal-macarrao', categoria: 'Cozinha e limpeza',
    titulo: 'Sal na água para o macarrão ferver mais rápido',
    resumo: 'A tradição manda jogar sal na água para ela ferver (ou o macarrão cozinhar) mais depressa.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo que o sal faz você ganhar', horizonte: 1, horizonteTxt: '1 hora',
    fatores: { A: 0.05, M: 0.50, C: 0.35 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.02 },
    durabNominal: 0.1, custoGambiarra: 0, custoCorreto: 0, danoColateral: 5,
    ficha: [
      ['Segundo a fonte', 'não, o sal não faz a água ferver mais rápido: a matéria chama a ideia de "mais um mito do que uma verdade científica"'],
      ['Física, segundo a fonte', 'o sal sobe o ponto de ebulição, mas, na cozinha de casa, o efeito é mínimo: para passar de 100 para 101 °C seriam "cerca de 250 gramas de sal"'],
      ['Para que serve', 'dar sabor; salgar antes de cozinhar é "uma questão de preferência, não de necessidade"'],
      ['Evidência', 'reportagem sem estudo ou especialista citados; a matéria não trata do tempo de cozimento da massa']
    ],
    estresse: {
      variavel: 'Sal jogado na panela', unidade: 'g', de: 0, ate: 250, falhaEm: 30,
      passos: [
        { a: 5, t: 'Uma pitada: o ponto de ebulição mal se mexe, mas o tempero agradece.' },
        { a: 15, t: 'Uma colher de sopa: a água não ferve antes, e o macarrão já sai temperado.' }
      ],
      falha: 'Para a água ferver só 1 °C acima, seriam cerca de 250 g de sal (número da matéria), e a panela viraria salmoura.', ok: ''
    },
    veredito: [
      'Sobre ferver mais rápido: <b>mito</b>. A matéria é direta e diz que o efeito do sal no ponto de ebulição, na cozinha de casa, é mínimo: seriam cerca de 250 g para subir 1 °C.',
      'Sobre o macarrão cozinhar mais depressa, a matéria <b>não diz nada</b>, então este item não afirma nem desmente esse ponto.',
      'O sal tem um trabalho honesto: <b>dar gosto</b>. Salgue sem culpa, só não espere cronometrar a vitória.'
    ],
    fontes: [{ t: 'Correio Braziliense: o mito sobre adicionar sal para cozinhar macarrão', u: 'https://www.correiobraziliense.com.br/cbradar/o-mito-que-voce-acreditou-sobre-adicionar-sal-para-cozinhar-macarrao/' }]
  },

  {
    id: 'batata-sopa-salgada', categoria: 'Cozinha e limpeza',
    titulo: 'Batata crua para tirar o sal da sopa',
    resumo: 'A sopa passou do sal, e a batata crua entra em cena como bombeiro salgado.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo de sopa corrigida', horizonte: 2, horizonteTxt: '2 horas',
    fatores: { A: 0.05, M: 0.45, C: 0.30 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.03 },
    durabNominal: 1, custoGambiarra: 1, custoCorreto: 0, danoColateral: 30,
    ficha: [
      ['Segundo a fonte', 'colocar batata na sopa salgada não funciona como correção; o que reduz o sal é diluir o preparo'],
      ['Por que, segundo a fonte', 'a batata absorve parte do caldo, com água e sal juntos, e não retira o sal de forma seletiva'],
      ['O que ajuda', 'aumentar o volume com água, caldo sem sal ou outros ingredientes, adicionando pouco de cada vez e provando'],
      ['Evidência', 'reportagem que cita o Exploratorium sem trazer dados; a duração do teste é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Minutos com a batata na sopa', unidade: 'min', de: 0, ate: 30, falhaEm: 10,
      passos: [
        { a: 3, t: 'A batata absorve caldo, com água e sal juntos: a sopa fica igualzinha.' }
      ],
      falha: 'Tirou a batata: ela levou só um pouco de caldo, e o sal na panela quase não mudou. Quem resolve é diluir.', ok: ''
    },
    veredito: [
      'A batata é <b>esponja de caldo</b>, não de sal. A matéria explica que ela absorve água e sal juntos, então a concentração que fica na panela quase não muda.',
      'O que realmente reduz o sal é <b>diluir</b>: mais água, caldo sem sal ou ingredientes sem tempero, aos poucos e provando. A fonte também alerta para não ferver demais, porque a evaporação concentra o sal.',
      'No fim, a batata só serve de lanche: ela sai salgada, o que dá a falsa sensação de trabalho feito.'
    ],
    fontes: [{ t: 'Catraca Livre: sopa salgada não é corrigida por uma batata', u: 'https://catracalivre.com.br/noticias/sopa-salgada-nao-e-corrigida-por-uma-batata-que-puxa-o-sal-diluicao-e-aumento-do-volume-sao-os-caminhos-que-realmente-reduzem-a-concentracao/' }]
  },

  {
    id: 'bicarbonato-geladeira', categoria: 'Cozinha e limpeza',
    titulo: 'Bicarbonato na geladeira para tirar o cheiro',
    resumo: 'Um potinho aberto de bicarbonato na prateleira, para a geladeira deixar de cheirar a geladeira.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o bicarbonato saturar', horizonte: 2160, horizonteTxt: '3 meses',
    fatores: { A: 0.60, M: 0.85, C: 0.60 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.02, colateral: 0.03 },
    durabNominal: 1440, custoGambiarra: 3, custoCorreto: 5, danoColateral: 50,
    ficha: [
      ['Segundo a fonte', 'um recipiente aberto com bicarbonato pode reduzir odores leves, sobretudo os de alimentos; a matéria diz que o truque "não faz milagres durante uma única noite"'],
      ['Ressalvas', 'não resolve a causa (embalagem vazando, alimento vencido), não conserva alimento nem indica segurança alimentar; caixa fechada no fundo da gaveta não absorve nada'],
      ['O que fazer antes', 'tirar a fonte do cheiro, limpar prateleiras, gavetas e borrachas; a matéria cita orientações do USDA e da FDA'],
      ['Evidência', 'reportagem que cita USDA e FDA; a duração até saturar é ilustração do modelo, e o bicarbonato usado por semanas não deve ir para receitas']
    ],
    estresse: {
      variavel: 'Horas com a caixa aberta na prateleira', unidade: 'h', de: 0, ate: 48, falhaEm: 24,
      passos: [
        { a: 8, t: 'Cheiro leve: a matéria diz que dá para notar melhora pela manhã.' }
      ],
      falha: 'Cheiro forte de comida estragada: segundo a fonte, ele pode persistir por muito mais tempo, e sem tirar a causa o bicarbonato não resolve.', ok: ''
    },
    veredito: [
      'O bicarbonato é <b>auxiliar</b>, não faxineiro. A matéria diz que ele pode reduzir odores leves, e que o truque não faz milagre em uma noite.',
      'O cheiro forte quase sempre tem <b>uma causa</b>: embalagem vazando, alimento vencido, líquido escorrido. A fonte (que cita USDA e FDA) manda tirar a fonte e limpar antes de qualquer potinho.',
      'E atenção: o bicarbonato que passou semanas absorvendo cheiro <b>não volta para as receitas</b>. Geladeira cheirosa não prova que a comida está segura.'
    ],
    fontes: [{ t: 'Correio Braziliense: bicarbonato de sódio na geladeira tira mau cheiro?', u: 'https://www.correiobraziliense.com.br/cbradar/bicarbonato-de-sodio-na-geladeira-tira-mau-cheiro-mitos/' }]
  },

  {
    id: 'esponja-microondas', categoria: 'Cozinha e limpeza',
    titulo: 'Esponja de cozinha no micro-ondas para desinfetar',
    resumo: 'Esponja molhada, um minuto no micro-ondas, e a certeza de ter esterilizado a vida.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a esponja se recolonizar', horizonte: 168, horizonteTxt: '1 semana',
    fatores: { A: 0.20, M: 0.50, C: 0.30 },
    riscos: { calor: 0.20, eletrico: 0, terceiros: 0, colateral: 0.10 },
    durabNominal: 24, custoGambiarra: 0, custoCorreto: 3, danoColateral: 100,
    ficha: [
      ['Segundo a fonte (NOVA/PBS)', 'pesquisadores alemães analisaram 14 esponjas e relataram que bactérias resistentes sobrevivem à limpeza e recolonizam rápido; as técnicas matavam no máximo 60% dos micróbios'],
      ['Sobre o micro-ondas', 'a matéria da NOVA diz que nem ele elimina todos os micróbios; a do TudoGostoso diz que só os mais fracos morrem, e as resistentes seguem'],
      ['Recomendação', 'trocar a esponja com frequência, de preferência a cada semana; as duas matérias concordam'],
      ['Evidência', 'estudo citado de forma indireta, sem nome do periódico; o risco de fogo não vem das fontes: é observação do projeto']
    ],
    estresse: {
      variavel: 'Segundos no micro-ondas', unidade: 's', de: 0, ate: 120, falhaEm: 90,
      passos: [
        { a: 30, t: 'A esponja molhada esquenta, e os micróbios mais fracos morrem.' },
        { a: 60, t: 'Um minuto é o tempo mais citado, mas as resistentes sobrevivem e recolonizam a esponja.' }
      ],
      falha: 'Mesmo com mais tempo, o micro-ondas não elimina todos: os resistentes ficam e a esponja volta a ser um pequeno condomínio.', ok: ''
    },
    veredito: [
      'Esse é o ritual de quem quer <b>sentir que limpou</b>. As fontes concordam em um ponto: o micro-ondas mata os micróbios mais fracos, mas as bactérias resistentes sobrevivem e a esponja volta a se encher rápido.',
      'Observação do projeto, que as fontes não trazem: esponja <b>seca</b> ou com fibra metálica no micro-ondas pode esquentar demais ou faiscar. Se for tentar, use só esponja sintética bem molhada e acompanhe.',
      'A recomendação das duas matérias é a que realmente funciona: <b>trocar a esponja toda semana</b>. Mais barato que a faxina de um micro-ondas torrado.'
    ],
    fontes: [
      { t: 'NOVA/PBS: microwaving your kitchen sponge won\'t save you from microbes', u: 'https://www.pbs.org/wgbh/nova/article/microwaving-your-kitchen-sponge-wont-save-you-from-microbes' },
      { t: 'TudoGostoso: por que não desinfetar as esponjas no micro-ondas', u: 'https://www.tudogostoso.com.br/noticias/nao-desinfetar-as-esponjas-no-micro-ondas-a3207.htm' }
    ]
  },

  {
    id: 'prata-aluminio', categoria: 'Cozinha e limpeza',
    titulo: 'Papel alumínio, bicarbonato e água quente para limpar prata',
    resumo: 'A prata da família escureceu, e a panela com papel alumínio promete devolver o brilho sem esfregar.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a prata escurecer de novo', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.82, M: 0.80, C: 0.60 },
    riscos: { calor: 0.10, eletrico: 0, terceiros: 0, colateral: 0.08 },
    durabNominal: 720, custoGambiarra: 1, custoCorreto: 25, danoColateral: 40,
    ficha: [
      ['Segundo a fonte', 'a reação do bicarbonato com o alumínio é "bem eficiente na retirada da oxidação da prata"; na limpeza pesada, usa-se água fervente, bicarbonato, sal e papel alumínio'],
      ['Ressalvas da fonte', 'usar apenas em peças de prata pura; peças delicadas ou antigas pedem cuidado; contar cerca de 30 segundos e não deixar muito tempo na água quente'],
      ['Observação do projeto', 'a fonte não explica o mecanismo; é uma reação química comum entre o alumínio e o escurecimento da prata'],
      ['Evidência', 'guia de limpeza doméstica, sem teste medido; a duração do brilho é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Minutos na água quente', unidade: 'min', de: 0, ate: 10, falhaEm: null,
      passos: [
        { a: 0.5, t: 'A fonte pede contar cerca de 30 segundos na água quente.' },
        { a: 3, t: 'A fonte avisa para não deixar a peça muito tempo na água quente.' }
      ],
      falha: '', ok: 'A mancha escura sai aos poucos e a peça volta a brilhar. Em peça de prata pura, e sem pressa de herdeiro.'
    },
    veredito: [
      'Esse é raro: <b>funciona</b>, e a fonte diz que a reação do bicarbonato com o alumínio é bem eficiente para tirar a oxidação da prata. Menos esfregão, mais panela.',
      'As ressalvas importam: a fonte limita o método a <b>peças de prata pura</b> e pede cuidado com as delicadas e antigas, além de não deixar a peça muito tempo na água quente. Água fervente também queima dedo, então use pegador.',
      'Se a peça for banhada, antiga ou tiver pedras, o risco de estragar sobe, e a regra é testar num canto ou perguntar a uma joalheria.'
    ],
    fontes: [{ t: 'eCycle: como limpar prata', u: 'https://www.ecycle.com.br/como-limpar-prata/' }]
  },

  /* ---------------- CELULAR ---------------- */
  {
    id: 'carregador-tomada', categoria: 'Celular',
    titulo: 'Tirar o carregador da tomada para economizar luz',
    resumo: 'O carregador ficou na parede sem o celular, e a culpa pela conta de luz já foi distribuída.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a economia render R$ 1', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.05, M: 0.70, C: 0.50 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.02 },
    durabNominal: 4320, custoGambiarra: 0, custoCorreto: 0, danoColateral: 20,
    ficha: [
      ['Consumo medido', 'em testes do How-To Geek, citados pelo Canaltech, carregadores ligados sem uso variaram de 0,1 a 0,3 W; o fabricante cita 0,02 W para carregadores da Samsung'],
      ['Conta feita pela matéria', 'com 0,3 W por 30 dias e o kWh entre R$ 0,60 e R$ 1, dá cerca de R$ 0,13 a R$ 0,21 por mês'],
      ['Comparação', 'uma lâmpada LED acesa gasta cerca de 5 a 7 W, dezenas de vezes mais que o carregador parado'],
      ['Evidência', 'testes de terceiros com medidor, citados em reportagem; a matéria não trata de segurança (aquecimento ou curto), que é outro assunto']
    ],
    estresse: {
      variavel: 'Meses com o carregador na tomada, sem celular', unidade: 'meses', de: 0, ate: 12, falhaEm: 6,
      passos: [
        { a: 1, t: 'Primeiro mês: 0,1 a 0,3 W de consumo, cerca de R$ 0,13 a R$ 0,21 pelas contas da matéria.' },
        { a: 3, t: 'Três meses depois, o carregador ainda gasta menos que uma balinha.' }
      ],
      falha: 'Seis meses depois, a economia de tirar da tomada somou pouco mais de R$ 1, no pior caso medido.', ok: ''
    },
    veredito: [
      'O carregador na tomada <b>gasta, sim</b>, mas quase nada: testes citados pelo Canaltech medem de 0,1 a 0,3 W, o que dá algo como R$ 0,13 a R$ 0,21 por mês no pior caso.',
      'Tirar da tomada é um hábito inofensivo, mas <b>não é a vilã da conta de luz</b>. O chuveiro elétrico, o ar-condicionado e a geladeira velha pesam muito mais.',
      'Observação do projeto: a matéria não trata de segurança. Carregador velho, esquentando ou com a capa danificada merece ser trocado, independentemente da conta.'
    ],
    fontes: [{ t: 'Canaltech: quanto custa deixar um carregador na tomada sem conectar ao celular', u: 'https://canaltech.com.br/smartphone/quanto-custa-deixar-um-carregador-na-tomada-sem-conectar-ao-celular/' }]
  },

  /* ---------------- AUTOMOTIVO ---------------- */
  {
    id: 'detergente-carro', categoria: 'Automotivo',
    titulo: 'Detergente de cozinha para lavar o carro',
    resumo: 'Sem shampoo automotivo à mão, o detergente da pia assume o balde de domingo.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo de cera que sobra na pintura', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.55, M: 0.85, C: 0.60 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.35 },
    durabNominal: 24, custoGambiarra: 1, custoCorreto: 25, danoColateral: 800,
    ficha: [
      ['Segundo a fonte', 'o detergente é desengordurante, e a cera automotiva é uma fina camada de gordura; ao lavar com detergente, essa camada é removida'],
      ['Consequência', 'a lataria fica mais exposta a sol, chuva e poluição; até a vitrificação pode ser afetada, e o verniz pode sofrer desgaste'],
      ['O que usar', 'shampoo automotivo, que traz lubrificantes que ajudam a durar o verniz'],
      ['Evidência', 'declaração de um especialista em estética automotiva, em reportagem; a duração da cera é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Lavagens com detergente', unidade: 'lavagens', de: 0, ate: 12, falhaEm: 4,
      passos: [
        { a: 1, t: 'A primeira lavagem tira a sujeira e também a camada de cera.' },
        { a: 3, t: 'Sem cera, a lataria fica mais exposta a sol, chuva e poluição.' }
      ],
      falha: 'Uso contínuo reduz a vida útil da proteção, e o verniz pode sofrer desgaste ao longo do tempo (segundo o especialista citado).', ok: ''
    },
    veredito: [
      'O detergente <b>limpa</b>, e por isso ninguém reclama no domingo. O problema é que, segundo o especialista citado, ele remove também a camada de <b>cera que protege a pintura</b>.',
      'Sem essa proteção, o carro fica mais exposto a sol, chuva e poluição, e o uso contínuo pode desgastar o verniz. O estrago é lento, e é por isso que enganou tanta gente.',
      'Para o balde de domingo, o jeito certo é shampoo automotivo. Detergente só em emergência, e depois uma cera nova para devolver o que ele levou.'
    ],
    fontes: [{ t: 'Gazeta SP: lavar o carro com detergente, entenda os riscos para a pintura e o verniz', u: 'https://www.gazetasp.com.br/automotor/lavar-o-carro-com-detergente-entenda-os-riscos-para-a-pintura-e-o/' }]
  }

);
