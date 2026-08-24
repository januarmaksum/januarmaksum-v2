import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function usePortfolioMotion(root, activeTab) {
  let context
  let reducedMotion

  function clearMotionStyles() {
    root.value?.querySelectorAll('[data-motion], [data-reveal], [data-tab-panel], [data-tab-panel] > *').forEach((element) => {
      gsap.set(element, { clearProps: 'all' })
    })
  }

  function animatePanel(panel) {
    if (!panel || reducedMotion?.matches) return
    const items = Array.from(panel.children)
    gsap.killTweensOf(items)
    gsap.fromTo(items, { opacity: 0, y: 18 }, {
      opacity: 1,
      y: 0,
      duration: 0.32,
      stagger: 0.05,
      ease: 'power2.out',
      clearProps: 'opacity,transform,visibility',
    })
  }

  function disableMotion(event) {
    if (!event.matches) return
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    context?.revert()
    gsap.globalTimeline.clear()
    clearMotionStyles()
  }

  onMounted(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.addEventListener('change', disableMotion)
    if (reducedMotion.matches) {
      clearMotionStyles()
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      intro
        .from('[data-motion="hero-copy"]', { opacity: 0, x: -32, duration: 0.7, clearProps: 'opacity,transform' })
        .from('[data-motion="hero-artwork"]', { opacity: 0, x: 24, duration: 0.55, clearProps: 'opacity,transform' }, '-=0.48')
        .from('[data-motion="availability"]', { opacity: 0, y: 10, duration: 0.3, clearProps: 'opacity,transform' }, '-=0.24')
        .from('[data-motion="social-link"]', { opacity: 0, x: 16, duration: 0.35, stagger: 0.06, clearProps: 'opacity,transform' }, '-=0.3')

      animatePanel(root.value.querySelector('[data-tab-panel]:not([hidden])'))
      gsap.to('[data-motion="hero-portrait"]', {
        yPercent: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value.querySelector('[aria-labelledby="hero-title"]'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, root.value)
  })

  watch(activeTab, async (tabId) => {
    await nextTick()
    animatePanel(root.value?.querySelector(`#${tabId}`))
  })

  onBeforeUnmount(() => {
    reducedMotion?.removeEventListener('change', disableMotion)
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    context?.revert()
    clearMotionStyles()
  })
}
