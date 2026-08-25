<script setup>
defineProps({ certifications: { type: Array, required: true }, active: Boolean })
</script>

<template>
  <section id="certifications" :hidden="!active" class="border-t-2 border-black px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-certifications" tabindex="0" data-tab-panel>
    <ol class="list-none border-t-2 border-[#111111]">
      <li v-for="certificate in certifications" :key="certificate.number" data-reveal class="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-4 border-b-2 border-[#111111] py-[clamp(1.25rem,3vw,2rem)]">
        <span class="font-mono text-xs font-extrabold">{{ certificate.number }}</span>
        <div>
          <strong class="block font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.25rem,3vw,2rem)] font-black uppercase leading-[1.15] tracking-[-0.03em]">{{ certificate.name }}</strong>
          <p class="mt-1.5 text-[#67645d]">{{ certificate.issuer }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
