/* ============================================================
   PERIGO — gravidade do pior desfecho plausível, separada da probabilidade
   nivel 'critico': pode matar ou ferir gravemente (choque, gás, explosão, intoxicação, queda de moto)
   nivel 'atencao': pode machucar ou causar prejuízo sério se der errado
   tipos : o que pode acontecer
   quando: em que situação o perigo aparece
   nunca : a regra curta que não deve ser quebrada
   A classificação é um julgamento do projeto, baseado no pior desfecho possível; não é medição.
   ============================================================ */
const PERIGO = {
  /* ---------- críticos ---------- */
  'fusivel-aluminio': { nivel: 'critico', tipos: ['Incêndio', 'Choque elétrico'],
    quando: 'Quando há sobrecarga ou curto: sem o fusível, nada corta a corrente e o fio esquenta até pegar fogo.',
    nunca: 'Nunca substitua fusível ou disjuntor por papel alumínio, arame ou moeda.' },
  'fio-tomada': { nivel: 'critico', tipos: ['Choque elétrico', 'Incêndio'],
    quando: 'Ao encostar no fio, ao desconectar com a mão ou quando o fio se solta e encosta no outro.',
    nunca: 'Nunca enfie fio descascado na tomada. Use plugue.' },
  'chuveiro-resistencia': { nivel: 'critico', tipos: ['Choque elétrico', 'Incêndio', 'Queimadura'],
    quando: 'Com o corpo molhado, qualquer fuga de corrente passa por você; e a resistência alterada puxa mais corrente do que o fio aguenta.',
    nunca: 'Nunca altere a resistência do chuveiro nem ligue o aparelho com o fio terra desligado.' },
  'extensao-emendada-quintal': { nivel: 'critico', tipos: ['Choque elétrico', 'Incêndio'],
    quando: 'Chuva, grama molhada, piso molhado ou pé descalço perto da emenda.',
    nunca: 'Nunca use emenda de fita isolante ao ar livre.' },
  'pino-terra-cortado': { nivel: 'critico', tipos: ['Choque elétrico'],
    quando: 'Quando o aparelho tem uma fuga de corrente: sem o terra, a carcaça fica energizada e a primeira pessoa que encostar leva o choque.',
    nunca: 'Nunca corte o pino terra nem use adaptador sem terra em aparelho que pede aterramento.' },
  'sanitaria-vinagre': { nivel: 'critico', tipos: ['Gás tóxico', 'Intoxicação'],
    quando: 'Ao misturar: o cloro da água sanitária é liberado como gás e irrita olhos, nariz e pulmões, principalmente em banheiro fechado.',
    nunca: 'Nunca misture água sanitária com ácidos (vinagre, limpa-pedras) nem com outros produtos.' },
  'soda-caustica-pia': { nivel: 'critico', tipos: ['Queimadura química', 'Lesão nos olhos', 'Água fervente'],
    quando: 'Ao dissolver em água (esquenta muito), ao respingar ou quando o ralo devolve a mistura.',
    nunca: 'Nunca use sem óculos, luvas e ventilação, e nunca misture com outros produtos.' },
  'capacete-queda': { nivel: 'critico', tipos: ['Traumatismo craniano'],
    quando: 'Na queda seguinte: o capacete já absorveu um impacto e pode ter perdido a capacidade de absorver outro, mesmo sem trinca à vista.',
    nunca: 'Nunca reutilize capacete que sofreu queda ou impacto forte.' },

  /* ---------- atenção ---------- */
  'escapamento': { nivel: 'atencao', tipos: ['Queimadura', 'Gás de escapamento (CO)'],
    quando: 'Ao mexer na peça quente ou se o remendo falhar e o gás passar a entrar na cabine.',
    nunca: 'Nunca aplique em escapamento quente nem rode com cheiro de gás dentro do carro.' },
  'arroz': { nivel: 'atencao', tipos: ['Curto-circuito', 'Bateria danificada'],
    quando: 'Ao ligar ou carregar o celular ainda úmido por dentro.',
    nunca: 'Nunca carregue um celular que ficou molhado antes de secar por completo.' },
  'carga-noite': { nivel: 'atencao', tipos: ['Superaquecimento', 'Incêndio'],
    quando: 'Principalmente com carregador ruim, celular coberto por travesseiro, cama ou capa, ou bateria já danificada.',
    nunca: 'Nunca carregue o celular coberto ou em cima da cama.' },
  'carregador-generico': { nivel: 'atencao', tipos: ['Superaquecimento', 'Incêndio', 'Choque elétrico'],
    quando: 'Quando o carregador não tem as proteções internas: ele esquenta, derrete ou passa tensão errada ao aparelho.',
    nunca: 'Nunca deixe carregador sem certificação ligado sem supervisão, nem perto de cama ou cortina.' },
  'roupa-geladeira': { nivel: 'atencao', tipos: ['Superaquecimento do aparelho', 'Umidade na parte elétrica'],
    quando: 'Quando a roupa cobre a grade traseira e impede a ventilação, ou quando pinga água na parte elétrica.',
    nunca: 'Nunca cubra a grade ou o motor da geladeira.' },
  'ar-caseiro': { nivel: 'atencao', tipos: ['Choque elétrico'],
    quando: 'Quando a água derretida respinga na tomada, na régua ou no próprio ventilador.',
    nunca: 'Nunca deixe água ou gelo em cima ou perto de tomada e ventilador.' },
  'agua-fervente-pvc': { nivel: 'atencao', tipos: ['Queimadura', 'Cano deformado'],
    quando: 'Ao despejar água fervendo no ralo, que pode espirrar de volta, e em cano de PVC, que amolece.',
    nunca: 'Nunca despeje água fervendo em ralo com tampa baixa ou em cano de PVC.' },
  'cano-chave-roda': { nivel: 'atencao', tipos: ['Roda solta', 'Lesão por escorregão da chave'],
    quando: 'Ao apertar demais, quebrando o parafuso, ou ao apertar de menos e a roda ficar frouxa.',
    nunca: 'Nunca rode com roda recém-trocada sem conferir o aperto com a chave correta.' },
  'chave-fenda-alavanca': { nivel: 'atencao', tipos: ['Corte', 'Projétil'],
    quando: 'Quando a ponta escorrega ou quebra e a mão vai junto.',
    nunca: 'Nunca faça força em direção à mão ou ao corpo.' },
  'faca-chave-fenda': { nivel: 'atencao', tipos: ['Corte', 'Choque elétrico'],
    quando: 'Quando a faca escorrega do parafuso, ou ao mexer em parte elétrica ligada com ferramenta metálica.',
    nunca: 'Nunca use ferramenta metálica em aparelho ligado na tomada.' },
  'oleo-cozinha-corrente': { nivel: 'atencao', tipos: ['Queda de moto ou bike'],
    quando: 'Quando o óleo respinga no pneu traseiro ou na pista em curva e freada.',
    nunca: 'Nunca deixe lubrificante respingar no pneu ou no freio.' },
  'banguela': { nivel: 'atencao', tipos: ['Perda de freio', 'Acidente de trânsito'],
    quando: 'Em descida longa: o freio superaquece e sem o freio-motor o carro ganha velocidade com menos controle.',
    nunca: 'Nunca desça serra com o carro em ponto morto.' },
  'moeda-pneu': { nivel: 'atencao', tipos: ['Pneu liso', 'Acidente de trânsito'],
    quando: 'Em chuva, quando o pneu já não escoa a água e o carro aquaplana.',
    nunca: 'Nunca dependa de moeda para decidir a troca de pneu; meça o sulco com o indicador do pneu.' },
  'benjamim-t': { nivel: 'atencao', tipos: ['Sobrecarga', 'Incêndio'],
    quando: 'Quando vários aparelhos de potência alta (chuveiro, ferro, micro-ondas, aquecedor) dividem a mesma tomada.',
    nunca: 'Nunca ligue aparelho de potência alta em benjamim.' }
};

