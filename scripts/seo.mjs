const SITE_NAME = 'Januar Maksum'
const TITLE = 'Januar Maksum — Frontend Engineer'
const DESCRIPTION = 'Portfolio of Januar Maksum, a frontend engineer building websites and apps for trading, banking, healthcare, recruitment, and B2B products.'
const OG_IMAGE_PATH = '/og-image.png'

export const getSeoConfig = ({ environment = process.env.VERCEL_ENV, siteUrl = process.env.SITE_URL } = {}) => {
  const isProduction = environment === 'production'
  const isPreview = environment === 'preview'

  if (!isProduction) {
    return {
      description: DESCRIPTION,
      environment: isPreview ? 'preview' : 'local',
      indexable: false,
      robots: 'noindex, nofollow, noarchive, nosnippet',
      siteUrl: null,
      title: TITLE,
    }
  }

  if (!siteUrl) {
    throw new Error('SITE_URL is required for Vercel production builds. Set it to the public HTTPS origin, for example https://your-project.vercel.app.')
  }

  let parsedUrl
  try {
    parsedUrl = new URL(siteUrl)
  } catch {
    throw new Error('SITE_URL must be a valid absolute HTTPS URL.')
  }

  if (
    parsedUrl.protocol !== 'https:' ||
    parsedUrl.username ||
    parsedUrl.password ||
    parsedUrl.pathname !== '/' ||
    parsedUrl.search ||
    parsedUrl.hash
  ) {
    throw new Error('SITE_URL must be a public HTTPS origin without a path, query, hash, or credentials.')
  }

  return {
    description: DESCRIPTION,
    environment: 'production',
    indexable: true,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    siteUrl: parsedUrl.origin,
    title: TITLE,
  }
}

const escapeAttribute = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const meta = (attribute, name, content) => `<meta ${attribute}="${name}" content="${escapeAttribute(content)}" />`

export const renderHeadTags = (config) => {
  const tags = [
    `<title>${config.title}</title>`,
    meta('name', 'description', config.description),
    meta('name', 'robots', config.robots),
    meta('name', 'theme-color', '#080808'),
    meta('name', 'color-scheme', 'dark'),
    '<link rel="icon" type="image/png" href="/favicon.png" />',
    '<link rel="apple-touch-icon" href="/favicon.png" />',
  ]

  if (!config.indexable) return tags.join('\n    ')

  const imageUrl = `${config.siteUrl}${OG_IMAGE_PATH}`
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_NAME,
      jobTitle: 'Frontend Engineer',
      url: config.siteUrl,
      image: imageUrl,
      sameAs: [
        'https://www.linkedin.com/in/januarmaksum',
        'https://github.com/januarmaksum',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: config.siteUrl,
      description: config.description,
    },
  ]

  return [
    ...tags,
    `<link rel="canonical" href="${config.siteUrl}/" />`,
    meta('property', 'og:locale', 'en_US'),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:title', config.title),
    meta('property', 'og:description', config.description),
    meta('property', 'og:url', `${config.siteUrl}/`),
    meta('property', 'og:image', imageUrl),
    meta('property', 'og:image:type', 'image/png'),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', 'Januar Maksum, Frontend Engineer'),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', config.title),
    meta('name', 'twitter:description', config.description),
    meta('name', 'twitter:image', imageUrl),
    meta('name', 'twitter:image:alt', 'Januar Maksum, Frontend Engineer'),
    `<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`,
  ].join('\n    ')
}
