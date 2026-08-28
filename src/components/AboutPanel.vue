<script setup>
import { ArrowRight } from '@lucide/vue'
import aboutPortraitUrl from '@/assets/about-portrait-v1.png'

defineProps({
  languages: { type: Array, required: true },
  education: { type: Array, required: true },
  certifications: { type: Array, required: true },
  active: Boolean,
})
</script>

<template>
  <section id="about" :hidden="!active" class="border-t-2 border-black bg-[#F2EBE0] px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-about" tabindex="0" data-tab-panel>
    <div>
      <div class="flex items-center gap-[clamp(1rem,4vw,2rem)]">
        <div class="size-[clamp(5.5rem,18vw,9rem)] shrink-0 overflow-hidden rounded-full border-[3px] border-[#111111] bg-[#e8ff3f] [box-shadow:5px_5px_0_#ff5c35] md:border-4 md:[box-shadow:7px_7px_0_#ff5c35]">
          <img class="block size-full object-cover" :src="aboutPortraitUrl" width="1254" height="1254" alt="Portrait of Januar Maksum" loading="lazy" decoding="async" />
        </div>
        <h2 class="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,7vw,4rem)] font-black leading-[0.95] tracking-tighter">
          <span class="min-w-0 text-balance">Hi, I'm Januar</span>
        </h2>
      </div>

      <div class="mt-[clamp(2.5rem,6vw,4rem)] max-w-6xl">
        <div class="space-y-[clamp(2rem,5vw,3.5rem)] text-[clamp(1.125rem,2.15vw,1rem)] font-normal leading-[1.55] tracking-[-0.015em] text-[#343434]">
          <p>
            I'm a <strong class="font-black text-[#111111]">frontend-focused full-stack developer</strong> with <strong class="font-black text-[#111111]">over 11 years of experience</strong> building products for stock trading, banking, healthcare, recruitment, doctor booking, and B2B marketplaces. I work mainly with React, Next.js, Vue, and TypeScript.
          </p>

          <div class="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6">
            <span class="grid size-12 place-items-center border-2 border-[#111111] bg-white [box-shadow:4px_4px_0_#111111] sm:size-16" aria-hidden="true">
              <svg class="size-10 sm:size-13" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="11" width="28" height="28" rx="2" fill="#ff5c35" stroke="#111111" stroke-width="3" transform="rotate(-12 10 11)" />
                <circle cx="42" cy="38" r="14" fill="#e8ff3f" stroke="#111111" stroke-width="3" />
                <circle cx="18" cy="46" r="5" fill="#111111" />
              </svg>
            </span>
            <p class="min-w-0">
              I'm strongest at <strong class="font-black text-[#111111]">building frontend features</strong>, <strong class="font-black text-[#111111]">improving performance</strong>, and <strong class="font-black text-[#111111]">making code easier for teams to maintain</strong>. Recent work includes a cross-platform trading desktop app, a cash-pickup WebView for AgenBRILink, and a hospital information system that makes patient and operational workflows easier to manage.
            </p>
          </div>

          <div class="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6">
            <span class="grid size-12 place-items-center border-2 border-[#111111] bg-white [box-shadow:4px_4px_0_#111111] sm:size-16" aria-hidden="true">
              <svg class="size-10 sm:size-13" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 50L29 10L49 50H8Z" fill="#e8ff3f" stroke="#111111" stroke-width="3" stroke-linejoin="round" />
                <circle cx="44" cy="25" r="11" fill="#ff5c35" stroke="#111111" stroke-width="3" />
                <path d="M24 44H45" stroke="#111111" stroke-width="5" stroke-linecap="square" />
              </svg>
            </span>
            <p class="min-w-0">
              I'm open to <strong class="font-black text-[#111111]">joining a product team</strong> or <strong class="font-black text-[#111111]">working directly with clients</strong> on web and mobile projects. If you need help building a frontend, improving an existing product, or solving a performance problem, let's discuss!
            </p>
          </div>
        </div>

        <a class="mt-[clamp(2rem,5vw,3.5rem)] inline-flex min-h-15 touch-manipulation items-center justify-center gap-4 border-2 border-[#111111] bg-[#e8ff3f] px-5 py-4 font-black uppercase text-[#111111] no-underline [box-shadow:5px_5px_0_#111111] transition-[background-color,color,box-shadow,transform] duration-160 ease-[ease] [&:hover]:bg-[#111111] [&:hover]:text-[#e8ff3f] [&:hover]:transform-[translate(-3px,-3px)] active:[box-shadow:none] active:transform-[translate(4px,4px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 sm:ml-22 md:[box-shadow:8px_8px_0_#111111] motion-reduce:duration-[0.01ms]" href="mailto:januarmaksum@gmail.com">
          Start a conversation
          <ArrowRight class="size-5 shrink-0" :stroke-width="2" aria-hidden="true" />
        </a>
      </div>
    </div>

    <section class="mt-[clamp(3.5rem,8vw,7rem)] border-t-2 border-[#111111] pt-[clamp(2rem,5vw,4rem)]" aria-labelledby="about-education-title">
      <h2 id="about-education-title" class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,5vw,2rem)] font-black uppercase leading-none tracking-tighter">Education</h2>
      <div class="mt-7 border-2 border-[#111111] bg-[#FFFFFF] px-[clamp(1.25rem,4vw,2.5rem)] [box-shadow:7px_7px_0_#111111]">
        <ul class="list-none">
          <li v-for="item in education" :key="item.degree" class="grid grid-cols-[minmax(6.75rem,max-content)_minmax(0,1fr)] items-start gap-4 border-b-2 border-[#111111] py-[clamp(1.25rem,3vw,2rem)] last:border-b-0">
            <span class="whitespace-nowrap font-mono text-xs font-extrabold">{{ item.date }}</span>
            <div class="min-w-0">
              <h3 class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.25rem,3vw,2rem)] font-black uppercase leading-[1.15] tracking-[-0.03em] wrap-anywhere">{{ item.degree }}</h3>
              <p class="mt-1.5 text-[#67645d]">{{ item.school }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="mt-[clamp(3.5rem,8vw,7rem)] border-t-2 border-[#111111] pt-[clamp(2rem,5vw,4rem)]" aria-labelledby="about-certifications-title">
      <h2 id="about-certifications-title" class="font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,5vw,2rem)] font-black uppercase leading-none tracking-tighter">Certifications</h2>
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