/* ---------- Lote 3 ---------- */
Object.assign(PERIGO, {
  'disjuntor-maior': { nivel: 'critico', tipos: ['Incêndio', 'Choque elétrico'],
    quando: 'Quando a carga passa do que o fio aguenta: o disjuntor maior deixa a corrente passar e o fio esquenta dentro da parede.',
    nunca: 'Nunca troque o disjuntor por um de amperagem maior sem trocar o fio por um adequado.' },
  'regua-cascata': { nivel: 'atencao', tipos: ['Superaquecimento', 'Incêndio'],
    quando: 'Quando aparelhos de potência alta (aquecedor, secador, forno) dividem a mesma régua, ou com ela coberta.',
    nunca: 'Nunca ligue régua em régua e nunca ligue aparelho de calor em régua.' },
  'gas-fosforo': { nivel: 'critico', tipos: ['Explosão', 'Incêndio', 'Queimadura grave'],
    quando: 'Ao aproximar chama de um ambiente com gás vazando: a mistura de gás e ar pega fogo de uma vez.',
    nunca: 'Nunca procure vazamento de gás com chama. Use água com detergente e, com cheiro, ventile e saia.' },
  'alcool-churrasqueira': { nivel: 'critico', tipos: ['Queimadura grave', 'Explosão'],
    quando: 'Ao jogar líquido sobre brasa ou fogo já acesos, ou ao usar um líquido mais volátil que o álcool.',
    nunca: 'Nunca jogue líquido inflamável sobre fogo ou brasa. Use acendedor próprio.' },
  'alcool-sanitaria': { nivel: 'critico', tipos: ['Gás tóxico', 'Intoxicação'],
    quando: 'Ao misturar os dois produtos, principalmente em ambiente fechado.',
    nunca: 'Nunca misture produtos de limpeza. Um por vez, com ventilação.' },
  'braseiro-casa': { nivel: 'critico', tipos: ['Monóxido de carbono', 'Intoxicação', 'Incêndio'],
    quando: 'Com janelas fechadas ou ao dormir: o gás não tem cheiro e a pessoa pode perder a consciência antes de perceber.',
    nunca: 'Nunca use brasa, carvão ou gerador em ambiente fechado. Só ao ar livre.' },
  'faca-congelador': { nivel: 'atencao', tipos: ['Geladeira inutilizada', 'Perda de gás refrigerante'],
    quando: 'Quando a ponta atravessa o gelo e encontra o evaporador ou a tubulação.',
    nunca: 'Nunca use faca ou chave de fenda no gelo do congelador. Desligue e deixe derreter.' },
  'bateria-estufada': { nivel: 'critico', tipos: ['Incêndio', 'Queimadura'],
    quando: 'Ao carregar, esquentar ou pressionar a bateria deformada, e principalmente ao dormir com o aparelho por perto.',
    nunca: 'Pare de usar, não carregue, não fure e leve a uma assistência técnica autorizada.' }
});

