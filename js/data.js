// Conteúdo do site. Para trocar um texto ou vídeo, basta editar aqui.

// Para incluir um acabamento: gere os takes em tools/gerar-takes.js e adicione a linha aqui.
// A contagem de acabamentos do site se atualiza sozinha.
const FINISHES = [
  { id: 'ouro', name: 'Ouro', group: 'Hot stamping' },
  { id: 'dourado', name: 'Dourado', group: 'Hot stamping' },
  { id: 'prata', name: 'Prata', group: 'Hot stamping' },
  { id: 'azul', name: 'Azul', group: 'Hot stamping' },
  { id: 'vermelho', name: 'Vermelho', group: 'Hot stamping' },
  { id: 'arco-iris', name: 'Arco-íris', group: 'Hot stamping' },
  { id: 'fosco', name: 'Fosco', group: 'Laminações e vernizes' },
  { id: 'verniz-localizado', name: 'Verniz localizado', group: 'Laminações e vernizes' },
  { id: 'fosca-verniz', name: 'Fosca + verniz', group: 'Laminações e vernizes' },
  { id: 'brilho-total', name: 'Brilho total', group: 'Laminações e vernizes' },
];

const WINNERS = [
  { id: 'bwpW98BEYzM', prize: 'A casa própria', who: 'Dona Francisca', where: 'nunca desistiu do sonho', metric: '+344 mil views' },
  { id: 'vhuQgJuOO_c', prize: 'R$ 1 milhão', who: 'Tarcísio', where: 'Ribeirão das Neves, MG' },
  { id: 'hM3S2aeSBxc', prize: 'R$ 1 milhão', who: 'Paulo', where: 'Leme, SP' },
  { id: 'cGAJ4sT0GOw', prize: 'R$ 1 milhão', who: 'Rosinéia', where: 'Paraná' },
  { id: 'X2fSu0kBaYA', prize: '12 HB20', who: 'Miller', where: 'São Vicente, SP' },
  { id: 'LHakPjkGvs8', prize: 'Meio milhão', who: 'Carlos, o motoboy', where: 'Campinas, SP' },
  { id: 'mH9F5wsGW1M', prize: 'Meio milhão', who: 'Zenaide', where: 'e ainda ajudou o Hospital de Amor' },
  { id: '9oyiK_gAsGw', prize: 'Meio milhão', who: 'A taxista', where: 'que acreditou na sorte' },
  { id: 't87r9Y6HSIM', prize: 'R$ 142 mil', who: 'A ganhadora', where: 'Pernambuco' },
];

