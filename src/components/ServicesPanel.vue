<script setup>
defineProps({ services: { type: Array, required: true }, active: Boolean })
</script>

<template>
  <section id="services" :hidden="!active" class="px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-services" tabindex="0" data-tab-panel>
    <div class="border-2 border-[#111111] bg-white p-[clamp(1.5rem,4vw,3rem)] [box-shadow:6px_6px_0_#111111]">
      <p class="font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-[#b83215]">{{ services.length }} services</p>
      <h2 class="mt-4 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.055em]">Services coming soon</h2>
    </div>
  </section>
</template>
