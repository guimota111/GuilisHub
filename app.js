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
          '<span>' + (s.icon || "🔗") + "</span>" +
          "<span>" + esc(s.label || "") + "</span>" +
          "</a>"
        );
      }).join("");
    }
  }

  // ---- Grade de sites ----
  const grid = document.getElementById("grid");
  if (grid) {
    if (typeof SITES !== "undefined" && SITES.length) {
      grid.innerHTML = SITES.map(function (site, i) {
        const accent = site.accent || "#7c9cff";
        const tag = site.tag
          ? '<span class="card-tag">' + esc(site.tag) + "</span>"
          : "";
        const prettyUrl = site.url && site.url !== "#"
          ? '<div class="card-url">' + esc(prettify(site.url)) + "</div>"
          : "";
        return (
          '<a class="card" style="--accent:' + esc(accent) +
            ';--d:' + (i * 70) + 'ms" href="' + esc(site.url || "#") +
            '" target="_blank" rel="noopener">' +
            tag +
            '<div class="card-icon">' + (site.icon || "🌐") + "</div>" +
            '<h2 class="card-title">' + esc(site.title || "Sem título") +
              '<span class="arrow">↗</span></h2>' +
            '<p class="card-desc">' + esc(site.desc || "") + "</p>" +
            prettyUrl +
          "</a>"
        );
      }).join("");
    } else {
      grid.innerHTML =
        '<div class="empty">Nenhum site cadastrado ainda. ' +
        "Edite <strong>sites.js</strong> para adicionar os seus links. ✨</div>";
    }
  }

  // ---- Rodapé ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

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
