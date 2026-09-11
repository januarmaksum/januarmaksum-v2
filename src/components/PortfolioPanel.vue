<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'

const props = defineProps({
  portfolios: { type: Array, required: true },
  modalMaxWidth: { type: String, default: '800px' },
  active: Boolean,
})

gsap.registerPlugin(Flip)

const portfolioFilters = [
  { id: 'all', label: 'All' },
  { id: 'react', label: 'React' },
  { id: 'vue', label: 'Vue' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'wordpress', label: 'WordPress' },
]

const dialogOpen = ref(false)
const selectedPortfolio = ref(null)
const activeFilter = ref('all')
const portfolioGrid = ref(null)
let filterAnimationId = 0
let animatedPortfolioItems = []
let portfolioTriggerElement = null
let portfolioScrollPosition = { x: 0, y: 0 }
let scrollRestoreFrame = 0
let scrollRestoreId = 0

const filteredPortfolios = computed(() => {
  if (activeFilter.value === 'all') return props.portfolios
  return props.portfolios.filter((portfolio) => portfolio.filters.includes(activeFilter.value))
})

const activeFilterLabel = computed(() => (
  portfolioFilters.find((filter) => filter.id === activeFilter.value)?.label ?? 'All'
))

const filterAnnouncement = computed(() => {
  const count = filteredPortfolios.value.length
  return `${count} portfolio ${count === 1 ? 'project' : 'projects'} shown for ${activeFilterLabel.value}.`
})

const selectedPortfolioIndex = computed(() => (
  props.portfolios.findIndex((portfolio) => portfolio.id === selectedPortfolio.value?.id)
))

const previousPortfolio = computed(() => {
  if (!props.portfolios.length || selectedPortfolioIndex.value < 0) return null
  return props.portfolios[(selectedPortfolioIndex.value - 1 + props.portfolios.length) % props.portfolios.length]
})

const nextPortfolio = computed(() => {
  if (!props.portfolios.length || selectedPortfolioIndex.value < 0) return null
  return props.portfolios[(selectedPortfolioIndex.value + 1) % props.portfolios.length]
})

const portfolioAnnouncement = computed(() => {
  if (selectedPortfolioIndex.value < 0 || !selectedPortfolio.value) return ''
  return `Project ${selectedPortfolioIndex.value + 1} of ${props.portfolios.length}: ${selectedPortfolio.value.title}`
})

function resolvePortfolioImage(image, context) {
  const resolvedImage = image && typeof image === 'object'
    ? image[context] ?? image
    : image

  if (typeof resolvedImage === 'string') {
    return {
      sources: [],
      src: resolvedImage,
      width: 1536,
      height: 1024,
    }
  }

  return resolvedImage ?? {
    sources: [],
    src: '',
    width: 1536,
    height: 1024,
  }
}

function openPortfolio(portfolio, event) {
  scrollRestoreId += 1
  cancelAnimationFrame(scrollRestoreFrame)

  if (event?.currentTarget instanceof HTMLElement) {
    portfolioTriggerElement = event.currentTarget
  }

  portfolioScrollPosition = { x: window.scrollX, y: window.scrollY }
  selectedPortfolio.value = portfolio
  dialogOpen.value = true
}

function navigatePortfolio(direction) {
  if (!props.portfolios.length || selectedPortfolioIndex.value < 0) return

  const nextIndex = (selectedPortfolioIndex.value + direction + props.portfolios.length) % props.portfolios.length
  selectedPortfolio.value = props.portfolios[nextIndex]
}

function handleDialogKeydown(event) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    navigatePortfolio(-1)
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    navigatePortfolio(1)
  }
}

