<script setup>
import { ArrowRight } from '@lucide/vue'

defineProps({ contactHref: { type: String, required: true }, services: { type: Array, required: true }, active: Boolean })
</script>

<template>
  <section id="services" :hidden="!active" class="px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-services" tabindex="0" data-tab-panel>
    <div>
      <p class="font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-[#b83215]">{{ services.length }} services</p>
      <h2 class="mt-4 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.055em]">Services I Provide</h2>
      <p class="mt-6 max-w-3xl text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-[#343434]">I build websites and applications, design interfaces, and help maintain existing products.</p>
    </div>
    <ul class="mt-[clamp(2rem,5vw,3rem)] grid grid-cols-1 gap-6 md:grid-cols-2">
      <li v-for="service in services" :key="service.id" class="min-w-0 border-2 border-[#111111] bg-white p-[clamp(1.25rem,3vw,2rem)] [box-shadow:6px_6px_0_#111111]">
        <h3 class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold leading-tight tracking-tight">{{ service.title }}</h3>
        <p class="mt-4 text-base leading-relaxed text-[#343434]">{{ service.description }}</p>
      </li>
    </ul>
    <div class="mt-[clamp(2.5rem,6vw,4rem)] flex justify-center">
      <a
        :href="contactHref"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#111111] bg-[#e8ff3f] px-5 py-3 text-base font-extrabold text-[#111111] shadow-[4px_4px_0_#111111] transition-[background-color,box-shadow,transform] duration-150 hover:bg-[#ff5c35] hover:shadow-[2px_2px_0_#111111] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transition-none"
        aria-label="Discuss your project on WhatsApp"
      >
        <span>Let’s discuss your project</span>
        <ArrowRight class="size-5 shrink-0" :stroke-width="2.25" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>