const PROJECTS = {
  futuraim: {
    title: 'Enobrecimentos gráficos em 3D',
    tag: '3D & e-commerce · GIV Online',
    client: 'GIV Online', role: 'Artista 3D, materiais e iluminação',
    tools: 'Blender, Cycles / Eevee, After Effects, Photoshop', year: '2026',
    thumb: 'midia/takes/azul.webp',
    media: { type: 'lab' },
    overview: [
      'Um dos maiores desafios do e-commerce gráfico é mostrar como um acabamento especial se comporta na luz: uma foto estática não transmite o brilho do hot stamping, o contraste do verniz localizado ou o efeito furta-cor da laminação holográfica.',
      'Para resolver isso, desenvolvi no Blender uma biblioteca de vídeos de enobrecimentos: hot stamping em seis cores, além de laminações e vernizes. Todos usam a mesma peça, câmera e rotação, o que permite comparar os acabamentos lado a lado.',
    ],
    steps: [
      ['Materiais no Blender', 'Shaders de cada acabamento: reflexo metálico do foil, base fosca sem brilho e verniz espelhado só nas áreas mascaradas.'],
      ['Luz e rotação padronizadas', 'Uma única cena de estúdio com luz em movimento e rotação idêntica, para que as diferenças vistas sejam do material, e não da câmera ou da luz.'],
      ['Entrega para o e-commerce', 'Exportação em loops leves e contínuos para as páginas de produto, ajudando o cliente a escolher o acabamento antes da compra.'],
    ],
  },
  hipercap: {
    thumb: 'midia/img/K5JGDsgCqSY.webp',
    blurb: 'Cartelas de prêmio e tipografia cinética para a TV aberta, com ritmo de até 25 peças por semana.',
    title: 'Hiper Cap Brasil — Comerciais de TV',
    tag: 'Comerciais de TV · 29 peças',
    client: 'Hiper Cap Brasil / Inspira Comunicação Integrada', role: 'Motion Designer',
    tools: 'After Effects, Premiere Pro, Illustrator', year: '2024 – 2026',
    listLabel: 'Comerciais',
    media: {
      type: 'youtube',
      items: [
        ['K5JGDsgCqSY', 'Comercial — 17/07/2024'], ['0hhMuKlxWz4', 'Campanha R$ 2,00 — 23/05/2025'],
        ['qmMOsHa9_TQ', 'Especial de Natal — 24/12/2025'], ['WtCTLH9oPCc', 'Campanha Correios'],
        ['BJQjBu8eCMc', 'Comercial — 19/04/2026'], ['L7ZL5v_BKyI', 'Comercial — 22/03/2026'],
        ['gm0KtBq5JOU', 'Comercial — 01/03/2026'], ['VqtBc5E6jA4', 'Comercial — 10/12/2025'],
        ['kXoIQegQXPQ', 'Comercial — 03/12/2025'], ['o27uzALKstg', 'Comercial — 26/11/2025'],
        ['r7wo4JzIXsI', 'Comercial — 19/11/2025'], ['PT1zaFwDxEg', 'Comercial — 05/11/2025'],
        ['N7MoUw-2Zio', 'Comercial — 03/09/2025'], ['PIBhb-s29ms', 'Comercial — 30/07/2025'],
        ['_-q4QaCASXo', 'Comercial — 14/07/2025'], ['y2mWfu0J0z8', 'Comercial — 07/07/2025'],
        ['XHd191WiDio', 'Comercial — 02/07/2025'], ['X0sRWRv4Ar0', 'Comercial — 30/04/2025'],
        ['fSxMKvM6484', 'Comercial — 23/04/2025'], ['1zU8OazW8-0', 'Comercial — 14/04/2025'],
        ['mSSNpPxx5C4', 'Comercial — 04/04/2025'], ['rLA1WnsnjME', 'Comercial — 19/03/2025'],
        ['eQdLAKAIWC8', 'Comercial — 19/02/2025'], ['D8QGsNcXYcY', 'Comercial — 29/01/2025'],
        ['7XFi5-vZT5M', 'Comercial — 08/01/2025'], ['IVxPqvUsSVQ', 'Comercial — 12/12/2024'],
        ['fmuqxfJplec', 'Comercial — 04/12/2024'], ['0k-jjlliXoU', 'Comercial — 31/07/2024'],
        ['vFr5UgK0rwY', 'Comercial — 24/07/2024'],
      ],
    },
    overview: [
      'Pela agência Inspira Comunicação Integrada, fui responsável pelo motion design dos comerciais do Hiper Cap Brasil, título de capitalização veiculado semanalmente na TV aberta e nas redes sociais. O ritmo de produção da conta chegava a 25 peças por semana.',
      'Os comerciais reúnem cartelas animadas dos prêmios da semana, tipografia cinética sincronizada com a locução e campanhas especiais, como a mudança de preço para R$ 2,00, a ação com os Correios e os especiais de fim de ano. Também criei o motion de comerciais nacionais com Fernanda Gentil e Ciro Bottini.',
    ],
    steps: [
      ['Templates no After Effects', 'Templates reutilizáveis para cartelas de prêmios, valores e textos legais, agilizando as trocas semanais de conteúdo.'],
      ['Um conteúdo, vários formatos', 'Adaptação das peças para TV (16:9), redes sociais e telões de LED do estúdio da Jovem Pan durante as transmissões ao vivo.'],
      ['Ritmo e sincronia', 'Animações sincronizadas com locução e trilha, com cortes rápidos e contraste alto para leitura imediata na tela da TV.'],
    ],
  },
  apcap: {
    thumb: 'midia/img/apcap.webp', focus: '50% 90%',
    blurb: 'Dia das Mulheres construído a partir de depoimentos reais, mais um spot de Páscoa com VFX.',
    title: 'Apcap da Sorte — Dia das Mulheres e Páscoa',
    tag: 'Reels · +1M views',
    client: 'Apcap da Sorte', role: 'Editora de Vídeo & Motion Designer',
    tools: 'Premiere Pro, After Effects, DaVinci Resolve', year: '2026',
    media: {
      type: 'reels',
      items: [
        ['DVhWRrYiC6O', 'Dia das Mulheres', '+1M views orgânicas. Montagem a partir de depoimentos reais.'],
        ['DVkBm8yitox', 'Superação', 'Segundo vídeo, dando continuidade à narrativa da campanha.'],
        ['DWhkkuejiWL', 'Páscoa VFX', 'Spot com efeitos visuais, tracking e ritmo promocional.'],
      ],
    },
    overview: [
      'Para a Apcap da Sorte, editei a campanha do Dia Internacional da Mulher no formato Reels. A peça principal, construída a partir de depoimentos reais, ultrapassou 1 milhão de visualizações orgânicas no Instagram e ganhou um segundo vídeo dando continuidade à narrativa.',
      'Na mesma conta, produzi o comercial de Páscoa para redes sociais, combinando efeitos visuais, rastreamento de elementos e ritmo promocional pensado para o formato vertical.',
    ],
    steps: [
      ['Narrativa a partir dos depoimentos', 'Montagem guiada pela emoção das entrevistas, priorizando falas espontâneas e um gancho forte nos primeiros segundos do Reel.'],
      ['Cor e tratamento', 'Correção de cor no DaVinci Resolve com tons de pele naturais e acolhedores, mantendo a unidade visual entre os vídeos.'],
      ['VFX para o spot de Páscoa', 'Composição de elementos gráficos com tracking no After Effects e sound design para reforçar a chamada promocional.'],
    ],
  },
  fiocruz: {
    thumb: 'midia/img/eXqvbxnqGUk.webp',
    blurb: 'Série de animações 2D que traduz ciência para o público geral, com ilustrações próprias.',
    title: 'Fiocruz — Série Biodiversidade',
    tag: 'Divulgação científica · 7 episódios',
    client: 'Fiocruz (Fundação Oswaldo Cruz)', role: 'Motion Designer 2D & Ilustradora',
    tools: 'After Effects, Illustrator', year: '2024',
    listLabel: 'Episódios',
    media: {
      type: 'youtube',
      items: [
        ['eXqvbxnqGUk', '01 — Introdução aos Ecossistemas'], ['7i2pE-Ob4b4', '02 — Fauna Ameaçada e Conservação'],
        ['LIVqEBVG5wU', '03 — Florestas Tropicais e Clima'], ['SWJSkCxNZrQ', '04 — Água e Saúde Pública'],
        ['9vdm_8W9hpo', '05 — Microrganismos e Biotecnologia'], ['LIeQ1101nMo', '06 — Ações Sustentáveis e Comunidade'],
        ['mUl6lnZOOzs', '07 — O Futuro e as Próximas Gerações'],
      ],
    },
    overview: [
      'Série de divulgação científica produzida para a Fundação Oswaldo Cruz com 7 episódios animados sobre a biodiversidade brasileira: ecossistemas, fauna ameaçada, florestas e clima, água e saúde pública, microrganismos e biotecnologia, ações sustentáveis e o futuro das próximas gerações.',
      'O desafio foi transformar conteúdos científicos em animações claras e atraentes para o público geral, com ilustrações vetoriais próprias e uma linguagem visual consistente ao longo de toda a série.',
    ],
    steps: [
      ['Ilustração vetorial', 'Biomas, animais, plantas e microrganismos criados no Illustrator, com estilo limpo e fiel ao conteúdo científico.'],
      ['Animação no After Effects', 'Trim paths, puppet pins e hierarquias de nulls para dar vida aos elementos e explicar processos ecológicos de forma didática.'],
      ['Unidade da série', 'Padronização de cores, transições e ritmo entre os 7 episódios, criando uma identidade visual reconhecível.'],
    ],
  },
  ciclos: {
    thumb: 'midia/img/UzaQfYYg1M4.webp',
    blurb: 'Montagem, mapas animados e cor para um documentário sobre a memória de Salesópolis.',
    title: 'Ciclos — Documentário',
    tag: 'Documentário · Cultura',
    client: 'Prefeitura de Salesópolis / Lei Paulo Gustavo', role: 'Editora, Motion Designer & Colorista',
    tools: 'Premiere Pro, After Effects, DaVinci Resolve', year: '2024 – 2025',
    media: { type: 'youtube', items: [['UzaQfYYg1M4', 'Ciclos — Documentário']] },
    overview: [
      'Projeto audiovisual realizado com recursos do edital da Lei Paulo Gustavo, em parceria com a Prefeitura de Salesópolis. O documentário Ciclos registra a história, a cultura e a memória das comunidades da região.',
      'Fui responsável pela montagem, pelo motion design de apoio, incluindo mapas animados que situam o espectador nos locais e trajetos citados, e pela correção de cor, buscando uma narrativa humana e respeitosa, com referência direta ao documentário Ilha das Flores (1989).',
    ],
    steps: [
      ['Montagem dos depoimentos', 'Entrevistas e imagens de apoio organizadas em uma narrativa clara, valorizando a fala e a memória dos moradores.'],
      ['Mapas e grafismos', 'Animação de mapas e documentos de arquivo no After Effects para contextualizar cada relato.'],
      ['Cor e som', 'Correção de cor no DaVinci Resolve e tratamento de áudio para garantir unidade visual e boa inteligibilidade das falas.'],
    ],
  },
  pdv: {
    thumb: 'midia/img/uX8BytdZhzA.webp',
    blurb: 'Loops sem emenda para telas de loja: leitura rápida, à distância e sem depender de som.',
    title: 'PDV — FuturaIM',
    tag: 'Ponto de venda · 3 peças',
    client: 'FuturaIM', role: 'Motion Designer',
    tools: 'After Effects, Illustrator', year: '2026',
    listLabel: 'Peças',
    media: {
      type: 'youtube',
      items: [
        ['uX8BytdZhzA', 'Setembro 2026'], ['5O6MNSaMNn4', 'Agosto 2026'], ['9EBvxx3UstQ', 'Julho 2026'],
      ],
    },
    overview: [
      'Vídeos para telas em ambiente de loja têm regras próprias: precisam chamar atenção à distância, funcionar sem som e repetir o dia inteiro sem que o espectador perceba o corte do loop.',
      'Para a FuturaIM, desenvolvi animações em loop que destacam produtos e ofertas com tipografia grande, hierarquia clara de informação e transições contínuas entre o início e o fim do vídeo.',
    ],
    steps: [
      ['Loop sem emenda', 'Movimento planejado para que o último quadro se conecte ao primeiro, criando uma repetição sem cortes visíveis.'],
      ['Leitura rápida', 'Textos curtos e em tamanho grande, pensados para serem lidos em poucos segundos por quem passa pela loja.'],
      ['Identidade da marca', 'Aplicação consistente das cores e da identidade visual da FuturaIM.'],
    ],
  },
  graficamente: {
    thumb: 'midia/img/graficamente.webp',
    blurb: 'Tutoriais técnicos sobre arquivos de impressão, com edição que guia o olhar até o detalhe.',
    title: 'Graficamente — Série de tutoriais',
    tag: 'Série para YouTube · 5 episódios',
    client: 'FuturaIM', role: 'Edição & Motion',
    tools: 'Premiere Pro, After Effects', year: '2026',
    listLabel: 'Episódios',
    media: {
      type: 'youtube',
      items: [
        ['0yViJxYpfvk', 'Adesivo com Hot Stamping'], ['h2iMe-3mtq4', 'Adesivo com Verniz Localizado'],
        ['nMExJd-OhIU', 'Faca de Corte Especial'], ['koNwFnbTsgY', 'Camiseta Dry Fit'],
        ['YA4AdmYoRTs', 'Chuteira Rosa (vertical)', 'v'],
      ],
    },
    overview: [
      'Na série Graficamente, Victor Nakamura ensina quem trabalha com design a preparar arquivos para impressão. O conteúdo é técnico, então a edição precisa manter o ritmo sem perder clareza.',
      'A montagem alterna a apresentação em estúdio com a tela do programa, usando zooms e grafismos para guiar o olhar até o detalhe certo. Em Chuteira Rosa, o formato muda para vídeo curto vertical, com tipografia cinética e recortes em movimento.',
    ],
  },
  zeluiz: {
    title: 'Zé Luiz — Presente nos Bairros',
    tag: 'Animação em colagem · Pré-campanha',
    client: 'Zé Luiz', role: 'Motion Designer',
    tools: 'After Effects',
    media: { type: 'youtube', items: [['sMVOufotk1w', 'Zé Luiz — Presente nos Bairros']] },
    overview: [
      'Animação de 36 segundos em colagem digital para a pré-campanha de Zé Luiz em Mogi das Cruzes. Recortes de papel, fotografia, mãos e um mapa da cidade transformam números de atuação em uma narrativa leve e cheia de personalidade.',
      'A tipografia cinética e as transições entre cenas seguem a linguagem do papel, para que cada dado entre como parte da história.',
    ],
  },
  selecao: {
    title: 'Seleção de Impressos',
    tag: 'Vídeo vertical · Tema Copa',
    client: 'FuturaIM', role: 'Motion + IA generativa',
    tools: 'After Effects, IA generativa',
    media: { type: 'youtube', items: [['PXXqJ1WIgek', 'Seleção de Impressos', 'v']] },
    overview: [
      'Campanha vertical em clima de Copa que transforma o catálogo da gráfica em um time: o campo de futebol vira vitrine, e cada produto entra em cena como um jogador, com direito a estádio e telão.',
      'Cenários e elementos criados com IA generativa foram finalizados em motion no After Effects, mantendo a campanha rápida e fácil de entender no celular.',
    ],
  },
  gs: {
    title: 'G&S — A marca de cara nova',
    tag: 'Motion de marca · Vertical',
    client: 'G&S Home Solutions', role: 'Motion Designer',
    tools: 'After Effects',
    media: { type: 'youtube', items: [['76GZjs4Fcgs', 'G&S — Nova marca', 'v']] },
    overview: [
      'Vídeo vertical que apresenta a nova identidade da G&S Home Solutions. O símbolo é revelado em movimento e conduz a mensagem por valores, produtos e a sede da empresa.',
      'Blocos de cor, padrões gráficos e tipografia grande dão ritmo à peça e mantêm a marca no centro do início ao fim.',
    ],
  },
  copilot: {
    title: 'Copilot — Explainer animado',
    tag: 'Explainer 2D · Personagem',
    role: 'Ilustração, rigging e animação',
    tools: 'After Effects, Illustrator',
    media: { type: 'youtube', items: [['KBKEwSQuKhs', 'Copilot — Explainer animado']] },
    overview: [
      'Explainer de 1min36 que apresenta o Microsoft 365 Copilot a quem vai usar a ferramenta no dia a dia de trabalho. Um mascote robô conduz a explicação, junto com ícones animados e telas simuladas dos aplicativos.',
      'Ilustrei os elementos no Illustrator e fiz o rigging e a animação no After Effects, com linguagem simples para um tema técnico. O Copilot é o tema do vídeo: o trabalho não foi feito para a Microsoft.',
    ],
  },
  ilha: {
    title: 'Ilha Anchieta — Animações',
    tag: 'Animação · História',
    role: 'Animação', tools: 'After Effects',
    media: { type: 'youtube', items: [['R_Ebmkbo9b4', 'Ilha Anchieta — Animações']] },
    overview: [
      'Em pouco mais de dois minutos, ilustrações com textura de pintura contam a história da Ilha Anchieta. Paisagens, aves e cenas históricas ganham movimento sem perder a aparência de tela pintada.',
      'A animação trabalha em camadas, com profundidade e movimentos suaves, para que a imagem mantenha a força de uma pintura mesmo em movimento.',
    ],
  },
  novos: {
    title: 'Novos Pontos de Retirada',
    tag: 'Vídeo vertical · 26 segundos',
    client: 'GIV Online', role: 'Motion Designer', tools: 'After Effects',
    media: { type: 'youtube', items: [['0TVkE_R1vPw', 'Novos Pontos de Retirada', 'v']] },
    overview: [
      'Um aviso de serviço que virou pequena animação: a van da GIV atravessa a tela enquanto o mapa mostra onde estão os novos pontos de retirada.',
      'Em 26 segundos, a cor forte da marca e os elementos grandes deixam a mensagem clara mesmo em uma tela de celular e sem som.',
    ],
  },
  ganhadores: {
    title: 'Histórias de ganhadores',
    tag: 'Reportagens · 9 histórias',
    client: 'Hiper Cap Brasil', role: 'Edição & Motion', tools: 'Premiere Pro, After Effects',
    listLabel: 'Histórias',
    media: { type: 'youtube', items: WINNERS.map((w) => [w.id, `${w.who} — ${w.prize}`]) },
    overview: [
      'Série de reportagens em que a equipe do Hiper Cap Brasil viaja até a casa de quem ganhou. Cada vídeo, de um a três minutos, combina entrevista, imagens da cidade e momentos da família.',
      'A montagem dá tempo para as reações espontâneas, enquanto legendas, cartelas e identificações mantêm a informação clara. A história de Dona Francisca passou de 344 mil visualizações.',
    ],
  },
  premios: {
    title: 'Show de Prêmios — FuturaIM',
    tag: 'Evento · 31 segundos',
    client: 'FuturaIM', role: 'Edição', tools: 'Premiere Pro',
    media: { type: 'youtube', items: [['AUK-BJ9ZS_k', 'Show de Prêmios — FuturaIM']] },
    overview: [
      'Corte curto para redes profissionais que resume o clima do Show de Prêmios na FuturaIM. O foco está nas pessoas e nas reações reais, com ritmo para funcionar em 31 segundos.',
    ],
  },
  social: {
    title: 'A Nova Social Media da GIV',
    tag: 'Esquete · 5min46',
    client: 'GIV Online', role: 'Edição', tools: 'Premiere Pro, After Effects',
    media: { type: 'youtube', items: [['IB_C2rs4Gms', 'A Nova Social Media da GIV']] },
    overview: [
      'Um processo seletivo fora do comum vira esquete de humor com elenco, cenário e figurino. O vídeo apresenta a marca sem parecer propaganda.',
      'Aqui, o motor da edição é o tempo da piada: as pausas, os cortes de reação e os grafismos ajudam a manter a atenção por quase seis minutos.',
    ],
  },
  ilhaj: {
    title: 'Ilha Anchieta — Reportagem',
    tag: 'Reportagem · 8 minutos · Libras',
    role: 'Edição', tools: 'Premiere Pro, After Effects',
    media: { type: 'youtube', items: [['CNEVY4t4Fr4', 'Ilha Anchieta — Reportagem']] },
    overview: [
      'Reportagem em formato jornalístico sobre a Ilha Anchieta, conduzida por um apresentador em meio à natureza do lugar. A interpretação em Libras acompanha o vídeo na tela.',
      'A edição alterna apresentação e imagens da ilha, sem deixar de reservar espaço para a janela de acessibilidade.',
    ],
  },
  mocambique: {
    title: 'Moçambique — Documentário',
    tag: 'Documentário · 19 minutos',
    role: 'Edição', tools: 'Premiere Pro, DaVinci Resolve',
    media: { type: 'youtube', items: [['g7R7_t7T7Cg', 'Moçambique — Documentário']] },
    overview: [
      'Documentário de 19 minutos sobre cultura popular, construído a partir de entrevistas e de registros feitos junto à comunidade.',
      'A montagem deixa que as próprias pessoas conduzam a narrativa, respeitando o tempo de cada fala e a força das imagens de festa.',
    ],
  },
};

// O primeiro abre o site no palco de Trabalhos selecionados; os demais viram miniaturas.
// Quando o demoreel existir: crie o projeto em PROJECTS e coloque o id dele no início desta lista.
const SELECTED = ['futuraim', 'hipercap', 'apcap', 'fiocruz', 'ciclos', 'pdv', 'graficamente'];

// Projetos que abrem em tela cheia, a partir do mural, do placar e da timeline.
const PROJECT_ORDER = ['ilha', 'zeluiz', 'copilot', 'selecao', 'gs', 'novos', 'ganhadores', 'premios', 'social', 'ilhaj', 'mocambique'];
