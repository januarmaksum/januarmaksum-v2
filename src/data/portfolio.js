import agenbrilinkAmbilinImage from '@/assets/portfolio/agenbrilink-ambilin.avif'
import ajaibTerminalImage from '@/assets/portfolio/ajaib-terminal.avif'
import pintarnyaEmployerDashboardImage from '@/assets/portfolio/pintarnya-employer-dashboard.avif'

export const technologies = [
  { name: 'React', icon: 'react', classes: '-rotate-2 text-[#087ea4] shadow-[4px_4px_0_#ff5c35]' },
  { name: 'Next.js', icon: 'next', classes: 'rotate-2 text-[#111111] shadow-[4px_4px_0_#e8ff3f]' },
  { name: 'TypeScript', icon: 'typescript', classes: '-rotate-1 text-[#3178c6] shadow-[4px_4px_0_#ff5c35]' },
  { name: 'Vue.js', icon: 'vue', classes: 'rotate-1 text-[#2f8f6b] shadow-[4px_4px_0_#e8ff3f]' },
  { name: 'Node.js', icon: 'node', classes: '-rotate-2 text-[#3c873a] shadow-[4px_4px_0_#ff5c35]' },
  { name: 'Express.js', icon: 'express', classes: 'rotate-2 text-[#111111] shadow-[4px_4px_0_#e8ff3f]' },
]

export const availabilityModes = ['Remote', 'On-site', 'Hybrid', 'Freelance', 'Part-time']

