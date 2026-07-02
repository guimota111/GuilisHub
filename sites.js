/* =====================================================================
   CONFIGURAÇÃO DO HUB
   ---------------------------------------------------------------------
   Edite este arquivo para adicionar, remover ou mudar os seus sites.
   Os sites ficam agrupados em SEÇÕES. Cada card tem:
     - icon:  um emoji ou ícone (aparece grande no card)
     - title: o nome do site
     - desc:  a legenda explicando a função do site
     - url:   o link
     - tag:   (opcional) uma etiqueta curta, ex: "Loja", "Blog"
     - accent:(opcional) cor de destaque do card em hex, ex: "#ff7ac6"
   ===================================================================== */

const PROFILE = {
  initial: "G",                 // letra do avatar
  name: "Guili's Hub",
  tagline: "Meu cartão de visita digital — todas as plataformas que criei, reunidas num só lugar.",
  // Links sociais/contato do topo (opcionais). Deixe [] se não quiser.
  socials: [
    { label: "Email",  icon: "✉️", url: "mailto:guimota1@gmail.com" },
    { label: "GitHub", icon: "🐙", url: "https://github.com/guimota111" },
  ],
};

const SECTIONS = [
  {
    title: "Otimização de Trabalho",
    subtitle: "Plataformas que uso no dia a dia da patologia",
    sites: [
      {
        icon: "❄️",
        title: "Descritor de Congelações",
        desc: "Assistência para escrever as congelações no sistema da DASA.",
        url: "https://guimota111.github.io/Assistente-trabalho/",
        tag: "DASA",
        accent: "#7c9cff",
      },
      {
        icon: "🦆",
        title: "Butcher Duck",
        desc: "Plataforma de conteúdos em patologia.",
        url: "https://guimota111.github.io/Butcherduck/",
        tag: "Em construção",
        accent: "#f6c453",
      },
      {
        icon: "🗓️",
        title: "Escala de Congelação DASA",
        desc: "Gestão de plantões de congelação da DASA Brasília.",
        url: "https://guimota111.github.io/EscalaDasaCongTeste2/",
        tag: "Escala",
        accent: "#4fd1c5",
      },
      {
        icon: "🗂️",
        title: "Organizador de Casos",
        desc: "Organize casos e pendências num só lugar.",
        url: "https://guimota111.github.io/OrganizadorCasos/",
        tag: "Produtividade",
        accent: "#a78bfa",
      },
      {
        icon: "⚙️",
        title: "Chopperverso",
        desc: "Controle de produção para patologistas da DASA.",
        url: "https://chopperverso.web.app/",
        tag: "DASA",
        accent: "#38bdf8",
      },
      {
        icon: "🧭",
        title: "Assistente de TMA",
        desc: "Ajuda a não se perder no TMA.",
        url: "https://guimota111.github.io/tma/",
        tag: "Apoio",
        accent: "#fb923c",
      },
      {
        icon: "🗄️",
        title: "Arquivos de Laudos e Notas",
        desc: "Armazene e busque laudos patológicos de diferentes cenários.",
        url: "https://arquivolaudos.web.app/",
        tag: "Arquivo",
        accent: "#34d399",
      },
    ],
  },

  {
    title: "Onde tudo começou 💙",
    subtitle: "Minha primeira plataforma — um presente para o serviço da residência",
    sites: [
      {
        icon: "🏥",
        title: "Guili's HUOL",
        desc: "Ferramentas de otimização de escala para o serviço de patologia do Hospital Universitário Onofre Lopes.",
        url: "https://guimota111.github.io/GuilisHUOL/",
        tag: "A primeira",
        accent: "#60a5fa",
      },
    ],
  },

  {
    title: "Pessoal",
    subtitle: "Projetos que fiz para mim e para os amigos",
    sites: [
      {
        icon: "🐣",
        title: "Tamagochi Me",
        desc: "Aplicativo de habit tracking pessoal.",
        url: "https://tamagochi-back-end--tamagochi-db43c.us-central1.hosted.app/",
        tag: "Hábitos",
        accent: "#f472b6",
      },
      {
        icon: "🎲",
        title: "Aposta com a Luana",
        desc: "Aposta de habit tracking com a amiga Luana.",
        url: "https://guimota111.github.io/aposta/",
        tag: "Desafio",
        accent: "#c084fc",
      },
    ],
  },
];
