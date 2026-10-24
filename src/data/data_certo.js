/* ============================================================
   "COMO SERIA O JEITO CERTO": dica curta exibida sob a barra de custo.
   Resumo prático; não substitui o manual do fabricante nem um profissional.
   ============================================================ */
const CERTO = {
  'escapamento': 'Solda no tubo ou troca do trecho furado por um silencioso/tubo novo, feita em oficina de escapamento.',
  'bombril': 'Antena externa ou interna adequada à frequência do canal, com cabo coaxial bom e apontada para a torre; no Wi-Fi, reposicionar o roteador.',
  'pombos': 'Espetos anti-pouso, tela ou rede nos pontos de pouso, e retirar a fonte de comida e água. Fixe o que usar para não cair.',
  'arroz': 'Desligar na hora, não carregar, retirar a bateria se der e levar a uma assistência. Em casa, só deixar secar desligado, em local arejado.',
  'farol-pasta': 'Kit de polimento de faróis com lixa d\'água fina e verniz protetor com filtro UV, ou polimento técnico em oficina.',
  'motor-quente': 'Dar a partida, esperar uns 10 a 30 segundos e sair com calma, sem acelerar forte, até a temperatura subir.',
  'economizador': 'Calibrar os pneus, manter filtros e óleo em dia e dirigir com suavidade. É onde o dinheiro realmente rende.',
  'banguela': 'Descer engrenado, em marcha adequada à descida, usando o freio motor e freando de leve e de forma intermitente.',
  'moeda-pneu': 'Olhar o TWI (os ressaltos no fundo do sulco) ou medir com paquímetro. Abaixo de 1,6 mm, trocar o pneu.',
  'fusivel-aluminio': 'Trocar por fusível ou disjuntor com a especificação correta. Se queimar de novo, chamar um eletricista.',
  'fio-tomada': 'Plugue novo, de boa procedência e certificado, instalado com o fio bem preso nos terminais.',
  'benjamim-t': 'Uma tomada por aparelho de potência alta, ou um filtro de linha com disjuntor e potência adequada para cargas leves.',
  'chuveiro-resistencia': 'Chuveiro de potência compatível com o circuito (fiação e disjuntor), com fio terra, instalado por eletricista.',
  'pasta-dente-termica': 'Pasta térmica própria, uma camada fina (tamanho de um grão de ervilha) após limpar o processador com álcool isopropílico.',
  'gabinete-aberto': 'Organizar os cabos, manter filtros limpos e ter ventoinhas de entrada e saída, para o ar passar por onde precisa.',
  'aluminio-roteador': 'Posicionar o roteador no centro da casa e em local alto, ou usar repetidor/mesh. Antenas externas ajudam em casos específicos.',
  'carga-noite': 'Usar o carregador original ou certificado, em tomada boa, longe de cama e tecidos. Os celulares modernos limitam a carga, mas calor e carregador ruim são o risco.',
  'carregador-generico': 'Carregador original ou de marca com certificação do Inmetro e potência compatível com o aparelho.',
  'sanitaria-vinagre': 'Nunca misturar. Usar um produto por vez, enxaguar bem entre eles e ventilar o ambiente.',
  'arroz-saleiro': 'Já funciona bem. Para sal mais úmido, guardar em pote bem vedado e longe do vapor do fogão.',
  'colher-gargalo': 'Fechar com tampa própria para espumante ou refrigerante e manter a garrafa gelada.',
  'roupa-geladeira': 'Varal em local ventilado, ou secadora; o calor da serpentina atrás da geladeira não é feito para isso.',
  'faca-chave-fenda': 'Chave de fenda do tamanho da fenda do parafuso. Custa pouco, não escapa e não quebra a ponta da faca.',
  'ar-caseiro': 'Ventilador bem posicionado e ambiente ventilado, ou um climatizador/ar-condicionado compatível com o tamanho do cômodo.'
};

/* Para o modo "Minha gambiarra": roteiro genérico por categoria */
const CERTO_CAT = {
  'Automotivo': 'Peça ou reparo certificado para o seu modelo, feito em oficina. Em item de segurança (freio, direção, pneu), sem improviso.',
  'Moto e bike': 'Peça original ou equivalente e lubrificante próprio para moto/bike. Freio, corrente e rodas, só com peça certa.',
  'Elétrica': 'Componente com a especificação certa, instalado por eletricista, com disjuntor e aterramento adequados.',
  'Eletrônicos': 'Peça ou acessório certificado, na tensão e corrente certas, com conexões firmes e isoladas.',
  'Informática e Wi-Fi': 'Componente compatível e de boa procedência, com boa ventilação e backup antes de qualquer mudança.',
  'Celular': 'Acessório original ou certificado e, no caso de dano, assistência técnica autorizada.',
  'Cozinha e limpeza': 'Produto próprio para a função, usado um por vez, seguindo o rótulo e com o ambiente ventilado.',
  'Casa e reparos': 'Fixação e material adequados ao peso e ao local (bucha, parafuso e suporte corretos), ou um profissional.',
  'Hidráulica': 'Peça ou vedação própria (fita veda-rosca, cola de PVC ou reparo epóxi para tubulação) e, se persistir, um encanador.',
  'Quintal e jardim': 'Material resistente a sol e chuva, bem fixado e estável, com eletricidade só em instalação externa adequada.',
  'Oficina e ferramentas': 'A ferramenta certa para o esforço, com a peça bem presa e EPI (óculos e luvas).'
};