/* ---------- Lote 4 ---------- */
Object.assign(PERIGO, {
  'chupeta-carro': { nivel: 'atencao', tipos: ['Explosão da bateria', 'Queimadura', 'Dano eletrônico'],
    quando: 'Ao inverter a polaridade ou ao encostar a última garra perto da bateria, onde há gases inflamáveis.',
    nunca: 'Nunca inverta a polaridade: vermelho no positivo e a última garra preta em metal do motor, longe da bateria.' },
  'descongelar-pia': { nivel: 'atencao', tipos: ['Contaminação', 'Intoxicação alimentar'],
    quando: 'Quando a carne passa horas em temperatura ambiente enquanto o centro ainda descongela.',
    nunca: 'Nunca descongele carne à temperatura ambiente. Geladeira ou micro-ondas.' },
  'pasta-dente-queimadura': { nivel: 'atencao', tipos: ['Queimadura pior', 'Infecção'],
    quando: 'Ao cobrir a queimadura com pasta de dente, óleo, manteiga ou outras receitas caseiras.',
    nunca: 'Nunca passe pasta de dente, óleo ou manteiga na queimadura. Água limpa por 15 a 20 minutos e, se for séria, médico.' },
  'vitamina-b-repelente': { nivel: 'atencao', tipos: ['Falsa proteção', 'Dengue, zika e chikungunya'],
    quando: 'Quando a pessoa acredita estar protegida e deixa de usar o repelente.',
    nunca: 'Nunca dispense o repelente por causa de vitamina.' }
});

/* Nome do tipo de alerta mostrado no título do banner */
const PERIGO_TITULO = {
  critico: 'PERIGO GRAVE',
  atencao: 'ATENÇÃO: RISCO REAL',
};

