/* ============================================================
   LOTE 3 — GAMBIARRAS DE RISCO (elétrica, gás, químicos, combustão) E MAIS TRÊS COMUNS
   Estes itens têm nível de perigo em data_perigo.js: os graves nunca recebem aprovação.
   Os números são estimativas do modelo; a ficha e o veredito citam o que a fonte afirma
   e sinalizam o que é conhecimento geral ou raciocínio próprio.
   Nenhum item ensina a executar a gambiarra: o conteúdo explica por que ela falha ou machuca.
   ============================================================ */
CENARIOS.push(

  /* ---------------- ELÉTRICA ---------------- */
  {
    id: 'disjuntor-maior', categoria: 'Elétrica',
    titulo: 'Trocar o disjuntor por um de amperagem maior porque ele vive desarmando',
    resumo: 'O disjuntor do chuveiro ou da tomada cai toda hora, então se coloca um maior para “resolver”.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o fio sofrer com a sobrecarga', horizonte: 8760, horizonteTxt: '1 ano',
    fatores: { A: 0.20, M: 0.30, C: 0.20 },
    riscos: { calor: 0.45, eletrico: 0.35, terceiros: 0.40, colateral: 0.30 },
    durabNominal: 3000, custoGambiarra: 30, custoCorreto: 250, danoColateral: 20000,
    ficha: [
      ['Segundo a fonte', 'o disjuntor serve para cortar o circuito em sobrecarga e curto; trocar sem checar a instalação pode gerar novos problemas'],
      ['Exemplo da fonte', 'se um circuito protegido por disjuntor de 40 A recebe um de 50 A, os cabos não passam a suportar mais corrente'],
      ['Referência da fonte', 'chuveiro de 7.500 W em 220 V: cerca de 34 A (7.500 ÷ 220); a fabricante citada recomenda cabo de 6 mm² e disjuntor de 40 A'],
      ['Sinais de alerta', 'cheiro de queimado, componentes descoloridos ou derretidos e calor excessivo no quadro; desarmar logo após religar também pede investigação']
    ],
    estresse: {
      variavel: 'Corrente no circuito', unidade: 'A', de: 0, ate: 60, falhaEm: 41,
      passos: [
        { a: 20, t: 'Uso leve: o fio e o disjuntor trabalham com folga.' },
        { a: 34, t: 'Um chuveiro de 7.500 W em 220 V puxa cerca de 34 A. Ainda dentro do limite do cabo de 6 mm².' }
      ],
      falha: 'Acima da capacidade do fio, o disjuntor maior deixa passar a corrente. O fio esquenta antes de a proteção atuar.', ok: ''
    },
    veredito: [
      'O disjuntor não desarma por capricho: ele desarma <b>porque algo puxa mais corrente do que o circuito aguenta</b>, ou porque há um defeito. Trocar por um maior faz o sintoma sumir, mas a causa continua ali.',
      'A fonte dá o raciocínio central: com um disjuntor de 50 A no lugar de um de 40 A, <b>o fio continua dimensionado para 40 A</b>. O disjuntor deixa de proteger o cabo, que pode superaquecer, ter o isolamento deteriorado e, no extremo, pegar fogo. Quem fez a conta do chuveiro: 7.500 ÷ 220 ≈ 34 A.',
      'A saída é descobrir a causa: aparelho com defeito, circuito dividido com carga demais ou fio fino para a potência. O diagnóstico é de eletricista, e custa muito menos que o dano de um incêndio dentro da parede.'
    ],
    fontes: [{ t: 'Canaltech: disjuntor do chuveiro vive caindo? Não aumente a amperagem', u: 'https://canaltech.com.br/eletro/disjuntor-do-chuveiro-vive-caindo-nao-aumente-a-amperagem-antes-de-ler-isto' }]
  },
  {
    id: 'regua-cascata', categoria: 'Elétrica',
    titulo: 'Filtro de linha ligado em outro filtro de linha',
    resumo: 'Faltou tomada, então uma régua é ligada na outra para aumentar o número de aparelhos.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a régua superaquecer', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.50, M: 0.60, C: 0.30 },
    riscos: { calor: 0.20, eletrico: 0.10, terceiros: 0.10, colateral: 0.15 },
    durabNominal: 4000, custoGambiarra: 40, custoCorreto: 120, danoColateral: 4000,
    ficha: [
      ['Segundo a fonte', 'a ligação em cascata soma a carga dos aparelhos e pode passar do limite seguro da tomada, com risco de superaquecimento, curto-circuito e incêndio'],
      ['Aparelhos de alta potência', 'secador, aquecedor, forno elétrico e micro-ondas devem ir direto na tomada da parede'],
      ['Ventilação', 'cobrir o filtro com tapete, móvel ou objetos prejudica a ventilação e pode causar superaquecimento'],
      ['Limite', 'a fonte manda comparar a potência máxima do filtro (watts ou amperes) com a soma dos aparelhos; ela não dá um valor numérico']
    ],
    estresse: {
      variavel: 'Aparelhos de potência alta na régua', unidade: 'aparelhos', de: 0, ate: 5, falhaEm: 3,
      passos: [
        { a: 1, t: 'Computador e luminária: carga leve.' },
        { a: 2, t: 'Um ventilador e vários carregadores se somam, mas a régua ainda aguenta.' }
      ],
      falha: 'Com aquecedor ou secador na régua, as cargas se somam na primeira tomada e o cabo da régua esquenta.', ok: ''
    },
    veredito: [
      'A régua é feita para <b>distribuir</b> uma tomada, não para multiplicar a capacidade dela. Ligar uma na outra não cria potência nova: <b>toda a carga passa pelo primeiro cabo e pela mesma tomada da parede</b>.',
      'A fonte descreve o efeito: a carga dos aparelhos se soma, o que pode ultrapassar o limite seguro e causar superaquecimento, curto-circuito e incêndio. Quanto mais potente o aparelho, mais rápido isso acontece. Uma régua coberta ou ligada em outra também dificulta saber o que está consumindo o quê.',
      'Para um escritório ou sala com muitos aparelhos pequenos, uma régua com potência compatível já resolve. Se o problema é falta de ponto, vale pedir a um eletricista mais tomadas no circuito. Aparelho de calor sempre direto na parede.'
    ],
    fontes: [{ t: 'Correio Braziliense: usa filtro de linha? 6 cuidados', u: 'https://www.correiobraziliense.com.br/cbradar/usa-filtro-de-linha-veja-6-cuidados-que-voce-precisa-tomar/' }]
  },

  /* ---------------- COZINHA E LIMPEZA ---------------- */
  {
    id: 'gas-fosforo', categoria: 'Cozinha e limpeza',
    titulo: 'Procurar vazamento de gás com fósforo ou isqueiro',
    resumo: 'Sentir cheiro de gás e passar uma chama perto da mangueira ou do registro para ver se “pega”.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o gás encontrar a chama', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.10, M: 0.20, C: 0.10 },
    riscos: { calor: 0.60, eletrico: 0, terceiros: 0.60, colateral: 0.50 },
    durabNominal: 1, custoGambiarra: 1, custoCorreto: 5, danoColateral: 50000,
    ficha: [
      ['Teste seguro (fonte)', 'detergente misturado com água, espalhado no cano; ao abrir o registro com cuidado, bolhas indicam o vazamento'],
      ['Alerta da fonte', 'acender uma lâmpada ou ligar um cabo na tomada sem perceber o vazamento pode causar explosão'],
      ['Chama', 'a fonte não cita fósforo ou isqueiro; a conclusão é direta: se uma faísca é perigosa, uma chama também é'],
      ['Ao sentir cheiro', 'fechar o registro, abrir as janelas, levar o botijão para área aberta (se for o caso) e acionar a distribuidora']
    ],
    estresse: {
      variavel: 'Minutos de gás vazando antes do teste', unidade: 'min', de: 0, ate: 30, falhaEm: 10,
      passos: [
        { a: 2, t: 'Cheiro leve de gás. A tentação é verificar com uma chama.' },
        { a: 6, t: 'O gás vai se acumulando no ambiente e o cheiro aumenta.' }
      ],
      falha: 'A chama encontra a mistura de gás e ar: labareda ou explosão na mão de quem está perto.', ok: ''
    },
    veredito: [
      'Este é um dos mitos mais perigosos da lista, porque o <b>teste é o próprio risco</b>. Gás misturado com ar pega fogo com uma chama, e se o vazamento já se acumulou, o resultado é uma explosão, não um aviso.',
      'A fonte propõe o teste seguro: <b>água com detergente</b> espalhada no cano, e bolhas onde há vazamento. Ela também lembra que até acender uma lâmpada ou ligar um cabo na tomada pode ser suficiente para causar uma explosão quando o gás já se espalhou.',
      'Cheiro de gás: feche o registro, abra as janelas, não acione interruptores nem chama e saia do local. Chame a distribuidora ou o Corpo de Bombeiros. Peça de gás com defeito é troca, não conserto improvisado.'
    ],
    fontes: [{ t: 'Sindiconet: vazamento de gás, como identificar e o que fazer', u: 'https://www.sindiconet.com.br/informese/vazamento-de-gas-como-identificar-o-que-fazer-e-cuidados-a-serem-tomados-para-moradores-manutencao/amp' }]
  },
  {
    id: 'alcool-churrasqueira', categoria: 'Cozinha e limpeza',
    titulo: 'Álcool ou outro líquido inflamável para acender a churrasqueira',
    resumo: 'Para o carvão pegar logo, joga-se álcool (ou outro líquido) sobre ele, às vezes quando já tem brasa.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o fogo estabilizar', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.55, M: 0.70, C: 0.30 },
    riscos: { calor: 0.55, eletrico: 0, terceiros: 0.60, colateral: 0.25 },
    durabNominal: 1, custoGambiarra: 6, custoCorreto: 25, danoColateral: 15000,
    ficha: [
      ['Segundo a fonte', 'um homem de 46 anos morreu após queimaduras graves ao jogar líquido inflamável sobre a churrasqueira; houve explosão'],
      ['Orientação dos bombeiros', 'o álcool pode ser usado para acender, mas nunca depois que já houver fogo na churrasqueira, porque o risco de explosão aumenta'],
      ['Outra fonte', 'o álcool líquido se espalha com facilidade, e a queimadura costuma ser extensa e profunda; a pele queimada, em geral, não volta ao normal'],
      ['Gasolina', 'a fonte não cita gasolina; ela é bem mais volátil que o álcool, e esta é uma observação geral do projeto']
    ],
    estresse: {
      variavel: 'Segundos desde que o carvão começou a acender', unidade: 's', de: 0, ate: 60, falhaEm: 20,
      passos: [
        { a: 5, t: 'O álcool acende o carvão e a chama sobe rápido.' },
        { a: 12, t: 'O carvão ainda tem pouca brasa. A tentação é jogar mais líquido para acelerar.' }
      ],
      falha: 'Líquido jogado sobre fogo ou brasa acesa pode explodir e queimar quem está perto.', ok: ''
    },
    veredito: [
      'O álcool <b>acende o carvão</b>, e é por isso que o hábito é tão comum. A fonte do acidente, porém, mostra o preço: um homem morreu após queimaduras graves ao jogar líquido inflamável na churrasqueira. Segundo especialistas, esse uso está entre as principais causas de queimaduras no país.',
      'A orientação dos bombeiros é objetiva: se for usar álcool, <b>nunca depois que já houver fogo</b>, porque o risco de explosão aumenta. Quem acende deve estar sóbrio e as crianças devem ficar longe. Gasolina e outros líquidos mais voláteis são piores, e este ponto é conhecimento geral, não está nas fontes consultadas.',
      'Para um churrasco sem susto, use acendedor próprio, chaminé de acendimento ou pastilhas. Se o fogo falhar, espere e recomece com carvão novo, não com mais líquido.'
    ],
    fontes: [
      { t: 'Band: acidente em churrasco reacende alerta para o uso de inflamáveis', u: 'https://www.band.com.br/nacional/pr/acidente-em-churrasco-reacende-alerta-para-uso-de-inflamaveis' },
      { t: 'CNN Brasil: álcool líquido 70%, cuidados para prevenir acidentes', u: 'https://www.cnnbrasil.com.br/saude/anvisa-autoriza-venda-de-alcool-liquido-70-veja-cuidados-para-prevenir-acidentes/' }
    ]
  },

  {
    id: 'alcool-sanitaria', categoria: 'Cozinha e limpeza',
    titulo: 'Misturar álcool com água sanitária para desinfetar mais',
    resumo: 'Juntar os dois produtos “para ficar mais forte” na faxina.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o gás irritar as vias aéreas', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.10, M: 0.10, C: 0.10 },
    riscos: { calor: 0, eletrico: 0, terceiros: 0.60, colateral: 0.15 },
    durabNominal: 1, custoGambiarra: 8, custoCorreto: 12, danoColateral: 3000,
    ficha: [
      ['Segundo a fonte', 'a mistura de álcool com água sanitária resulta em um gás de alto poder de intoxicação, identificado como clorofórmio gasoso'],
      ['Separados', 'a fonte diz que usados separadamente são seguros'],
      ['Recomendação', 'seguir as orientações do fabricante no rótulo e evitar misturas caseiras, que não foram testadas com segurança'],
      ['Socorro', 'Disque-Intoxicação da Anvisa: 0800 722 6001']
    ],
    estresse: {
      variavel: 'Minutos de exposição ao vapor em ambiente fechado', unidade: 'min', de: 0, ate: 20, falhaEm: 5,
      passos: [
        { a: 1, t: 'Cheiro forte. Olhos e nariz começam a irritar.' },
        { a: 3, t: 'A tosse chega e o ambiente fechado piora tudo.' }
      ],
      falha: 'O gás liberado tem alto poder de intoxicação. Saia, ventile e procure atendimento se houver sintomas.', ok: ''
    },
    veredito: [
      'Misturar dois produtos que desinfetam não soma o poder deles. A fonte informa que a mistura de álcool com água sanitária resulta em um <b>gás de alto poder de intoxicação</b>, descrito como clorofórmio gasoso. Cada produto, usado sozinho e como manda o rótulo, é seguro.',
      'Pior que o cheiro é o efeito em <b>ambiente fechado</b>: banheiro, cozinha e lavanderia concentram o vapor. O vinagre com água sanitária, outro mito deste catálogo, segue a mesma lógica de gás irritante.',
      'A regra é simples: um produto por vez, com ventilação, e enxágue entre eles. Em caso de intoxicação, ligue para o Disque-Intoxicação (0800 722 6001) e saia do ambiente.'
    ],
    fontes: [{ t: 'Canaltech: Anvisa alerta para risco de mistura caseira de produto de limpeza', u: 'https://canaltech.com.br/saude/anvisa-alerta-para-risco-de-mistura-caseira-de-produto-de-limpeza/' }]
  },

  /* ---------------- CASA E REPAROS ---------------- */
  {
    id: 'braseiro-casa', categoria: 'Casa e reparos',
    titulo: 'Brasa ou churrasqueira de carvão dentro de casa para esquentar',
    resumo: 'Em noite fria, levar um braseiro ou uma churrasqueira com carvão para dentro do cômodo.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o ar ficar perigoso', horizonte: 2160, horizonteTxt: '3 meses de frio',
    fatores: { A: 0.55, M: 0.75, C: 0.20 },
    riscos: { calor: 0.35, eletrico: 0, terceiros: 0.70, colateral: 0.20 },
    durabNominal: 4, custoGambiarra: 15, custoCorreto: 250, danoColateral: 50000,
    ficha: [
      ['Segundo a fonte', 'churrasqueiras de carvão, grelhadores a gás e geradores só devem ser usados ao ar livre, nunca dentro de imóveis'],
      ['Sintomas', 'segundo a fonte: dor de cabeça, náusea, fraqueza, tontura, confusão mental e perda de consciência'],
      ['Quantidade', 'a fonte afirma que uma quantidade pequena do gás já pode causar intoxicação'],
      ['Em caso de sintomas', 'sair do local imediatamente e acionar o Corpo de Bombeiros ou atendimento médico; o monóxido não tem cheiro nem cor (informação geral)']
    ],
    estresse: {
      variavel: 'Horas com a janela fechada', unidade: 'h', de: 0, ate: 8, falhaEm: 3,
      passos: [
        { a: 1, t: 'O cômodo esquenta e ninguém nota nada estranho.' },
        { a: 2, t: 'Dor de cabeça leve. Muita gente atribui ao frio ou ao cansaço.' }
      ],
      falha: 'Aparecem náusea, tontura e confusão. O monóxido de carbono pode levar à perda de consciência antes de a pessoa conseguir sair.', ok: ''
    },
    veredito: [
      'Brasa <b>esquenta de verdade</b>, e é por isso que tanta gente tenta. O problema é o que ela libera enquanto queima: o <b>monóxido de carbono</b>, gás que não tem cheiro nem cor (informação geral) e se acumula em ambiente fechado.',
      'A fonte é direta: churrasqueira de carvão, grelhador a gás e gerador só ao ar livre. Os sintomas são dor de cabeça, náusea, fraqueza, tontura e confusão, e mesmo uma pequena quantidade do gás pode intoxicar. Dormir com brasa acesa em quarto fechado é o cenário mais grave.',
      'Para esquentar a casa, use cobertor, aquecedor elétrico em circuito dedicado e dimensionado ou roupa de cama adequada. Se alguém sentir sintomas, saia para o ar livre e chame ajuda.'
    ],
    fontes: [{ t: 'Itatiaia: como evitar intoxicação por monóxido de carbono', u: 'https://www.itatiaia.com.br/brasil/sudeste/mg/morte-de-casal-em-monte-verde-saiba-como-evitar-intoxicacao-por-monoxido-de-carbono/' }]
  },

  {
    id: 'faca-congelador', categoria: 'Casa e reparos',
    titulo: 'Faca ou chave de fenda para tirar o gelo do congelador',
    resumo: 'Sem paciência para descongelar, o gelo grudado é raspado ou quebrado com um objeto de metal.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o gelo voltar a se formar', horizonte: 8760, horizonteTxt: '1 ano',
    fatores: { A: 0.20, M: 0.35, C: 0.25 },
    riscos: { calor: 0, eletrico: 0.05, terceiros: 0.08, colateral: 0.35 },
    durabNominal: 720, custoGambiarra: 0, custoCorreto: 30, danoColateral: 1500,
    ficha: [
      ['Segundo a fonte', 'não usar facas, chaves de fenda ou objetos pontiagudos: a pressa pode perfurar o evaporador'],
      ['Consequência', 'objetos metálicos podem riscar o revestimento ou perfurar a tubulação; o aparelho perde gás refrigerante e para de funcionar'],
      ['Método da fonte', 'desligar, retirar os alimentos, proteger o chão, usar panos mornos ou recipiente com água quente e remover só o gelo já solto, com espátula plástica sem ponta'],
      ['Observação', 'reparar o sistema de refrigeração é caro e feito por técnico; a avaliação de custo é estimada pelo projeto']
    ],
    estresse: {
      variavel: 'Pressão da faca contra o gelo grudado', unidade: '% da força', de: 0, ate: 100, falhaEm: 60,
      passos: [
        { a: 20, t: 'Pequenas lascas de gelo saem com pouca força.' },
        { a: 45, t: 'O gelo mais grudado resiste e a pressão aumenta.' }
      ],
      falha: 'A ponta atravessa o gelo e fura o evaporador ou a tubulação. O aparelho perde gás e para de resfriar.', ok: ''
    },
    veredito: [
      'O gelo sai mais rápido com uma faca, mas ele está colado <b>em cima do evaporador</b>, a parte que faz o frio. O metal da faca, da chave de fenda ou do garfo pode riscar o revestimento e, o pior, perfurar a tubulação.',
      'A fonte alerta exatamente isso: a pressa pode furar o evaporador, a geladeira perde o gás refrigerante e para de funcionar, e a limpeza vira um conserto caro. É um risco que não aparece na hora e só se nota depois, quando a temperatura não desce mais.',
      'O caminho seguro é mais lento: desligar, esperar o gelo amolecer com panos mornos ou um recipiente de água quente com a porta fechada, e remover só o que já soltou com uma espátula plástica sem ponta.'
    ],
    fontes: [{ t: 'Catraca Livre: como remover o gelo de forma segura e rápida', u: 'https://catracalivre.com.br/noticias/como-remover-o-gelo-de-forma-segura-e-rapida-sem-danificar-o-seu-congelador/' }]
  },

  /* ---------------- CELULAR ---------------- */
  {
    id: 'bateria-estufada', categoria: 'Celular',
    titulo: 'Continuar usando o celular com a bateria estufada',
    resumo: 'A tela está levantando ou o aparelho não fica reto, mas ele ainda liga, então segue em uso e em carregamento.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até a bateria dar problema', horizonte: 4320, horizonteTxt: '6 meses',
    fatores: { A: 0.20, M: 0.30, C: 0.15 },
    riscos: { calor: 0.55, eletrico: 0.20, terceiros: 0.30, colateral: 0.30 },
    durabNominal: 300, custoGambiarra: 0, custoCorreto: 120, danoColateral: 5000,
    ficha: [
      ['Sinais de risco (fonte)', 'calor excessivo no carregamento, inchaço ou deformação (tela se soltando, bordas alargadas, aparelho que não fica reto) e chiados, estalos ou cheiro de queimado'],
      ['O que a fonte recomenda', 'desligar o aparelho e levar a uma assistência técnica autorizada o mais rápido possível'],
      ['Não tentar', 'como a maioria dos smartphones não permite remover a bateria, não se deve tentar fazer isso por conta própria'],
      ['Observação', 'a estimativa de custo da troca varia por modelo; é do projeto']
    ],
    estresse: {
      variavel: 'Semanas usando e carregando com a bateria estufada', unidade: 'sem', de: 0, ate: 12, falhaEm: 5,
      passos: [
        { a: 1, t: 'O aparelho funciona e a tela só está um pouco levantada.' },
        { a: 3, t: 'Ele esquenta mais ao carregar, um dos sinais de risco que a fonte lista.' }
      ],
      falha: 'A bateria deformada superaquece. A fonte aponta chiados, estalos e cheiro de plástico queimado como sinais de que há risco de incêndio.', ok: ''
    },
    veredito: [
      'Bateria estufada <b>não é defeito estético</b>. A fonte lista o inchaço, a deformação, o calor excessivo e os sons ou cheiros estranhos como sinais de risco. O celular pode continuar ligando, e é isso que engana.',
      'A recomendação é desligar o aparelho e levá-lo à assistência técnica autorizada <b>o mais rápido possível</b>. Também não vale furar, apertar ou tentar tirar a bateria em casa: o risco de piorar é maior que a economia.',
      'Enquanto isso, não carregue o aparelho, não o deixe em cima de cama, sofá ou perto de coisas inflamáveis e evite o calor. A troca da bateria sai bem mais barata que um dano maior.'
    ],
    fontes: [{ t: 'Hardware.com.br: seu celular pode pegar fogo? 3 sinais de risco com a bateria', u: 'https://www.hardware.com.br/mobile/seu-celular-pode-pegar-fogo-entenda-os-3-sinais-de-risco-com-a-bateria/' }]
  },

  {
    id: 'celular-freezer', categoria: 'Celular',
    titulo: 'Colocar o celular quente na geladeira ou no freezer',
    resumo: 'O celular esquentou demais, então vai uns minutos para o freezer para esfriar rápido.',
    unidadeDurab: 'horas', durabRotulo: 'Tempo até o celular esquentar de novo', horizonte: 720, horizonteTxt: '30 dias',
    fatores: { A: 0.15, M: 0.25, C: 0.20 },
    riscos: { calor: 0.05, eletrico: 0.12, terceiros: 0, colateral: 0.25 },
    durabNominal: 0.5, custoGambiarra: 0, custoCorreto: 5, danoColateral: 2500,
    ficha: [
      ['Segundo a fonte', 'o choque térmico faz vidro, metais, adesivos e componentes se contraírem de forma desigual; o freezer é pior que a geladeira'],
      ['Condensação', 'o vapor de água do ar vira gotículas nas superfícies frias, e a umidade pode atingir conectores e circuitos'],
      ['Bateria', 'em temperaturas muito baixas, principalmente durante a carga, as baterias de íons de lítio perdem capacidade e vida útil'],
      ['O que fazer', 'desligar, interromper o carregamento e deixar esfriar naturalmente em local fresco, seco e ventilado; evitar gelo e imersão']
    ],
    estresse: {
      variavel: 'Minutos no freezer', unidade: 'min', de: 0, ate: 20, falhaEm: 8,
      passos: [
        { a: 2, t: 'O corpo do aparelho fica gelado e parece funcionar bem.' },
        { a: 5, t: 'O vapor do ar começa a condensar nas superfícies frias.' }
      ],
      falha: 'Choque térmico e condensação: gotículas chegam aos conectores e aos circuitos, com risco de corrosão e falha.', ok: ''
    },
    veredito: [
      'Esfriar o celular na geladeira dá a sensação de ter resolvido, porque o corpo do aparelho fica gelado. O que a fonte aponta é que ele sofre <b>choque térmico</b> e <b>condensação</b>, e que a umidade pode chegar aos conectores e circuitos.',
      'Há ainda o efeito na bateria: de íons de lítio, ela perde capacidade e vida útil em frio extremo, principalmente se for carregada logo em seguida. O freezer é a pior das opções.',
      'O jeito certo é mais lento: desligar, parar de carregar, tirar o aparelho do sol e deixá-lo esfriar naturalmente em local fresco, seco e ventilado. Se ele esquenta sempre, a causa é outra, e vale investigar apps pesados ou a bateria.'
    ],
    fontes: [{ t: 'Canaltech: pode colocar celular quente na geladeira? O risco que pouca gente percebe', u: 'https://canaltech.com.br/smartphone/pode-colocar-celular-quente-na-geladeira-o-risco-que-pouca-gente-percebe/' }]
  },

  /* ---------------- AUTOMOTIVO ---------------- */
);
