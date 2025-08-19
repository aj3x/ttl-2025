// assets/js/main.js

// --- Helpers -------------------------------------------------
const q = (sel, root = document) => root.querySelector(sel);
const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** Only run a gsap.to() if the selector exists */
const gsapToIf = (selector, vars) => {
  if (q(selector)) gsap.to(selector, vars);
};

/** Wrap each word of an element in span.word */
function wrapWordsInSpan(element) {
  if (!element) return;
  const text = element.textContent || "";
  element.innerHTML = text
    .split(" ")
    .map((w) => `<span class="word">${w}</span>`)
    .join(" ");
}

// --- Boot ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Lenis (single instance)
  const lenis = new Lenis({ autoRaf: true });

  // Mobile menu
  const menuToggle = q(".menu-toggle");
  const mainNav = q(".main-nav");
  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    mainNav?.classList.toggle("active");
  });

  // --- Hero split animation ---------------------------------
  if (window.SplitType) {
    const split = new SplitType(".hero-title-split", { types: "lines", lineClass: "line" });
    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero-title-split",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      onStart: () => { const el = q(".hero-title-split"); if (el) el.style.opacity = 1; }
    });
  }

  // --- Impact section ----------------------------------------
  gsapToIf(".scroll", {
    autoAlpha: 0,
    duration: 0.2,
    scrollTrigger: {
      trigger: ".impact-section",
      start: "top top",
      end: "top top-=1",
      toggleActions: "play none reverse none"
    }
  });

  wrapWordsInSpan(q(".impact-section .paragraph"));

  const aboutPin = q(".impact-section .pin-height");
  const aboutCont = q(".impact-section .container");
  const aboutWords = qa(".impact-section .word");

  if (aboutPin && aboutCont && aboutWords.length) {
    gsap.to(aboutWords, {
      x: 0,
      stagger: 0.02,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: aboutPin,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: aboutCont
      }
    });
  }

  // --- Product section --------------------------------------
  gsapToIf(".scroll", {
    autoAlpha: 0,
    duration: 0.2,
    scrollTrigger: {
      trigger: ".product-section",
      start: "top top",
      end: "top top-=1",
      toggleActions: "play none reverse none"
    }
  });

  const slides = qa(".product-section .slide");
  slides.forEach((slide) => {
    const contentWrapper = q(".content-wrapper", slide);
    const content = q(".content", slide);
    if (!content) return;

    if (!slide.classList.contains("end-slide")) {
      gsap.to(content, {
        rotationZ: (Math.random() - 0.5) * 10,
        scale: 0.7,
        rotationX: 40,
        ease: "power1.in",
        scrollTrigger: {
          pin: contentWrapper || content,
          trigger: slide,
          start: "top 0%",
          end: "+=" + window.innerHeight,
          scrub: true
        }
      });
    } else {
      gsap.to(content, {
        autoAlpha: 0,
        ease: "power1.in",
        scrollTrigger: {
          trigger: content,
          start: "top -80%",
          end: "+=" + 0.2 * window.innerHeight,
          scrub: true
        }
      });
    }

    // Fade down as it leaves viewport
    gsap.to(content, {
      autoAlpha: 0,
      ease: "power1.in",
      scrollTrigger: {
        trigger: content,
        start: "top -80%",
        end: "+=" + 0.2 * window.innerHeight,
        scrub: true
      }
    });
  });

  // --- Teams intro (curved text scroll) ---------------------
  gsapToIf(".scroll", {
    autoAlpha: 0,
    duration: 0.2,
    scrollTrigger: {
      trigger: ".teams-intro",
      start: "top top",
      end: "top top-=1",
      toggleActions: "play none reverse none"
    }
  });

  const teamsIntro = q(".teams-intro");
  if (teamsIntro) {
    const textPath = q("#textpath", teamsIntro);
    const path = q("#path", teamsIntro);

    if (textPath && path) {
      const text = (textPath.textContent || "").trim();

      // Calculate text width using canvas
      const getTextWidth = (t) => {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        const comp = window.getComputedStyle(textPath);
        context.font = comp.font;
        return context.measureText(t).width;
      };

      const textPathLength = getTextWidth(text) * 1.25;
      const pathLength = path.getTotalLength();
      const finalOffset = -(textPathLength * 100 / pathLength) + "0%";

      gsap.to(textPath, {
        attr: { startOffset: finalOffset },
        ease: "none",
        scrollTrigger: {
          trigger: ".teams-intro .pin-height",
          start: "top top",
          end: "bottom bottom",
          pin: ".teams-intro .container",
          scrub: true
        }
      });
    }
  }

  // --- Teams section (cards around big circles) -------------
  gsapToIf(".scroll", {
    autoAlpha: 0,
    duration: 0.2,
    scrollTrigger: {
      trigger: ".teams-section",
      start: "top top",
      end: "top top-=1",
      toggleActions: "play none reverse none"
    }
  });

  const pinHeight = q(".teams-section .pin-height");
  const circles = qa(".teams-section .circle");

  if (pinHeight && circles.length) {
    gsap.fromTo(".teams-section .circles", { y: "5%" }, {
      y: "-5%",
      ease: "none",
      scrollTrigger: {
        trigger: pinHeight,
        start: "top top",
        end: "bottom bottom",
        pin: ".teams-section .container",
        scrub: true
      }
    });

    let angle = 3;
    let halfRange = (circles.length - 1) * angle / 2;
    let rot = -halfRange;

    const distPerCard = (pinHeight.clientHeight - window.innerHeight) / circles.length;

    circles.forEach((circle, index) => {
      gsap.to(circle, {
        rotation: rot,
        ease: "power1.out",
        scrollTrigger: {
          trigger: pinHeight,
          start: "top top-=" + (distPerCard) * index,
          end: "+=" + (distPerCard),
          scrub: true
        }
      });

      const card = q(".card", circle);
      if (card) {
        gsap.to(card, {
          rotation: rot,
          y: "-50%",
          ease: "power1.out",
          scrollTrigger: {
            trigger: pinHeight,
            start: "top top-=" + (distPerCard) * index,
            end: "+=" + (distPerCard),
            scrub: true
          }
        });
      }

      rot += angle;
    });
  }

  // --- People First (cards fade in) -------------------------
  const initPeopleFirst = () => {
    const cards = qa(".people-first .people-first-card");
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 24 });
    gsap.timeline({
      scrollTrigger: {
        trigger: ".people-first .people-first-cards",
        start: "top 85%",
        once: true
      }
    }).to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15
    });
  };
  initPeopleFirst();

  // --- Floating images follow (about-remote-work) ---------------
  (function () {
    const root = q(".about-remote-work");
    if (!root) return;

    const images = qa(".medias img", root).map((i) => i.getAttribute("src")).filter(Boolean);
    if (!images.length) return;

    const DEAD_TOP = 100;
    const DEAD_BOTTOM = 100;
    const DEAD_LEFT = 0;
    const DEAD_RIGHT = 0;

    let incr = 0, oldX = 0, firstMove = true;
    const resetDist = window.innerWidth / 15;
    let indexImg = 0;

    root.addEventListener("mousemove", (e) => {
      const rect = root.getBoundingClientRect();
      const xClient = e.clientX;
      const yRel = e.clientY - rect.top;
      const xRel = e.clientX - rect.left;

      const inSafeY = yRel >= DEAD_TOP && yRel <= rect.height - DEAD_BOTTOM;
      const inSafeX = xRel >= DEAD_LEFT && xRel <= rect.width - DEAD_RIGHT;
      if (!inSafeY || !inSafeX) { oldX = xClient; return; }

      if (firstMove) { firstMove = false; oldX = xClient; return; }

      incr += Math.abs(xClient - oldX);
      oldX = xClient;

      if (incr > resetDist) {
        incr = 0;
        createMedia(xClient, yRel);
      }
    });

    function createMedia(xClient, yRel) {
      const src = images[indexImg];
      indexImg = (indexImg + 1) % images.length;

      const img = document.createElement("img");
      img.src = src;
      root.appendChild(img);

      const tl = gsap.timeline({
        onComplete: () => { img.remove(); tl.kill(); }
      });

      tl.fromTo(img, {
        x: xClient,
        y: yRel,
        xPercent: -50 + (Math.random() - 0.5) * 60,
        yPercent: -50 + (Math.random() - 0.5) * 10,
        rotation: (Math.random() - 0.5) * 14,
        scale: 1.25
      }, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      }).to(img, {
        scale: 0.5,
        duration: 0.28,
        ease: "back.in(1.4)",
        delay: 0.08
      });
    }
  })();

  // --- Team links JSON (update path if you moved it) --------
  (async function loadTeamLinksFromJSON() {
    try {
      const res = await fetch("team-links.json", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch JSON");
      const data = await res.json(); // { Reads: [...], Listens: [...], Notices: [...] }

      qa(".team-inside .card-links").forEach((ul) => {
        const type = ul.getAttribute("data-type");
        const list = data[type] || [];
        ul.innerHTML = list.map(({ name, url }) =>
          `<li><a href="${url}" target="_blank" rel="noopener">${name}</a></li>`
        ).join("") || `<li><em>Nothing yet</em></li>`;
      });
    } catch (e) {
      console.error(e);
      qa(".team-inside .card-links").forEach((ul) => {
        if (!ul.children.length) ul.innerHTML = `<li><em>Coming soon</em></li>`;
      });
    }
  })();
});
