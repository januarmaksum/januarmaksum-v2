<script setup>
import { ref } from 'vue'
import AboutPanel from '@/components/AboutPanel.vue'
import AmbientWaves from '@/components/AmbientWaves.vue'
import CertificationsPanel from '@/components/CertificationsPanel.vue'
import EducationPanel from '@/components/EducationPanel.vue'
import ExperiencePanel from '@/components/ExperiencePanel.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProfileOverview from '@/components/ProfileOverview.vue'
import SectionTabs from '@/components/SectionTabs.vue'
import SkillsPanel from '@/components/SkillsPanel.vue'
import { usePortfolioMotion } from '@/composables/usePortfolioMotion'
import {
  availabilityModes,
  certifications,
  defaultTabId,
  education,
  experiences,
  languages,
  skills,
  socialLinks,
  tabs,
  technologies,
} from '@/data/portfolio'

const root = ref(null)
const activeTab = ref(
  tabs.some((tab) => tab.id === defaultTabId) ? defaultTabId : tabs[0].id,
)

usePortfolioMotion(root, activeTab)
</script>

<template>
  <div ref="root" class="relative min-h-dvh text-[#111111] antialiased">
    <AmbientWaves />
    <a class="fixed left-4 top-4 z-50 translate-y-[-200%] touch-manipulation border-2 border-[#111111] bg-[#e8ff3f] px-4 py-3 font-extrabold text-[#111111] focus:translate-y-0 focus-visible:outline-4 focus-visible:outline-offset-[3px] focus-visible:outline-blue-600 motion-reduce:transition-none" href="#main-content">Skip to main content</a>

    <div class="relative z-10 mx-auto min-h-[calc(100dvh-(clamp(10px,2.5vw,40px)*2))] w-full max-w-300 overflow-clip border-2 border-[#111111] bg-[#f4f0e6] shadow-[clamp(6px,1vw,12px)_clamp(6px,1vw,12px)_0_#ff5c35]">
      <header id="profile">
        <HeroSection :technologies="technologies" />
        <ProfileOverview :availability-modes="availabilityModes" :social-links="socialLinks" />
      </header>

      <SectionTabs v-model="activeTab" :tabs="tabs" />

      <main id="main-content">
        <ExperiencePanel :active="activeTab === 'experience'" :experiences="experiences" />
        <EducationPanel :active="activeTab === 'education'" :education="education" />
        <SkillsPanel :active="activeTab === 'skills'" :skills="skills" />
        <CertificationsPanel :active="activeTab === 'certifications'" :certifications="certifications" />
        <AboutPanel :active="activeTab === 'about'" :languages="languages" />
      </main>
    </div>
  </div>
</template>
