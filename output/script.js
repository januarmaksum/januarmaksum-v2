(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const tabs = Array.from(document.querySelectorAll('[role="tab"][data-tab]'));
  const panels = Array.from(document.querySelectorAll("[data-tab-panel]"));
  const year = document.querySelector("#copyright-year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const clearMotionStyles = () => {
    document
      .querySelectorAll(
        "[data-reveal], [data-tab-panel], [data-tab-panel] > *, #hero-monogram-art, .hero-copy, .hero-kicker, .profile-mark, .availability-badge, .social-link",
      )
      .forEach((element) => element.removeAttribute("style"));
  };

  const animatePanel = (panel) => {
    if (!panel || reducedMotion.matches || !window.gsap) return;

    const items = Array.from(panel.children);
    window.gsap.killTweensOf(items);
    window.gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "opacity,transform,visibility",
      },
    );
  };

  const activateTab = (tab, { focus = false, animate = true } = {}) => {
    if (!tab) return;

    const targetId = tab.dataset.tab;
    const activePanel = panels.find((panel) => panel.id === targetId);
    if (!activePanel) return;

    tabs.forEach((candidate) => {
      const isActive = candidate === tab;
      candidate.setAttribute("aria-selected", String(isActive));
      candidate.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel !== activePanel;
    });

    if (focus) {
      tab.focus({ preventScroll: true });
    }

    if (animate) {
      window.requestAnimationFrame(() => animatePanel(activePanel));
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));

    tab.addEventListener("keydown", (event) => {
      let nextIndex = null;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateTab(tab, { focus: true });
        return;
      }

      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;

      if (nextIndex === null) return;

      event.preventDefault();
      activateTab(tabs[nextIndex], { focus: true });
    });
  });

  const defaultTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
  activateTab(defaultTab, { animate: false });

  if (reducedMotion.matches || !window.gsap) {
    clearMotionStyles();
    return;
  }

  try {
    const intro = window.gsap.timeline({ defaults: { ease: "expo.out" } });
    intro
      .from(".hero-copy", { opacity: 0, x: -32, duration: 0.7, clearProps: "opacity,transform" })
      .from(".hero-kicker", { opacity: 0, y: 12, duration: 0.35, clearProps: "opacity,transform" }, "-=0.38")
      .from(".profile-mark", { opacity: 0, scale: 0.82, rotate: -8, duration: 0.5, clearProps: "opacity,transform" }, "-=0.22")
      .from(".availability-badge", { opacity: 0, y: 10, duration: 0.3, clearProps: "opacity,transform" }, "-=0.24")
      .from(".social-link", { opacity: 0, x: 16, duration: 0.35, stagger: 0.06, clearProps: "opacity,transform" }, "-=0.3");

    animatePanel(document.querySelector("[data-tab-panel]:not([hidden])"));

    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.to("#hero-monogram-art", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-surface",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }

    const disableMotion = (event) => {
      if (!event.matches) return;
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
      window.gsap.globalTimeline.clear();
      clearMotionStyles();
    };

    reducedMotion.addEventListener("change", disableMotion, { once: true });
  } catch (error) {
    clearMotionStyles();
    console.warn("Motion enhancement was skipped.", error);
  }
})();
