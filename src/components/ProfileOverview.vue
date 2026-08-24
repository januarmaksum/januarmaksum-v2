<script setup>
defineProps({
  availabilityModes: { type: Array, required: true },
  socialLinks: { type: Array, required: true },
})

</script>

<template>
  <section
    class="relative bg-[#111111] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[clamp(32px,4vw,48px)_clamp(32px,4vw,48px)] bg-position-[-1px_-1px] px-4 pb-8 pt-16 text-white sm:px-8 md:px-12 md:py-10 lg:px-16"
    aria-label="Profile overview"
  >
    <div class="grid items-center gap-8 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_10rem]">
      <div class="min-w-0">
        <h2 class="mt-2 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">Januar Maksum</h2>
        <p class="max-w-176 text-pretty text-base leading-relaxed text-white/65">
          Full-stack developer · Frontend (React, Vue) · Mobile (React Native) · Backend (Express.js)
        </p>
        <div data-motion="availability" class="mt-4 block w-[calc(100%-6px)] border-2 border-white bg-[#242424] text-white shadow-[4px_4px_0_#ff5c35] md:inline-grid md:w-fit md:max-w-[calc(100%-6px)] md:grid-cols-[max-content_minmax(0,1fr)]">
          <div class="flex w-full items-center gap-[0.55rem] bg-[#e8ff3f] px-1 py-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.03em] text-[#111111] md:w-auto">
            <span>Open to work</span>
          </div>
          <div class="flex min-w-0 flex-wrap border-t border-white/30 md:border-t-0">
            <span v-for="mode in availabilityModes" :key="mode" class="inline-flex basis-28 flex-auto justify-center whitespace-nowrap border-l border-white/30 px-1.5 py-[0.6rem] font-mono text-[0.65rem] font-extrabold uppercase tracking-[0.04em] md:basis-auto">
              {{ mode }}
            </span>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-white/65">
          <span>Based in Jakarta, Indonesia</span>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Professional links">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          data-motion="social-link"
          class="flex min-h-12 touch-manipulation items-center justify-between gap-4 border border-white/35 bg-[#242424] px-[0.9rem] py-3 text-[0.82rem] font-bold text-white no-underline [box-shadow:none] transition-[background-color,color,box-shadow,transform] duration-160 ease-[ease] [&:hover]:bg-[#e8ff3f] [&:hover]:text-[#111111] [&:hover]:[box-shadow:4px_4px_0_#ff5c35] [&:hover]:transform-[translate(-2px,-2px)] active:[box-shadow:none] active:transform-[translate(4px,4px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:duration-[0.01ms]"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
        >
          <span>{{ link.label }}</span>
          <svg v-if="link.icon === 'mail'" class="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14 10l-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04l-3.219-7.242a.54.54 0 0 0-.271-.271l-7.242-3.22a.535.535 0 0 1 .04-.993z" />
          </svg>
          <svg v-else-if="link.icon === 'linkedin'" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="size-5" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <circle cx="4" cy="4" r="2"></circle>
              <path d="M22 14a6 6 0 0 0-12 0v7h4v-7a2 2 0 0 1 4 0v7h4ZM2 21h4V9H2Z"></path>
            </g>
          </svg>
          <svg v-else class="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 22v-3q0-2 1-3A7 6.5 0 0 1 5 5Q4 3 5 1q3 0 4 2q3-1 6 0q2-2 4-2q1 2 0 4a7 6.5 0 0 1-5 11q1 1 1 3v3M2 17c2 0 3 4 7 2" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
