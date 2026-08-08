#!/usr/bin/env node
/**
 * add_site.mjs — insere (ou lista) entradas no sites.js do Guili's Hub.
 *
 * Editar o sites.js na mão é fácil de errar: uma vírgula perdida derruba o hub
 * inteiro, porque o app.js só monta os cards se o arquivo inteiro avaliar. Este
 * script faz a inserção por casamento de colchetes e revalida o arquivo antes de
 * gravar, então ou o resultado é válido ou nada é escrito.
 *
 * Uso:
 *   node add_site.mjs --hub <caminho-do-GuilisHub> --list
 *   node add_site.mjs --hub <caminho> --section "Pessoal" \
 *       --icon "📖" --title "Clube do Livro" --desc "..." \
 *       --url "https://exemplo.web.app/" --tag "Amigos" --accent "#d4a556"
 *
 * Flags extras: --dry-run (mostra o diff sem gravar), --force (ignora duplicata).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// ---------- argumentos ----------
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i++;
    }
  }
  return args;
}

function die(msg, code = 1) {
  console.error('erro: ' + msg);
  process.exit(code);
}

// ---------- leitura estrutural ----------

/**
 * Acha o `]` que fecha o `[` em openIdx, ignorando colchetes dentro de strings
 * e comentários. O sites.js tem emojis, apóstrofos em português ("Guili's") e um
 * bloco de comentário no topo, então um contador ingênuo erraria.
 */
function findMatchingBracket(src, openIdx) {
  let depth = 0;
  let inStr = null;
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i++;
      continue;
    }
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Cada seção é { title, subtitle, sites: [...] }, então o `title:` mais próximo
 *  antes de um `sites: [` é o título daquela seção. */
function locateSections(src) {
  const out = [];
  const re = /sites\s*:\s*\[/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const openIdx = src.indexOf('[', m.index);
    const closeIdx = findMatchingBracket(src, openIdx);
    if (closeIdx === -1) continue;
    const before = src.slice(0, m.index);
    // (?<![A-Za-z]) evita casar o `subtitle:` da seção, que também termina em "title".
    const tm = [...before.matchAll(/(?<![A-Za-z])title\s*:\s*"((?:[^"\\]|\\.)*)"/g)].pop();
    out.push({
      title: tm ? JSON.parse('"' + tm[1] + '"') : '(sem título)',
      openIdx,
      closeIdx,
    });
  }
  return out;
}

/** Avalia o arquivo como dado puro para conferir que continua válido. */
function evalSites(src) {
  return new Function(src + '\n; return { SECTIONS, PROFILE };')();
}

// ---------- main ----------
const args = parseArgs(process.argv.slice(2));
const hub = args.hub || process.cwd();
const sitesPath = join(hub, 'sites.js');

let src;
try {
  src = readFileSync(sitesPath, 'utf8');
} catch {
  die(`não achei ${sitesPath}. Passe --hub apontando para a raiz do clone do GuilisHub.`);
}

let data;
try {
  data = evalSites(src);
} catch (e) {
  die(`o sites.js atual já está inválido (${e.message}). Conserte antes de adicionar.`);
}

const sections = locateSections(src);

if (args.list) {
  const usados = [];
  console.log('Seções disponíveis:\n');
  for (const s of data.SECTIONS) {
    console.log(`  "${s.title}" — ${s.sites.length} site(s)`);
    for (const site of s.sites) {
      console.log(`      ${site.icon}  ${site.title}  ->  ${site.url}`);
      if (site.accent) usados.push(site.accent.toLowerCase());
    }
    console.log('');
  }
  console.log('Cores accent já usadas (escolha uma diferente):');
  console.log('  ' + [...new Set(usados)].join(' '));
  process.exit(0);
}

for (const req of ['section', 'title', 'desc', 'url']) {
  if (!args[req] || args[req] === true) die(`faltou --${req}`);
}

const target = sections.find((s) => s.title === args.section);
if (!target) {
  die(
    `seção "${args.section}" não existe. Opções: ` +
      sections.map((s) => `"${s.title}"`).join(', ')
  );
}

// Duplicatas: o hub é um cartão de visita, dois cards do mesmo site ficam feios
// e normalmente indicam que a skill já rodou antes para este projeto.
const norm = (u) => String(u).replace(/\/+$/, '').toLowerCase();
const todos = data.SECTIONS.flatMap((s) => s.sites);
const dup = todos.find(
  (s) => norm(s.url) === norm(args.url) || s.title.toLowerCase() === String(args.title).toLowerCase()
);
if (dup && !args.force) {
  die(
    `"${dup.title}" (${dup.url}) já está no hub. Se a intenção é atualizar o card, ` +
      `edite a entrada existente em vez de inserir outra; use --force só se for mesmo um site novo.`,
    2
  );
}

const accent = args.accent && args.accent !== true ? args.accent : '#7c9cff';
if (!/^#[0-9a-fA-F]{6}$/.test(accent)) die(`accent inválido: ${accent} (esperado #rrggbb)`);

const campos = [
  ['icon', args.icon && args.icon !== true ? args.icon : '🌐'],
  ['title', args.title],
  ['desc', args.desc],
  ['url', args.url],
];
if (args.tag && args.tag !== true) campos.push(['tag', args.tag]);
campos.push(['accent', accent]);

const entrada =
  '      {\n' +
  campos.map(([k, v]) => `        ${k}: ${JSON.stringify(v)},`).join('\n') +
  '\n      },';

const antes = src.slice(0, target.closeIdx).replace(/\s*$/, '');
const depois = src.slice(target.closeIdx);
const novo = antes + '\n' + entrada + '\n    ' + depois;

// Revalida antes de gravar — se a inserção quebrou a sintaxe, melhor falhar aqui
// do que publicar um hub em branco.
let novoData;
try {
  novoData = evalSites(novo);
} catch (e) {
  die(`a inserção deixaria o sites.js inválido (${e.message}). Nada foi gravado.`);
}
const inserido = novoData.SECTIONS.find((s) => s.title === args.section).sites.find(
  (s) => s.url === args.url
);
if (!inserido) die('a entrada não apareceu na seção esperada. Nada foi gravado.');

if (args['dry-run']) {
  console.log('--- entrada que seria inserida em "' + args.section + '" ---');
  console.log(entrada);
  console.log('--- (dry-run: nada gravado) ---');
  process.exit(0);
}

writeFileSync(sitesPath, novo, 'utf8');
console.log(`ok: "${args.title}" adicionado à seção "${args.section}" em ${sitesPath}`);
console.log(`     ${inserido.icon}  ${inserido.url}  [${inserido.tag || 'sem tag'}]  ${accent}`);
