/* Renderiza o hub a partir de sites.js */
(function () {
  "use strict";

  // ---- Perfil / cabeçalho ----
  if (typeof PROFILE !== "undefined") {
    setText("avatar", PROFILE.initial);
    setText("tagline", PROFILE.tagline);
    const nameEl = document.querySelector(".name");
    if (nameEl && PROFILE.name) nameEl.textContent = PROFILE.name;
    document.title = (PROFILE.name || "Hub") + " · Meus Sites";

    const socialsEl = document.getElementById("socials");
    if (socialsEl && Array.isArray(PROFILE.socials)) {
      socialsEl.innerHTML = PROFILE.socials.map(function (s) {
        return (
          '<a class="social" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
          "<span>" + (s.icon || "🔗") + "</span>" +
          "<span>" + esc(s.label || "") + "</span>" +
          "</a>"
        );
      }).join("");
    }
  }

  // ---- Seções de sites ----
  const root = document.getElementById("sections");
  if (root) {
    const sections = normalizeSections();
    if (sections.length) {
      let counter = 0;
      root.innerHTML = sections.map(function (section) {
        const head = section.title
          ? '<div class="section-head">' +
              '<h2 class="section-title">' + esc(section.title) + "</h2>" +
              (section.subtitle
                ? '<p class="section-sub">' + esc(section.subtitle) + "</p>"
                : "") +
            "</div>"
          : "";
        const cards = (section.sites || []).map(function (site) {
          return renderCard(site, counter++);
        }).join("");
        return (
          '<section class="section">' + head +
          '<div class="grid">' + cards + "</div></section>"
        );
      }).join("");
    } else {
      root.innerHTML =
        '<div class="empty">Nenhum site cadastrado ainda. ' +
        "Edite <strong>sites.js</strong> para adicionar os seus links. ✨</div>";
    }
  }

  // ---- Rodapé ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---- Renderização de um card ----
  function renderCard(site, i) {
    const accent = site.accent || "#7c9cff";
    const tag = site.tag
      ? '<span class="card-tag">' + esc(site.tag) + "</span>"
      : "";
    const prettyUrl = site.url && site.url !== "#"
      ? '<div class="card-url">' + esc(prettify(site.url)) + "</div>"
      : "";
    return (
      '<a class="card" style="--accent:' + esc(accent) +
        ";--d:" + (i * 60) + 'ms" href="' + esc(site.url || "#") +
        '" target="_blank" rel="noopener">' +
        tag +
        '<div class="card-icon">' + (site.icon || "🌐") + "</div>" +
        '<h3 class="card-title">' + esc(site.title || "Sem título") +
          '<span class="arrow">↗</span></h3>' +
        '<p class="card-desc">' + esc(site.desc || "") + "</p>" +
        prettyUrl +
      "</a>"
    );
  }

  // Aceita tanto SECTIONS quanto um SITES simples (retrocompatível)
  function normalizeSections() {
    if (typeof SECTIONS !== "undefined" && Array.isArray(SECTIONS)) return SECTIONS;
    if (typeof SITES !== "undefined" && Array.isArray(SITES)) {
      return [{ title: "", subtitle: "", sites: SITES }];
    }
    return [];
  }

  // ---- Helpers ----
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function prettify(url) {
    return String(url).replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
})();
