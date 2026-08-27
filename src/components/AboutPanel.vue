<script setup>
import { ArrowRight } from '@lucide/vue'

defineProps({
  languages: { type: Array, required: true },
  education: { type: Array, required: true },
  certifications: { type: Array, required: true },
  active: Boolean,
})
</script>

<template>
  <section id="about" :hidden="!active" class="border-t-2 border-black bg-[#F2EBE0] px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-about" tabindex="0" data-tab-panel>
    <div class="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
      <div>
        <p class="mt-7 max-w-3xl text-lg font-semibold leading-relaxed">
          I've worked on frontend systems for stock trading, cash pickup, hospital operations, recruitment, doctor booking, and B2B marketplaces. I focus on performance, stability, and code that teams can maintain.
        </p>
      </div>
      <a class="inline-flex min-h-15 touch-manipulation items-center justify-center gap-4 border-2 border-[#111111] bg-[#e8ff3f] px-5 py-4 font-black uppercase text-[#111111] no-underline [box-shadow:5px_5px_0_#111111] transition-[background-color,color,box-shadow,transform] duration-160 ease-[ease] [&:hover]:bg-[#111111] [&:hover]:text-[#e8ff3f] [&:hover]:transform-[translate(-3px,-3px)] active:[box-shadow:none] active:transform-[translate(4px,4px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 md:[box-shadow:8px_8px_0_#111111] motion-reduce:duration-[0.01ms]" href="mailto:januarmaksum@gmail.com">
        Start a conversation
        <ArrowRight class="size-5 shrink-0" :stroke-width="2" aria-hidden="true" />
      </a>
    </div>

    <section class="mt-[clamp(3.5rem,8vw,7rem)] border-t-2 border-[#111111] pt-[clamp(2rem,5vw,4rem)]" aria-labelledby="about-education-title">
      <h2 id="about-education-title" class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-none tracking-tighter">Education</h2>
      <div class="mt-7 border-2 border-[#111111] bg-[#FFFFFF] px-[clamp(1.25rem,4vw,2.5rem)] [box-shadow:7px_7px_0_#111111]">
        <ul class="list-none">
          <li v-for="item in education" :key="item.degree" class="grid grid-cols-[minmax(6.75rem,max-content)_minmax(0,1fr)] items-start gap-4 border-b-2 border-[#111111] py-[clamp(1.25rem,3vw,2rem)] last:border-b-0">
            <span class="whitespace-nowrap font-mono text-xs font-extrabold">{{ item.date }}</span>
            <div class="min-w-0">
              <h3 class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.25rem,3vw,2rem)] font-black uppercase leading-[1.15] tracking-[-0.03em] [overflow-wrap:anywhere]">{{ item.degree }}</h3>
              <p class="mt-1.5 text-[#67645d]">{{ item.school }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="mt-[clamp(3.5rem,8vw,7rem)] border-t-2 border-[#111111] pt-[clamp(2rem,5vw,4rem)]" aria-labelledby="about-certifications-title">
      <h2 id="about-certifications-title" class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-none tracking-tighter">Certifications</h2>
      <div class="mt-7 border-2 border-[#111111] bg-[#FFFFFF] px-[clamp(1.25rem,4vw,2.5rem)] [box-shadow:7px_7px_0_#111111]">
        <ol class="list-none">
          <li v-for="certificate in certifications" :key="certificate.number" class="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 border-b-2 border-[#111111] py-[clamp(1.25rem,3vw,2rem)] last:border-b-0">
            <span class="font-mono text-xs font-extrabold">{{ certificate.number }}</span>
            <div>
              <strong class="block font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.25rem,3vw,2rem)] font-black uppercase leading-[1.15] tracking-[-0.03em]">{{ certificate.name }}</strong>
              <p class="mt-1.5 text-[#67645d]">{{ certificate.issuer }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  </section>
</template>
