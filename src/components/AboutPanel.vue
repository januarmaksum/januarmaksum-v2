<script setup>
import { ArrowRight } from '@lucide/vue'

defineProps({ languages: { type: Array, required: true }, active: Boolean })
</script>

<template>
  <section id="about" :hidden="!active" class="border-t-2 border-black bg-[#ff5c35] px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-about" tabindex="0" data-tab-panel>
    <div class="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
      <div>
        <p class="font-mono text-xs font-extrabold uppercase tracking-[0.16em]">05 / About</p>
        <h2 class="max-w-232 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">Make the interface hold up.</h2>
        <p class="mt-7 max-w-3xl text-lg font-semibold leading-relaxed">
          I've worked on frontend systems for stock trading, cash pickup, hospital operations, recruitment, doctor booking, and B2B marketplaces. I focus on performance, stability, and code that teams can maintain.
        </p>
        <div class="mt-8 flex flex-wrap gap-2 font-mono text-xs font-bold uppercase tracking-wide">
          <span v-for="language in languages" :key="language" class="border-2 border-black bg-[#f4f0e6] px-3 py-2">{{ language }}</span>
        </div>
      </div>
      <a class="inline-flex min-h-15 touch-manipulation items-center justify-center gap-4 border-2 border-[#111111] bg-[#e8ff3f] px-5 py-4 font-black uppercase text-[#111111] no-underline [box-shadow:5px_5px_0_#111111] transition-[background-color,color,box-shadow,transform] duration-160 ease-[ease] [&:hover]:bg-[#111111] [&:hover]:text-[#e8ff3f] [&:hover]:transform-[translate(-3px,-3px)] active:[box-shadow:none] active:transform-[translate(4px,4px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 md:[box-shadow:8px_8px_0_#111111] motion-reduce:duration-[0.01ms]" href="mailto:januarmaksum@gmail.com">
        Start a conversation
        <ArrowRight class="size-5 shrink-0" :stroke-width="2" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>