function handleCloseAutoFocus(event) {
  event.preventDefault()

  const triggerElement = portfolioTriggerElement
  const scrollPosition = { ...portfolioScrollPosition }
  const restoreId = ++scrollRestoreId

  if (triggerElement?.isConnected) {
    triggerElement.focus({ preventScroll: true })
  }

  nextTick(() => {
    if (restoreId !== scrollRestoreId) return

    scrollRestoreFrame = requestAnimationFrame(() => {
      if (restoreId !== scrollRestoreId) return

      scrollRestoreFrame = requestAnimationFrame(() => {
        if (restoreId !== scrollRestoreId) return

        if (window.scrollX !== scrollPosition.x || window.scrollY !== scrollPosition.y) {
          window.scrollTo(scrollPosition.x, scrollPosition.y)
        }

        portfolioTriggerElement = null
        scrollRestoreFrame = 0
      })
    })
  })
}

function clearFilterItemStyles(items) {
  if (!items.length) return

  gsap.set(items, { clearProps: 'opacity,transform,visibility' })
  items.forEach((item) => item.classList.remove('portfolio-card-flipping'))
}

function stopFilterAnimation(items, complete = true) {
  if (!items.length) return

  Flip.killFlipsOf(items, complete)
  gsap.killTweensOf(items)
  clearFilterItemStyles(items)
}

async function selectFilter(filterId) {
  if (filterId === activeFilter.value) return

  const animationId = ++filterAnimationId
  const currentItems = Array.from(portfolioGrid.value?.querySelectorAll('[data-portfolio-item]') ?? [])
  const itemsToReset = Array.from(new Set([...animatedPortfolioItems, ...currentItems]))
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let previousState

  stopFilterAnimation(itemsToReset)
  animatedPortfolioItems = []

  if (!reduceMotion && currentItems.length) {
    previousState = Flip.getState(currentItems)
  }

  activeFilter.value = filterId
  await nextTick()

  const nextItems = Array.from(portfolioGrid.value?.querySelectorAll('[data-portfolio-item]') ?? [])

  if (animationId !== filterAnimationId) return

  if (reduceMotion || !previousState) {
    clearFilterItemStyles(nextItems)
    return
  }

  animatedPortfolioItems = Array.from(new Set([...currentItems, ...nextItems]))

  Flip.from(previousState, {
    targets: nextItems,
    duration: 0.36,
    ease: 'power2.out',
    stagger: 0.035,
    absoluteOnLeave: true,
    toggleClass: 'portfolio-card-flipping',
    onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }),
    onLeave: (elements) => gsap.to(elements, { opacity: 0, y: -8, duration: 0.18, ease: 'power1.in' }),
    onComplete: () => {
      if (animationId !== filterAnimationId) return

      clearFilterItemStyles(nextItems)
      animatedPortfolioItems = []
    },
  })
}

onBeforeUnmount(() => {
  const items = Array.from(portfolioGrid.value?.querySelectorAll('[data-portfolio-item]') ?? [])
  filterAnimationId += 1
  stopFilterAnimation(Array.from(new Set([...animatedPortfolioItems, ...items])), false)
  animatedPortfolioItems = []
  scrollRestoreId += 1
  cancelAnimationFrame(scrollRestoreFrame)
})
</script>