Object.assign(CERTO, {
  'oleo-cozinha-corrente': 'Lubrificante próprio para corrente (ou o indicado no manual), aplicado com a corrente limpa e seca, em poucas gotas por elo.',
  'capacete-queda': 'Trocar o capacete após qualquer impacto, por um novo com selo do Inmetro. Na dúvida, o fabricante avalia.',
  'fita-cano': 'Fechar o registro, secar o local e aplicar uma fita de silicone autofundente ou massa epóxi como reparo provisório. Depois, chamar um encanador.',
  'agua-fervente-pvc': 'Desentupidor manual, limpeza do copo do sifão e tela no ralo. Água morna com detergente ajuda a soltar gordura leve.',
  'bicarbonato-vinagre-pia': 'Desentupidor manual e limpeza física do sifão. Para manutenção, tela no ralo e não jogar óleo na pia.',
  'soda-caustica-pia': 'Desentupidor manual, limpeza do sifão ou uma mola desentupidora. Em entupimento no cano da parede, chamar um profissional.',
  'sal-mata-mato': 'Capina na raiz, cobertura do solo com palha ou, se precisar de herbicida, um produto registrado usado como indica o rótulo.',
  'gelo-orquidea': 'Regar com água em temperatura ambiente, deixando o substrato quase secar entre regas. Se usar gelo, ficar em 2 a 3 cubos e observar a planta.',
  'areia-prato-vaso': 'Já é uma prática recomendada. Some a lavagem do prato duas vezes por semana, ou elimine o prato.',
  'extensao-emendada-quintal': 'Extensão própria para uso externo, sem emendas, com tomadas protegidas contra respingos e um DR no circuito.',
  'cano-chave-roda': 'Chave de roda em cruz de boa qualidade e, no aperto final, chave dinamométrica no torque do manual, em estrela.',
  'chave-fenda-alavanca': 'Abridor de latas, formão ou espátula, cada um para a sua função. A chave de fenda fica só para parafuso.',
  'pino-terra-cortado': 'Tomada de 3 pinos com fio terra instalada por eletricista. Se não der, usar aparelho de dupla isolação, sem cortar pino.'
});

Object.assign(CERTO, {
  'disjuntor-maior': 'Descobrir por que desarma: aparelho com defeito, circuito sobrecarregado ou fio fino. Se for o fio, trocar por um adequado à potência.',
  'regua-cascata': 'Uma régua com potência compatível, ligada direto na parede, e aparelhos de calor sempre direto na tomada. Pouco ponto? Pedir mais tomadas ao eletricista.',
  'gas-fosforo': 'Água com detergente espalhada na conexão: bolhas indicam vazamento. Com cheiro forte, ventilar, fechar o registro e chamar a distribuidora.',
  'alcool-churrasqueira': 'Acendedor próprio, chaminé de acendimento ou pastilhas. Se o fogo falhar, recomeçar com carvão novo, nunca com mais líquido.',
  'alcool-sanitaria': 'Um produto por vez, com ventilação, enxaguando entre eles. Água sanitária e álcool nunca juntos.',
  'braseiro-casa': 'Cobertor, roupa de cama adequada ou um aquecedor elétrico dimensionado para o circuito. Brasa e carvão só ao ar livre.',
  'faca-congelador': 'Desligar, esperar o gelo amolecer com panos mornos ou um recipiente de água quente e retirar só o que soltou, com espátula plástica sem ponta.',
  'bateria-estufada': 'Parar de usar e de carregar e levar a uma assistência técnica autorizada para trocar a bateria.',
  'celular-freezer': 'Desligar, parar de carregar e deixar esfriar naturalmente em local fresco, seco e ventilado, fora do sol e sem capa.',
});

Object.assign(CERTO, {
  'mosca-pet': 'Comida tampada, lixo fechado e bancada limpa. Se a mosca persistir, tela na janela ou armadilha própria.',
  'jornal-vidro': 'Pano de microfibra ou jornal liso (sem tinta colorida), com água e vinagre, e polir com folha seca fora do sol direto.',
  'sapato-freezer': 'Dois saquinhos bem vedados com meia água, na parte mais apertada, por algumas horas. Em sapato delicado ou caro, sapateiro.',
  'coca-ferrugem': 'Lixa fina ou esponja de aço, vinagre branco ou limão, ou um removedor específico. Luvas e secar bem depois.',
  'nintendo-soprar': 'Tirar e reencaixar o cartucho e, se persistir, limpar os contatos com um cotonete (seco ou com álcool isopropílico), sem soprar.',
  'modo-aviao': 'Carregador adequado ao aparelho. O modo avião é só um bônus pequeno, se você aguentar ficar sem notificações.',
  'apps-segundo-plano': 'Deixar o sistema gerenciar os apps e limitar o uso em segundo plano dos que mais gastam, nas configurações.',
  'chupeta-carro': 'Seguir a ordem dos cabos (vermelho nos dois positivos, preto no negativo da doadora, última garra em metal do motor). Se arriar de novo, trocar a bateria.',
  'cebola-fosforo': 'Cebola na geladeira de 20 a 30 minutos antes de cortar e faca bem afiada. Sem fósforo na boca.',
  'descongelar-pia': 'Passar da noite para a geladeira, ou usar o micro-ondas na função descongelar e cozinhar logo em seguida.',
  'sal-vinho': 'Absorver o excesso na hora, enxaguar com água fria, sal por alguns minutos e, se ficar, detergente neutro ou removedor específico.',
  'pasta-dente-queimadura': 'Água limpa em temperatura ambiente por 15 a 20 minutos, sem estourar bolhas, e médico se a queimadura for séria.',
  'vitamina-b-repelente': 'Repelente de farmácia com DEET, icaridina ou IR 35, e eliminar água parada.'
});
