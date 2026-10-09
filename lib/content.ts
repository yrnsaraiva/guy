/**
 * Conteúdo do site "Ao Vivo".
 * Tudo o que está marcado com CONFIRMAR deve ser validado com o Guyzelh antes de publicar.
 * Para trocar um placeholder por media real, preenche `media` (imagem ou vídeo vertical 9:16 em /public).
 */

export type Media = { type: "image" | "video"; src: string; alt: string };

export type Episode = {
  id: string;
  /** Rótulo curto usado na barra de progresso */
  marker: string;
  years: string;
  title: string;
  lines: string[];
  /** Mensagens que a régie publica no chat quando o episódio começa */
  feed: string[];
  /** Cor que tinge o ring light neste episódio */
  tint: [number, number, number];
  /** O que deve aparecer no ecrã vertical — serve de briefing para a produção */
  shot: string;
  media?: Media;
};

export const PERSON = {
  name: "Guyzelh Ramos",
  first: "Guyzelh",
  last: "Ramos",
};

export const HERO = {
  lines: [
    "Não é uma biografia.",
    "É uma transmissão que começou há mais de dez anos e ainda não acabou.",
  ],
  hint: "Desliza para ver os episódios",
  shot: "Retrato vertical do Guyzelh a olhar para a câmara, luz do ring light nos olhos",
  media: undefined as Media | undefined,
};

export const EPISODES: Episode[] = [
  {
    id: "loja",
    marker: "2015",
    years: "2015",
    title: "A loja",
    lines: [
      "Antes das câmaras havia um balcão.",
      "Em Maputo nasce a Guyzelh Fashion, de roupa e calçado,",
      "e a primeira regra do negócio: perceber o que as pessoas querem antes de elas o dizerem.",
    ],
    feed: ["Maputo, 2015", "Guyzelh Fashion, Lda. registada", "Vestuário e calçado"],
    tint: [0.91, 0.72, 0.45],
    shot: "Arquivo da loja: prateleiras, sapatos, o Guyzelh ao balcão",
  },
  {
    id: "palco",
    marker: "2018",
    years: "2018",
    title: "O palco",
    lines: [
      "Anos a montar noites antes de alguém as filmar.",
      "Nos Africa Entertainment Awards USA,",
      "é distinguido como Best Promoter of Africa.",
    ],
    feed: ["Prémio: Best Promoter of Africa", "Africa Entertainment Awards USA", "Moçambique no palco"],
    tint: [1.0, 0.18, 0.39],
    shot: "Plano de palco visto de trás: multidão, luzes, o Guyzelh de costas",
  },
  {
    id: "sinal",
    marker: "2020",
    years: "2020–2022",
    title: "O sinal",
    lines: [
      "Quando a pandemia fechou as salas, ele abriu a câmara.",
      "As lives passaram a ser o encontro da noite, e as marcas vieram atrás.",
      "Em 2021 lança a Gshow: mais de 10 mil inscrições nas primeiras 24 horas.",
    ],
    feed: ["Embaixador da Uzeir Trade Center", "Gshow: +10 mil inscrições em 24h", "1 milhão de seguidores no Instagram"],
    tint: [0.42, 0.48, 1.0],
    shot: "Gravação de ecrã de uma live antiga, com comentários reais a subir",
  },
  {
    id: "bailao",
    marker: "2024",
    years: "2024–2025",
    title: "Bailão",
    lines: [
      "O funk brasileiro encontra a pista moçambicana.",
      "MC PH, MC IG, Nilo MC e MC Ryan SP ao lado de artistas da casa.",
      "A festa sai de Maputo e chega a Nampula.",
    ],
    feed: ["Brasil × Moçambique", "Maputo e Nampula", "Bailão esgota a pista"],
    tint: [0.96, 0.84, 0.33],
    shot: "Vídeo vertical do Bailão: público a cantar, câmara no meio da pista",
  },
  {
    id: "seguir",
    marker: "A seguir",
    years: "Em produção",
    title: "Próximo episódio",
    lines: [
      "Novas produções com a Guyzelh Produções,",
      "uma nova aposta digital",
      "e o que ainda não se pode dizer em directo. Fica na live.",
    ],
    feed: ["Guyzelh Produções", "Próximo episódio em produção", "Fica na live"],
    tint: [1.0, 0.9, 0.78],
    shot: "Bastidores de uma produção nova, propositadamente desfocados",
  },
];

/** CONFIRMAR: contactos reais do cliente */
export const CONTACT = {
  whatsapp: "258000000000",
  email: "contacto@guyzelh.co.mz",
  instagram: "https://www.instagram.com/",
};

export const TOPICS = ["Marcas e parcerias", "Eventos e booking", "Imprensa"] as const;