export const socialLinks = [
  { label: 'Contact me', href: 'mailto:januarmaksum@gmail.com', icon: 'mail' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/januarmaksum', icon: 'linkedin', external: true },
  { label: 'GitHub', href: 'https://github.com/januarmaksum', icon: 'github', external: true },
]

export const experiences = [
  {
    date: 'Feb 2026 — Jul 2026',
    company: 'Ajaib',
    role: 'Frontend Engineer',
    location: 'Jakarta, Indonesia | Hybrid',
    summary: 'Built and maintained Ajaib Terminal, a cross-platform desktop stock trading application for Windows and macOS, including workflows for market monitoring, technical analysis, and order execution. Improved rendering performance and desktop resource usage during fast-moving market conditions.',
    technologies: 'Tauri, TypeScript, Vite, React, TanStack Query, WebSocket, Tailwind, AppsFlyer, Mixpanel',
    portfolio: {
      id: 'ajaib-terminal',
      title: 'Ajaib Terminal',
      category: 'Desktop stock trading',
      filters: ['react'],
      image: ajaibTerminalImage,
      imageAlt: 'Abstract editorial illustration representing a desktop stock-trading terminal',
    },
  },
  {
    date: 'Oct 2024 — Jan 2026',
    company: 'Bank BRI',
    role: 'Frontend Developer',
    location: 'Jakarta, Indonesia | On-site',
    summary: 'Built the WebView-based AgenBRILink Ambilin cash pickup service. Cleared SonarQube-reported bugs, reduced duplicated code to 0%, and raised unit test coverage to 90%. Resolved recurring out-of-memory incidents by fixing memory leaks and improving how rendering and resources were managed.',
    technologies: 'TypeScript, React, Next.js, Elasticsearch, Redis, Tailwind, Framer Motion',
    portfolio: {
      id: 'agenbrilink-ambilin',
      title: 'AgenBRILink Ambilin',
      category: 'WebView cash pickup',
      filters: ['react', 'nextjs', 'mobile'],
      image: agenbrilinkAmbilinImage,
      imageAlt: 'Abstract editorial illustration representing a secure mobile cash-pickup journey',
    },
  },
  {
    date: 'Oct 2023 — Oct 2024',
    company: 'Hospital Harapan Kita',
    role: 'Frontend Developer',
    location: 'Jakarta, Indonesia | On-site',
    summary: 'Built and maintained internal hospital information system applications with medical staff and internal teams. Fixed UI, performance, and reliability problems, reducing transaction failures by 90%.',
    technologies: 'JavaScript, Angular, React, jQuery, Tailwind',
  },
  {
    date: 'Oct 2022 — Aug 2023',
    company: 'Pintarnya',
    role: 'Frontend Engineer',
    location: 'Jakarta, Indonesia | Hybrid',
    summary: 'Launched a mobile-responsive employer dashboard that contributed to a 70% increase in mobile engagement. Built a Talent Pool for candidate statuses and hiring workflows, plus reusable component variants that reduced duplication.',
    technologies: 'TypeScript, React, Next.js, Tailwind, MoEngage',
    portfolio: {
      id: 'pintarnya-employer-dashboard',
      title: 'Pintarnya Employer Dashboard',
      category: 'Recruitment workflow',
      filters: ['react', 'nextjs', 'mobile'],
      image: pintarnyaEmployerDashboardImage,
      imageAlt: 'Abstract editorial illustration representing an employer dashboard and recruitment pipeline',
    },
  },
  {
    date: 'Jun 2019 — Oct 2022',
    company: 'Alodokter',
    role: 'Senior Frontend Developer',
    location: 'Jakarta, Indonesia | Hybrid',
    summary: 'Reworked the doctor discovery and booking flow and used A/B tests, analytics tracking, and experiment measurement to guide product changes. Maintained stability and performance across high-traffic booking flows.',
    technologies: 'JavaScript, Polymer.js, jQuery, A/B Testing, Google Analytics',
    portfolio: {
      id: 'alodokter',
      title: 'Alodokter',
      category: 'Doctor Discovery',
      filters: [],
      description: 'Project description and case study details will be added here.',
      image: pintarnyaEmployerDashboardImage,
      imageAlt: 'Temporary abstract recruitment-dashboard placeholder illustration for the Alodokter portfolio project',
    },
  },
  {
    date: 'Jun 2017 — Jun 2019',
    company: 'Indonetwork',
    role: 'Frontend Developer',
    location: 'Jakarta, Indonesia | On-site',
    summary: "Built responsive features for Indonetwork's B2B marketplace across desktop and mobile, along with client company profile sites and product catalogs.",
    technologies: 'JavaScript, jQuery, Vue, WordPress, Bootstrap, Sass',
    portfolio: {
      id: 'indonetwork',
      title: 'Indonetwork',
      category: 'B2B Marketplace',
      filters: ['vue', 'wordpress'],
      description: 'Project description and case study details will be added here.',
      image: pintarnyaEmployerDashboardImage,
      imageAlt: 'Temporary abstract recruitment-dashboard placeholder illustration for the Indonetwork portfolio project',
    },
  },
  {
    date: 'Nov 2014 — Jun 2017',
    company: 'Indotrading',
    role: 'Web Designer & Frontend Developer',
    location: 'Jakarta, Indonesia | On-site',
    summary: "Designed and built responsive production pages for Indotrading's B2B marketplace. Fixed layout, usability, and cross-browser issues across existing pages.",
    technologies: 'JavaScript, jQuery, HTML, CSS, Bootstrap, Photoshop',
  },
]

export const portfolios = experiences
  .filter((experience) => experience.portfolio)
  .map(({ company, date, role, summary, technologies: experienceTechnologies, portfolio }) => ({
    ...portfolio,
    company,
    role,
    period: date,
    description: portfolio.description ?? summary,
    technologies: experienceTechnologies.split(', '),
  }))

export const education = [
  { date: '2015 — 2019', degree: "Bachelor's Degree in Information Systems", school: 'University Mercu Buana', gpa: 'GPA 3.28' },
  { date: '2011 — 2014', degree: 'Diploma in Informatics Management', school: 'University Bina Sarana Informatika', gpa: 'GPA 3.20' },
]

export const skills = [
  { number: '01', title: 'Frontend', items: 'React · Next.js · Vue · Tailwind · Bootstrap' },
  { number: '02', title: 'Mobile', items: 'React Native · Expo · Ionic' },
  { number: '03', title: 'Backend', items: 'Node.js · Express.js' },
  { number: '04', title: 'Languages and tools', items: 'JavaScript · TypeScript · HTML · CSS · Git' },
  { number: '05', title: 'Low-code', items: 'WordPress' },
  { number: '06', title: 'Database', items: 'MySQL · MongoDB' },
]

export const certifications = [
  { number: '01', name: 'Full-Stack JavaScript Developer', issuer: 'BuiltWithAngga' },
  { number: '02', name: 'React — The Complete Guide', issuer: 'Udemy' },
  { number: '03', name: 'Build Highly Engaging Vue JS Apps with Nuxt.js', issuer: 'Udemy' },
]

export const languages = ['Indonesian · Native', 'English · Conversational']

export const tabs = [
  { id: 'portfolio', label: 'Portfolio', count: portfolios.length },
  { id: 'experience', label: 'Experience', count: experiences.length },
  { id: 'skills', label: 'Skills', count: skills.length },
  { id: 'about', label: 'About' },
]

export const defaultTabId = 'portfolio'
