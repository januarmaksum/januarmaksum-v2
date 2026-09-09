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
      <HeroContent :contact-href="contactHref" @view-work="emit('view-work')" />

      <div id="hero-artwork" data-motion="hero-artwork" class="flex h-[min(118vw,34rem)] w-full min-w-0 items-center md:h-auto md:w-2/4 md:self-stretch">
        <div data-motion="hero-portrait" class="relative aspect-1218/1292 w-[min(86vw,25rem)] shrink-0 md:w-[90%] lg:w-[85%]">
          <picture class="block size-full">
            <source
              type="image/avif"
              :srcset="`${portrait640Avif} 640w, ${portrait1231Avif} 1231w`"
              sizes="(min-width: 1024px) 42.5vw, (min-width: 768px) 45vw, (min-width: 465px) 400px, 86vw"
            />
            <source
              type="image/webp"
              :srcset="`${portrait640Webp} 640w, ${portrait1231Webp} 1231w`"
              sizes="(min-width: 1024px) 42.5vw, (min-width: 768px) 45vw, (min-width: 465px) 400px, 86vw"
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
    </div>
  </section>
</template>
