<script setup>
defineProps({ education: { type: Array, required: true }, active: Boolean })
</script>

<template>
  <section id="education" :hidden="!active" class="border-t-2 border-black bg-[#e8ff3f] px-[clamp(1rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-blue-600" role="tabpanel" aria-labelledby="tab-education" tabindex="0" data-tab-panel>
    <div class="grid gap-5 lg:grid-cols-2">
      <article v-for="item in education" :key="item.degree" data-reveal class="relative border-2 border-[#111111] bg-[#F2ECE1] p-[clamp(1.4rem,3vw,2rem)] shadow-[7px_7px_0_#111111]">
        <p class="font-mono text-[0.72rem] font-extrabold uppercase tracking-[0.12em]">{{ item.date }}</p>
        <h3 class="mb-[0.7rem] mt-10 max-w-lg font-['Archivo',ui-sans-serif,system-ui,sans-serif] text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase leading-[1.05] tracking-[-0.04em]">{{ item.degree }}</h3>
        <p>{{ item.school }}</p>
        <p class="mt-4 inline-block border-2 border-[#111111] bg-[#ff5c35] px-[0.6rem] py-[0.35rem] font-extrabold">{{ item.gpa }}</p>
      </article>
    </div>
  </section>
</template>
