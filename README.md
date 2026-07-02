# Guili's Hub 🚀

Um hub estilo **cartão de visita digital**, hospedado no GitHub Pages, com links
para todos os meus sites e projetos — cada um com uma legenda explicando sua função.

## ✏️ Como editar os sites

Todo o conteúdo fica no arquivo **`sites.js`**. Não precisa mexer em HTML.

```js
const SITES = [
  {
    icon: "🌐",                 // emoji do card
    title: "Nome do site",
    desc: "Legenda explicando a função do site.",
    url: "https://meusite.com",
    tag: "Blog",                // etiqueta curta (opcional)
    accent: "#7c9cff",          // cor de destaque (opcional)
  },
  // ... adicione quantos quiser
];
```

Os dados do topo (nome, avatar, tagline e links sociais) ficam em `PROFILE`,
no mesmo arquivo.

## 🌍 Publicar no GitHub Pages

1. Vá em **Settings → Pages** no repositório.
2. Em *Build and deployment*, escolha **Deploy from a branch**.
3. Selecione a branch (ex.: `main`) e a pasta **/ (root)**.
4. Salve. Em alguns instantes o site fica no ar em
   `https://<seu-usuario>.github.io/GuilisHub/`.

## 📁 Estrutura

| Arquivo       | Função                                    |
|---------------|-------------------------------------------|
| `index.html`  | Estrutura da página                       |
| `styles.css`  | Todo o visual (tema, cards, animações)    |
| `sites.js`    | **Seus links e textos** — edite aqui      |
| `app.js`      | Monta os cards a partir do `sites.js`      |
