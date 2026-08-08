---
name: tosite
description: Adiciona o site/projeto do repositório atual ao Guili's Hub (github.com/guimota111/GuilisHub), o cartão de visita digital que reúne todos os sites do Guili. Descobre sozinho o nome, a descrição e a URL de deploy do projeto (Firebase Hosting, GitHub Pages ou App Hosting), insere o card no sites.js e abre um PR no hub. Use sempre que o usuário disser "tosite", "/tosite", "adiciona esse site ao hub", "põe no GuilisHub", "cadastra no meu hub", "coloca no meu portfólio", ou quando ele acabar de publicar/terminar um site novo e quiser que ele apareça na lista central — mesmo que não cite o hub pelo nome. Funciona a partir de qualquer repositório de projeto, não só de dentro do GuilisHub.
---

# tosite — publicar um projeto no Guili's Hub

O Guili's Hub (`guimota111/GuilisHub`) é uma página estática que lista todos os
sites do Guili em cards. Todo o conteúdo vem de um único arquivo de dados,
`sites.js` — não se mexe em HTML nem em CSS para adicionar um site.

Esta skill roda **a partir do repositório do projeto que está sendo adicionado**
(BrainPath, clubedolivro, etc.), não de dentro do hub. O trabalho é: entender o
projeto atual, descobrir onde ele está publicado, e levar essa entrada até o hub.

## Fluxo

### 1. Entender o projeto atual

Leia o que o repositório já diz sobre si — `README.md`, `package.json` (campos
`name`/`description`), o `<title>` do `index.html`, e a estrutura de `src/` para
ver as funcionalidades reais. Muitos repositórios ainda têm o README padrão do
Vite/CRA; quando for esse o caso, o README não serve, e a descrição tem que sair
do código (nomes de rotas, features, tipos de dado).

O que você precisa montar:

| Campo    | O que é                                           |
|----------|---------------------------------------------------|
| `title`  | Nome do site como o Guili chama, não o nome do repo |
| `desc`   | Uma frase explicando o que o site faz              |
| `url`    | A URL pública onde está publicado                  |
| `icon`   | Um emoji que represente o projeto                  |
| `tag`    | Etiqueta curta: "DASA", "Estudos", "Amigos", "Em construção"… |
| `accent` | Cor de destaque `#rrggbb`                          |

A `desc` é a parte que dá trabalho e é a que o Guili mais vai olhar: ela aparece
embaixo do título no card e é o que explica o site para quem chega de fora.
Escreva em português, uma frase, dizendo **o que a pessoa faz com o site** — não
a stack. "Estante viva onde os amigos leem o mesmo livro e acompanham o
progresso de cada um em tempo real" é útil; "App React + Firebase com Firestore"
não é.

### 2. Descobrir a URL de deploy

Deduza pela forma do repositório, nesta ordem:

- **Firebase Hosting** (existe `firebase.json`): o site padrão é
  `https://<project-id>.web.app/`, onde `<project-id>` é `projects.default` do
  `.firebaserc`. Confira antes se `firebase.json` → `hosting.site` está definido:
  se estiver, esse valor manda no lugar do project id.
- **GitHub Pages** (repo sem `firebase.json`, publicado pelo GitHub): o padrão do
  Guili é `https://guimota111.github.io/<nome-do-repo>/` — repare que o nome do
  repo respeita maiúsculas e minúsculas e a barra final importa.
- **Firebase App Hosting / Cloud Run** (URLs como
  `...--projeto.us-central1.hosted.app`): **não dá para deduzir** do repositório.
  Pergunte a URL ao usuário.

Tente abrir a URL deduzida (`curl -sS -o /dev/null -w '%{http_code}' <url>`) para
confirmar que responde 200 antes de gravar. Se a rede estiver bloqueada ou o
projeto ainda não tiver sido publicado, siga mesmo assim, mas **avise o usuário
que a URL foi deduzida e não testada** — um card apontando para "Site Not Found"
é pior que nenhum card.

### 3. Escolher a seção

O hub tem três seções e a escolha certa evita um PR de vai-e-volta:

- **"Otimização de Trabalho"** — ferramentas de patologia e produtividade, o que
  o Guili usa no trabalho ou para estudar.
- **"Pessoal"** — projetos feitos para ele, para a namorada ou para os amigos.
- **"Onde tudo começou 💙"** — seção histórica, contém só o Guili's HUOL.
  **Nunca adicione nada aqui**; é uma homenagem à primeira plataforma.

Se o projeto ficar em cima do muro entre as duas primeiras, pergunte em vez de
chutar — mover um card depois é um PR novo.

### 4. Obter o hub e inserir

Trabalhe em um clone do hub. Se já houver um localmente, use-o; senão:

```bash
git clone https://github.com/guimota111/GuilisHub /tmp/GuilisHub
```

(No Claude Code na web, o hub precisa estar no escopo da sessão — use `add_repo`
com owner `guimota111` e repo `GuilisHub` antes de clonar.)

Veja o estado atual e as cores já ocupadas:

```bash
node <skill-dir>/scripts/add_site.mjs --hub /tmp/GuilisHub --list
```

Escolha um `accent` que **não** esteja na lista impressa — cores repetidas fazem
dois cards diferentes parecerem o mesmo produto. Então insira:

```bash
node <skill-dir>/scripts/add_site.mjs --hub /tmp/GuilisHub \
  --section "Pessoal" \
  --icon "📖" \
  --title "Clube do Livro" \
  --desc "Estante viva onde os amigos leem o mesmo livro e acompanham o progresso de cada um em tempo real." \
  --url "https://clube-do-livro-16073.web.app/" \
  --tag "Amigos" \
  --accent "#d4a556"
```

Use `--dry-run` primeiro se quiser conferir a entrada antes de gravar.

O script existe porque uma vírgula errada no `sites.js` derruba **o hub inteiro**
(o `app.js` só monta os cards se o arquivo todo avaliar), e porque ele já recusa
duplicatas e revalida o arquivo antes de gravar. Prefira-o a editar o arquivo na
mão; se precisar de algo que ele não faz (mudar um card existente, reordenar,
criar seção nova), aí sim edite direto — e rode `node --check sites.js` depois.

### 5. Commitar e abrir o PR

Nunca empurre direto para `main` — o hub é um site publicado, e um PR dá ao Guili
a chance de conferir o texto do card e o link antes de ir ao ar.

```bash
cd /tmp/GuilisHub
git checkout -b tosite/<nome-do-projeto>
git add sites.js
git commit -m "Adiciona <Nome do site> ao hub"
git push -u origin tosite/<nome-do-projeto>
```

Abra o PR (via `gh pr create` ou as ferramentas MCP do GitHub, o que a sessão
tiver) descrevendo o card adicionado, em qual seção, e — importante — se a URL
foi verificada ou apenas deduzida.

## Ao terminar

Diga ao usuário, de forma curta: qual card entrou, em que seção, com que URL, e o
link do PR. Se alguma coisa ficou por confirmar (URL não testada, seção
escolhida no chute, projeto ainda não publicado), fale explicitamente — é
exatamente o que ele precisa checar antes de dar merge.
