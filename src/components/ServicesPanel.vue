<script setup>
defineProps({ services: { type: Array, required: true }, active: Boolean })
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
  </section>
</template>
