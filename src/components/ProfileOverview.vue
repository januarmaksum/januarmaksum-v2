<script setup>
import ProfileGridScan from '@/components/ProfileGridScan.vue'

defineProps({
  availabilityModes: { type: Array, required: true },
  resumeLink: { type: Object, required: true },
  socialLinks: { type: Array, required: true },
})

</script>

<template>
  <section
    class="relative overflow-hidden bg-[#111111] px-4 pb-8 pt-8 md:pt-16 text-white sm:px-8 md:px-12 md:py-16 lg:px-16"
    aria-label="Profile overview"
  >
    <ProfileGridScan />

    <div class="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_10rem]">
      <div class="min-w-0">
        <h2 class="mt-2 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">Januar Maksum</h2>
        <p class="max-w-176 text-pretty text-base leading-relaxed text-white/65">
          Full-stack developer · Frontend (React, Vue) · Mobile (React Native) · Backend (Express.js)
        </p>
        <div data-motion="availability" class="mt-7 grid w-[calc(100%-6px)] grid-cols-1 justify-start text-white md:w-full md:grid-cols-[11rem_repeat(5,minmax(0,1fr))] md:grid-rows-none md:gap-x-0 lg:inline-grid lg:w-fit lg:max-w-[calc(100%-6px)] lg:grid-cols-[max-content_minmax(0,1fr)_auto]">
          <div class="flex min-h-11 items-center justify-center border-2 border-white bg-[#e8ff3f] px-2 text-[0.78rem] font-extrabold uppercase tracking-[0.03em] text-[#111111] shadow-[4px_4px_0_#ff5c35]">
            <span class="whitespace-nowrap">Open to work</span>
          </div>
          <a
            class="hidden min-h-11 min-w-0 touch-manipulation items-center justify-center gap-1 whitespace-nowrap border-2 border-white bg-[#242424] px-1.5 font-mono text-[0.67rem] font-extrabold uppercase tracking-[0.04em] text-white no-underline shadow-[4px_4px_0_#ff5c35] transition-[background-color,color,box-shadow,transform] duration-160 ease-[ease] hover:bg-[#e8ff3f] hover:text-[#111111] hover:shadow-[2px_2px_0_#ff5c35] hover:transform-[translate(2px,2px)] active:shadow-none active:transform-[translate(4px,4px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:transition-none lg:flex lg:gap-2 lg:px-3 lg:text-[0.7rem] lg:col-start-3 lg:row-start-1 lg:ml-3"
            :href="resumeLink.href"
            :target="resumeLink.external ? '_blank' : undefined"
            :rel="resumeLink.external ? 'noopener noreferrer' : undefined"
          >
            <span>{{ resumeLink.label }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M0 0h16v16H0z" fill="none" />
              <path fill="currentColor" d="M8 4.5A1.25 1.25 0 1 0 8 2a1.25 1.25 0 0 0 0 2.5" />
              <path fill="currentColor" d="M8 4.5c.597 0 1.13.382 1.32.949l.087.26a.22.22 0 0 1-.21.291h-2.39a.222.222 0 0 1-.21-.291l.087-.26a1.39 1.39 0 0 1 1.32-.949zm-3 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
              <path fill="currentColor" fill-rule="evenodd" d="M2.33 1.64c-.327.642-.327 1.48-.327 3.16v6.4c0 1.68 0 2.52.327 3.16a3.02 3.02 0 0 0 1.31 1.31c.642.327 1.48.327 3.16.327h2.4c1.68 0 2.52 0 3.16-.327a3 3 0 0 0 1.31-1.31c.327-.642.327-1.48.327-3.16V4.8c0-1.68 0-2.52-.327-3.16A3 3 0 0 0 12.36.33C11.718.003 10.88.003 9.2.003H6.8c-1.68 0-2.52 0-3.16.327a3.02 3.02 0 0 0-1.31 1.31m6.87-.638H6.8c-.857 0-1.44 0-1.89.038c-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819c-.037.45-.038 1.03-.038 1.89v6.4c0 .857.001 1.44.038 1.89c.036.438.101.663.18.819c.192.376.498.682.874.874c.156.08.381.145.819.18c.45.036 1.03.037 1.89.037h2.4c.857 0 1.44 0 1.89-.037c.438-.036.663-.101.819-.18c.376-.192.682-.498.874-.874c.08-.156.145-.381.18-.82c.037-.45.038-1.03.038-1.89v-6.4c0-.856-.001-1.44-.038-1.89c-.036-.437-.101-.662-.18-.818a2 2 0 0 0-.874-.874c-.156-.08-.381-.145-.819-.18c-.45-.037-1.03-.038-1.89-.038" clip-rule="evenodd" />
            </svg>
          </a>
          <div class="col-span-2 hidden min-h-11 w-full min-w-0 flex-wrap border-2 border-white bg-[#242424] shadow-[4px_4px_0_#ff5c35] md:col-span-5 md:flex-nowrap md:flex lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:border-l-0">
            <span v-for="mode in availabilityModes" :key="mode" class="inline-flex basis-28 flex-auto items-center justify-center whitespace-nowrap border-l border-white/30 px-1.5 py-[0.6rem] font-mono text-[0.65rem] font-extrabold uppercase tracking-[0.04em] first:border-l-0 lg:basis-auto">
              {{ mode }}
            </span>
          </div>
        </div>
        <div class="hidden">
          <span>Based in Jakarta, Indonesia</span>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-1" aria-label="Professional links">
        <a
          v-for="link in [...socialLinks, resumeLink]"
          :key="link.label"
          data-motion="social-link"
          class="flex min-h-12 touch-manipulation items-center justify-between gap-4 border border-white/35 bg-[#242424] px-[0.9rem] py-3 text-[0.82rem] font-bold text-white no-underline [box-shadow:none] transition-[background-color,color,box-shadow,transform] duration-160 ease-[ease] [&:hover]:bg-[#e8ff3f] [&:hover]:text-[#111111] [&:hover]:[box-shadow:4px_4px_0_#ff5c35] [&:hover]:transform-[translate(-2px,-2px)] active:[box-shadow:none] active:transform-[translate(4px,4px)] focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:duration-[0.01ms]"
          :class="link.icon === 'file-lines' ? 'lg:hidden' : ''"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
        >
          <span>{{ link.label }}</span>
          <svg v-if="link.icon === 'mail'" class="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14 10l-3 3m9.288-9.969a.535.535 0 0 1 .68.681l-5.924 16.93a.535.535 0 0 1-.994.04l-3.219-7.242a.54.54 0 0 0-.271-.271l-7.242-3.22a.535.535 0 0 1 .04-.993z" />
          </svg>
          <svg v-else-if="link.icon === 'whatsapp'" xmlns="http://www.w3.org/2000/svg" class="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M0 0h24v24H0z" fill="none" />
            <g fill="none">
              <g clip-path="url(#SVGXv8lpc2Y)">
                <path fill="currentColor" fill-rule="evenodd" d="M17.415 14.382c-.298-.149-1.759-.867-2.031-.967s-.47-.148-.669.15c-.198.297-.767.966-.94 1.164c-.174.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.019-.458.13-.606c.134-.133.297-.347.446-.52s.198-.298.297-.497c.1-.198.05-.371-.025-.52c-.074-.149-.668-1.612-.916-2.207c-.241-.579-.486-.5-.668-.51c-.174-.008-.372-.01-.57-.01s-.52.074-.792.372c-.273.297-1.04 1.016-1.04 2.479c0 1.462 1.064 2.875 1.213 3.074s2.095 3.2 5.076 4.487c.71.306 1.263.489 1.694.625c.712.227 1.36.195 1.872.118c.57-.085 1.758-.719 2.006-1.413s.247-1.289.173-1.413s-.272-.198-.57-.347m-5.422 7.403h-.004a9.87 9.87 0 0 1-5.032-1.378l-.36-.214l-3.742.982l.999-3.648l-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.436-9.884 9.889-9.884a9.8 9.8 0 0 1 6.988 2.899a9.82 9.82 0 0 1 2.892 6.992c-.002 5.45-4.436 9.885-9.884 9.885m8.412-18.297A11.82 11.82 0 0 0 11.992 0C5.438 0 .102 5.335.1 11.892a11.86 11.86 0 0 0 1.587 5.945L0 24l6.304-1.654a11.9 11.9 0 0 0 5.684 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 0 0-3.48-8.413" clip-rule="evenodd" />
              </g>
              <defs>
                <clipPath id="SVGXv8lpc2Y">
                  <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </g>
          </svg>
          <svg v-else-if="link.icon === 'linkedin'" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="size-5" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <circle cx="4" cy="4" r="2"></circle>
              <path d="M22 14a6 6 0 0 0-12 0v7h4v-7a2 2 0 0 1 4 0v7h4ZM2 21h4V9H2Z"></path>
            </g>
          </svg>
          <svg v-else-if="link.icon === 'file-lines'" xmlns="http://www.w3.org/2000/svg" class="size-5 shrink-0" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M0 0h16v16H0z" fill="none" />
            <path fill="currentColor" d="M8 4.5A1.25 1.25 0 1 0 8 2a1.25 1.25 0 0 0 0 2.5" />
            <path fill="currentColor" d="M8 4.5c.597 0 1.13.382 1.32.949l.087.26a.22.22 0 0 1-.21.291h-2.39a.222.222 0 0 1-.21-.291l.087-.26a1.39 1.39 0 0 1 1.32-.949zm-3 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
            <path fill="currentColor" fill-rule="evenodd" d="M2.33 1.64c-.327.642-.327 1.48-.327 3.16v6.4c0 1.68 0 2.52.327 3.16a3.02 3.02 0 0 0 1.31 1.31c.642.327 1.48.327 3.16.327h2.4c1.68 0 2.52 0 3.16-.327a3 3 0 0 0 1.31-1.31c.327-.642.327-1.48.327-3.16V4.8c0-1.68 0-2.52-.327-3.16A3 3 0 0 0 12.36.33C11.718.003 10.88.003 9.2.003H6.8c-1.68 0-2.52 0-3.16.327a3.02 3.02 0 0 0-1.31 1.31m6.87-.638H6.8c-.857 0-1.44 0-1.89.038c-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819c-.037.45-.038 1.03-.038 1.89v6.4c0 .857.001 1.44.038 1.89c.036.438.101.663.18.819c.192.376.498.682.874.874c.156.08.381.145.819.18c.45.036 1.03.037 1.89.037h2.4c.857 0 1.44 0 1.89-.037c.438-.036.663-.101.819-.18c.376-.192.682-.498.874-.874c.08-.156.145-.381.18-.82c.037-.45.038-1.03.038-1.89v-6.4c0-.856-.001-1.44-.038-1.89c-.036-.437-.101-.662-.18-.818a2 2 0 0 0-.874-.874c-.156-.08-.381-.145-.819-.18c-.45-.037-1.03-.038-1.89-.038" clip-rule="evenodd" />
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
