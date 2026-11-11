(function () {
  "use strict";

  var D = window.PORTFOLIO;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "style") n.setAttribute("style", attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    if (html != null) n.innerHTML = html;
    return n;
  }

  var P = D.person;
  var links = {
    email: { label: "Email me", url: "mailto:" + P.email, icon: "fa-solid fa-envelope" },
    linkedin: { label: "LinkedIn", url: P.linkedin, icon: "fa-brands fa-linkedin" },
    github: { label: "GitHub", url: P.github, icon: "fa-brands fa-github" },
  };

  function btn(link, cls) {
    var external = /^https?:/.test(link.url);
    return '<a class="btn ' + (cls || "") + '" href="' + link.url + '"' +
      (external ? ' target="_blank" rel="noopener noreferrer"' : "") + '>' +
      '<i class="' + link.icon + '" aria-hidden="true"></i>' + link.label + "</a>";
  }

  /* ------------------------------------------------------------------
     Theme (day / night)
     ------------------------------------------------------------------ */
  var toggle = $("#themeToggle");
  var favicons = {
    day: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☀️</text></svg>",
    night: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌙</text></svg>",
  };

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    var night = theme === "night";
    toggle.setAttribute("aria-pressed", String(night));
    toggle.setAttribute("aria-label", night ? "Switch to day mode" : "Switch to night mode");
    $("#favicon").href = favicons[theme];
    $("#themeColor").content = night ? "#282e4e" : "#f6f1e7";
    if (persist) { try { localStorage.setItem("amit-theme", theme); } catch (e) {} }
    redrawMarks();
  }
  toggle.addEventListener("click", function () {
    applyTheme(root.dataset.theme === "night" ? "day" : "night", true);
  });

  /* ------------------------------------------------------------------
     Hero hotspots
     Positions are percentages of the illustration (1090 × 441).
     ------------------------------------------------------------------ */
  var hotspots = [
    { id: "board", label: "My projects", side: "top", box: [8.3, 3.4, 31.2, 50], action: function () { scrollToId("projects"); } },
    { id: "amit", label: "Hi, I’m Amit", side: "top", box: [41, 4.5, 17.6, 44], action: openAbout },
    { id: "window", label: "My journey", side: "top", box: [61.3, 6.3, 29.1, 48], action: function (e) { openJourney(0, e); } },
    { id: "books", label: "Technion & grades", side: "bottom", box: [3.9, 61.5, 15.4, 31], action: openEducation },
    { id: "mug", label: "Let’s talk", side: "bottom", box: [27.6, 59, 7.8, 30], dy: 2, action: openContact },
    { id: "notebook", label: "Service notes", side: "bottom", box: [33.6, 82, 12.4, 13], dy: 4, action: openService },
    { id: "laptop", label: "Tech stack", side: "bottom", box: [47.4, 54.5, 26, 34], dy: 14, action: openSkills },
    { id: "ball", label: "Off the clock", side: "bottom", box: [68.4, 81, 6, 13], dy: 30, action: openHobbies },
    { id: "camera", label: "Demo video", side: "top", box: [74.8, 69.5, 7.8, 14.5], dx: -18, action: openVideo },
    { id: "octocat", label: "GitHub", side: "right", box: [84.5, 62, 6.2, 19.5], href: P.github },
    { id: "map", label: "Where I’m headed", side: "bottom", box: [75.5, 82.5, 20, 16], dy: 2, action: function (e) { openJourney(D.journey.length - 1, e); } },
  ];

  var arrowSvg =
    '<svg viewBox="0 0 34 40" aria-hidden="true">' +
    '<path class="shaft" d="M17 38 C 9 28, 25 18, 17 4" />' +
    '<path class="head" d="M11 10 L17 3 L23 9" /></svg>';

  var hsWrap = $("#hotspots");
  hotspots.forEach(function (h) {
    var tag = h.href ? "a" : "button";
    var attrs = {
      class: "hs hs-" + h.id,
      style: "left:" + h.box[0] + "%;top:" + h.box[1] + "%;width:" + h.box[2] + "%;height:" + h.box[3] + "%",
      "aria-label": h.label + (h.href ? " (opens in a new tab)" : ""),
    };
    if (tag === "button") attrs.type = "button";
    else { attrs.href = h.href; attrs.target = "_blank"; attrs.rel = "noopener noreferrer"; }
    var node = el(tag, attrs,
      '<span class="dot" aria-hidden="true" style="--delay:' + (hotspots.indexOf(h) * 0.37).toFixed(2) + 's"></span>' +
      '<span class="hs-label ' + h.side + '" style="--dy:' + (h.dy || 2) + 'px;--dx:' + (h.dx || 0) + 'px" aria-hidden="true">' +
      arrowSvg + '<span class="txt">' + h.label + "</span></span>");
    if (h.action) node.addEventListener("click", function (e) { h.action(e); });
    hsWrap.appendChild(node);
  });

  // Hovering the signature reveals every label at once.
  var sig = $("#signature");
  ["mouseenter", "focus"].forEach(function (ev) { sig.addEventListener(ev, function () { hsWrap.classList.add("reveal"); }); });
  ["mouseleave", "blur"].forEach(function (ev) { sig.addEventListener(ev, function () { hsWrap.classList.remove("reveal"); }); });

  function scrollToId(id) {
    var t = document.getElementById(id);
    if (t) t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  /* ------------------------------------------------------------------
     Hand-drawn marks in the intro (rough-notation)
     ------------------------------------------------------------------ */
  var marks = [];
  function markColors() {
    var night = root.dataset.theme === "night";
    return { underline: night ? "#ff8f6b" : "#d9583a", highlight: night ? "rgba(128,110,255,0.45)" : "rgba(255,216,102,0.75)" };
  }
  function drawMarks(animate) {
    if (!window.RoughNotation) return;
    marks.forEach(function (m) { m.remove(); });
    marks = [];
    var c = markColors();
    document.querySelectorAll("#introText .mark").forEach(function (n) {
      var type = n.dataset.mark;
      marks.push(window.RoughNotation.annotate(n, {
        type: type, color: c[type], strokeWidth: 2, padding: type === "highlight" ? 2 : 3,
        animate: animate && !reduceMotion, animationDuration: 900, multiline: true, iterations: 1,
      }));
    });
    if (animate) window.RoughNotation.annotationGroup(marks).show();
    else marks.forEach(function (m) { m.show(); });
  }
  function redrawMarks() { if (marks.length) drawMarks(false); }
  window.addEventListener("load", function () {
    var go = function () { setTimeout(function () { drawMarks(true); }, 500); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  });
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { redrawMarks(); layoutTimeline(); }, 150);
  });

  /* ------------------------------------------------------------------
     Quick facts + CTAs
     ------------------------------------------------------------------ */
  $("#facts").innerHTML = D.quickFacts.map(function (f) {
    return '<div class="fact"><span class="fact-icon"><i class="' + f.icon + '" aria-hidden="true"></i></span>' +
      "<div><dt>" + f.label + "</dt><dd>" + f.value + "</dd></div></div>";
  }).join("");

  var ctaHtml = btn(links.email, "primary") + btn(links.linkedin) + btn(links.github) +
    '<a class="btn" href="#projects"><i class="fa-solid fa-thumbtack" aria-hidden="true"></i>See my projects</a>';
  $("#ctaRow").innerHTML = ctaHtml;
  $("#footerCta").innerHTML = btn(links.email, "primary") + btn(links.linkedin) + btn(links.github);
  $("#year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Projects
     ------------------------------------------------------------------ */
  var projectById = {};
  D.projects.forEach(function (p) { projectById[p.id] = p; });

  $("#projectList").innerHTML = D.projects.map(function (p) {
    var media = p.video
      ? '<button class="project-media" type="button" data-video="' + p.id + '" aria-label="' + p.video.label + '">' +
        '<img src="' + p.cover + '" alt="' + p.coverAlt + '" loading="lazy" />' +
        '<span class="play"><span><i class="fa-solid fa-play" aria-hidden="true"></i>' + p.video.label + "</span></span></button>"
      : '<button class="project-media" type="button" data-project="' + p.id + '" aria-label="Read the story of ' + p.title + '">' +
        '<img src="' + p.cover + '" alt="' + p.coverAlt + '" loading="lazy" /></button>';
    return '<article class="project reveal-up">' + media +
      "<div>" +
      (p.status ? '<span class="status">' + p.status + "</span>" : "") +
      '<p class="project-cat">' + p.category + "</p>" +
      "<h3>" + p.title + "</h3>" +
      '<p class="project-pitch">' + p.pitch + "</p>" +
      '<ul class="tags">' + p.tags.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" +
      '<div class="cta-row"><button class="btn primary" type="button" data-project="' + p.id + '">' +
      '<i class="fa-solid fa-book-open" aria-hidden="true"></i>Read the story</button>' +
      p.links.map(function (l) { return btn(l); }).join("") + "</div>" +
      "</div></article>";
  }).join("");

  document.addEventListener("click", function (e) {
    var pb = e.target.closest("[data-project]");
    if (pb) { openProject(pb.dataset.project, e); return; }
    var vb = e.target.closest("[data-video]");
    if (vb) { openVideo(e); return; }
    var cb = e.target.closest("[data-contact]");
    if (cb) { openContact(e); }
  });

  /* ------------------------------------------------------------------
     Timeline
     ------------------------------------------------------------------ */
  function cardHtml(c) {
    switch (c.type) {
      case "quote":
        return '<div class="card quote"><span class="qmark" aria-hidden="true">“</span><p>' + c.text + '</p><div class="by">— ' + c.by + "</div></div>";
      case "stat":
        return '<div class="card stat ' + (c.tone || "") + '">' + (c.kicker ? '<div class="card-kicker">' + c.kicker + "</div>" : "") +
          '<div class="num">' + c.value + "</div><p>" + c.label + "</p></div>";
      case "grades":
        return '<div class="card"><div class="card-kicker">Selected courses</div><h3>' + c.title + '</h3><ul class="grades">' +
          D.grades.map(function (g) {
            return "<li><span>" + g[0] + "</span><b>" + g[1] + '</b><span class="bar"><i style="--w:' + g[1] + '%"></i></span></li>';
          }).join("") + "</ul></div>";
      case "role":
        return '<div class="card"><div class="card-kicker"><i class="' + c.icon + '" aria-hidden="true"></i>' + c.kicker + "</div>" +
          "<h3>" + c.title + "</h3><p>" + c.text + "</p></div>";
      case "badge":
        return '<div class="card badge"><div class="card-icon"><i class="' + c.icon + '" aria-hidden="true"></i></div>' +
          "<div><h3>" + c.title + "</h3><p>" + c.text + "</p></div></div>";
      case "note":
        return '<div class="card note"><div class="card-kicker"><i class="' + c.icon + '" aria-hidden="true"></i>Now</div><h3>' + c.title + "</h3><p>" + c.text + "</p>" +
          (c.cta ? '<button class="btn" type="button" data-contact><i class="fa-solid fa-mug-hot" aria-hidden="true"></i>Say hi</button>' : "") + "</div>";
      case "hobbies":
        return '<div class="card"><div class="card-kicker">When I’m not coding</div><h3>' + c.title + '</h3><div class="hobby-grid">' +
          D.hobbies.map(function (h) {
            return '<div class="hobby"><i class="' + h.icon + '" aria-hidden="true"></i><strong>' + h.title + "</strong><span>" + h.text + "</span></div>";
          }).join("") + "</div></div>";
      case "tags":
        return '<div class="card"><div class="card-kicker">Technion</div><h3>' + c.title + '</h3><div class="chips">' +
          D[c.source].map(function (t) { return "<span>" + t + "</span>"; }).join("") + "</div></div>";
      case "projects":
        return '<div class="card"><div class="card-kicker">Side by side with the degree</div><h3>' + c.title + '</h3><ul class="mini-projects">' +
          D.projects.map(function (p) {
            return '<li><button type="button" data-project="' + p.id + '"><img src="' + p.cover + '" alt="" loading="lazy" />' +
              "<span><strong>" + p.title + "</strong><span>" + p.category + '</span></span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button></li>';
          }).join("") + "</ul></div>";
      default:
        return "";
    }
  }

  var timeline = $("#timeline");
  var chapters = D.timeline.map(function (ch) {
    var section = el("section", { class: "chapter", "aria-label": ch.chapter + ", " + ch.years });
    section.innerHTML = '<div class="chapter-head"><span class="chapter-pill"><strong>' + ch.chapter + "</strong><span>" + ch.years + "</span></span></div>" +
      '<div class="cols"><div class="col"></div><div class="col"></div></div>';
    var cards = ch.cards.map(function (c) {
      var wrap = el("div", { class: "reveal-up" }, cardHtml(c));
      return wrap;
    });
    timeline.appendChild(section);
    return { section: section, cards: cards };
  });

  var lastMode = null;
  function layoutTimeline(force) {
    var single = window.innerWidth <= 760;
    var mode = single ? "single" : "double";
    if (!force && mode === lastMode) return;
    lastMode = mode;
    chapters.forEach(function (ch) {
      var cols = ch.section.querySelectorAll(".col");
      ch.cards.forEach(function (c) { c.remove(); });
      ch.cards.forEach(function (c, i) {
        if (single) { cols[0].appendChild(c); return; }
        // Place each card in the shorter column, like a pinboard.
        var target = cols[0].offsetHeight <= cols[1].offsetHeight ? cols[0] : cols[1];
        if (i === 1 && cols[1].childElementCount === 0) target = cols[1];
        target.appendChild(c);
      });
    });
  }
  layoutTimeline(true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layoutTimeline(true); });

  /* Reveal on scroll */
  var revealables = document.querySelectorAll(".reveal-up");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          var card = en.target.querySelector(".card");
          if (card) card.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (n) { io.observe(n); });
  } else {
    revealables.forEach(function (n) { n.classList.add("in"); var c = n.querySelector(".card"); if (c) c.classList.add("in"); });
  }

  /* ------------------------------------------------------------------
     Modal
     ------------------------------------------------------------------ */
  var modal = $("#modal");
  var body = $("#modalBody");
  var onModalKey = null;

  function openModal(html, e, setup) {
    if (modal.open) modal.close();
    body.innerHTML = html;
    body.classList.remove("in");
    onModalKey = null;
    modal.classList.remove("closing");
    modal.showModal();
    // Grow the dialog out of the object that was clicked.
    var r = modal.getBoundingClientRect();
    if (e && typeof e.clientX === "number" && (e.clientX || e.clientY)) {
      modal.style.setProperty("--ox", (e.clientX - r.left) + "px");
      modal.style.setProperty("--oy", (e.clientY - r.top) + "px");
    } else {
      modal.style.setProperty("--ox", "50%");
      modal.style.setProperty("--oy", "50%");
    }
    $(".modal-inner").scrollTop = 0;
    if (setup) setup(body);
  }

  function closeModal() {
    if (!modal.open) return;
    body.querySelectorAll("video").forEach(function (v) { v.pause(); });
    if (reduceMotion) { modal.close(); return; }
    modal.classList.add("closing");
    setTimeout(function () { modal.classList.remove("closing"); modal.close(); }, 200);
  }

  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("cancel", function (e) { e.preventDefault(); closeModal(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  modal.addEventListener("keydown", function (e) { if (onModalKey) onModalKey(e); });

  function head(kicker, title) {
    return '<p class="m-kicker">' + kicker + '</p><h2 id="modalTitle">' + title + "</h2>";
  }

  function openAbout(e) {
    var last = D.journey[D.journey.length - 1];
    openModal(
      head("hi there!", "I’m Amit") +
      D.about.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      "<h3>What I’m looking for</h3><p>" + last.text + "</p>" +
      '<div class="cta-row">' + btn(links.email, "primary") + btn(links.linkedin) + "</div>", e);
  }

  function openSkills(e) {
    openModal(
      head("the stickers on my laptop", "Tech stack") +
      '<div class="skill-groups">' + D.skills.map(function (g) {
        return "<div><h3>" + g.group + '</h3><div class="chips">' + g.items.map(function (s) { return "<span>" + s + "</span>"; }).join("") + "</div></div>";
      }).join("") + "</div>" +
      '<div class="cta-row"><button class="btn primary" type="button" data-goto="projects"><i class="fa-solid fa-thumbtack" aria-hidden="true"></i>See it in my projects</button></div>',
      e, wireGoto);
  }

  function openEducation(e) {
    openModal(
      head("from the bookshelf", "Technion – Israel Institute of Technology") +
      "<p><strong>B.Sc. in Data Science and Engineering</strong> · 2022 – 2027 (expected)</p>" +
      "<p>Computer science, statistics and machine learning, with a focus on algorithms, data management and software systems.</p>" +
      "<h3>Academic highlights</h3>" +
      '<ul class="grades">' + D.grades.map(function (g) {
        return "<li><span>" + g[0] + "</span><b>" + g[1] + '</b><span class="bar"><i style="--w:' + g[1] + '%"></i></span></li>';
      }).join("") + "</ul>" +
      "<h3>Relevant coursework</h3>" +
      '<div class="chips">' + D.coursework.map(function (c) { return "<span>" + c + "</span>"; }).join("") + "</div>" +
      "<h3>Beyond the classroom</h3><p>Guided prospective students, donors and visiting delegations from Israel and abroad, including ambassadors, at the Technion Visitors Center.</p>" +
      "<h3>Before the degree</h3><p>Technion pre-academic program (Mechina), 2021 – 2022: advanced mathematics, physics, English and scientific writing.</p>",
      e, function (b) {
        // grow the grade bars once the dialog is open
        setTimeout(function () { b.classList.add("in"); }, 120);
      });
  }

  function openService(e) {
    openModal(
      head("notes from the field", "Israel Defense Forces · Artillery Corps") +
      "<p><strong>Combat soldier</strong> · 2017 – 2020</p>" +
      "<p>Selected to serve on the Battalion Commander’s Forward Command Team, working directly with senior officers in dynamic, high-pressure situations.</p>" +
      "<p>Honorable discharge with a certificate of excellence and recommendation from the Battalion Commander.</p>",
      e);
  }

  function openHobbies(e) {
    openModal(
      head("when the laptop is closed", "Off the clock") +
      '<div class="hobby-grid">' + D.hobbies.map(function (h) {
        return '<div class="hobby"><i class="' + h.icon + '" aria-hidden="true"></i><strong>' + h.title + "</strong><span>" + h.text + "</span></div>";
      }).join("") + "</div>", e);
  }

  function openContact(e) {
    openModal(
      head("the coffee’s on me", "Let’s talk") +
      "<p>The fastest way to reach me is email. I’m also happy to connect on LinkedIn.</p>" +
      '<div class="contact-list">' +
      btn({ label: P.email, url: "mailto:" + P.email, icon: "fa-solid fa-envelope" }, "primary") +
      '<button class="btn" type="button" id="copyEmail"><i class="fa-regular fa-copy" aria-hidden="true"></i>Copy email address</button>' +
      btn({ label: "linkedin.com/in/amit-gertner", url: P.linkedin, icon: "fa-brands fa-linkedin" }) +
      btn({ label: "github.com/amit22882036-ship-it", url: P.github, icon: "fa-brands fa-github" }) +
      "</div>",
      e, function (b) {
        var c = b.querySelector("#copyEmail");
        c.addEventListener("click", function () {
          var done = function () {
            c.classList.add("copied");
            c.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>Copied!';
          };
          if (navigator.clipboard) navigator.clipboard.writeText(P.email).then(done, function () {});
        });
      });
  }

  function videoHtml(v) {
    return '<video controls playsinline preload="metadata" poster="' + v.poster + '">' +
      '<source src="' + v.src + '" type="video/mp4" />' +
      '<track kind="captions" src="' + v.captions + '" srclang="en" label="English" />' +
      "</video>";
  }

  function openVideo(e) {
    var p = projectById.agent;
    openModal(
      head("45 seconds, no sound needed", p.title) +
      videoHtml(p.video) +
      "<p>" + p.pitch + "</p>" +
      '<div class="cta-row"><button class="btn primary" type="button" data-project="agent"><i class="fa-solid fa-book-open" aria-hidden="true"></i>Read the full story</button>' +
      p.links.map(function (l) { return btn(l); }).join("") + "</div>",
      e, function (b) {
        var v = b.querySelector("video");
        var pr = v.play();
        if (pr && pr.catch) pr.catch(function () {});
      });
  }

  function openProject(id, e) {
    var p = projectById[id];
    if (!p) return;
    var story = p.story.map(function (s) { return s.h ? "<h3>" + s.h + "</h3>" : "<p>" + s.p + "</p>"; }).join("");
    var gallery = p.gallery && p.gallery.length
      ? '<div class="gallery"><div class="gallery-track" tabindex="0" aria-label="Screenshots">' +
        p.gallery.map(function (g) {
          return '<figure><img src="' + g.src + '" alt="' + g.alt + '" loading="lazy" /><figcaption>' + g.alt + "</figcaption></figure>";
        }).join("") + "</div>" +
        (p.gallery.length > 1
          ? '<div class="gallery-nav"><button type="button" class="g-prev" aria-label="Previous screenshot"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>' +
            '<span class="gallery-note">' + (p.galleryNote || "Swipe or use the arrows") + "</span>" +
            '<button type="button" class="g-next" aria-label="Next screenshot"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button></div>'
          : "") + "</div>"
      : "";
    openModal(
      head(p.category, p.title) +
      (p.status ? '<span class="status">' + p.status + "</span>" : "") +
      (p.video ? videoHtml(p.video) : "") +
      story + gallery +
      '<ul class="tags" style="margin-top:18px">' + p.tags.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" +
      '<div class="cta-row">' + p.links.map(function (l, i) { return btn(l, i === 0 ? "primary" : ""); }).join("") + "</div>",
      e, function (b) {
        var track = b.querySelector(".gallery-track");
        if (!track) return;
        var step = function (dir) { track.scrollBy({ left: dir * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" }); };
        var prev = b.querySelector(".g-prev"), next = b.querySelector(".g-next");
        if (prev) prev.addEventListener("click", function () { step(-1); });
        if (next) next.addEventListener("click", function () { step(1); });
      });
  }

  function openJourney(start, e) {
    var i = start || 0;
    var steps = D.journey;
    openModal(
      head("the view from my window", "My journey") +
      '<div class="window-frame" id="wFrame"><i class="w-icon" id="wIcon" aria-hidden="true"></i>' +
      '<span class="w-place" id="wPlace"></span><span class="w-years" id="wYears"></span></div>' +
      '<div class="step-body" id="stepBody" aria-live="polite"></div>' +
      '<div class="stepper"><button class="arrow" type="button" id="jPrev" aria-label="Previous chapter"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>' +
      '<div class="dots" id="jDots"></div>' +
      '<button class="arrow" type="button" id="jNext" aria-label="Next chapter"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button></div>',
      e, function (b) {
        var dots = b.querySelector("#jDots");
        dots.innerHTML = steps.map(function (s, k) {
          return '<button type="button" aria-label="' + s.years + ": " + s.title + '" data-k="' + k + '"></button>';
        }).join("");
        function render(dir) {
          var s = steps[i];
          var frame = b.querySelector("#wFrame");
          frame.dataset.sky = s.sky;
          b.querySelector("#wIcon").className = "w-icon " + s.icon;
          b.querySelector("#wPlace").textContent = s.place;
          b.querySelector("#wYears").textContent = s.years;
          var sb = b.querySelector("#stepBody");
          sb.innerHTML = "<h3>" + s.title + "</h3><p>" + s.text + "</p>" +
            (s.cta ? '<div class="cta-row">' + btn(links.email, "primary") + btn(links.linkedin) + "</div>" : "");
          sb.classList.remove("swap");
          sb.style.setProperty("--from", (dir || 0) * 16 + "px");
          void sb.offsetWidth;
          if (dir) sb.classList.add("swap");
          b.querySelector("#jPrev").disabled = i === 0;
          b.querySelector("#jNext").disabled = i === steps.length - 1;
          dots.querySelectorAll("button").forEach(function (d, k) {
            if (k === i) d.setAttribute("aria-current", "step"); else d.removeAttribute("aria-current");
          });
        }
        function go(dir) { var n = i + dir; if (n < 0 || n >= steps.length) return; i = n; render(dir); }
        b.querySelector("#jPrev").addEventListener("click", function () { go(-1); });
        b.querySelector("#jNext").addEventListener("click", function () { go(1); });
        dots.addEventListener("click", function (ev) {
          var d = ev.target.closest("button"); if (!d) return;
          var k = +d.dataset.k; var dir = k > i ? 1 : -1; if (k === i) return; i = k; render(dir);
        });
        onModalKey = function (ev) {
          if (ev.key === "ArrowRight") { go(1); ev.preventDefault(); }
          if (ev.key === "ArrowLeft") { go(-1); ev.preventDefault(); }
        };
        render(0);
      });
  }

  function wireGoto(b) {
    b.querySelectorAll("[data-goto]").forEach(function (g) {
      g.addEventListener("click", function () {
        var id = g.dataset.goto;
        closeModal();
        setTimeout(function () { scrollToId(id); }, 220);
      });
    });
  }

  applyTheme(root.dataset.theme || "day", false);
})();
