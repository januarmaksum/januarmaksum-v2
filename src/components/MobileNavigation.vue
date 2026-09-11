<script setup>
import { BriefcaseBusiness, History, PanelsTopLeft, Sparkles, UserRound } from '@lucide/vue'

const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue'])

const icons = {
  work: BriefcaseBusiness,
  experience: History,
  services: PanelsTopLeft,
  skills: Sparkles,
  about: UserRound,
}

function selectTab(tab) {
  emit('update:modelValue', tab.id)
}
</script>

<template>
  <nav class="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[#111111] bg-[#F2ECE1] px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 md:hidden" aria-label="Portfolio sections">
    <div class="mx-auto flex max-w-300">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="-ml-0.5 inline-flex min-h-14 min-w-0 flex-1 cursor-pointer touch-manipulation items-center justify-center gap-1 overflow-hidden border-2 border-[#111111] bg-[#F2ECE1] px-1 text-[#111111] transition-[flex-grow,background-color,color,transform] duration-150 ease-[ease] first:ml-0 first:rounded-l-sm last:rounded-r-sm hover:bg-[#FFFFFF] active:translate-y-0.5 focus-visible:relative focus-visible:z-10 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transition-none"
        :class="modelValue === tab.id ? 'flex-[2.2] bg-[#e8ff3f]' : ''"
        :aria-controls="tab.id"
        :aria-current="modelValue === tab.id ? 'page' : undefined"
        :aria-label="tab.label"
        @click="selectTab(tab)"
      >
        <component :is="icons[tab.id]" class="size-5 shrink-0" :stroke-width="2.25" aria-hidden="true" />
        <span v-if="modelValue === tab.id" class="truncate text-[0.62rem] font-extrabold uppercase tracking-wide">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>
