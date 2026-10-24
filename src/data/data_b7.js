/* ============================================================
   LOTE 4 — MITOS E GAMBIARRAS BEM POPULARES (tom mais leve)
   Os números são estimativas do modelo; a ficha e o veredito citam o que a fonte afirma
   e sinalizam o que é raciocínio próprio. Itens com risco real têm aviso em data_perigo.js.
   ============================================================ */
CENARIOS.push(

  /* ---------------- CASA E REPAROS ---------------- */
  {
    id: 'mosca-pet', categoria: 'Casa e reparos',
    titulo: 'Garrafa PET com água pendurada para espantar mosca',
    resumo: 'A garrafinha pendurada na porta do bar, da varanda ou da churrasqueira que, dizem, a mosca respeita.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até as moscas ignorarem a garrafa', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.15, M: 0.15, C: 0.20 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.05 },
    durabNominal: 720, custoGambiarra: 3, custoCorreto: 25, danoColateral: 50,
    ficha: [
      ['Segundo a fonte', 'a água refrataria a luz e confundiria a visão das moscas; a eficácia é descrita como "variável"'],
      ['Evidência', 'a fonte não cita estudos; a explicação óptica é apresentada como fato, sem comprovação'],
      ['O que atrai mais', 'restos orgânicos atraem mais insetos do que o efeito da luz'],
      ['Medida real', 'limpeza e comida tampada; segundo a fonte, a garrafa é só preventiva']
    ],
    estresse: {
      variavel: 'Moscas rondando o ambiente', unidade: 'moscas', de: 0, ate: 20, falhaEm: 4,
      passos: [
        { a: 1, t: 'Uma mosca solitária passa longe. Coincidência não é prova.' },
        { a: 2, t: 'Duas moscas olham a garrafa, pensam na vida e seguem para o pão.' }
      ],
      falha: 'Com comida à mostra, as moscas pousam assim mesmo. O que atrai mosca é resto de comida, não falta de reflexo.', ok: ''
    },
    veredito: [
      'A garrafa com água é o <b>amuleto oficial</b> do boteco brasileiro. A explicação que circula é bonita: a água refrata a luz e confunde os olhos compostos da mosca. Só que a fonte não cita nenhum estudo, e apresenta a eficácia como <b>variável</b>.',
      'O que a própria fonte reconhece é o mais importante: <b>restos orgânicos atraem mais insetos do que a luz afasta</b>. Ou seja, se tem comida exposta, a mosca vai atrás da comida e ignora a decoração.',
      'Pode deixar a garrafa lá, que não faz mal e dá um ar de cuidado. Mas quem resolve a mosca é a tampa da comida, o lixo fechado e a limpeza. A garrafa é o seguro de quem não quer limpar.'
    ],
    fontes: [{ t: 'Itatiaia: garrafas com água penduradas na varanda, por que isso é indicado', u: 'https://www.itatiaia.com.br/trends/garrafas-com-agua-penduradas-na-varanda-por-que-isso-e-indicado-e-para-que-serve/' }]
  },

  {
    id: 'jornal-vidro', categoria: 'Casa e reparos',
    titulo: 'Limpar vidro com jornal',
    resumo: 'O truque da vovó: amassar jornal velho com água e vinagre e esfregar a janela até brilhar.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o vidro precisar de nova limpeza', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.65, M: 0.55, C: 0.60 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.02, colateral: 0.05 },
    durabNominal: 336, custoGambiarra: 1, custoCorreto: 15, danoColateral: 80,
    ficha: [
      ['Segundo a fonte', 'a textura do papel remove impurezas sem riscar e deixa o vidro sem fiapos'],
      ['Solução citada', 'água e vinagre branco em partes iguais; mais vinagre para gordura'],
      ['Ressalvas da fonte', 'evitar folhas de tinta brilhante ou colorida, não limpar sob sol direto e testar antes em vidros especiais ou com película'],
      ['Evidência', 'a fonte é uma dica doméstica, sem teste medido (observação do projeto)']
    ],
    estresse: {
      variavel: 'Janelas limpas na mesma faxina', unidade: 'janelas', de: 0, ate: 10, falhaEm: null,
      passos: [
        { a: 2, t: 'As primeiras janelas saem sem fiapo, e a pilha de jornal velho finalmente serviu para algo.' },
        { a: 6, t: 'O jornal já está úmido demais: troque a folha, como a fonte manda polir com folha seca.' }
      ],
      falha: '', ok: 'Janelas limpas, sem fiapos. O jornal do domingo se aposentou com honra.'
    },
    veredito: [
      'Este é um dos poucos mitos da lista que <b>funciona de verdade</b>, ou pelo menos tem uma explicação razoável: o papel absorve a umidade rápido, não solta fiapo e deixa a superfície uniforme, segundo a fonte.',
      'As ressalvas são do tipo que quem já tentou aprendeu na marra: <b>jornal de tinta brilhante ou colorida pode soltar pigmento</b>, sol direto seca o produto antes de você polir, e vidro com película pede teste num cantinho primeiro.',
      'Não é ciência de laboratório: a fonte é uma dica doméstica, sem teste medido. Mas o custo é praticamente zero, e o risco também. Aprovado com ressalvas pelo conselho de vovós.'
    ],
    fontes: [{ t: 'Catraca Livre: como reaproveitar jornal velho para limpar vidros sem manchas', u: 'https://catracalivre.com.br/entretenimento/como-reaproveitar-jornal-velho-para-limpar-vidros-sem-manchas/' }]
  },

  {
    id: 'sapato-freezer', categoria: 'Casa e reparos',
    titulo: 'Congelar o sapato apertado com saco de água dentro',
    resumo: 'O sapato novo apertou, então vai para o freezer com um saco de água no bico para o gelo alargar.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o sapato apertar de novo', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.55, M: 0.65, C: 0.45 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.15 },
    durabNominal: 2000, custoGambiarra: 2, custoCorreto: 40, danoColateral: 150,
    ficha: [
      ['Segundo a fonte', 'a água aumenta de volume ao congelar; o saco dentro do sapato pressiona as paredes e deixa o calçado mais folgado'],
      ['Funciona melhor em', 'modelos fechados casuais; o couro natural cede de forma moderada'],
      ['Cuidado', 'couro sintético pode rachar com frio intenso; verniz e peças com pedrarias ou enfeites colados não são indicados'],
      ['Alternativas da fonte', 'meias grossas por alguns minutos em casa, spray amaciante para couro ou sapateiro']
    ],
    estresse: {
      variavel: 'Horas no freezer', unidade: 'h', de: 0, ate: 12, falhaEm: 9,
      passos: [
        { a: 3, t: 'A água começa a virar gelo e a se expandir dentro do saco.' },
        { a: 6, t: 'Gelo completo: pressão suave nas paredes do sapato.' }
      ],
      falha: 'Frio demais por tempo demais: couro sintético, verniz e costuras frágeis podem rachar ou descolar, segundo a fonte.', ok: ''
    },
    veredito: [
      'O truque tem <b>física honesta</b>: a água expande ao congelar, e esse empurrãozinho lento alarga o ponto apertado. É por isso que, ao contrário de muita gambiarra, ele costuma dar certo em sapato de couro natural e modelos casuais.',
      'A fonte lista o que pode dar errado: <b>couro sintético pode rachar</b> com frio intenso, verniz marca com mudança brusca de temperatura e enfeites colados não aguentam. Saco mal vedado vaza e estraga palmilha. Deixe voltar à temperatura ambiente antes de calçar.',
      'Se o sapato for caro ou delicado, a alternativa é o sapateiro. Se for um tênis casual que ficou meio apertado, vale o experimento, mas feche o saco com carinho.'
    ],
    fontes: [{ t: 'Catraca Livre: coloquei meus sapatos novos no congelador', u: 'https://catracalivre.com.br/noticias/eu-coloquei-meus-sapatos-novos-no-congelador-e-foi-a-melhor-coisa-que-fiz-pelos-meus-pes/' }]
  },

  {
    id: 'coca-ferrugem', categoria: 'Casa e reparos',
    titulo: 'Coca-Cola para tirar ferrugem',
    resumo: 'O parafuso enferrujado vai de molho no refrigerante, porque “a Coca dissolve até prego”.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a ferrugem voltar', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.15, M: 0.30, C: 0.30 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.10 },
    durabNominal: 24, custoGambiarra: 6, custoCorreto: 25, danoColateral: 100,
    ficha: [
      ['Segundo a fonte', 'alguns refrigerantes têm ácido fosfórico, que em teoria pode reagir com a ferrugem, mas a concentração é baixa e o efeito, praticamente ineficaz'],
      ['Efeito colateral', 'resíduos pegajosos e açúcar podem favorecer a corrosão ou atrair insetos'],
      ['Classificação da fonte', 'mais um mito do que uma solução eficaz'],
      ['Alternativas', 'lixa fina ou esponja de aço, vinagre branco ou limão, removedores específicos; use luvas e não inale o pó de ferrugem']
    ],
    estresse: {
      variavel: 'Minutos de molho no refrigerante', unidade: 'min', de: 0, ate: 120, falhaEm: 90,
      passos: [
        { a: 10, t: 'Borbulha bastante e parece que está funcionando. Parecer não é resolver.' },
        { a: 60, t: 'A ferrugem continua lá, e a peça agora está grudenta.' }
      ],
      falha: 'A ferrugem quase não saiu, e sobrou um resíduo açucarado que atrai formiga.', ok: ''
    },
    veredito: [
      'A lenda da Coca que dissolve prego é <b>ótima para o marketing do boteco</b> e fraca para a oficina. A fonte reconhece que o ácido fosfórico pode, em teoria, reagir com a ferrugem, mas a concentração é baixa e o efeito, praticamente ineficaz.',
      'E ainda sobra o <b>açúcar</b>: o resíduo pegajoso pode atrair insetos e favorecer a corrosão que você queria combater. A fonte conclui que é mais um mito do que uma solução eficaz.',
      'Para ferrugem de verdade, o caminho é bem menos glamouroso: lixa fina ou esponja de aço, vinagre ou limão, ou um removedor específico. A Coca, deixe para o churrasco.'
    ],
    fontes: [{ t: 'Terra Brasil Notícias: refrigerante remove ferrugem?', u: 'https://terrabrasilnoticias.com/2025/09/e-verdade-que-refrigerante-pode-remover-ferrugem-de-forma-eficaz/' }]
  },

  /* ---------------- ELETRÔNICOS E CELULAR ---------------- */
  {
    id: 'nintendo-soprar', categoria: 'Eletrônicos',
    titulo: 'Soprar a fita do videogame para o jogo funcionar',
    resumo: 'O ritual de toda criança dos anos 90: soprar o cartucho antes de enfiar no console, e rezar.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o jogo travar de novo', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.15, M: 0.20, C: 0.35 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.20 },
    durabNominal: 2, custoGambiarra: 0, custoCorreto: 15, danoColateral: 300,
    ficha: [
      ['Segundo a fonte', 'o sopro deixa uma película de umidade nos contatos, o que aumenta a condutividade e pode causar corrosão'],
      ['Saliva', 'outra fonte cita que resíduos de saliva podem atingir o chip e causar problemas elétricos; para ela, "assoprar o cartucho pouco resolve"'],
      ['Comprovação', 'a primeira fonte diz que não há prova de que assoprar resolvia, e cita um estudo de 2008 de fãs e especialistas que o considerou ineficaz'],
      ['Nintendo', 'os manuais desaconselhavam: o do NES dizia para não assoprar nos conectores ou no cartucho']
    ],
    estresse: {
      variavel: 'Sopros no mesmo cartucho', unidade: 'sopros', de: 0, ate: 20, falhaEm: 7,
      passos: [
        { a: 1, t: 'Soprou, enfiou e o jogo pegou. Provável que tenha sido o reencaixe, não o sopro (raciocínio meu).' },
        { a: 4, t: 'A cada sopro, mais umidade chega aos contatos.' }
      ],
      falha: 'Película de umidade e saliva nos contatos: o jogo piora e, com o tempo, a corrosão se instala.', ok: ''
    },
    veredito: [
      'O sopro funcionava na <b>cabeça de quem jogava</b>. As fontes dizem que não há prova de que resolvesse algo, e um estudo de fãs e especialistas de 2008 concluiu que era ineficaz. O que provavelmente ajudava, e isso é raciocínio meu, era tirar e reencaixar o cartucho.',
      'Pior: o <b>sopro deixa umidade e saliva</b> nos contatos, o que aumenta a condutividade e pode corroer. A própria Nintendo avisava nos manuais: não assopre os conectores nem o cartucho.',
      'Se o jogo não pega até hoje, o caminho é limpar os contatos com um cotonete seco ou levemente umedecido em álcool isopropílico (conhecimento geral, não está nas fontes). E deixar o sopro para as velinhas de aniversário.'
    ],
    fontes: [
      { t: 'Catraca Livre: a nostalgia de assoprar fitas do Super Nintendo', u: 'https://catracalivre.com.br/jogos/a-nostalgia-de-assoprar-fitas-um-ritual-marcante-do-super-nintendo/' },
      { t: 'Tecnoblog: mitos e verdades sobre o retrogaming', u: 'https://tecnoblog.net/especiais/mitos-e-verdades-sobre-o-mundo-do-retrogaming/' }
    ]
  },

  {
    id: 'modo-aviao', categoria: 'Celular',
    titulo: 'Modo avião para o celular carregar mais rápido',
    resumo: 'A dica de quem tem pressa: ativar o modo avião enquanto o celular está na tomada.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo em que o truque ajuda a cada carga', horizonte: 168, horizonteTxt: '1 semana',
    fatores: { A: 0.45, M: 0.65, C: 0.45 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.02 },
    durabNominal: 2, custoGambiarra: 0, custoCorreto: 80, danoColateral: 0,
    ficha: [
      ['Segundo a fonte', 'é verdade que o modo avião pode acelerar a carga, mas o efeito é "quase imperceptível"'],
      ['Por quê', 'desliga Wi-Fi, Bluetooth e rede móvel, que gastam energia; sinal fraco faz o celular gastar mais procurando conexão'],
      ['Números', 'a fonte não dá minutos nem porcentagem'],
      ['Preço do truque', 'durante a carga você fica sem ligações e mensagens (observação do projeto)']
    ],
    estresse: {
      variavel: 'Minutos de carga em modo avião', unidade: 'min', de: 0, ate: 60, falhaEm: null,
      passos: [
        { a: 10, t: 'A carga sobe, e ninguém consegue te achar. Dois efeitos do mesmo truque.' },
        { a: 30, t: 'Metade do caminho. A diferença para o modo normal ainda é difícil de notar.' }
      ],
      falha: '', ok: 'Carregou, só um pouquinho antes do normal. O efeito existe, mas é tímido, como a fonte descreve.'
    },
    veredito: [
      'Aqui o mito <b>é meio verdade</b>, e isso é raro. Com o modo avião, o celular desliga Wi-Fi, Bluetooth e rede móvel, gasta menos energia e sobra mais para a bateria. A fonte confirma que carrega mais rápido.',
      'O detalhe é o tamanho do ganho: a fonte descreve como <b>quase imperceptível</b> e não dá números. Ou seja, o truque não vai transformar 1 hora de carga em 20 minutos. Ajuda mais em lugar de sinal fraco, onde o celular gasta mais procurando rede.',
      'Se a pressa é grande, o ganho real vem do carregador adequado ao aparelho. O modo avião é o bônus gratuito, desde que você aguente ficar sem notificações.'
    ],
    fontes: [{ t: 'Canaltech: é verdade que celular no modo avião carrega mais rápido, mas efeito é minúsculo', u: 'https://canaltech.com.br/internet/e-verdade-que-celular-no-modo-aviao-carrega-mais-rapido-mas-efeito-e-minusculo/' }]
  },

  {
    id: 'apps-segundo-plano', categoria: 'Celular',
    titulo: 'Fechar todos os aplicativos para economizar bateria',
    resumo: 'Aquele gesto de deslizar tudo para cima, todo dia, como quem arruma a casa.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a economia sumir', horizonte: 168, horizonteTxt: '1 semana',
    fatores: { A: 0.15, M: 0.10, C: 0.30 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.03 },
    durabNominal: 3, custoGambiarra: 0, custoCorreto: 0, danoColateral: 0,
    ficha: [
      ['Segundo a fonte', 'fechar apps em segundo plano não é eficaz para economizar bateria e pode piorar o desempenho'],
      ['Como o sistema trata', 'apps em segundo plano ficam suspensos, com consumo mínimo ou nulo, segundo o especialista citado'],
      ['Reabrir custa mais', 'abrir o app de novo exige mais memória, mais processador e, por consequência, mais bateria'],
      ['O que ajuda', 'ajustar o uso em segundo plano nas configurações; apps de redes sociais e GPS consomem bastante']
    ],
    estresse: {
      variavel: 'Vezes que você fecha e reabre os apps no dia', unidade: 'vezes', de: 0, ate: 30, falhaEm: 8,
      passos: [
        { a: 2, t: 'A tela fica limpa e você se sente produtivo. A bateria nem percebeu.' },
        { a: 5, t: 'Cada reabertura puxa memória e processador de novo.' }
      ],
      falha: 'Fechar e reabrir gasta mais energia do que deixar o app suspenso, e a fonte diz que ainda pode piorar o desempenho.', ok: ''
    },
    veredito: [
      'Fechar tudo dá a sensação de <b>faxina digital</b>, e é por isso que o hábito é tão popular. Mas, segundo a fonte, o sistema já suspende os apps em segundo plano, com consumo mínimo ou nulo.',
      'O pior é que <b>reabrir gasta mais</b>: o app precisa de mais memória e mais processador para voltar, e isso custa bateria. Ou seja, o gesto de limpeza pode custar energia, e não poupar.',
      'O que ajuda de verdade é controlar o que pode trabalhar em segundo plano nas configurações, e cuidar dos apps pesados, como redes sociais e GPS. Fechar app só faz sentido quando ele travou ou está ativo sem você saber.'
    ],
    fontes: [{ t: 'Canaltech: é mito que fechar todos os apps economiza a bateria do celular', u: 'https://canaltech.com.br/apps/e-mito-que-fechar-todos-os-apps-economiza-a-bateria-do-celular-descubra/' }]
  },

  /* ---------------- AUTOMOTIVO ---------------- */
  {
    id: 'chupeta-carro', categoria: 'Automotivo',
    titulo: 'Chupeta no carro quando a bateria arria',
    resumo: 'Cabos emprestados, carro do vizinho e muita fé para fazer o motor pegar.',
    unidadeDurab: 'km', durabRotulo: 'Km até a bateria arriar de novo', horizonte: 3000, horizonteTxt: '3.000 km',
    fatores: { A: 0.60, M: 0.80, C: 0.50 },
    riscos: { calor: 0.08, eletrico: 0.20, terceiros: 0.20, colateral: 0.20 },
    durabNominal: 300, custoGambiarra: 60, custoCorreto: 450, danoColateral: 4000,
    ficha: [
      ['Ordem (fonte)', 'cabo vermelho no (+) da bateria descarregada e depois no (+) da carregada; garra preta no (−) da doadora; última garra preta em metal do motor, longe da bateria'],
      ['Antes', 'os dois carros desligados, freio de mão puxado, e o motor do doador funcionando antes de girar a chave do outro'],
      ['Riscos (fonte)', 'faíscas perto dos gases inflamáveis da bateria; inverter a polaridade pode explodir a bateria e queimar o alternador'],
      ['Observação', 'a chupeta faz pegar, mas não resolve a bateria fraca; a estimativa de troca é do projeto']
    ],
    estresse: {
      variavel: 'Erros na ordem dos cabos', unidade: 'erros', de: 0, ate: 3, falhaEm: 2,
      passos: [
        { a: 1, t: 'Uma garra encosta onde não devia: faísca perto dos gases da bateria.' }
      ],
      falha: 'Polaridade invertida: segundo a fonte, a bateria pode explodir, o alternador queimar e a central eletrônica sofrer.', ok: ''
    },
    veredito: [
      'A chupeta <b>funciona</b>, e é por isso que está em todo manual de sobrevivência do motorista. O carro pega, você segue a vida, e o vizinho ganha um café de agradecimento.',
      'O risco está nos detalhes. A fonte lista <b>faíscas perto dos gases inflamáveis</b> da bateria e, se a polaridade for invertida, explosão da bateria, alternador queimado e danos à central eletrônica. Daí a ordem dos cabos: vermelho no positivo das duas baterias, preto no negativo da doadora, e a última garra em metal do motor, longe da bateria.',
      'Lembre também que a chupeta só dá a partida. Se a bateria arriou sozinha mais de uma vez, ela provavelmente está no fim, e uma bateria nova é mais barata que um alternador.'
    ],
    fontes: [{ t: 'Olhar Digital: a ordem correta para conectar os cabos e dar partida no carro', u: 'https://olhardigital.com.br/2026/02/10/curiosidades/a-ordem-correta-para-conectar-os-cabos-e-dar-partida-no-carro-sem-correr-riscos/' }]
  },

  /* ---------------- COZINHA E LIMPEZA ---------------- */
  {
    id: 'cebola-fosforo', categoria: 'Cozinha e limpeza',
    titulo: 'Fósforo na boca para não chorar ao cortar cebola',
    resumo: 'Dizem que um palito de fósforo (apagado) entre os lábios segura as lágrimas.',
    unidadeDurab: 'horas', durabRotulo: 'Duração do efeito', horizonte: 168, horizonteTxt: '1 semana',
    fatores: { A: 0.15, M: 0.10, C: 0.30 },
    riscos: { calor: 0.03, eletrico: 0, terceiros: 0.03, colateral: 0.02 },
    durabNominal: 1, custoGambiarra: 1, custoCorreto: 10, danoColateral: 20,
    ficha: [
      ['Segundo a fonte', 'fósforo na boca: sem evidência científica; qualquer melhora vem do acaso ou do placebo'],
      ['Pano úmido', 'o gás é solúvel em água, mas na prática o efeito é pequeno'],
      ['Funciona, segundo a fonte', 'cebola 20 a 30 minutos na geladeira antes de cortar, e faca bem afiada'],
      ['Por que chora', 'as células se rompem, enzimas encontram compostos de enxofre e formam um gás irritante']
    ],
    estresse: {
      variavel: 'Cebolas cortadas', unidade: 'cebolas', de: 0, ate: 6, falhaEm: 2,
      passos: [
        { a: 1, t: 'Fósforo na boca, faca na mão e olhos já ardendo. O placebo faz o que pode.' }
      ],
      falha: 'As lágrimas chegaram do mesmo jeito. A fonte lembra que nenhuma medida elimina o choro por completo.', ok: ''
    },
    veredito: [
      'O fósforo na boca tem <b>zero evidência</b>, segundo a fonte: se alguém sentiu melhora, foi acaso ou placebo. Com a cebola chorando por ela mesma, o que parece funcionar é o ritual.',
      'O que a fonte aponta como eficiente é bem menos poético: <b>deixar a cebola de 20 a 30 minutos na geladeira</b> e usar uma <b>faca bem afiada</b>, que rompe menos células. O pano úmido ao lado da tábua é o meio-termo: pouco efeito, mas não custa.',
      'E um aviso de bom senso, que não vem da fonte: cabeça de fósforo não é feita para ficar na boca. Se o fogo não é seguro nem na ponta de um churrasco, também não é na ponta da língua.'
    ],
    fontes: [{ t: 'Tudo Gostoso: o truque do fósforo na boca e pano úmido funcionam?', u: 'https://www.tudogostoso.com.br/noticias/truque-do-fosforo-na-boca-e-pano-umido-funcionam-a-verdade-sobre-como-cortar-cebola-sem-derramar-uma-lagrima-a29854.htm' }]
  },

  {
    id: 'descongelar-pia', categoria: 'Cozinha e limpeza',
    titulo: 'Descongelar a carne na pia, em temperatura ambiente',
    resumo: 'A carne sai do freezer de manhã e fica no escorredor até a hora do almoço.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a carne entrar na zona de risco', horizonte: 168, horizonteTxt: '1 semana',
    fatores: { A: 0.60, M: 0.70, C: 0.40 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.25, colateral: 0.15 },
    durabNominal: 4, custoGambiarra: 0, custoCorreto: 0, danoColateral: 300,
    ficha: [
      ['Segundo a fonte', 'deixar a carne na pia é "um erro grave"; a Anvisa alerta que aumenta o risco de contaminação'],
      ['Orientação (via fonte)', 'não descongelar alimentos à temperatura ambiente'],
      ['Mais seguro', 'micro-ondas na função descongelar (virando a carne na metade e cozinhando logo) ou geladeira'],
      ['Atalho citado', 'o truque das duas panelas promete bifes em cerca de 15 minutos, mas a fonte não afirma que seja seguro']
    ],
    estresse: {
      variavel: 'Horas da carne fora do freezer', unidade: 'h', de: 0, ate: 8, falhaEm: 3,
      passos: [
        { a: 1, t: 'A superfície amolece, o centro ainda é pedra. Ninguém desconfia de nada.' },
        { a: 2, t: 'A parte de fora já está em temperatura ambiente, e o centro continua congelado.' }
      ],
      falha: 'A superfície passa tempo demais em temperatura ambiente, e a fonte alerta para o risco de contaminação.', ok: ''
    },
    veredito: [
      'Descongelar na pia <b>funciona</b>: a carne descongela. O problema é o jeito, porque a parte de fora fica em temperatura ambiente por horas enquanto o centro ainda está gelado.',
      'A fonte chama de <b>erro grave</b> e cita a Anvisa, que alerta para o risco de contaminação e orienta a não descongelar alimentos à temperatura ambiente. A recomendação é o micro-ondas na função descongelar, virando a carne na metade e cozinhando logo, ou a geladeira.',
      'Quem tem pressa encontra truques, como as duas panelas de metal, que prometem bifes em cerca de 15 minutos, mas a fonte não garante que seja seguro. Se esqueceu de tirar o frango do freezer, o plano B é micro-ondas e cozimento imediato.'
    ],
    fontes: [{ t: 'Band Receitas: como descongelar carne em minutos do jeito certo e mais seguro', u: 'https://www.band.com.br/receitas/noticias/como-descongelar-carne-em-minutos-do-jeito-certo-e-mais-seguro-202510131922' }]
  },

  {
    id: 'sal-vinho', categoria: 'Cozinha e limpeza',
    titulo: 'Sal na mancha de vinho tinto',
    resumo: 'O vinho caiu no tapete, e a primeira reação de todo mundo é cobrir de sal.',
    unidadeDurab: 'horas', durabRotulo: 'Janela para agir antes da mancha fixar', horizonte: 168, horizonteTxt: '1 semana',
    fatores: { A: 0.55, M: 0.50, C: 0.40 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0, colateral: 0.10 },
    durabNominal: 12, custoGambiarra: 1, custoCorreto: 20, danoColateral: 300,
    ficha: [
      ['Segundo a fonte', 'enxaguar com água fria e aplicar uma pequena quantidade de sal para absorver o vinho restante, deixando agir alguns minutos'],
      ['Ressalvas', 'agir rápido, não esfregar, evitar água quente (fixa os pigmentos) e lembrar que não existe fórmula única para todos os tecidos'],
      ['Outros métodos (fonte)', 'água com detergente neutro antes da lavagem comum; removedores específicos para manchas antigas'],
      ['Evidência', 'dica doméstica descrita em reportagens, sem teste medido (observação do projeto); o tempo da janela é ilustração do modelo']
    ],
    estresse: {
      variavel: 'Minutos até começar a agir na mancha', unidade: 'min', de: 0, ate: 60, falhaEm: 30,
      passos: [
        { a: 2, t: 'Sal na mancha fresca: o vinho sobe para o sal e a festa continua.' },
        { a: 15, t: 'A mancha começa a secar e a entrar nas fibras.' }
      ],
      falha: 'Mancha seca: o sal já não resolve, e a fonte indica removedores para manchas antigas.', ok: ''
    },
    veredito: [
      'O sal na mancha é <b>o primeiro socorro do tapete</b>, e tem lógica: ele absorve o vinho que ainda não penetrou. A fonte recomenda enxaguar com água fria, aplicar um pouco de sal e deixar agir alguns minutos.',
      'O que decide o resultado é o <b>tempo e o gesto</b>: agir rápido, pressionar sem esfregar (esfregar empurra o vinho para dentro das fibras) e evitar água quente, que fixa os pigmentos. E tecido não perdoa: não há fórmula única.',
      'Se a mancha já secou, o sal não faz milagre. A fonte indica água com detergente neutro antes da lavagem ou um removedor específico. Dica de boteco: antes de socorrer o tapete, socorra a taça.'
    ],
    fontes: [{ t: 'Itatiaia: como remover manchas de vinho, truques simples', u: 'https://www.itatiaia.com.br/trends/como-remover-manchas-de-vinho-veja-truques-simples-que-resolvem-o-problema-em-minutos/' }]
  },

  /* ---------------- CORPO E SAÚDE ---------------- */
  {
    id: 'pasta-dente-queimadura', categoria: 'Corpo e saúde',
    titulo: 'Pasta de dente em queimadura',
    resumo: 'Queimou na panela ou no forno, e a vovó já chegou com o tubo de pasta de dente.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo de alívio', horizonte: 720, horizonteTxt: '30 dias de cicatrização',
    fatores: { A: 0.10, M: 0.10, C: 0.30 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.10, colateral: 0.45 },
    durabNominal: 2, custoGambiarra: 5, custoCorreto: 15, danoColateral: 1500,
    ficha: [
      ['Segundo a fonte', 'caso de uma mulher que ficou com a mão deformada, com inchaço e bolhas, após usar pasta de dente numa queimadura de óleo quente'],
      ['Alerta médico (fonte)', 'pasta de dente, óleos, farinha, molho de soja e ovos podem provocar inflamação intensa e risco de infecção'],
      ['Também não', 'manteiga, gelo e óleo de cozinha não são recomendados'],
      ['O que fazer (fonte)', 'lavar com água limpa em temperatura ambiente por 15 a 20 minutos, não estourar as bolhas e procurar médico; babosa só em queimadura de 1º grau']
    ],
    estresse: {
      variavel: 'Minutos com pasta de dente na queimadura', unidade: 'min', de: 0, ate: 30, falhaEm: 10,
      passos: [
        { a: 2, t: 'Fica fresquinha pela hortelã. Sensação não é tratamento.' },
        { a: 6, t: 'A pasta fica cobrindo a ferida, grudada na pele.' }
      ],
      falha: 'Segundo a fonte, substâncias como pasta de dente podem causar inflamação intensa e risco de infecção.', ok: ''
    },
    veredito: [
      'A pasta de dente dá <b>sensação de alívio</b>, e é por isso que sobrevive de geração em geração. Mas sensação fresquinha não é tratamento. A fonte relata o caso de uma mulher que ficou com a mão deformada, com inchaço e bolhas, depois de usá-la numa queimadura.',
      'O alerta do médico citado é que pasta de dente, óleos, farinha, molho de soja e ovos podem provocar <b>inflamação intensa e risco de infecção</b>. Manteiga, gelo e óleo de cozinha também não são recomendados.',
      'O certo é o mais simples: <b>água limpa em temperatura ambiente por 15 a 20 minutos</b>, sem estourar bolhas, e médico se for séria. A pasta de dente fica com o que ela faz de melhor: dentes.'
    ],
    fontes: [{ t: 'Catraca Livre: mulher fica com a mão deformada após usar pasta de dente em queimadura', u: 'https://catracalivre.com.br/saude-bem-estar/mulher-fica-com-mao-deformada-apos-usar-pasta-de-dente-em-queimadura/' }]
  },

  {
    id: 'vitamina-b-repelente', categoria: 'Corpo e saúde',
    titulo: 'Tomar vitamina B para o pernilongo não picar',
    resumo: 'Quem toma complexo B passaria a ter um cheiro que o mosquito da dengue detesta.',
    unidadeDurab: 'horas', durabRotulo: 'Duração da proteção contra picada', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.05, M: 0.05, C: 0.20 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.35, colateral: 0.30 },
    durabNominal: 24, custoGambiarra: 30, custoCorreto: 25, danoColateral: 3000,
    ficha: [
      ['Segundo a fonte', 'a Sociedade Brasileira de Infectologia diz que a informação é falsa, sem qualquer comprovação científica'],
      ['Alerta', 'quem toma complexo B pode achar que está protegido e deixar de usar um repelente adequado'],
      ['Repelentes (fonte)', 'vendidos em farmácias, com DEET, icaridina ou IR 35'],
      ['Cuidados (fonte)', 'não aplicar repelente spray no rosto; sem comprovação de eficácia em menores de 2 anos']
    ],
    estresse: {
      variavel: 'Picadas por noite', unidade: 'picadas', de: 0, ate: 10, falhaEm: 1,
      passos: [],
      falha: 'A vitamina não afasta o mosquito. O perigo é a falsa sensação de proteção, que faz você dispensar o repelente.', ok: ''
    },
    veredito: [
      'A vitamina B é <b>ótima para os nervos</b> e péssima como repelente. A Sociedade Brasileira de Infectologia, segundo a fonte, afirma que a ideia é falsa e não tem nenhuma comprovação científica.',
      'O risco do mito é a <b>falsa sensação de proteção</b>: quem toma complexo B pode achar que está seguro e deixar de usar um repelente de verdade, num mosquito que transmite dengue, chikungunya e zika.',
      'O que a fonte recomenda são os repelentes de farmácia, com DEET, icaridina ou IR 35, sem aplicar spray no rosto. E menores de 2 anos pedem orientação do pediatra.'
    ],
    fontes: [{ t: 'Brasil 61: complexo B não espanta mosquito e não serve como repelente', u: 'https://brasil61.com/noticias/complexo-b-vitamina-nao-espanta-mosquito-e-nao-serve-como-repelente-aede160636' }]
  }
);
