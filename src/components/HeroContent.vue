<script setup>
import { ArrowRight } from '@lucide/vue'

defineProps({ contactHref: { type: String, required: true } })

const emit = defineEmits(['view-work'])
const services = ['Business Websites', 'Web & Mobile Apps', 'UI/UX Design']
</script>

<template>
  <div data-motion="hero-copy" class="relative z-3 w-full min-w-0 px-[clamp(1.25rem,6vw,5rem)] py-[clamp(2.25rem,7vw,5.5rem)] md:w-3/5 md:px-[clamp(2.5rem,6vw,5rem)] md:py-[clamp(3rem,7vw,5.5rem)]">
    <p class="mb-[clamp(1.25rem,4vw,2rem)] flex items-center gap-3 font-mono text-[clamp(0.72rem,2.8vw,0.9rem)] font-extrabold uppercase leading-[1.2] tracking-[0.14em] text-[#c53a18]">
      <span class="text-[1.15em] tracking-[0.08em] text-[#111111]" aria-hidden="true">//</span>
      Open to opportunities
    </p>
    <h1 id="hero-title" class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,8.5vw,4rem)] font-black leading-[1.05] tracking-[-0.065em] md:text-[clamp(2.25rem,4.8vw,3.5rem)]">
      <span class="block text-balance">Delivering</span>
      <span class="block text-balance text-[#c53a18] [text-shadow:3px_3px_0_#e8ff3f]">Digital Solutions</span>
    </h1>
    <p class="mt-[clamp(1.25rem,4vw,2rem)] max-w-120 text-base font-medium leading-relaxed text-[#67645d] lg:text-lg">
      I build websites and apps that help you present your business, serve your customers, and make everyday tasks easier.
    </p>
    <ul class="mt-6 flex list-none flex-wrap gap-3 pb-1" aria-label="Services">
      <li v-for="service in services" :key="service" class="max-w-full border-2 border-[#111111] bg-white px-3 py-2 text-sm font-bold leading-normal shadow-[3px_3px_0_#e8ff3f]">
        {{ service }}
      </li>
    </ul>
    <div class="mt-7 flex flex-wrap gap-4">
      <button type="button" class="inline-flex min-h-12 cursor-pointer touch-manipulation items-center justify-center gap-2 py-3 text-base font-extrabold text-[#111111] transition-colors duration-150 hover:text-[#c53a18] active:text-[#c53a18] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transition-none" @click="emit('view-work')">
        <span class="underline decoration-2 underline-offset-4">View My Work</span>
        <ArrowRight class="size-5 shrink-0" :stroke-width="2" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