/* ---------- Detecção no modo "Minha gambiarra" ----------
   O texto é comparado sem acento e em minúsculas. 're' sozinha dispara a regra;
   com 'e', as duas precisam aparecer. É um alerta por palavras: pode errar para os dois lados. */
const PERIGO_TEXTO = [
  { re: /gato de (energia|luz)|ligar direto na rede|puxar (energia|luz) do poste|desviar energia|pular o medidor|antes do medidor/, nivel: 'critico',
    tipos: ['Choque elétrico', 'Incêndio'], motivo: 'Ligação direta na rede elétrica.', nunca: 'Não mexa na rede, no poste ou no medidor. Só a concessionária pode.' },
  { re: /desencap|descasc|sem plugue|fio na tomada|enfiar fio|emenda|cortar o (pino|terra)|pino terra|fio terra|terra no neutro/, nivel: 'critico',
    tipos: ['Choque elétrico', 'Incêndio'], motivo: 'Mexe em fio, emenda ou aterramento da instalação.', nunca: 'Desligue o disjuntor antes e chame eletricista para tudo que for instalação.' },
  { re: /fusivel|disjuntor|\bdr\b/, e: /alumin|arame|maior|trocar|anular|bypass|pular|prender|travar|colocar um de/, nivel: 'critico',
    tipos: ['Incêndio', 'Choque elétrico'], motivo: 'Tira ou enfraquece uma proteção elétrica.', nunca: 'Nunca anule fusível, disjuntor ou DR. Eles existem para desligar o circuito.' },
  { re: /vazamento de gas|gas de cozinha|botijao|mangueira de gas|encanamento de gas|macarico|fogao.*(gas|vazando)/, nivel: 'critico',
    tipos: ['Explosão', 'Incêndio', 'Intoxicação'], motivo: 'Envolve gás combustível.', nunca: 'Com cheiro de gás: feche o registro, abra as janelas e não acione interruptores nem chama. Chame a distribuidora.' },
  { re: /gasolina|alcool|thinner|solvente|querosene|diesel|inflamavel/, e: /fogo|acender|churrasqueira|fogueira|brasa|chama|isqueiro|fosforo/, nivel: 'critico',
    tipos: ['Queimadura grave', 'Explosão'], motivo: 'Líquido inflamável perto de fogo.', nunca: 'Nunca jogue líquido inflamável sobre fogo ou brasa.' },
  { re: /cloro|sanitaria|alvejante|amonia|muriatico|acido|soda caustica|desentupidor quimico/, e: /mistur|junt|combin|\+|com (vinagre|alcool|amonia|acido|cloro|sanitaria|detergente|desinfetante)/, nivel: 'critico',
    tipos: ['Gás tóxico', 'Queimadura química'], motivo: 'Mistura de produtos químicos.', nunca: 'Nunca misture produtos de limpeza. Use um por vez, com o ambiente ventilado.' },
  { re: /soda caustica|acido muriatico|acido sulfurico|decapante/, nivel: 'critico',
    tipos: ['Queimadura química', 'Lesão nos olhos'], motivo: 'Produto corrosivo.', nunca: 'Use óculos, luvas e ventilação, e jamais misture com outro produto.' },
  { re: /carvao|brasa|churrasqueira|gerador|braseiro|fogareiro|(forno|fogao).*(aquec|esquent)/, e: /dentro de casa|ambiente fechado|quarto|sala|garagem|sem ventila|janela fechada|para esquentar|para aquecer/, nivel: 'critico',
    tipos: ['Monóxido de carbono', 'Intoxicação'], motivo: 'Combustão em ambiente fechado.', nunca: 'Brasa, carvão e gerador só ao ar livre. O monóxido de carbono não tem cheiro.' },
  { re: /freio|direcao|cinto de seguranca|suspensao|airbag|barra de direcao/, nivel: 'critico',
    tipos: ['Acidente grave'], motivo: 'Mexe em item de segurança do veículo.', nunca: 'Freio, direção, suspensão e cinto não aceitam improviso. Peça de reposição e oficina.' },
  { re: /bateria|celular|power ?bank|litio/, e: /estufad|inchad|furad|abrir a bateria|pegando fogo/, nivel: 'critico',
    tipos: ['Incêndio', 'Queimadura'], motivo: 'Bateria de lítio danificada ou superaquecendo.', nunca: 'Pare de usar, não carregue, não fure e leve a uma assistência autorizada.' },
  { re: /gasolina|alcool|thinner|solvente|querosene|diesel|acetona|inflamavel|gas de cozinha/, nivel: 'atencao',
    tipos: ['Incêndio', 'Queimadura'], motivo: 'Produto inflamável envolvido.', nunca: 'Longe de chama, faísca e calor, e com o ambiente ventilado.' },
  { re: /capacete|escada|andaime|telhado|laje|altura/, nivel: 'atencao',
    tipos: ['Queda'], motivo: 'Envolve proteção contra queda ou trabalho em altura.', nunca: 'Trabalho em altura pede apoio firme, pessoa de apoio e equipamento certo.' },
  { re: /esmerilhadeira|serra circular|serra mármore|disco de corte|furadeira|marreta|motosserra/, nivel: 'atencao',
    tipos: ['Corte', 'Projétil'], motivo: 'Ferramenta de corte ou impacto.', nunca: 'Óculos de proteção, luvas e a proteção original da ferramenta, sempre.' },
  { re: /pneu|roda/, nivel: 'atencao',
    tipos: ['Acidente de trânsito'], motivo: 'Envolve pneu ou roda.', nunca: 'Pneu e roda são itens de segurança. Troque o que estiver gasto ou danificado.' },
  { re: /agua|chuva|molhad|banho|piscina|quintal|umid/, e: /tomada|fio|extensao|eletric|110|127|220|energia/, nivel: 'critico',
    tipos: ['Choque elétrico'], motivo: 'Água perto de eletricidade.', nunca: 'Água e eletricidade juntas: desligue o disjuntor e use equipamento próprio para área molhada.' }
];

