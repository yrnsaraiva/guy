/**
 * Conteúdo do site. Tudo o que está marcado com CONFIRMAR deve ser validado com o Guyzelh antes de publicar.
 * Para usar uma foto real, coloca o ficheiro em /public e preenche `src` (ex.: src: "/retrato.jpg").
 */

export type Photo = { src?: string; alt: string; note: string };

export const PERSON = {
  name: "Guyzelh Ramos",
  role: "Empresário, promotor de eventos e criador digital",
  city: "Maputo, Moçambique",
};

export const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#negocios", label: "Negócios" },
  { href: "#eventos", label: "Eventos" },
  { href: "#percurso", label: "Percurso" },
  { href: "#contacto", label: "Contacto" },
];

export const HERO = {
  title: "Guyzelh Ramos",
  lead: "Empresário, promotor de eventos e criador digital. Há mais de dez anos a juntar artistas, marcas e público em Moçambique.",
  photo: { alt: "Retrato de Guyzelh Ramos", note: "Retrato profissional, meio corpo, fundo neutro" } as Photo,
};

/** CONFIRMAR: números e prémios */
export const FACTS = [
  { count: 10, from: 0, prefix: "+", suffix: " anos", label: "a promover eventos em Moçambique" },
  { count: 2018, from: 1990, prefix: "", suffix: "", label: "Best Promoter of Africa, Africa Entertainment Awards USA", plain: true },
  { count: 1000000, from: 0, prefix: "", suffix: "", label: "seguidores no Instagram (2022)" },
];

/** Palavras da faixa em movimento */
export const MARQUEE = ["Eventos", "Marcas", "Moda", "Digital", "Maputo", "Nampula"];

export const ABOUT = {
  title: "Do entretenimento ao negócio",
  paragraphs: [
    "Guyzelh Ramos começou como promotor de eventos em Maputo e construiu, ao longo de mais de uma década, uma das marcas pessoais mais reconhecidas do entretenimento moçambicano.",
    "Durante a pandemia, as suas transmissões em directo passaram a reunir audiências de todo o país. Essa proximidade com o público tornou-se a base do seu trabalho com marcas, das parcerias comerciais e de novos projectos em moda e tecnologia.",
    "Hoje dedica-se à produção de espectáculos com artistas nacionais e internacionais, sobretudo do Brasil e dos países lusófonos, e ao marketing de influência.",
  ],
  photo: { alt: "Guyzelh Ramos em bastidores", note: "Foto em bastidores de um evento, ambiente de trabalho" } as Photo,
};

export const BUSINESSES = [
  {
    name: "Guyzelh Produções",
    area: "Eventos e espectáculos",
    text: "Contratação de artistas, produção e promoção de concertos, em nome próprio ou em parceria com outras produtoras.",
  },
  {
    name: "Bailão",
    area: "Marca de eventos",
    text: "Noites dedicadas à música urbana brasileira e a colaborações entre artistas lusófonos, em Maputo e Nampula.",
  },
  {
    name: "Marcas e influência",
    area: "Marketing digital",
    text: "Campanhas, contratos de embaixador e promoção de produtos junto de uma das maiores audiências digitais do país.",
  },
  {
    name: "Guyzelh Fashion",
    area: "Moda",
    text: "Empresa de vestuário e calçado fundada em Maputo em 2015, o primeiro negócio formal do grupo.",
  },
];

/** CONFIRMAR: datas, locais e artistas de cada evento */
export const EVENTS = [
  {
    title: "Bailão",
    date: "2024",
    place: "Maputo",
    artists: "MC PH e MC IG",
    photo: { alt: "Público no Bailão 2024", note: "Foto do público ou do palco" } as Photo,
  },
  {
    title: "Bailão",
    date: "2025",
    place: "Nampula",
    artists: "Nilo MC",
    photo: { alt: "Nilo MC em Nampula", note: "Foto do artista em palco" } as Photo,
  },
  {
    title: "Bailão",
    date: "2025",
    place: "Maputo",
    artists: "MC Ryan SP",
    photo: { alt: "MC Ryan SP em Maputo", note: "Foto do artista em palco" } as Photo,
  },
];

export const TIMELINE = [
  { year: "2015", title: "Guyzelh Fashion", text: "Funda a empresa de vestuário e calçado em Maputo." },
  { year: "2018", title: "Best Promoter of Africa", text: "Distinguido nos Africa Entertainment Awards USA." },
  { year: "2020", title: "Marcas e influência", text: "Torna-se embaixador da Uzeir Trade Center e consolida o trabalho com marcas." },
  { year: "2021", title: "Aposta no digital", text: "Lança a Gshow, rede social que somou mais de 10 mil inscrições nas primeiras 24 horas." },
  { year: "2022", title: "1 milhão de seguidores", text: "Atinge um milhão de seguidores no Instagram." },
  { year: "2024–25", title: "Bailão", text: "Leva artistas brasileiros a Maputo e Nampula." },
];

export const PARTNERS = {
  title: "Para marcas e produtoras",
  text: "Trabalhamos com empresas que querem chegar a um público jovem e envolvido, e com produtoras que procuram um parceiro local para levar artistas ao palco.",
  services: ["Campanhas e conteúdo patrocinado", "Embaixador de marca", "Patrocínio de eventos", "Co-produção de espectáculos"],
  /** CONFIRMAR: logótipos autorizados de parceiros */
  logos: ["Parceiro", "Parceiro", "Parceiro", "Parceiro", "Parceiro"],
};

/** CONFIRMAR: contactos reais */
export const CONTACT = {
  email: "contacto@guyzelh.co.mz",
  whatsapp: "258000000000",
  whatsappLabel: "+258 00 000 0000",
  instagram: "https://www.instagram.com/",
  topics: ["Parcerias com marcas", "Eventos e booking", "Imprensa", "Outro assunto"],
};
