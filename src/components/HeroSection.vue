<script setup>
import HeroContent from '@/components/HeroContent.vue'
import portrait640Avif from '@/assets/januar-maksum-640.avif'
import portrait640Webp from '@/assets/januar-maksum-640.webp'
import portrait1231Avif from '@/assets/januar-maksum-1231.avif'
import portrait1231Webp from '@/assets/januar-maksum-1231.webp'
import portraitUrl from '@/assets/januar-maksum.png'

defineProps({ contactHref: { type: String, required: true } })

const emit = defineEmits(['view-work'])
</script>

<template>
  <section class="relative isolate overflow-hidden border-b-2 border-[#111111] bg-[#F2ECE1]" aria-labelledby="hero-title">
    <div class="flex min-h-[clamp(35rem,72vw,42rem)] flex-col md:min-h-[clamp(34rem,56vw,42rem)] md:flex-row md:items-center lg:aspect-video lg:min-h-0">
      <div id="hero-artwork" data-motion="hero-artwork" class="order-first flex w-full min-w-0 items-start px-[clamp(1.25rem,6vw,5rem)] pt-[clamp(2.25rem,7vw,5.5rem)] md:order-last md:w-2/4 md:items-center md:self-stretch md:px-0 md:pt-0">
        <div data-motion="hero-portrait" class="relative aspect-1218/1292 w-[min(60vw,10rem)] shrink-0 md:w-[90%] lg:w-[85%]">
          <picture class="block size-full">
            <source
              type="image/avif"
              :srcset="`${portrait640Avif} 640w, ${portrait1231Avif} 1231w`"
              sizes="(min-width: 1024px) 42.5vw, (min-width: 768px) 45vw, (min-width: 374px) 224px, 60vw"
            />
            <source
              type="image/webp"
              :srcset="`${portrait640Webp} 640w, ${portrait1231Webp} 1231w`"
              sizes="(min-width: 1024px) 42.5vw, (min-width: 768px) 45vw, (min-width: 374px) 224px, 60vw"
            />
            <img
              class="pointer-events-none block size-full object-contain object-center"
              :src="portraitUrl"
              width="1231"
              height="1277"
              alt="Portrait of Januar Maksum"
              loading="eager"
              fetchpriority="high"
            />
          </picture>
        </div>
      </div>

      <HeroContent :contact-href="contactHref" @view-work="emit('view-work')" />
    </div>
  </section>
</template>
