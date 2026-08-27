<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { ArrowRight, X } from '@lucide/vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'

const props = defineProps({ portfolios: { type: Array, required: true }, active: Boolean })

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
  <section id="portfolio" :hidden="!active" class="px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-portfolio" tabindex="0" data-tab-panel>
    <DialogRoot v-model:open="dialogOpen">
      <div class="mb-8 flex flex-wrap gap-3" role="group" aria-label="Filter portfolio projects">
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
            <img
              class="block size-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              :src="portfolio.image"
              width="1536"
              height="1024"
              :alt="portfolio.imageAlt"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="flex flex-1 flex-col p-[clamp(1.15rem,2.5vw,1.6rem)]">
            <p class="font-mono text-[0.68rem] font-extrabold uppercase leading-normal tracking-[0.08em] text-[#67645d]">{{ portfolio.company }} · {{ portfolio.category }}</p>
            <h3 class="mt-2 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.45rem,2.7vw,2rem)] font-black uppercase leading-none tracking-[-0.04em]">{{ portfolio.title }}</h3>
            <!-- <p class="mt-4 line-clamp-3 leading-[1.6] text-[#67645d]">{{ portfolio.description }}</p> -->

            <ul class="mt-5 flex list-none flex-wrap gap-1.5" :aria-label="`Technologies used for ${portfolio.title}`">
              <li v-for="technology in portfolio.technologies" :key="technology" class="border border-[#111111] bg-[#F2ECE1] px-2 py-1 font-mono text-[0.62rem] font-extrabold uppercase tracking-[0.04em]">
                {{ technology }}
              </li>
              <!-- <li v-if="portfolio.technologies.length > 3" class="border border-[#111111] bg-[#e8ff3f] px-2 py-1 font-mono text-[0.62rem] font-extrabold uppercase tracking-[0.04em]" :aria-label="`${portfolio.technologies.length - 3} more technologies`">
                +{{ portfolio.technologies.length - 3 }}
              </li> -->
            </ul>

            <span class="mt-6 inline-flex min-h-11 items-center justify-between gap-3 border-t-2 border-[#111111] pt-3 font-extrabold uppercase">
              View details
              <ArrowRight class="size-5 shrink-0 transition-transform duration-170 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" :stroke-width="2" aria-hidden="true" />
            </span>
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
        <DialogOverlay class="fixed inset-0 z-80 bg-black/75" />
        <DialogContent class="fixed left-1/2 top-1/2 z-90 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain border-2 border-[#111111] bg-[#F2ECE1] [box-shadow:8px_8px_0_#111111] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 sm:w-[calc(100%-3rem)] md:max-h-[calc(100dvh-3rem)]" @close-auto-focus="handleCloseAutoFocus">
          <DialogClose class="absolute right-3 top-3 z-10 inline-flex size-12 touch-manipulation cursor-pointer items-center justify-center border-2 border-[#111111] bg-[#e8ff3f] text-[#111111] [box-shadow:4px_4px_0_#111111] transition-[background-color,color,box-shadow,transform] duration-160 hover:bg-[#111111] hover:text-[#e8ff3f] active:[box-shadow:none] active:transform-[translate(3px,3px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:duration-[0.01ms]" aria-label="Close project details">
            <X class="size-6" :stroke-width="2.5" aria-hidden="true" />
          </DialogClose>

          <img
            class="block aspect-3/2 w-full border-b-2 border-[#111111] bg-[#111111] object-contain"
            :src="selectedPortfolio.image"
            width="1536"
            height="1024"
            :alt="selectedPortfolio.imageAlt"
            decoding="async"
          />

          <div class="p-[clamp(1.25rem,4vw,3rem)]">
            <p class="font-mono text-[0.72rem] font-extrabold uppercase leading-[1.55] tracking-widest text-[#c53a18]">{{ selectedPortfolio.company }} · {{ selectedPortfolio.category }}</p>
            <DialogTitle as="h2" class="mt-3 max-w-4xl font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.055em]">
              {{ selectedPortfolio.title }}
            </DialogTitle>

            <div class="mt-6 grid gap-2 border-y-2 border-[#111111] py-4 font-mono text-[0.72rem] font-extrabold uppercase leading-[1.55] tracking-[0.06em] sm:grid-cols-2">
              <p>{{ selectedPortfolio.role }}</p>
              <p class="sm:text-right">{{ selectedPortfolio.period }}</p>
            </div>

            <DialogDescription as="p" class="mt-7 max-w-[75ch] text-[clamp(1rem,2vw,1.15rem)] leading-[1.75] text-[#3f3d38]">
              {{ selectedPortfolio.description }}
            </DialogDescription>

            <div class="mt-8">
              <h3 class="font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.12em]">Technology stack</h3>
              <ul class="mt-3 flex list-none flex-wrap gap-2">
                <li v-for="technology in selectedPortfolio.technologies" :key="technology" class="border-2 border-[#111111] bg-white px-3 py-2 font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.04em] [box-shadow:3px_3px_0_#e8ff3f]">
                  {{ technology }}
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </section>
</template>
