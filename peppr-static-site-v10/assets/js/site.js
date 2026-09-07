/* Shared layout and small interactions only. Content is in assets/data/content.js. */
(() => {
  "use strict";

  const content = window.PEPPR_CONTENT || { projects: [], publications: [] };
  const page = document.body.dataset.page;
  const nav = [
    ["Home", "index.html", "home"],
    ["Projects", "projects.html", "projects"],
    ["Publications", "publications.html", "publications"],
    ["Team & Contact", "team.html", "team"],
    ["Support Us", "support_us.html", "support"],
  ];
  const escapeHTML = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  const header = document.querySelector("[data-header]");
  const footer = document.querySelector("[data-footer]");
  const main = document.querySelector("#main");

  if (header) {
    header.innerHTML = `<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="container nav"><a href="index.html" aria-label="PEPPR home"><img class="wordmark" src="assets/images/peppr-wordmark.png" alt="PEPPR"></a><button class="menu" type="button" aria-label="Open menu" aria-expanded="false">☰</button><nav class="nav-links" aria-label="Main navigation">${nav.map(([label, href, key]) => `<a href="${href}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}</nav></div></header>`;
  }
  if (footer) {
    footer.innerHTML = `<footer class="site-footer"><div class="container"><img class="wordmark" src="assets/images/peppr-wordmark.png" alt="PEPPR"><p>Poly Electric Propulsion and Plasma Research helps students build relevant electric-propulsion experience.</p><div class="footer-links"><a href="team.html#contact">Contact</a><a href="support_us.html">Partner with us</a></div><p>© ${new Date().getFullYear()} Poly Electric Propulsion and Plasma Research.</p></div></footer>`;
  }

  const menu = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");
  if (menu && navLinks) {
    menu.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(isOpen));
    });
  }
  if (main) {
    main.classList.add("page-shell");
    main.insertAdjacentHTML(
      "afterbegin",
      '<i class="seal a" aria-hidden="true"></i><i class="seal b" aria-hidden="true"></i>',
    );
  }

  const primaryTag = (item) => item.tags?.[0] || "Uncategorized";
  const projectCard = (project) =>
    `<article class="card"><div class="status">${escapeHTML(project.status)} · ${escapeHTML(primaryTag(project))}</div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p><a class="card-link" href="${escapeHTML(project.href)}">View project →</a></article>`;
  const projectRow = (project, tagIDs) => {
    const thumbnail = project.thumbnail || {};
    const tags = project.tags || [];
    return `<article class="project-row" data-tag-ids="${tags.map((tag) => tagIDs.get(tag)).join(" ")}" data-status="${escapeHTML(project.status)}" data-order="${Number(project.order) || 0}"><div class="project-thumb project-thumb--${thumbnail.fit === "contain" ? "contain" : "cover"}"><img src="${escapeHTML(thumbnail.src || "assets/images/peppr-logo-seal.png")}" alt="${escapeHTML(thumbnail.alt || "Project image")}"></div><div class="project-copy"><div class="status">${escapeHTML(project.status)} · ${escapeHTML(primaryTag(project))}</div><h2>${escapeHTML(project.title)}</h2><p>${escapeHTML(project.description)}</p><div class="tags">${tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div></div><div class="project-meta"><span>Lead: ${escapeHTML(project.lead)}</span><a class="button ghost" href="${escapeHTML(project.href)}">View project</a></div></article>`;
  };
  const publicationCard = (publication) =>
    `<article class="publication"><div class="eyebrow">${escapeHTML(publication.type)} · ${escapeHTML(publication.date)}</div><h2>${escapeHTML(publication.title)}</h2><p>${escapeHTML(publication.description)}</p><div class="tags">${(publication.tags || []).map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div><div class="publication-actions"><span>${escapeHTML(publication.authors)}</span><a class="button ghost" href="${escapeHTML(publication.href)}">Read record</a></div></article>`;

  const homeProjects = document.querySelector("#home-projects");
  if (homeProjects)
    homeProjects.innerHTML = content.projects
      .filter((project) => project.featured)
      .slice(0, 3)
      .map(projectCard)
      .join("");
  const homePublications = document.querySelector("#home-publications");
  if (homePublications)
    homePublications.innerHTML = content.publications
      .filter((publication) => publication.featured)
      .slice(0, 2)
      .map(publicationCard)
      .join("");

  const projectList = document.querySelector("#projects");
  const filterBar = document.querySelector("#project-filters");
  const sortSelect = document.querySelector("#project-sort");
  const emptyMessage = document.querySelector("#empty");
  if (projectList && filterBar && sortSelect && emptyMessage) {
    const tags = [
      ...new Set(content.projects.flatMap((project) => project.tags || [])),
    ].sort();
    const tagIDs = new Map(tags.map((tag, index) => [tag, String(index)]));
    let activeFilter = "all";
    filterBar.innerHTML = `<button class="filter active" type="button" data-filter="all" aria-pressed="true">All</button>${tags.map((tag) => `<button class="filter" type="button" data-filter="${tagIDs.get(tag)}" aria-pressed="false">${escapeHTML(tag)}</button>`).join("")}`;
    projectList.innerHTML = content.projects
      .map((project) => projectRow(project, tagIDs))
      .join("");
    const cards = [...projectList.querySelectorAll(".project-row")];
    const applyProjectView = () => {
      cards
        .sort((a, b) => {
          if (sortSelect.value === "title")
            return a
              .querySelector("h2")
              .textContent.localeCompare(b.querySelector("h2").textContent);
          if (sortSelect.value === "status")
            return (
              Number(b.dataset.status === "Active") -
              Number(a.dataset.status === "Active")
            );
          return Number(a.dataset.order) - Number(b.dataset.order);
        })
        .forEach((card) => projectList.append(card));
      let visibleCount = 0;
      cards.forEach((card) => {
        const matches =
          activeFilter === "all" ||
          card.dataset.tagIds.split(" ").includes(activeFilter);
        card.style.display = matches ? "grid" : "none";
        card.setAttribute("aria-hidden", String(!matches));
        if (matches) visibleCount += 1;
      });
      emptyMessage.style.display = visibleCount ? "none" : "block";
    };
    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");
      if (!button || !filterBar.contains(button)) return;
      activeFilter = button.dataset.filter;
      filterBar.querySelectorAll("button[data-filter]").forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      applyProjectView();
    });
    sortSelect.addEventListener("change", applyProjectView);
    applyProjectView();
  }

  const publicationList = document.querySelector("#publication-list");
  if (publicationList)
    publicationList.innerHTML = content.publications
      .map(publicationCard)
      .join("");

  const inquiryForm = document.querySelector("#direct-inquiry");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!inquiryForm.checkValidity()) return inquiryForm.reportValidity();
      const fields = new FormData(inquiryForm);
      const recipient = inquiryForm.dataset.recipient || "peppr@calpoly.edu";

      const subject = `${fields.get("subject")} — ${fields.get("name")}`;
      const body = `${fields.get("message")}\n\nReply to: ${fields.get("email")}`;

      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      const notice = inquiryForm.querySelector(".notice");
      if (notice) notice.hidden = false;
    });
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const previous = carousel.querySelector("[data-carousel-previous]");
    const next = carousel.querySelector("[data-carousel-next]");
    const count = carousel.querySelector("[data-carousel-count]");
    let activeSlide = 0;

    const showSlide = (index) => {
      activeSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== activeSlide;
      });
      if (count) count.textContent = `${activeSlide + 1} / ${slides.length}`;
    };

    if (slides.length < 2) {
      if (previous) previous.disabled = true;
      if (next) next.disabled = true;
    } else {
      previous?.addEventListener("click", () => showSlide(activeSlide - 1));
      next?.addEventListener("click", () => showSlide(activeSlide + 1));
    }
    showSlide(0);
  });

  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.18 },
    );
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add("is-visible"));
})();
