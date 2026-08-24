<script setup>
import { siExpress, siNextdotjs, siNodedotjs, siReact, siTypescript, siVuedotjs } from 'simple-icons'
import portraitUrl from '@/assets/januarmaksum-v1-recolored.png'

defineProps({ technologies: { type: Array, required: true } })

const iconPaths = {
  express: siExpress.path,
  next: siNextdotjs.path,
  node: siNodedotjs.path,
  react: siReact.path,
  typescript: siTypescript.path,
  vue: siVuedotjs.path,
}
</script>

<template>
  <section class="relative isolate overflow-hidden border-b-2 border-[#111111] bg-[#f4f0e6]" aria-labelledby="hero-title">
    <div class="flex min-h-[clamp(35rem,72vw,42rem)] flex-col md:min-h-[clamp(34rem,56vw,42rem)] md:flex-row md:items-center lg:aspect-video lg:min-h-0">
      <div ref="heroCopy" data-motion="hero-copy" class="relative z-3 w-full min-w-0 px-[clamp(1.25rem,6vw,5rem)] py-[clamp(2.25rem,7vw,5.5rem)] md:w-3/5 md:px-[clamp(2.5rem,6vw,5rem)] md:py-[clamp(3rem,7vw,5.5rem)]">
        <p class="mb-[clamp(1.25rem,4vw,2rem)] flex items-center gap-3 font-mono text-[clamp(0.72rem,2.8vw,0.9rem)] font-extrabold uppercase leading-[1.2] tracking-[0.14em] text-[#c53a18]">
          <span class="text-[1.15em] tracking-[0.08em] text-[#111111]" aria-hidden="true">//</span>
          Open to opportunities
        </p>
        <h1 id="hero-title" class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,10vw,4rem)] font-black leading-none tracking-[-0.065em] md:text-[clamp(3rem,6.4vw,4rem)]">
          <span class="block whitespace-nowrap">Ready to Build</span>
          <span class="block whitespace-nowrap text-[#c53a18] [text-shadow:3px_3px_0_#e8ff3f]">The Future?</span>
        </h1>
        <p class="mt-[clamp(1.25rem,4vw,2rem)] max-w-120 text-[clamp(1rem,3.8vw,1.25rem)] font-medium leading-[1.45] text-[#67645d] md:text-[clamp(1.05rem,1.8vw,1.3rem)]">
          Let's collaborate on something extraordinary.
        </p>
        <ul class="mt-[clamp(1.5rem,4vw,2.25rem)] flex max-w-52 list-none flex-wrap items-center gap-[clamp(0.75rem,3vw,1.15rem)] pb-1.25 md:max-w-none md:gap-[clamp(0.85rem,1.7vw,1.1rem)]" aria-label="Core technology stack">
          <li
            v-for="technology in technologies"
            :key="technology.name"
            class="flex size-[clamp(2.7rem,12vw,3.15rem)] shrink-0 items-center justify-center border-2 border-[#111111] bg-[#f4f0e6] md:size-[clamp(2.85rem,4.5vw,3.25rem)]"
            :class="technology.classes"
          >
            <svg class="size-[56%] shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="iconPaths[technology.icon]" />
            </svg>
            <span class="absolute size-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)] [clip:rect(0_0_0_0)]">{{ technology.name }}</span>
          </li>
        </ul>
      </div>

      <div id="hero-artwork" data-motion="hero-artwork" class="flex h-[min(118vw,34rem)] w-full min-w-0 items-center md:h-auto md:w-2/4 md:self-stretch">
        <div data-motion="hero-portrait" class="relative aspect-1218/1292 w-[min(86vw,25rem)] shrink-0 md:w-[90%] lg:w-[85%]">
          <img
            class="pointer-events-none block size-full object-contain object-center"
            :src="portraitUrl"
            width="1218"
            height="1292"
            alt="Portrait of Januar Maksum"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </section>
</template>
