// EZ Craft Stick: page behavior (prototype)

// ---------- Etsy links ----------
// TODO: paste the real Etsy links here once the shop is set up.
// shop: the shop's home page, for example "https://www.etsy.com/shop/YourShopName"
// Each section link comes from opening that section in the shop and copying the address,
// which ends in ?section_id= followed by a number.
const ETSY = {
  shop: "",
  stick: "",    // section: EZ Craft Sticks
  finished: "", // section: Finished pieces
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Sticky header: maroon underline once the page scrolls ----------
(() => {
  const header = document.getElementById("site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  addEventListener("scroll", update, { passive: true });
  update();
})();

// ---------- Mobile menu ----------
(() => {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("main-nav");
  if (!btn || !nav) return;
  const set = (open) => { btn.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open); };
  btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a, button")) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { set(false); btn.focus(); } });
  document.addEventListener("click", (e) => { if (!e.target.closest(".site-header")) set(false); });
})();

// ---------- Hero slideshow ----------
(() => {
  const hero = document.querySelector(".hero");
  const stage = document.getElementById("hero-carousel");
  if (!hero || !stage) return;
  const slides = [...stage.querySelectorAll(".carousel__slide")];
  const dots = [...hero.querySelectorAll(".carousel__dots i")];
  const pauseBtn = hero.querySelector('[data-carousel="pause"]');
  const INTERVAL = 6000;
  let index = 0, timer = null, paused = reduceMotion;

  function go(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }
  function stop() { clearInterval(timer); timer = null; }
  function start() { stop(); if (!paused) timer = setInterval(() => go(index + 1), INTERVAL); }
  function setPaused(p) {
    paused = p;
    hero.classList.toggle("is-paused", p);
    pauseBtn.setAttribute("aria-label", p ? "Play slideshow" : "Pause slideshow");
    p ? stop() : start();
  }
  hero.querySelector('[data-carousel="next"]').addEventListener("click", () => { go(index + 1); start(); });
  hero.querySelector('[data-carousel="prev"]').addEventListener("click", () => { go(index - 1); start(); });
  pauseBtn.addEventListener("click", () => setPaused(!paused));
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);
  setPaused(paused);
})();

// ---------- Design ideas gallery: pause button ----------
(() => {
  const section = document.querySelector(".design-ideas");
  if (!section) return;
  const btn = section.querySelector(".design-ideas__pause");
  btn.addEventListener("click", () => {
    const paused = !section.classList.contains("is-paused");
    section.classList.toggle("is-paused", paused);
    btn.setAttribute("aria-pressed", String(paused));
    btn.setAttribute("aria-label", paused ? "Play the design ideas gallery" : "Pause the design ideas gallery");
  });
})();

// ---------- How it works: step-by-step diagram ----------
(() => {
  const diagram = document.getElementById("diagram");
  if (!diagram) return;
  const status = document.getElementById("diagram-status");
  const buttons = [...document.querySelectorAll("#stepper [data-go]")];
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const total = buttons.length;
  let step = 1;

  function show(n) {
    step = Math.min(Math.max(n, 1), total);
    diagram.dataset.step = String(step);
    buttons.forEach((b, i) => {
      if (i + 1 === step) b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
      b.classList.toggle("is-done", i + 1 < step);
    });
    const title = buttons[step - 1].querySelector(".stepper__title").textContent;
    const body = buttons[step - 1].querySelector(".stepper__body").textContent;
    document.querySelector('[data-detail="n"]').textContent = step;
    document.querySelector('[data-detail="title"]').textContent = title;
    document.querySelector('[data-detail="body"]').textContent = body;
    status.textContent = `Step ${step} of ${total}: ${title}`;
    prev.disabled = step === 1;
    next.textContent = step === total ? "Start over" : "Next step";
  }
  buttons.forEach((b) => b.addEventListener("click", () => show(Number(b.dataset.go))));
  prev.addEventListener("click", () => show(step - 1));
  next.addEventListener("click", () => show(step === total ? 1 : step + 1));
  show(1);
})();

// ---------- Order dialog: send buyers to the right part of the Etsy shop ----------
(() => {
  const dialog = document.getElementById("order-dialog");
  if (!dialog) return;
  const soon = dialog.querySelector(".order-dialog__soon");

  dialog.querySelectorAll("[data-etsy]").forEach((a) => {
    const url = ETSY[a.dataset.etsy] || ETSY.shop;
    if (url) a.href = url;
    a.addEventListener("click", (e) => {
      if (!url) { e.preventDefault(); soon.hidden = false; }
      else setTimeout(() => dialog.close(), 300);
    });
  });

  document.querySelectorAll("[data-open-order]").forEach((btn) =>
    btn.addEventListener("click", () => { soon.hidden = true; dialog.showModal(); })
  );
  // close when clicking the dimmed area outside the dialog
  dialog.addEventListener("click", (e) => {
    const r = dialog.getBoundingClientRect();
    const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (outside && e.target === dialog) dialog.close();
  });
})();

// ---------- Updates sign-up ----------
// Sign-ups go to Formspree (formspree.io), which emails each one to the business inbox
// and keeps a list in the Formspree dashboard.
// TODO: paste the form's endpoint from Formspree here, for example "https://formspree.io/f/abcdwxyz".
// While it's empty, the form only shows the thank-you message and nothing is saved.
const FORM_ENDPOINT = "https://formspree.io/f/xljjqbww";

(() => {
  const form = document.getElementById("signup");
  if (!form) return;
  const email = document.getElementById("email");
  const err = document.getElementById("email-error");
  const done = form.querySelector(".form__done");
  const valid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!valid()) { err.hidden = false; email.setAttribute("aria-invalid", "true"); email.focus(); return; }
    err.hidden = true; email.setAttribute("aria-invalid", "false");
    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email: email.value.trim(), source: "Website: Not ready to order?", _subject: "New EZ Craft Stick sign-up" }) });
        if (!res.ok) throw new Error(res.status);
      } catch {
        done.textContent = "Your sign-up didn't go through. Check your connection and try again.";
        done.hidden = false; return;
      }
    }
    form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
    done.hidden = false;
  });
})();
