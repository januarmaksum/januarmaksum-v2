<script setup>
defineProps({ skills: { type: Array, required: true }, active: Boolean })
</script>

<template>
  <section id="skills" :hidden="!active" class="border-t-2 border-black bg-[#111111] px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] text-white focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-skills" tabindex="0" data-tab-panel>
    <div class="grid border-l-2 border-t-2 border-white md:grid-cols-2 lg:grid-cols-3">
      <article v-for="skill in skills" :key="skill.number" data-reveal class="min-w-0 border-b-2 border-r-2 border-white p-[clamp(1.25rem,3vw,2rem)] lg:nth-[n+4]:min-h-52">
        <p class="font-mono text-[0.7rem] font-extrabold text-[#e8ff3f]">{{ skill.number }}</p>
        <h3 class="mb-3 mt-8 font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.45rem,3vw,2.3rem)] font-black uppercase leading-none tracking-[-0.04em]">{{ skill.title }}</h3>
        <span class="leading-[1.7] text-white/70">{{ skill.items }}</span>
      </article>
    </div>
  </section>
</template>
