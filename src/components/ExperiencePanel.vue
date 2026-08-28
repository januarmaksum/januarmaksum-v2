<script setup>
defineProps({ experiences: { type: Array, required: true }, active: Boolean })
</script>

<template>
  <section id="experience" :hidden="!active" class="px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-experience" tabindex="0" data-tab-panel>
    <div class="space-y-5">
      <article
        v-for="experience in experiences"
        :key="`${experience.company}-${experience.date}`"
        data-reveal
        class="grid gap-6 border-2 border-[#111111] bg-white p-[clamp(1.25rem,3vw,2rem)] [box-shadow:6px_6px_0_#111111] transition-[box-shadow,transform] duration-170 ease-[ease] [&:hover]:[box-shadow:6px_6px_0_#ff5c35] md:grid-cols-[minmax(13rem,0.72fr)_minmax(0,1.28fr)] md:[&:hover]:[box-shadow:10px_10px_0_#ff5c35] md:[&:hover]:transform-[translate(-3px,-3px)] motion-reduce:duration-[0.01ms]"
      >
        <div>
          <p class="font-mono text-[0.7rem] font-extrabold uppercase leading-[1.55] tracking-[0.08em]">{{ experience.date }}</p>
          <h3 class="mt-[0.35rem] font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.65rem,3vw,2rem)] font-black uppercase leading-none tracking-[-0.04em]">{{ experience.company }}</h3>
          <p class="mt-[0.8rem] font-extrabold">{{ experience.role }}</p>
          <p class="mt-1 text-[0.9rem] text-[#67645d]">{{ experience.location }}</p>
        </div>
        <div class="min-w-0 md:border-l-2 md:border-[#111111] md:pl-8">
          <p class="max-w-[75ch] leading-[1.65]">{{ experience.summary }}</p>
          <p class="mt-[1.1rem] border-t-2 border-[#111111] pt-[0.85rem] font-mono text-[0.7rem] font-extrabold uppercase leading-[1.55] tracking-[0.08em] text-pretty wrap-anywhere">{{ experience.technologies }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