<template>
  <section id="work" :hidden="!active" class="px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-work" tabindex="0" data-tab-panel>
    <DialogRoot v-model:open="dialogOpen">
      <div class="mb-8 flex-wrap gap-3 hidden!" role="group" aria-label="Filter portfolio projects">
        <button
          v-for="filter in portfolioFilters"
          :key="filter.id"
          type="button"
          class="min-h-11 touch-manipulation cursor-pointer border-2 border-[#111111] px-4 py-2 font-mono text-[0.72rem] font-extrabold uppercase tracking-[0.06em] text-[#111111] transition-[background-color,box-shadow,transform] duration-180 ease-out focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:duration-[0.01ms]"
          :class="filter.id === activeFilter
            ? '-translate-x-0.5 -translate-y-0.5 bg-[#ff5c35] [box-shadow:5px_5px_0_#111111]'
            : 'bg-white [box-shadow:3px_3px_0_#111111] hover:bg-[#e8ff3f] active:translate-x-0.5 active:translate-y-0.5 active:[box-shadow:none]'"
          :aria-pressed="filter.id === activeFilter"
          aria-controls="portfolio-grid"
          @click="selectFilter(filter.id)"
          @keydown.enter.prevent="selectFilter(filter.id)"
          @keydown.space.prevent="selectFilter(filter.id)"
        >
          {{ filter.label }}
        </button>
      </div>

      <p class="sr-only" aria-live="polite" aria-atomic="true">{{ filterAnnouncement }}</p>

      <div id="portfolio-grid" ref="portfolioGrid" class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <article
          v-for="portfolio in filteredPortfolios"
          :key="portfolio.id"
          data-reveal
          data-portfolio-item
          data-portfolio-card
          :data-flip-id="portfolio.id"
          class="group relative flex min-w-0 flex-col border-2 border-[#111111] bg-white [box-shadow:6px_6px_0_#111111] transition-[box-shadow,transform] duration-170 ease-[ease] hover:[box-shadow:8px_8px_0_#ff5c35] md:hover:transform-[translate(-2px,-2px)] [&.portfolio-card-flipping]:transition-none motion-reduce:duration-[0.01ms]"
        >
          <button
            type="button"
            class="absolute inset-0 z-10 touch-manipulation cursor-pointer focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600"
            :aria-label="`View details for ${portfolio.title}`"
            aria-haspopup="dialog"
            @click="openPortfolio(portfolio, $event)"
            @keydown.enter.prevent="openPortfolio(portfolio, $event)"
            @keydown.space.prevent="openPortfolio(portfolio, $event)"
          />

          <div class="aspect-3/2 overflow-hidden border-b-2 border-[#111111] bg-[#111111]">
            <picture v-if="resolvePortfolioImage(portfolio.image, 'card').src" class="block size-full">
              <source
                v-for="source in resolvePortfolioImage(portfolio.image, 'card').sources ?? []"
                :key="source.type"
                :type="source.type"
                :srcset="source.srcset"
                sizes="(min-width: 1280px) 520px, (min-width: 768px) 50vw, 100vw"
              />
              <img
                class="block size-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                :src="resolvePortfolioImage(portfolio.image, 'card').src"
                :srcset="resolvePortfolioImage(portfolio.image, 'card').srcset"
                sizes="(min-width: 1280px) 520px, (min-width: 768px) 50vw, 100vw"
                :width="resolvePortfolioImage(portfolio.image, 'card').width"
                :height="resolvePortfolioImage(portfolio.image, 'card').height"
                :alt="portfolio.imageAlt"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          <div class="flex flex-1 flex-col p-[clamp(1.15rem,2.5vw,1.6rem)]">
            <p class="font-mono text-[0.68rem] font-extrabold uppercase leading-normal tracking-[0.08em] text-[#67645d]">{{ portfolio.company }} · {{ portfolio.category }}</p>
            <h3 class="mt-2 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.45rem,2.7vw,2rem)] font-black uppercase leading-none tracking-[-0.04em]">{{ portfolio.title }}</h3>
          </div>
        </article>

        <div v-if="filteredPortfolios.length === 0" data-portfolio-item data-portfolio-empty data-flip-id="portfolio-empty" class="col-span-full border-2 border-[#111111] bg-white p-[clamp(1.5rem,4vw,3rem)] text-center [box-shadow:6px_6px_0_#111111]">
          <h3 class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.6rem,4vw,2.5rem)] font-black uppercase leading-none tracking-[-0.04em]">No Backend projects yet.</h3>
          <button type="button" class="mt-6 min-h-11 touch-manipulation cursor-pointer border-2 border-[#111111] bg-[#e8ff3f] px-5 py-2 font-mono text-[0.72rem] font-extrabold uppercase tracking-[0.06em] [box-shadow:4px_4px_0_#111111] transition-[box-shadow,transform] duration-180 active:translate-x-0.5 active:translate-y-0.5 active:[box-shadow:none] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:duration-[0.01ms]" @click="selectFilter('all')" @keydown.enter.prevent="selectFilter('all')" @keydown.space.prevent="selectFilter('all')">
            Show all projects
          </button>
        </div>
      </div>

      <DialogPortal v-if="selectedPortfolio">
        <DialogOverlay class="portfolio-dialog-overlay fixed inset-0 z-80 bg-black/75" />
        <DialogContent class="portfolio-dialog-content fixed inset-x-0 bottom-0 z-90 w-full max-w-none focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:w-[calc(100%-3rem)] md:-translate-x-1/2 md:-translate-y-1/2" :style="{ maxWidth: modalMaxWidth }" @keydown="handleDialogKeydown" @close-auto-focus="handleCloseAutoFocus">
          <button
            type="button"
            class="absolute left-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 touch-manipulation cursor-pointer items-center justify-center border-2 border-[#111111] bg-[#e8ff3f] text-[#111111] [box-shadow:4px_4px_0_#111111] transition-[background-color,color,box-shadow,transform] duration-160 hover:bg-[#111111] hover:text-[#e8ff3f] active:[box-shadow:none] active:translate-x-0.5 active:translate-y-[calc(-50%+2px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:transition-none md:inline-flex lg:hidden"
            :aria-label="`Previous project: ${previousPortfolio?.title}`"
            @click="navigatePortfolio(-1)"
          >
            <ArrowLeft class="size-6" :stroke-width="2.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="absolute right-3 top-1/2 z-20 hidden size-11 -translate-y-1/2 touch-manipulation cursor-pointer items-center justify-center border-2 border-[#111111] bg-[#e8ff3f] text-[#111111] [box-shadow:4px_4px_0_#111111] transition-[background-color,color,box-shadow,transform] duration-160 hover:bg-[#111111] hover:text-[#e8ff3f] active:[box-shadow:none] active:-translate-x-0.5 active:translate-y-[calc(-50%+2px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:transition-none md:inline-flex lg:hidden"
            :aria-label="`Next project: ${nextPortfolio?.title}`"
            @click="navigatePortfolio(1)"
          >
            <ArrowRight class="size-6" :stroke-width="2.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="absolute -left-16 top-1/2 z-20 hidden size-12 -translate-y-1/2 touch-manipulation cursor-pointer items-center justify-center border-2 border-[#111111] bg-[#e8ff3f] text-[#111111] [box-shadow:4px_4px_0_#111111] transition-[background-color,color,box-shadow,transform] duration-160 hover:bg-[#111111] hover:text-[#e8ff3f] active:[box-shadow:none] active:translate-x-0.5 active:translate-y-[calc(-50%+2px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:transition-none lg:inline-flex"
            :aria-label="`Previous project: ${previousPortfolio?.title}`"
            @click="navigatePortfolio(-1)"
          >
            <ArrowLeft class="size-7" :stroke-width="2.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="absolute -right-16 top-1/2 z-20 hidden size-12 -translate-y-1/2 touch-manipulation cursor-pointer items-center justify-center border-2 border-[#111111] bg-[#e8ff3f] text-[#111111] [box-shadow:4px_4px_0_#111111] transition-[background-color,color,box-shadow,transform] duration-160 hover:bg-[#111111] hover:text-[#e8ff3f] active:[box-shadow:none] active:-translate-x-0.5 active:translate-y-[calc(-50%+2px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:transition-none lg:inline-flex"
            :aria-label="`Next project: ${nextPortfolio?.title}`"
            @click="navigatePortfolio(1)"
          >
            <ArrowRight class="size-7" :stroke-width="2.5" aria-hidden="true" />
          </button>

          <p class="sr-only" aria-live="polite" aria-atomic="true">{{ portfolioAnnouncement }}</p>

          <div class="relative max-h-[78dvh] overflow-y-auto overscroll-contain rounded-t-[1.25rem] border-2 border-[#111111] bg-[#F2ECE1] [box-shadow:8px_8px_0_#111111] md:max-h-[calc(100dvh-3rem)] md:rounded-none">
            <picture v-if="resolvePortfolioImage(selectedPortfolio.image, 'modal').src" class="block w-full">
              <source
                v-for="source in resolvePortfolioImage(selectedPortfolio.image, 'modal').sources ?? []"
                :key="source.type"
                :type="source.type"
                :srcset="source.srcset"
                :sizes="`min(${modalMaxWidth}, calc(100vw - 2rem))`"
              />
              <img
                class="block aspect-3/2 w-full border-b-2 border-[#111111] bg-[#111111] object-contain"
                :src="resolvePortfolioImage(selectedPortfolio.image, 'modal').src"
                :srcset="resolvePortfolioImage(selectedPortfolio.image, 'modal').srcset"
                :sizes="`min(${modalMaxWidth}, calc(100vw - 2rem))`"
                :width="resolvePortfolioImage(selectedPortfolio.image, 'modal').width"
                :height="resolvePortfolioImage(selectedPortfolio.image, 'modal').height"
                :alt="selectedPortfolio.imageAlt"
                decoding="async"
              />
            </picture>

            <div class="p-[clamp(1.25rem,4vw,3rem)] pb-[max(1.25rem,env(safe-area-inset-bottom))] md:p-[clamp(1.25rem,4vw,3rem)]" :class="{ 'pt-20': !resolvePortfolioImage(selectedPortfolio.image, 'modal').src }">
              <p class="font-mono text-[0.72rem] font-extrabold uppercase leading-[1.55] tracking-widest text-[#c53a18]">{{ selectedPortfolio.company }} · {{ selectedPortfolio.category }}</p>
              <DialogTitle as="h2" class="mt-3 max-w-4xl font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.055em]">
                {{ selectedPortfolio.title }}
              </DialogTitle>

              <div class="mt-6 grid gap-2 border-y-2 border-[#111111] py-4 font-mono text-[0.72rem] font-extrabold uppercase leading-[1.55] tracking-[0.06em] sm:grid-cols-2">
                <p>{{ selectedPortfolio.role }}</p>
                <p v-if="selectedPortfolio.period" class="sm:text-right">{{ selectedPortfolio.period }}</p>
              </div>

              <DialogDescription as="p" class="mt-7 max-w-[75ch] text-[clamp(1rem,2vw,1.15rem)] leading-[1.75] text-[#3f3d38]">
                {{ selectedPortfolio.description }}
              </DialogDescription>

              <div v-if="selectedPortfolio.technologies.length" class="mt-8">
                <h3 class="font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.12em]">Technology stack</h3>
                <ul class="mt-3 flex list-none flex-wrap gap-2">
                  <li v-for="technology in selectedPortfolio.technologies" :key="technology" class="border-2 border-[#111111] bg-white px-3 py-2 font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.04em] [box-shadow:3px_3px_0_#e8ff3f]">
                    {{ technology }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </section>
</template>

<style>
@keyframes portfolio-sheet-enter {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes portfolio-sheet-exit {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes portfolio-overlay-enter {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes portfolio-overlay-exit {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@media (max-width: 767px) {
  .portfolio-dialog-content[data-state='open'] {
    animation: portfolio-sheet-enter 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .portfolio-dialog-content[data-state='closed'] {
    animation: portfolio-sheet-exit 180ms cubic-bezier(0.4, 0, 1, 1) both;
  }

  .portfolio-dialog-overlay[data-state='open'] {
    animation: portfolio-overlay-enter 220ms ease-out both;
  }

  .portfolio-dialog-overlay[data-state='closed'] {
    animation: portfolio-overlay-exit 160ms ease-in both;
  }
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-dialog-content,
  .portfolio-dialog-overlay {
    animation: none !important;
  }
}
</style>