/* Combina regras, controles e categoria numa classificação única para o modo "Minha gambiarra" */
function perigoDoModoCustom(txt, sl, cat) {
  const t = semAcento(txt || '');
  const hits = [];
  PERIGO_TEXTO.forEach((r) => { if (r.re.test(t) && (!r.e || r.e.test(t))) hits.push(r); });
  if (sl.eletrico >= 8) hits.push({ nivel: 'critico', tipos: ['Choque elétrico', 'Incêndio'], motivo: 'Você marcou eletricidade 8 ou mais (rede de 127/220 V).', nunca: 'Instalação da rede é serviço de eletricista.' });
  else if (sl.eletrico >= 5) hits.push({ nivel: 'atencao', tipos: ['Choque elétrico'], motivo: 'Você marcou eletricidade 5 ou mais.', nunca: 'Desligue o disjuntor antes de mexer.' });
  if (sl.calor >= 9) hits.push({ nivel: 'atencao', tipos: ['Queimadura', 'Incêndio'], motivo: 'Você marcou calor 9 ou mais.', nunca: 'Nada inflamável por perto e ninguém sozinho no local.' });
  if (sl.grav >= 9) hits.push({ nivel: 'atencao', tipos: ['Lesão grave'], motivo: 'Você marcou gravidade 9 ou mais se falhar.', nunca: 'Se a falha machuca, não faça sem proteção e sem teste.' });
  if (cat === 'Elétrica') hits.push({ nivel: 'atencao', tipos: ['Choque elétrico', 'Incêndio'], motivo: 'Categoria Elétrica.', nunca: 'Desligue o disjuntor antes de mexer.' });
  if (!hits.length) return null;
  const nivel = hits.some((h) => h.nivel === 'critico') ? 'critico' : 'atencao';
  const principais = hits.filter((h) => h.nivel === nivel);
  const tipos = [...new Set(principais.flatMap((h) => h.tipos))].slice(0, 4);
  const motivos = [...new Set(hits.map((h) => h.motivo))].slice(0, 3).join(' ');
  return {
    nivel, tipos,
    quando: motivos + ' Este é um alerta automático por palavras e controles: pode acertar ou errar, e não enxerga o que você não descreveu.',
    nunca: principais[0].nunca,
  };
}
