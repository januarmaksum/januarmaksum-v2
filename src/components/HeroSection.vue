<script setup>
import { siExpress, siNextdotjs, siNodedotjs, siReact, siTypescript } from 'simple-icons'
import portraitUrl from '@/assets/januarmaksum-v1-recolored.png'

defineProps({ technologies: { type: Array, required: true } })

const createMonochromeIcon = (path) => ({
  viewBox: '0 0 24 24',
  paths: [{ path, fill: 'currentColor' }],
})

const icons = {
  express: createMonochromeIcon(siExpress.path),
  javascript: {
    viewBox: '0 0 256 256',
    paths: [
      { path: 'M0 0h256v256H0V0z', fill: '#F7DF1E' },
      { path: 'M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574', fill: '#000000' },
    ],
  },
  next: createMonochromeIcon(siNextdotjs.path),
  node: createMonochromeIcon(siNodedotjs.path),
  react: createMonochromeIcon(siReact.path),
  typescript: createMonochromeIcon(siTypescript.path),
  vue: {
    viewBox: '0 0 261.76 226.69',
    paths: [
      { path: 'M161.096 0 130.872 52.351 100.647 0H0l130.872 226.69L261.743 0Z', fill: '#41B883' },
      { path: 'm161.096 0-30.224 52.351L100.647 0H52.346l78.526 136.01L209.397 0Z', fill: '#34495E' },
    ],
  },
}
</script>

<template>
  <section class="relative isolate overflow-hidden border-b-2 border-[#111111] bg-[#F2ECE1]" aria-labelledby="hero-title">
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
            class="flex size-[clamp(2.7rem,12vw,3.15rem)] shrink-0 items-center justify-center border-2 border-[#111111] bg-[#F2ECE1] md:size-[clamp(2.85rem,4.5vw,3.25rem)]"
            :class="technology.classes"
          >
            <svg class="size-[56%] shrink-0" :viewBox="icons[technology.icon].viewBox" aria-hidden="true">
              <path
                v-for="iconPath in icons[technology.icon].paths"
                :key="iconPath.path"
                :d="iconPath.path"
                :fill="iconPath.fill"
              />
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
