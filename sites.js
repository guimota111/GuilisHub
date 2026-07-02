/* =====================================================================
   CONFIGURAÇÃO DO HUB
   ---------------------------------------------------------------------
   Edite este arquivo para adicionar, remover ou mudar os seus sites.
   Cada card tem:
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
  tagline: "Meu cartão de visita digital — todos os meus sites e projetos reunidos num só lugar.",
  // Links sociais/contato do topo (opcionais). Deixe [] se não quiser.
  socials: [
    // { label: "Email",    icon: "✉️", url: "mailto:guimota1@gmail.com" },
    // { label: "GitHub",   icon: "🐙", url: "https://github.com/guimota111" },
    // { label: "Instagram",icon: "📸", url: "https://instagram.com/..." },
  ],
};

const SITES = [
  {
    icon: "🌐",
    title: "Site Exemplo 1",
    desc: "Aqui vai a legenda explicando o que este site faz e para que serve.",
    url: "#",
    tag: "Exemplo",
    accent: "#7c9cff",
  },
  {
    icon: "🛍️",
    title: "Site Exemplo 2",
    desc: "Uma breve descrição da função deste projeto — troque pelo texto real.",
    url: "#",
    tag: "Exemplo",
    accent: "#ff7ac6",
  },
  {
    icon: "📝",
    title: "Site Exemplo 3",
    desc: "Explique aqui o propósito do site para quem estiver visitando.",
    url: "#",
    tag: "Exemplo",
    accent: "#4fd1c5",
  },
];
